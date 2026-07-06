const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const dbPath = path.join(__dirname, '../data/local_db.json');

const seedProducts = [
  // 1. Baby Toys
  {
    name: 'Heirloom Wooden Rocking Horse',
    description: 'A classic, handcrafted wooden rocking horse built to last for generations. Made from premium solid cherry wood and finished with organic non-toxic beeswax.',
    price: 9999.00,
    category: 'Baby Toys',
    rating: 4.9,
    reviewsCount: 24,
    image: 'rocking-horse',
    specs: {
      ageRange: '1 - 4 Years',
      material: 'Cherry Wood & Wool',
      dimensions: '36" L x 12" W x 28" H'
    },
    inStock: true
  },
  {
    name: 'Activity Wooden Walker',
    description: 'A stable wooden baby push walker with interactive gears, counting blocks, and maze trackers. Helps build early walking confidence.',
    price: 3499.00,
    category: 'Baby Toys',
    rating: 4.8,
    reviewsCount: 42,
    image: 'baby-walker',
    specs: {
      ageRange: '9 Months - 2 Years',
      material: 'Maple Wood & Felt Wheels',
      dimensions: '14" L x 13" W x 18" H'
    },
    inStock: true
  },
  // 2. Cars
  {
    name: 'Handcrafted Wooden Race Car',
    description: 'A sleek, aerodynamically styled wooden racing car featuring rotating tires, contrast detailing, and a smooth natural finish.',
    price: 1899.00,
    category: 'Cars',
    rating: 4.7,
    reviewsCount: 15,
    image: 'race-car',
    specs: {
      ageRange: '2 Years +',
      material: 'Beech Wood & Walnut',
      dimensions: '7.5" L x 3.2" W x 2.8" H'
    },
    inStock: true
  },
  {
    name: 'Retro Roadster Wooden Toy',
    description: 'A beautiful retro sports roadster toy inspired by classic 1950s convertible designs. Features rich grain patterns and a brass grill.',
    price: 2499.00,
    category: 'Cars',
    rating: 4.9,
    reviewsCount: 21,
    image: 'retro-roadster',
    specs: {
      ageRange: '3 Years +',
      material: 'Walnut Wood & Brass details',
      dimensions: '8.5" L x 3.5" W x 3" H'
    },
    inStock: true
  },
  // 3. Bikes
  {
    name: 'Miniature Wooden Balance Bike',
    description: 'A beautiful tabletop ornamental miniature of a classic child\'s balance bike. A perfect decorative keepsake for playrooms.',
    price: 4999.00,
    category: 'Bikes',
    rating: 4.8,
    reviewsCount: 19,
    image: 'balance-bike',
    specs: {
      ageRange: 'Decorative / Collectors',
      material: 'Birch Plywood & Leatherette',
      dimensions: '12" L x 4" W x 8" H'
    },
    inStock: true
  },
  {
    name: 'Retro Wooden Tricycle Model',
    description: 'An intricately detailed wooden tricycle model complete with rotating handlebars, miniature pedals, and a small back basket.',
    price: 5499.00,
    category: 'Bikes',
    rating: 4.6,
    reviewsCount: 11,
    image: 'tricycle',
    specs: {
      ageRange: 'Decorative / Collectors',
      material: 'Ash Wood & Steel Spokes',
      dimensions: '10" L x 6" W x 7.5" H'
    },
    inStock: true
  },
  // 4. Soft Toys
  {
    name: 'Forest Friends Plush Bear',
    description: 'An ultra-soft, organic cotton plush bear stuffed with recycled hypoallergenic materials. Features hand-stitched detailing and a vintage corduroy vest.',
    price: 2499.00,
    category: 'Soft Toys',
    rating: 4.7,
    reviewsCount: 19,
    image: 'plush-bear',
    specs: {
      ageRange: 'All Ages',
      material: 'Organic Cotton & Corduroy',
      dimensions: '14" Tall'
    },
    inStock: true
  },
  {
    name: 'Cozy Cotton Bunny',
    description: 'A gentle and floppy plush rabbit made of premium organic gauze fabric. Designed to be a calming companion for newborns and toddlers.',
    price: 1999.00,
    category: 'Soft Toys',
    rating: 4.9,
    reviewsCount: 42,
    image: 'plush-bunny',
    specs: {
      ageRange: 'All Ages',
      material: 'Organic Cotton Gauze',
      dimensions: '16" Ear to Toe'
    },
    inStock: true
  },
  // 5. Brain Game Toys
  {
    name: 'Mind-Bender 3D Wooden Puzzle',
    description: 'An intricate, laser-cut 3D wooden clock puzzle. Assemble it without glue to create a working pendulum clock that keeps real time.',
    price: 3499.00,
    category: 'Brain Game Toys',
    rating: 4.5,
    reviewsCount: 15,
    image: '3d-puzzle',
    specs: {
      ageRange: '12 Years +',
      material: 'Laser-cut Plywood',
      dimensions: '8.5" x 6.2" x 14.5"'
    },
    inStock: true
  },
  {
    name: 'Geometric Wooden Tangram Puzzle',
    description: 'A premium magnetic wooden board with 50 colored geometric blocks to create various shapes. Helps develop spatial awareness and creative thinking.',
    price: 1499.00,
    category: 'Brain Game Toys',
    rating: 4.9,
    reviewsCount: 84,
    image: 'tangram-puzzle',
    specs: {
      ageRange: '4 Years +',
      material: 'Eco-friendly Beech Wood',
      dimensions: '10" x 10" Board'
    },
    inStock: true
  },
  // 6. Cards
  {
    name: 'Wildlife Trivia Card Deck',
    description: 'A premium gold-foiled card game featuring 100 beautifully illustrated trivia questions about animals and ecosystems. Fun and educational.',
    price: 799.00,
    category: 'Cards',
    rating: 4.8,
    reviewsCount: 33,
    image: 'trivia-cards',
    specs: {
      ageRange: '6 Years +',
      material: 'Recycled Premium Cardstock',
      dimensions: '3.5" x 2.5" Box'
    },
    inStock: true
  },
  {
    name: 'Memory Match Educational Cards',
    description: 'A set of 48 thick cardboard pairs featuring vintage watercolor illustrations of nature. Develops cognitive recall and memory skills.',
    price: 899.00,
    category: 'Cards',
    rating: 4.9,
    reviewsCount: 56,
    image: 'memory-cards',
    specs: {
      ageRange: '3 Years +',
      material: 'Ultra-thick linen cardboard',
      dimensions: '3" x 3" cards'
    },
    inStock: true
  },
  // 7. Fancy Purses
  {
    name: 'Miniature Embroidered Velvet Purse',
    description: 'A premium luxury kid-sized handbag made of soft plush velvet with vintage hand-embroidered flower patterns and a gold chain strap.',
    price: 1899.00,
    category: 'Fancy Purses',
    rating: 4.9,
    reviewsCount: 27,
    image: 'velvet-purse',
    specs: {
      ageRange: '4 Years +',
      material: 'Velvet, Cotton embroidery, Brass chain',
      dimensions: '6" W x 5" H x 2" D'
    },
    inStock: true
  },
  {
    name: 'Handwoven Rattan Doll Purse',
    description: 'An adorable structured round handbag woven from natural rattan fibers, featuring a leather latch cover and a cotton lining.',
    price: 2299.00,
    category: 'Fancy Purses',
    rating: 4.8,
    reviewsCount: 39,
    image: 'rattan-purse',
    specs: {
      ageRange: '3 Years +',
      material: 'Natural Rattan, Organic Leather, Cotton',
      dimensions: '5.5" Diameter x 2.5" D'
    },
    inStock: true
  },
  // 8. Key Chains
  {
    name: 'Unicorn Glitter Keychain',
    description: 'A sparkling resin unicorn keychain with glitter fill and a pastel rainbow tail. Comes in a cute gift box — perfect as a birthday gift or collectible.',
    price: 199.00,
    category: 'Key Chains',
    rating: 4.8,
    reviewsCount: 68,
    image: 'keychain-unicorn',
    specs: {
      ageRange: '5 Years +',
      material: 'Resin, Glitter, Alloy ring',
      dimensions: '2.5" H x 1.5" W'
    },
    inStock: true
  },
  {
    name: 'Wooden Animal Keychain Set',
    description: 'A set of 5 hand-painted miniature wooden animal keychains (lion, elephant, giraffe, fox, panda). Eco-friendly and coated with non-toxic paint.',
    price: 349.00,
    category: 'Key Chains',
    rating: 4.7,
    reviewsCount: 44,
    image: 'keychain-animals',
    specs: {
      ageRange: '4 Years +',
      material: 'Birch Wood, Non-toxic paint, Steel ring',
      dimensions: '1.5" each figure'
    },
    inStock: true
  }
];

function initLocalDb() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    // Generate id for seed products
    const seedWithIds = seedProducts.map((p, i) => ({
      _id: `prod_${100 + i}`,
      ...p,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], products: seedWithIds, orders: [] }, null, 2));
    console.log('Seeded local JSON database successfully.');
  }
}

function readLocalDb() {
  initLocalDb();
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function writeLocalDb(data) {
  initLocalDb();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const dbHelper = {
  isLocal: false,

  async connect() {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wonderland-toys';
      console.log(`Attempting to connect to MongoDB at: ${uri}...`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2000 // Timeout fast
      });
      console.log('MongoDB Connected Successfully!');
      this.isLocal = false;
      await this.seedMongoIfNeeded();
    } catch (err) {
      console.warn('--------------------------------------------------');
      console.warn('WARNING: MongoDB Connection Failed!');
      console.warn('Reason: ' + err.message);
      console.warn('Falling back to Local JSON database (local_db.json)');
      console.warn('--------------------------------------------------');
      this.isLocal = true;
      initLocalDb();
    }
  },

  async seedMongoIfNeeded() {
    try {
      const Product = require('../models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('MongoDB product catalog is empty. Seeding products...');
        await Product.insertMany(seedProducts);
        console.log('Successfully seeded products in MongoDB.');
      }
    } catch (error) {
      console.error('Error seeding MongoDB:', error);
    }
  },

  // Product Methods
  async getProducts() {
    if (!this.isLocal) {
      const Product = require('../models/Product');
      return await Product.find({});
    } else {
      const db = readLocalDb();
      return db.products;
    }
  },

  async getProductById(id) {
    if (!this.isLocal) {
      const Product = require('../models/Product');
      return await Product.findById(id);
    } else {
      const db = readLocalDb();
      return db.products.find(p => p._id === id);
    }
  },

  // User Methods
  async getUserByEmail(email) {
    if (!this.isLocal) {
      const User = require('../models/User');
      return await User.findOne({ email });
    } else {
      const db = readLocalDb();
      return db.users.find(u => u.email === email);
    }
  },

  async getUserById(id) {
    if (!this.isLocal) {
      const User = require('../models/User');
      return await User.findById(id);
    } else {
      const db = readLocalDb();
      return db.users.find(u => u._id === id);
    }
  },

  async createUser(userData) {
    if (!this.isLocal) {
      const User = require('../models/User');
      const user = new User(userData);
      return await user.save();
    } else {
      const db = readLocalDb();
      const newUser = {
        _id: 'user_' + Math.random().toString(36).substr(2, 9),
        ...userData,
        createdAt: new Date().toISOString()
      };
      db.users.push(newUser);
      writeLocalDb(db);
      return newUser;
    }
  },

  // Order Methods
  async createOrder(orderData) {
    if (!this.isLocal) {
      const Order = require('../models/Order');
      const order = new Order(orderData);
      return await order.save();
    } else {
      const db = readLocalDb();
      const newOrder = {
        _id: 'ord_' + Math.random().toString(36).substr(2, 9),
        ...orderData,
        isPaid: true,
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      db.orders.push(newOrder);
      writeLocalDb(db);
      return newOrder;
    }
  },

  async getOrdersByUser(userId) {
    if (!this.isLocal) {
      const Order = require('../models/Order');
      return await Order.find({ user: userId }).sort({ createdAt: -1 });
    } else {
      const db = readLocalDb();
      return db.orders
        .filter(o => o.user === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }
};

module.exports = dbHelper;
