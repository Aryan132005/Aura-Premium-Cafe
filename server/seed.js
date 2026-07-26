const bcrypt = require('bcryptjs');
require('dotenv').config();

const { sequelize, connectDB } = require('./config/db');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Event = require('./models/Event');
const Reservation = require('./models/Reservation');
const Enquiry = require('./models/Enquiry');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

const sampleMenuItems = [
  // BEVERAGES (6 Items)
  {
    name: 'Artisanal Gold Leaf Espresso',
    description: 'Double shot of single-origin Ethiopian Arabica topped with 24k edible gold dust and silky micro-foam.',
    price: 12.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '8-10 mins'
  },
  {
    name: 'Velvet Vanilla Bourbon Cold Brew',
    description: 'Steeped for 24 hours, infused with Madagascar vanilla beans and Kentucky bourbon oak smoke.',
    price: 9.00,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    prepTime: '5 mins'
  },
  {
    name: 'Ceremonial Grade Matcha Latte',
    description: 'First-harvest Uji matcha whisked with oat milk and drizzled with organic wildflower honey.',
    price: 8.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.7,
    prepTime: '6 mins'
  },
  {
    name: 'Royal Saffron & Cardamom Chai',
    description: 'Slow-brewed Assam black tea with crushed green cardamom, Iranian saffron strands, and whole milk.',
    price: 7.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.9,
    prepTime: '7 mins'
  },
  {
    name: 'Iced Hazelnut Praline Mocha',
    description: 'Rich dark espresso blended with roasted hazelnut syrup, Belgian chocolate drizzle, and whipped cream.',
    price: 9.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    prepTime: '6 mins'
  },
  {
    name: 'Spanish Cortado with Cinnamon Dust',
    description: 'Equal parts dark espresso roast and velvety steamed milk served in a glass with Saigon cinnamon.',
    price: 7.00,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.6,
    prepTime: '5 mins'
  },

  // STARTERS (6 Items)
  {
    name: 'Truffle & Wild Mushroom Crostini',
    description: 'Charred sourdough topped with sautéed chanterelles, black truffle cream, and fresh thyme.',
    price: 16.00,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '12-15 mins'
  },
  {
    name: 'Smoked Salmon Blinis',
    description: 'Norwegian smoked salmon served over mini buckwheat blinis with dill creme fraiche and caviar.',
    price: 18.50,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: false,
    rating: 4.8,
    prepTime: '10-12 mins'
  },
  {
    name: 'Crispy Garlic Parmesan Wings',
    description: 'Double-fried jumbo wings tossed in roasted garlic butter, aged Parmesan cheese, and fresh parsley.',
    price: 15.00,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    prepTime: '15 mins'
  },
  {
    name: 'Avocado & Burrata Bruschetta',
    description: 'Toasted baguette slices with smashed Hass avocado, creamy Italian burrata, heirloom cherry tomatoes & balsamic glaze.',
    price: 14.50,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.7,
    prepTime: '10 mins'
  },
  {
    name: 'Creamy Jalapeño Cheddar Bites',
    description: 'Crispy golden croquettes filled with melted sharp cheddar, diced jalapenos, and smoked paprika dip.',
    price: 12.00,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.6,
    prepTime: '12 mins'
  },
  {
    name: 'Grand Charcuterie & Artisan Cheese Board',
    description: 'Assorted prosciutto, salami, aged Gouda, Brie, fig jam, roasted nuts, and warm artisan crackers.',
    price: 26.00,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: true,
    rating: 5.0,
    prepTime: '15 mins'
  },

  // MAIN COURSE (6 Items)
  {
    name: 'Pan-Seared Wagyu Ribeye Sandwich',
    description: 'Slices of Wagyu beef, caramelised shallots, Gruyère cheese, and horseradish aioli on artisanal brioche.',
    price: 28.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: true,
    rating: 5.0,
    prepTime: '20 mins'
  },
  {
    name: 'Saffron & Wild Mushroom Risotto',
    description: 'Creamy Arborio rice slow-cooked with Iranian saffron, roasted asparagus, and Aged Parmesan crisps.',
    price: 24.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '22 mins'
  },
  {
    name: 'Tuscan Garlic Butter Salmon',
    description: 'Pan-roasted Atlantic salmon served over garlic butter spinach, sun-dried tomatoes, and creamy polenta.',
    price: 29.50,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    prepTime: '20 mins'
  },
  {
    name: 'Creamy Truffle Fettuccine Alfredo',
    description: 'Handmade fettuccine pasta tossed in rich black truffle parmesan sauce with roasted wild garlic.',
    price: 22.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.8,
    prepTime: '18 mins'
  },
  {
    name: 'Mediterranean Grilled Lamb Chops',
    description: 'Herb-marinated lamb chops grilled to perfection, served with rosemary potatoes and mint tzatziki.',
    price: 32.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: true,
    rating: 5.0,
    prepTime: '25 mins'
  },
  {
    name: 'Gourmet Angus Bacon & Cheese Burger',
    description: '100% Black Angus beef patty, smoked bacon, aged cheddar, caramelised onions, truffle mayo on brioche.',
    price: 21.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: false,
    isFeatured: false,
    rating: 4.8,
    prepTime: '18 mins'
  },

  // DESSERTS (6 Items)
  {
    name: 'Golden Salted Caramel Tart',
    description: 'Dark chocolate ganache, molten fleur de sel caramel, edible gold leaf, and hazelnut praline crunch.',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '10 mins'
  },
  {
    name: 'Signature Tiramisu Tradizionale',
    description: 'Savoiardi ladyfingers soaked in dark roast espresso and dark rum, layered with whipped mascarpone.',
    price: 12.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.8,
    prepTime: '8 mins'
  },
  {
    name: 'Belgian Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with a molten center, served with Madagascan vanilla bean gelato.',
    price: 13.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '12 mins'
  },
  {
    name: 'Wild Berry & Pistachio Cheesecake',
    description: 'Baked New York style cheesecake topped with mixed berry compote and crushed Sicilian pistachios.',
    price: 13.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.7,
    prepTime: '8 mins'
  },
  {
    name: 'French Vanilla Macaron & Berry Platter',
    description: 'Assortment of artisan macarons (pistachio, salted caramel, raspberry, dark chocolate) with fresh berries.',
    price: 15.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: false,
    rating: 4.8,
    prepTime: '5 mins'
  },
  {
    name: 'Molten Gold Brownie Sundae',
    description: 'Double fudge chocolate brownie served warm with salted caramel sauce, gold flakes, and hazelnut gelato.',
    price: 11.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    prepTime: '10 mins'
  }
];

const sampleEvents = [
  {
    title: 'Midnight Jazz & Espresso Soirée',
    description: 'Join us for an intimate live acoustic jazz performance featuring world-class saxophonist Marcus Vance alongside curated coffee cocktails.',
    date: '2026-08-15',
    time: '20:00 - 23:00',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    location: 'Main Velvet Lounge'
  },
  {
    title: 'Barista Masterclass: Single-Origin Cupping',
    description: 'Learn the art of sensory cupping and latte art with our Head Barista Chef. Includes complimentary coffee bean gift box.',
    date: '2026-08-22',
    time: '14:00 - 16:30',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    location: 'Barista Tasting Lab'
  }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('🌱 Syncing Database Tables...');
    await sequelize.sync({ force: true }); // Re-create tables cleanly

    // Create Admin user
    const adminPasswordHash = await bcrypt.hash('adminpassword123', 10);
    const adminUser = await User.create({
      name: 'Café Admin Master',
      email: 'admin@premiumcafe.com',
      password: adminPasswordHash,
      role: 'admin',
      phone: '+1 (555) 987-6543'
    });

    // Create Customer user
    const customerPasswordHash = await bcrypt.hash('customerpassword123', 10);
    const customerUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: customerPasswordHash,
      role: 'customer',
      phone: '+1 (555) 123-4567'
    });

    // Bulk Insert Menu Items
    const createdMenuItems = await MenuItem.bulkCreate(sampleMenuItems);

    // Bulk Insert Events
    await Event.bulkCreate(sampleEvents);

    // Insert Sample Reservations
    await Reservation.bulkCreate([
      {
        userId: customerUser.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        date: '2026-08-10',
        time: '19:00',
        guests: 4,
        status: 'confirmed',
        specialRequest: 'Anniversary celebration. Quiet booth requested.'
      },
      {
        name: 'Sarah Connor',
        email: 'sarah@skynet.com',
        phone: '+1 (555) 321-7654',
        date: '2026-08-12',
        time: '20:30',
        guests: 2,
        status: 'pending',
        specialRequest: 'Window table if available.'
      }
    ]);

    // Insert Sample Enquiries
    await Enquiry.bulkCreate([
      {
        name: 'Michael Scott',
        email: 'michael@dundermifflin.com',
        subject: 'Private Corporate Event Hosting',
        message: 'Looking to book the entire lounge for 30 executives next month. Please send menu packages.',
        status: 'unread'
      }
    ]);

    // Insert Sample Orders
    const order1 = await Order.create({
      orderNumber: 'ORD-948201',
      userId: customerUser.id,
      customerName: 'John Doe',
      customerPhone: '+1 (555) 123-4567',
      orderType: 'Dine-In',
      tableNumber: 'Table 4',
      status: 'Pending',
      paymentMethod: 'UPI / Card',
      paymentStatus: 'Pending',
      totalAmount: 40.50,
      specialInstructions: 'Extra gold leaf on espresso, please.'
    });

    await OrderItem.bulkCreate([
      {
        orderId: order1.id,
        menuItemId: createdMenuItems[0].id,
        itemName: 'Artisanal Gold Leaf Espresso',
        itemPrice: 12.50,
        quantity: 1,
        subtotal: 12.50
      },
      {
        orderId: order1.id,
        menuItemId: createdMenuItems[6].id,
        itemName: 'Truffle & Wild Mushroom Crostini',
        itemPrice: 16.00,
        quantity: 1,
        subtotal: 16.00
      },
      {
        orderId: order1.id,
        menuItemId: createdMenuItems[18].id,
        itemName: 'Signature Tiramisu Tradizionale',
        itemPrice: 12.00,
        quantity: 1,
        subtotal: 12.00
      }
    ]);

    const order2 = await Order.create({
      orderNumber: 'ORD-812304',
      customerName: 'Emily Watson',
      customerPhone: '+1 (555) 888-9900',
      orderType: 'Takeaway',
      status: 'Preparing',
      paymentMethod: 'Cash / Pay at Counter',
      paymentStatus: 'Paid',
      totalAmount: 52.00,
      specialInstructions: 'Pack nicely for travel.'
    });

    await OrderItem.bulkCreate([
      {
        orderId: order2.id,
        menuItemId: createdMenuItems[12].id,
        itemName: 'Pan-Seared Wagyu Ribeye Sandwich',
        itemPrice: 28.00,
        quantity: 1,
        subtotal: 28.00
      },
      {
        orderId: order2.id,
        menuItemId: createdMenuItems[13].id,
        itemName: 'Saffron & Wild Mushroom Risotto',
        itemPrice: 24.00,
        quantity: 1,
        subtotal: 24.00
      }
    ]);

    console.log('✅ Database Seeded Successfully with 6 items per category & sample orders!');
    console.log('-----------------------------------');
    console.log('👑 Admin Login: admin@premiumcafe.com | Password: adminpassword123');
    console.log('👤 Customer Login: john@example.com | Password: customerpassword123');
    console.log('-----------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
