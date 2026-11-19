
function send(res, status, body) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
}

function cents(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100);
}

// Server-side price catalog copied from the live website catalog. Browser prices are never trusted.
const MENU = Object.freeze(Object.fromEntries([{"id":"menu_001","name":"Vegetable Platter","price":5.25},{"id":"menu_002","name":"Pickled Vegetables & Mushrooms","price":4.5},{"id":"menu_003","name":"Fish Platter with Lightly Salted Salmon","price":7.5},{"id":"menu_004","name":"Bread Basket","price":2},{"id":"menu_005","name":"Signature Meat Platter","price":5.95},{"id":"menu_006","name":"Deluxe Meat Platter","price":6.95},{"id":"menu_007","name":"Premium Meat Platter","price":8.5},{"id":"menu_008","name":"Cheese Platter with Honey & Nuts","price":7.25},{"id":"menu_009","name":"Sprat & Cornichon Canapé","price":5},{"id":"menu_010","name":"Guacamole & Smoked Salmon Bruschetta","price":5},{"id":"menu_011","name":"Fig, Cheese & Walnut Canapé","price":5},{"id":"menu_012","name":"Pear & Brie Bruschetta","price":5},{"id":"menu_013","name":"Roast Beef & Horseradish Cream Bruschetta","price":5},{"id":"menu_014","name":"Ham & Cheddar Canapé","price":5},{"id":"menu_015","name":"Caprese Skewer","price":5},{"id":"menu_016","name":"Mini Mozzarella, Cherry Tomato, Pesto & Arugula Canapé","price":5},{"id":"menu_017","name":"Spinach Roll with Salmon & Cream Cheese","price":7},{"id":"menu_018","name":"Cheese Roll with Ham","price":6},{"id":"menu_019","name":"Spinach & Cheese Roll Assortment","price":7},{"id":"menu_020","name":"Eggplant Rolls with Walnuts","price":4.25},{"id":"menu_021","name":"Shrimp & Guacamole Profiterole","price":4.75},{"id":"menu_022","name":"Tuna Profiterole","price":4.75},{"id":"menu_023","name":"Chicken Pâté Tartlet with Berry Chutney","price":4.75},{"id":"menu_024","name":"Shrimp & Smoked Salmon Cup","price":5.95},{"id":"menu_025","name":"Mini Ham Croissant","price":4.25},{"id":"menu_026","name":"Mini Beef Burger","price":5.5},{"id":"menu_027","name":"Assorted Tartlets","price":4.75},{"id":"menu_028","name":"Royal-Style Stuffed Mushrooms","price":4.5},{"id":"menu_029","name":"Caesar Salad","price":5.5},{"id":"menu_030","name":"Shuba Layered Beet & Herring Salad","price":5.5},{"id":"menu_031","name":"Greek Salad","price":5.75},{"id":"menu_032","name":"Pasta Salad","price":4.75},{"id":"menu_033","name":"Coleslaw","price":3.5},{"id":"menu_034","name":"Caprese Salad","price":6.25},{"id":"menu_035","name":"Potato Salad with Ham","price":5.5},{"id":"menu_036","name":"Cucumber & Tomato Salad","price":4.5},{"id":"menu_037","name":"Crab Salad","price":5.5},{"id":"menu_038","name":"Tricolour Tomato Salad","price":5.75},{"id":"menu_039","name":"Borscht","price":5},{"id":"menu_040","name":"Bograch Hungarian Goulash Soup","price":7},{"id":"menu_041","name":"Kapusniak Cabbage Soup","price":5},{"id":"menu_042","name":"Tuscan Seafood Soup","price":8.5},{"id":"menu_043","name":"Cream of Mushroom Soup","price":5.75},{"id":"menu_044","name":"Ukrainian Fish Soup (Yushka)","price":6.5},{"id":"menu_045","name":"Roasted Turkey","price":14.5},{"id":"menu_046","name":"Chicken Quarter","price":9.5},{"id":"menu_047","name":"Chicken Shashlik","price":11},{"id":"menu_048","name":"Jerk Chicken","price":12.5},{"id":"menu_049","name":"Chicken Kyiv","price":14},{"id":"menu_050","name":"Kids’ Chicken Strips","price":7.5},{"id":"menu_051","name":"Pork Skewer","price":12},{"id":"menu_052","name":"Beef Kebab","price":13.5},{"id":"menu_053","name":"Roasted Pork Loin","price":12.5},{"id":"menu_054","name":"BBQ Ribs","price":16.5},{"id":"menu_055","name":"Pulled Pork","price":11.5},{"id":"menu_056","name":"Smoked Brisket","price":18.5},{"id":"menu_057","name":"Schnitzel","price":12.5},{"id":"menu_058","name":"Baked Ham","price":11.5},{"id":"menu_059","name":"Ukrainian Sausage","price":8.5},{"id":"menu_060","name":"Italian Sausage","price":8.5},{"id":"menu_061","name":"Roast Beef with Gravy","price":16.5},{"id":"menu_062","name":"Beef with Broccoli","price":14},{"id":"menu_063","name":"Ginger Beef","price":14.5},{"id":"menu_064","name":"Swedish Meatballs","price":11.5},{"id":"menu_065","name":"Beef Stroganoff","price":14.5},{"id":"menu_066","name":"Beef Stew","price":13.5},{"id":"menu_067","name":"Meatloaf","price":11.5},{"id":"menu_068","name":"Beef & Pork Patties","price":10.5},{"id":"menu_069","name":"Braised Lamb Shank","price":23.5},{"id":"menu_070","name":"Shepherd’s Pie","price":12.5},{"id":"menu_071","name":"Baked Salmon","price":18.5},{"id":"menu_072","name":"Basa Fillet Roll","price":13.5},{"id":"menu_073","name":"Chimichurri Shrimp","price":15.5},{"id":"menu_074","name":"Jerk Shrimp","price":15.5},{"id":"menu_075","name":"Jambalaya","price":14.5},{"id":"menu_076","name":"Seafood Paella","price":17.5},{"id":"menu_077","name":"Carbonara","price":14},{"id":"menu_078","name":"Bolognese Pasta","price":14},{"id":"menu_079","name":"Lasagna","price":14},{"id":"menu_080","name":"Fettuccine Alfredo","price":14},{"id":"menu_081","name":"Cabbage Rolls with Meat","price":9},{"id":"menu_082","name":"Bigos Hunter’s Stew","price":10.5},{"id":"menu_083","name":"Potato Zrazy with Meat","price":8},{"id":"menu_084","name":"Potato Zrazy with Mushrooms","price":8},{"id":"menu_085","name":"Spring Rolls","price":8},{"id":"menu_086","name":"Mashed Potatoes","price":9},{"id":"menu_087","name":"Rosemary Roasted Potatoes","price":9.5},{"id":"menu_088","name":"Steamed Potatoes","price":8.5},{"id":"menu_089","name":"Creamy Potatoes","price":10},{"id":"menu_090","name":"Vegetable Rice","price":8},{"id":"menu_091","name":"Spanish Rice","price":9},{"id":"menu_092","name":"Macaroni & Cheese","price":9},{"id":"menu_093","name":"Potato & Cheddar Varenyky","price":9.5},{"id":"menu_094","name":"Potato & Bacon Varenyky","price":9.5},{"id":"menu_095","name":"Assorted Varenyky","price":9.5},{"id":"menu_096","name":"Roasted Vegetables","price":7.5},{"id":"menu_097","name":"Steamed Vegetables","price":6.5},{"id":"menu_098","name":"Grilled Vegetables","price":9},{"id":"menu_099","name":"Green Beans","price":6.5},{"id":"menu_100","name":"Green Peas","price":6.5},{"id":"menu_101","name":"Corn on the Cob","price":3.75},{"id":"menu_102","name":"Four-Vegetable Medley","price":6.5},{"id":"menu_103","name":"Steamed Broccoli","price":6.5},{"id":"menu_104","name":"Roasted Root Vegetables","price":8},{"id":"menu_105","name":"Zucchini with Peppers & Onions","price":8},{"id":"menu_106","name":"Fresh Fruit Assortment","price":6},{"id":"menu_107","name":"Tiramisu","price":6.5},{"id":"menu_108","name":"Napoleon Cake","price":6.5},{"id":"menu_109","name":"Honey Cake","price":6.5},{"id":"menu_110","name":"Chocolate Cake","price":6},{"id":"menu_111","name":"Pancakes","price":4.5},{"id":"wedding_001","name":"Mini Schnitzel Platter","price":7.53},{"id":"wedding_002","name":"Vegetable Sticks with Pesto","price":7.53},{"id":"wedding_003","name":"Antipasto Platter","price":7.53},{"id":"wedding_004","name":"Herring & Beet Crostini","price":7.53},{"id":"wedding_005","name":"Cucumber & Sprat Canapés","price":7.53},{"id":"wedding_006","name":"Dark Rye Sprat Canapés","price":7.53},{"id":"wedding_007","name":"Avocado & Smoked Salmon Bruschetta","price":7.53},{"id":"wedding_008","name":"Sliced Baguette","price":7.53},{"id":"wedding_009","name":"Roasted Mini Peppers","price":7.53},{"id":"wedding_010","name":"Beet & Herring Roll","price":7.53},{"id":"wedding_011","name":"Bread Basket with Butter","price":7.53},{"id":"wedding_012","name":"Cream Cheese Bruschetta","price":7.53},{"id":"wedding_013","name":"Caesar Salad","price":7.53},{"id":"wedding_014","name":"Serrano Ham Canapés","price":7.53},{"id":"wedding_015","name":"European Cheese Platter","price":7.53},{"id":"wedding_016","name":"Christmas Potato Salad","price":7.53},{"id":"wedding_017","name":"Coleslaw","price":7.53},{"id":"wedding_018","name":"Creamy Cucumber & Dill Salad","price":7.53},{"id":"wedding_019","name":"Bacon-Wrapped Dates","price":7.53},{"id":"wedding_020","name":"Tomato & Cucumber Salad","price":7.53},{"id":"wedding_021","name":"Grated Beetroot with Horseradish","price":7.53},{"id":"wedding_022","name":"Greek Salad","price":7.53},{"id":"wedding_023","name":"Grilled Eggplant Rolls","price":7.53},{"id":"wedding_024","name":"Grilled Zucchini Rolls","price":7.53},{"id":"wedding_025","name":"Mediterranean Pasta Salad","price":7.53},{"id":"wedding_026","name":"Tomato & Mozzarella Caprese","price":7.53},{"id":"wedding_027","name":"Potato Salad","price":7.53},{"id":"wedding_028","name":"Braised Red Cabbage","price":7.53},{"id":"wedding_029","name":"Smoked Salmon Platter","price":7.53},{"id":"wedding_030","name":"Sauerkraut","price":7.53},{"id":"wedding_031","name":"Shrimp Skewers","price":7.53},{"id":"wedding_032","name":"Chicken & Pineapple Skewers","price":7.53},{"id":"wedding_033","name":"Spinach & Smoked Salmon Roll","price":7.53},{"id":"wedding_034","name":"Spring Salad","price":7.53},{"id":"wedding_035","name":"Herb-Stuffed Egg Halves","price":7.53},{"id":"wedding_036","name":"Zucchini & Pepper Canapés","price":7.53},{"id":"wedding_037","name":"Pepper & Gorgonzola Bruschetta","price":7.53},{"id":"wedding_038","name":"Strawberry & Ricotta Bruschetta","price":7.53},{"id":"wedding_039","name":"Prosciutto Bruschetta","price":7.53},{"id":"wedding_040","name":"Tuna Salad Bruschetta","price":7.53},{"id":"wedding_041","name":"Shrimp Bruschetta with Pesto & Garlic","price":7.53},{"id":"wedding_042","name":"Chicken Canapés","price":7.53},{"id":"wedding_043","name":"Salmon Canapés","price":7.53},{"id":"wedding_044","name":"Chicken in Pita","price":7.53},{"id":"wedding_045","name":"Tomato in Pita","price":7.53},{"id":"wedding_046","name":"Egg & Salmon in Pita","price":7.53},{"id":"wedding_047","name":"Duck Breast in Pita","price":7.53},{"id":"wedding_048","name":"Cheese Roll","price":7.53},{"id":"wedding_049","name":"Classic Sandwich","price":7.53},{"id":"wedding_050","name":"Chicken Nugget Platter","price":7.53},{"id":"wedding_051","name":"Tomato & Mozzarella Skewers","price":7.53},{"id":"wedding_052","name":"Cheese Kebabs","price":7.53},{"id":"wedding_053","name":"Melon Kebabs","price":7.53},{"id":"wedding_054","name":"Baked Chicken Breast with Mushroom Sauce","price":20.32},{"id":"wedding_055","name":"Sweet & Sour Chicken Wings","price":20.32},{"id":"wedding_056","name":"Baked Fish with Tartar Sauce","price":20.32},{"id":"wedding_057","name":"Roasted Ham","price":20.32},{"id":"wedding_058","name":"Beef Goulash","price":20.32},{"id":"wedding_059","name":"Borscht","price":20.32},{"id":"wedding_060","name":"Carrot & Potato Soup with Ginger","price":20.32},{"id":"wedding_061","name":"Chicken Breast in Creamy Curry Sauce","price":20.32},{"id":"wedding_062","name":"Chicken Drumsticks","price":20.32},{"id":"wedding_063","name":"Chicken Curry","price":20.32},{"id":"wedding_064","name":"Dumplings","price":20.32},{"id":"wedding_065","name":"Kapusniak Cabbage Soup","price":20.32},{"id":"wedding_066","name":"Kavarma","price":20.32},{"id":"wedding_067","name":"Jellied Meat (Kholodets)","price":20.32},{"id":"wedding_068","name":"Ukrainian Meat Patties","price":20.32},{"id":"wedding_069","name":"Lamb Pilaf","price":20.32},{"id":"wedding_070","name":"Bolognese Lasagna","price":20.32},{"id":"wedding_071","name":"Meatballs","price":20.32},{"id":"wedding_072","name":"Meatball Soup","price":20.32},{"id":"wedding_073","name":"Mushroom Soup","price":20.32},{"id":"wedding_074","name":"Chicken Nalysnyky","price":20.32},{"id":"wedding_075","name":"Chicken Paella","price":20.32},{"id":"wedding_076","name":"Penne with Tuna & Tomatoes","price":20.32},{"id":"wedding_077","name":"Creamy Pumpkin Soup","price":20.32},{"id":"wedding_078","name":"Roast Beef","price":20.32},{"id":"wedding_079","name":"Roast Chicken","price":20.32},{"id":"wedding_080","name":"Roast Lamb","price":20.32},{"id":"wedding_081","name":"Roast Pork","price":20.32},{"id":"wedding_082","name":"Salmon Fillet with Lemon Sauce","price":20.32},{"id":"wedding_083","name":"Sauerkraut with Kielbasa","price":20.32},{"id":"wedding_084","name":"Schnitzel","price":20.32},{"id":"wedding_085","name":"Stuffed Peppers","price":20.32},{"id":"wedding_086","name":"Ukrainian Beef Stew","price":20.32},{"id":"wedding_087","name":"Ukrainian Chicken Paprikash","price":20.32},{"id":"wedding_088","name":"Assorted Ukrainian Sausages","price":20.32},{"id":"wedding_089","name":"Vegan Pasta","price":20.32},{"id":"wedding_090","name":"Seasonal Vegetable Skillet","price":20.32},{"id":"wedding_091","name":"Vegetarian Lasagna","price":20.32},{"id":"wedding_092","name":"Game Meat Goulash","price":20.32},{"id":"wedding_093","name":"Potato Zrazy","price":20.32},{"id":"wedding_094","name":"Basmati Rice","price":14.09},{"id":"wedding_095","name":"Meat-Stuffed Sauerkraut Cabbage Rolls","price":14.09},{"id":"wedding_096","name":"Vegetarian Sauerkraut Cabbage Rolls","price":14.09},{"id":"wedding_097","name":"Sweet Cabbage Rolls with Meat","price":14.09},{"id":"wedding_098","name":"Vegetarian Sweet Cabbage Rolls","price":14.09},{"id":"wedding_099","name":"Fried Potatoes","price":14.09},{"id":"wedding_100","name":"Hummus","price":14.09},{"id":"wedding_101","name":"Imperial Vegetables","price":14.09},{"id":"wedding_102","name":"Mashed Potatoes","price":14.09},{"id":"wedding_103","name":"Penne Pasta","price":14.09},{"id":"wedding_104","name":"Potato & Bacon Pierogi","price":14.09},{"id":"wedding_105","name":"Potato & Cheddar Pierogi","price":14.09},{"id":"wedding_106","name":"Potato & Cheese Pierogi","price":14.09},{"id":"wedding_107","name":"Potato & Mushroom Pierogi","price":14.09},{"id":"wedding_108","name":"Potato & Onion Pierogi","price":14.09},{"id":"wedding_109","name":"Rosemary Roasted Potatoes","price":14.09},{"id":"wedding_110","name":"Rice with Vegetables","price":14.09},{"id":"wedding_111","name":"Roasted Baby Potatoes","price":14.09},{"id":"wedding_112","name":"Fresh Fruit Salad","price":8.98},{"id":"wedding_113","name":"Chocolate Ginger Pudding","price":8.98},{"id":"wedding_114","name":"Chocolate Mousse","price":8.98},{"id":"wedding_115","name":"Fruit Platter","price":8.98},{"id":"wedding_116","name":"Macarons","price":8.98},{"id":"wedding_117","name":"Speculoos Mascarpone Cream","price":8.98},{"id":"wedding_118","name":"Napoleon Cake","price":8.98},{"id":"wedding_119","name":"Pancakes with Jam","price":8.98},{"id":"wedding_120","name":"Raspberry & Mascarpone Cream","price":8.98},{"id":"wedding_121","name":"Red Berry Jelly with Vanilla Cream","price":8.98},{"id":"wedding_122","name":"Tiramisu","price":8.98},{"id":"wedding_123","name":"Freshly Brewed Coffee","price":6.99},{"id":"wedding_124","name":"Coca-Cola (200 ml)","price":3.85},{"id":"wedding_125","name":"Coca-Cola Zero (200 ml)","price":3.85},{"id":"wedding_126","name":"Hot Cocoa","price":6.99},{"id":"wedding_127","name":"Fanta (200 ml)","price":3.85},{"id":"wedding_128","name":"Coffee & Tea","price":12.69},{"id":"wedding_129","name":"Sparkling Water (200 ml)","price":3.85},{"id":"wedding_130","name":"Sprite (200 ml)","price":3.85},{"id":"wedding_131","name":"Still Water (200 ml)","price":3.85},{"id":"wedding_132","name":"Assorted Tea","price":6.99}].map(item => [item.id, item])));
const SMOKE = Object.freeze([{"name":"Whole Chicken","price":10.89},{"name":"Chicken Quarters","price":10.89},{"name":"Chicken Wings","price":17.24},{"name":"Pork Belly","price":12.7},{"name":"Pork Loin","price":13.15},{"name":"Pork Tenderloin","price":15.42},{"name":"Beef Top Sirloin","price":22.23},{"name":"Pork Ribs","price":14.51},{"name":"Salmon","price":26.76},{"name":"Shrimp","price":20.41}]);
const PACKAGES = Object.freeze({ classic: 30, signature: 55, premium: 80 });

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

      const codes = errors.map(e => e.code).filter(Boolean);
      const invalidLocation = codes.includes('INVALID_VALUE');

      return send(res, 502, {
        error: invalidLocation
          ? 'Square rejected the Location ID. Check SQUARE_LOCATION_ID in Vercel.'
          : 'Square could not create the checkout link. Check the Square credentials and settings in Vercel.',
        squareCodes: codes,
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
