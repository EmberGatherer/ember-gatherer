// Server-side price catalogue. Values are copied from the approved Ember & Gatherer menu.
const regularNames = `Vegetable Platter
Pickled Vegetables & Mushrooms
Fish Platter with Lightly Salted Salmon
Bread Basket
Signature Meat Platter
Deluxe Meat Platter
Premium Meat Platter
Cheese Platter with Honey & Nuts
Sprat & Cornichon Canapé
Guacamole & Smoked Salmon Bruschetta
Fig, Cheese & Walnut Canapé
Pear & Brie Bruschetta
Roast Beef & Horseradish Cream Bruschetta
Ham & Cheddar Canapé
Caprese Skewer
Mini Mozzarella, Cherry Tomato, Pesto & Arugula Canapé
Spinach Roll with Salmon & Cream Cheese
Cheese Roll with Ham
Spinach & Cheese Roll Assortment
Eggplant Rolls with Walnuts
Shrimp & Guacamole Profiterole
Tuna Profiterole
Chicken Pâté Tartlet with Berry Chutney
Shrimp & Smoked Salmon Cup
Mini Ham Croissant
Mini Beef Burger
Assorted Tartlets
Royal-Style Stuffed Mushrooms
Caesar Salad
Shuba Layered Beet & Herring Salad
Greek Salad
Pasta Salad
Coleslaw
Caprese Salad
Potato Salad with Ham
Cucumber & Tomato Salad
Crab Salad
Tricolour Tomato Salad
Borscht
Bograch Hungarian Goulash Soup
Kapusniak Cabbage Soup
Tuscan Seafood Soup
Cream of Mushroom Soup
Ukrainian Fish Soup (Yushka)
Roasted Turkey
Chicken Quarter
Chicken Shashlik
Jerk Chicken
Chicken Kyiv
Kids’ Chicken Strips
Pork Skewer
Beef Kebab
Roasted Pork Loin
BBQ Ribs
Pulled Pork
Smoked Brisket
Schnitzel
Baked Ham
Ukrainian Sausage
Italian Sausage
Roast Beef with Gravy
Beef with Broccoli
Ginger Beef
Swedish Meatballs
Beef Stroganoff
Beef Stew
Meatloaf
Beef & Pork Patties
Braised Lamb Shank
Shepherd’s Pie
Baked Salmon
Basa Fillet Roll
Chimichurri Shrimp
Jerk Shrimp
Jambalaya
Seafood Paella
Carbonara
Bolognese Pasta
Lasagna
Fettuccine Alfredo
Cabbage Rolls with Meat
Bigos Hunter’s Stew
Potato Zrazy with Meat
Potato Zrazy with Mushrooms
Spring Rolls
Mashed Potatoes
Rosemary Roasted Potatoes
Steamed Potatoes
Creamy Potatoes
Vegetable Rice
Spanish Rice
Macaroni & Cheese
Potato & Cheddar Varenyky
Potato & Bacon Varenyky
Assorted Varenyky
Roasted Vegetables
Steamed Vegetables
Grilled Vegetables
Green Beans
Green Peas
Corn on the Cob
Four-Vegetable Medley
Steamed Broccoli
Roasted Root Vegetables
Zucchini with Peppers & Onions
Fresh Fruit Assortment
Tiramisu
Napoleon Cake
Honey Cake
Chocolate Cake
Pancakes`.split('\n');
const regularPrices = [5.25,4.5,7.5,2,5.95,6.95,8.5,7.25,5,5,5,5,5,5,5,5,7,6,7,4.25,4.75,4.75,4.75,5.95,4.25,5.5,4.75,4.5,5.5,5.5,5.75,4.75,3.5,6.25,5.5,4.5,5.5,5.75,5,7,5,8.5,5.75,6.5,14.5,9.5,11,12.5,14,7.5,12,13.5,12.5,16.5,11.5,18.5,12.5,11.5,8.5,8.5,16.5,14,14.5,11.5,14.5,13.5,11.5,10.5,23.5,12.5,18.5,13.5,15.5,15.5,14.5,17.5,14,14,14,14,9,10.5,8,8,8,9,9.5,8.5,10,8,9,9,9.5,9.5,9.5,7.5,6.5,9,6.5,6.5,3.75,6.5,6.5,8,8,6,6.5,6.5,6.5,6,4.5];
const weddingNames = `Mini Schnitzel Platter
Vegetable Sticks with Pesto
Antipasto Platter
Herring & Beet Crostini
Cucumber & Sprat Canapés
Dark Rye Sprat Canapés
Avocado & Smoked Salmon Bruschetta
Sliced Baguette
Roasted Mini Peppers
Beet & Herring Roll
Bread Basket with Butter
Cream Cheese Bruschetta
Caesar Salad
Serrano Ham Canapés
European Cheese Platter
Christmas Potato Salad
Coleslaw
Creamy Cucumber & Dill Salad
Bacon-Wrapped Dates
Tomato & Cucumber Salad
Grated Beetroot with Horseradish
Greek Salad
Grilled Eggplant Rolls
Grilled Zucchini Rolls
Mediterranean Pasta Salad
Tomato & Mozzarella Caprese
Potato Salad
Braised Red Cabbage
Smoked Salmon Platter
Sauerkraut
Shrimp Skewers
Chicken & Pineapple Skewers
Spinach & Smoked Salmon Roll
Spring Salad
Herb-Stuffed Egg Halves
Zucchini & Pepper Canapés
Pepper & Gorgonzola Bruschetta
Strawberry & Ricotta Bruschetta
Prosciutto Bruschetta
Tuna Salad Bruschetta
Shrimp Bruschetta with Pesto & Garlic
Chicken Canapés
Salmon Canapés
Chicken in Pita
Tomato in Pita
Egg & Salmon in Pita
Duck Breast in Pita
Cheese Roll
Classic Sandwich
Chicken Nugget Platter
Tomato & Mozzarella Skewers
Cheese Kebabs
Melon Kebabs
Baked Chicken Breast with Mushroom Sauce
Sweet & Sour Chicken Wings
Baked Fish with Tartar Sauce
Roasted Ham
Beef Goulash
Borscht
Carrot & Potato Soup with Ginger
Chicken Breast in Creamy Curry Sauce
Chicken Drumsticks
Chicken Curry
Dumplings
Kapusniak Cabbage Soup
Kavarma
Jellied Meat (Kholodets)
Ukrainian Meat Patties
Lamb Pilaf
Bolognese Lasagna
Meatballs
Meatball Soup
Mushroom Soup
Chicken Nalysnyky
Chicken Paella
Penne with Tuna & Tomatoes
Creamy Pumpkin Soup
Roast Beef
Roast Chicken
Roast Lamb
Roast Pork
Salmon Fillet with Lemon Sauce
Sauerkraut with Kielbasa
Schnitzel
Stuffed Peppers
Ukrainian Beef Stew
Ukrainian Chicken Paprikash
Assorted Ukrainian Sausages
Vegan Pasta
Seasonal Vegetable Skillet
Vegetarian Lasagna
Game Meat Goulash
Potato Zrazy
Basmati Rice
Meat-Stuffed Sauerkraut Cabbage Rolls
Vegetarian Sauerkraut Cabbage Rolls
Sweet Cabbage Rolls with Meat
Vegetarian Sweet Cabbage Rolls
Fried Potatoes
Hummus
Imperial Vegetables
Mashed Potatoes
Penne Pasta
Potato & Bacon Pierogi
Potato & Cheddar Pierogi
Potato & Cheese Pierogi
Potato & Mushroom Pierogi
Potato & Onion Pierogi
Rosemary Roasted Potatoes
Rice with Vegetables
Roasted Baby Potatoes
Fresh Fruit Salad
Chocolate Ginger Pudding
Chocolate Mousse
Fruit Platter
Macarons
Speculoos Mascarpone Cream
Napoleon Cake
Pancakes with Jam
Raspberry & Mascarpone Cream
Red Berry Jelly with Vanilla Cream
Tiramisu
Freshly Brewed Coffee
Coca-Cola (200 ml)
Coca-Cola Zero (200 ml)
Hot Cocoa
Fanta (200 ml)
Coffee & Tea
Sparkling Water (200 ml)
Sprite (200 ml)
Still Water (200 ml)
Assorted Tea`.split('\n');
const weddingPrices = [7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,7.53,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,20.32,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,14.09,8.98,8.98,8.98,8.98,8.98,8.98,8.98,8.98,8.98,8.98,8.98,6.99,3.85,3.85,6.99,3.85,12.69,3.85,3.85,3.85,6.99];
const MENU = {};
regularNames.forEach((name, i) => { MENU[`menu_${String(i + 1).padStart(3, '0')}`] = { name, price: regularPrices[i] }; });
weddingNames.forEach((name, i) => { MENU[`wedding_${String(i + 1).padStart(3, '0')}`] = { name, price: weddingPrices[i] }; });
const SMOKE = [
  {name:'Whole Chicken',price:10.89},{name:'Chicken Quarters',price:10.89},
  {name:'Chicken Wings',price:17.24},{name:'Pork Belly',price:12.70},
  {name:'Pork Loin',price:13.15},{name:'Pork Tenderloin',price:15.42},
  {name:'Beef Top Sirloin',price:22.23},{name:'Pork Ribs',price:14.51},
  {name:'Salmon',price:26.76},{name:'Shrimp',price:20.41}
];
const PACKAGES = { classic:30, signature:55, premium:80 };
module.exports = { MENU, SMOKE, PACKAGES };
