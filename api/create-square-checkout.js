
function send(res, status, body) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
}

function cents(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const token = String(process.env.SQUARE_ACCESS_TOKEN || '').trim();
  const locationId = String(process.env.SQUARE_LOCATION_ID || '').trim();
  const environment = String(
    process.env.SQUARE_ENVIRONMENT || 'sandbox'
  ).trim().toLowerCase();

  if (!token || !locationId) {
    return send(res, 500, {
      error: 'Square is not configured. Check SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID.'
    });
  }

  if (!['sandbox', 'production'].includes(environment)) {
    return send(res, 500, {
      error: 'SQUARE_ENVIRONMENT must be sandbox or production.'
    });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : (req.body || {});

    const customer = body.customer || {};

    const name = String(customer.name || '').trim().slice(0, 120);
    const phone = String(customer.phone || '').trim().slice(0, 40);
    const email = String(customer.email || '').trim().slice(0, 160);
    const address = String(customer.address || '').trim().slice(0, 300);

    if (!name || !phone || !address) {
      return send(res, 400, {
        error: 'Name, phone number and delivery address are required.'
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return send(res, 400, {
        error: 'Please enter a valid email address.'
      });
    }

    if (!Array.isArray(body.items) ||
        body.items.length < 1 ||
        body.items.length > 100) {
      return send(res, 400, {
        error: 'Your cart is empty or contains too many line items.'
      });
    }

    const lineItems = [];
    let subtotalCents = 0;

    for (const item of body.items) {
      const type = String(item.type || 'menu');

      if (type === 'menu') {
        const product = MENU[String(item.id || '')];
        const qty = Number(item.quantity);

        if (!product || !Number.isInteger(qty) ||
            qty < 1 || qty > 500) {
          return send(res, 400, {
            error: 'A menu item or quantity is invalid. Please refresh your cart.'
          });
        }

        const unit = cents(product.price);
        subtotalCents += unit * qty;

        lineItems.push({
          name: product.name,
          quantity: String(qty),
          base_price_money: {
            amount: unit,
            currency: 'CAD'
          }
        });

      } else if (type === 'smoke') {
        const idx = Number(item.smokeIndex);
        const lbs = Number(item.lbs);

        if (!Number.isInteger(idx) || !SMOKE[idx] ||
            !Number.isFinite(lbs) || lbs < 0.5 || lbs > 500) {
          return send(res, 400, {
            error: 'A smokehouse item or pound quantity is invalid.'
          });
        }

        const amount = cents(SMOKE[idx].price * lbs);
        subtotalCents += amount;

        lineItems.push({
          name: `${SMOKE[idx].name} — ${lbs} lb`,
          quantity: '1',
          base_price_money: {
            amount,
            currency: 'CAD'
          }
        });

      } else if (type === 'package') {
        const key = String(item.packageKey || '').toLowerCase();
        const guests = Number(item.guests);

        if (!PACKAGES[key] || !Number.isInteger(guests) ||
            guests < 1 || guests > 500) {
          return send(res, 400, {
            error: 'A catering package or guest count is invalid.'
          });
        }

        const amount = cents(PACKAGES[key] * guests);
        subtotalCents += amount;

        lineItems.push({
          name: `${key[0].toUpperCase()}${key.slice(1)} Catering Package — ${guests} guests`,
          quantity: '1',
          base_price_money: {
            amount,
            currency: 'CAD'
          }
        });

      } else {
        return send(res, 400, {
          error: 'Unsupported cart item. Please refresh your cart.'
        });
      }
    }

    // Custom Menu minimum: $600 CAD before GST.
    if (body.customMenuMode && subtotalCents < 60000) {
      return send(res, 400, {
        error: 'Custom Menu requires a minimum food and beverage order of $600 CAD before GST.'
      });
    }

    // Delivery: $15 under $100, free at $100 or more.
    const deliveryCents = subtotalCents >= 10000
      ? 0
      : 1500;

    if (deliveryCents > 0) {
      lineItems.push({
        name: 'Delivery',
        quantity: '1',
        base_price_money: {
          amount: deliveryCents,
          currency: 'CAD'
        }
      });
    }

    // Use the configured website URL.
    const origin = String(process.env.SITE_URL || '')
      .trim()
      .replace(/\/$/, '');

    if (!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(origin)) {
      return send(res, 500, {
        error: 'Set SITE_URL to your HTTPS website address in Vercel.'
      });
    }

    const orderDescription =
      `Ember & Gatherer catering order — ${name} — ${phone}` +
      `${email ? ' — ' + email : ''} — ${address}` +
      ` — ${String(customer.eventDate || 'No event date').slice(0, 40)}` +
      ` — ${String(customer.notes || '').slice(0, 300)}`;

    const payload = {
      idempotency_key: require('crypto').randomUUID(),

      description: orderDescription.slice(0, 4096),

      order: {
        location_id: locationId,
        reference_id: `EG-${Date.now()}`,
        line_items: lineItems
      },

      checkout_options: {
        redirect_url: `${origin}/?payment=square-return`,
        ask_for_shipping_address: false
      },

      ...(email || phone ? {
        pre_populated_data: {
          ...(email ? { buyer_email: email } : {}),
          ...(phone ? { buyer_phone_number: phone } : {})
        }
      } : {})
    };

    const base = environment === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';

    const response = await fetch(
      `${base}/v2/online-checkout/payment-links`,
      {
        method: 'POST',
        headers: {
          'Square-Version': '2026-09-16',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.payment_link?.url) {
      const errors = Array.isArray(result.errors)
        ? result.errors
        : [];

      console.error(
        'Square API error:',
        response.status,
        errors.map(e => ({
          code: e.code,
          category: e.category,
          detail: e.detail
        }))
      );

      return send(res, 502, {
        error: errors
          .map(e => e.detail || e.code)
          .filter(Boolean)
          .join('; ') || 'Square could not create the checkout link.',
        squareCodes: errors.map(e => e.code).filter(Boolean),
        httpStatus: response.status
      });
    }

    return send(res, 200, {
      url: result.payment_link.url,
      orderId: result.payment_link.order_id
    });

  } catch (error) {
    console.error('Square checkout error:', error.message);

    return send(res, 500, {
      error: 'Unable to start Square checkout. Please try again.'
    });
  }
};
