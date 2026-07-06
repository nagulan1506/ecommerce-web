const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const dbPath = path.join(__dirname, '../data/local_db.json');

const seedProducts = [
  // ── 1. Baby Toys ──────────────────────────────────────────────────────────
  { name: 'Heirloom Wooden Rocking Horse', description: 'A classic, handcrafted wooden rocking horse built to last for generations. Made from premium solid cherry wood.', price: 9999.00, category: 'Baby Toys', rating: 4.9, reviewsCount: 24, image: 'rocking-horse', specs: { ageRange: '1 - 4 Years', material: 'Cherry Wood & Wool', dimensions: '36" L x 12" W x 28" H' }, inStock: true },
  { name: 'Activity Wooden Walker', description: 'A stable wooden baby push walker with interactive gears, counting blocks, and maze trackers. Helps build early walking confidence.', price: 3499.00, category: 'Baby Toys', rating: 4.8, reviewsCount: 42, image: 'baby-walker', specs: { ageRange: '9 Months - 2 Years', material: 'Maple Wood & Felt Wheels', dimensions: '14" L x 13" W x 18" H' }, inStock: true },
  { name: 'Rainbow Stacking Rings', description: 'A classic set of 7 brightly coloured stacking rings in graduated sizes. Encourages hand-eye coordination and colour recognition.', price: 899.00, category: 'Baby Toys', rating: 4.7, reviewsCount: 63, image: 'baby-rattle', specs: { ageRange: '6 Months - 2 Years', material: 'Non-toxic Beech Wood', dimensions: '4" Base Diameter' }, inStock: true },
  { name: 'Musical Cot Mobile', description: 'A gentle pastel-coloured crib mobile with soft plush animals and a winding music box that plays lullabies to soothe babies to sleep.', price: 2199.00, category: 'Baby Toys', rating: 4.9, reviewsCount: 38, image: 'baby-mobile', specs: { ageRange: '0 - 12 Months', material: 'ABS Plastic & Organic Cotton', dimensions: '13" Diameter' }, inStock: true },

  // ── 2. Cars ───────────────────────────────────────────────────────────────
  { name: 'Handcrafted Wooden Race Car', description: 'A sleek, aerodynamically styled wooden racing car featuring rotating tires and a smooth natural finish.', price: 1899.00, category: 'Cars', rating: 4.7, reviewsCount: 15, image: 'race-car', specs: { ageRange: '2 Years +', material: 'Beech Wood & Walnut', dimensions: '7.5" L x 3.2" W x 2.8" H' }, inStock: true },
  { name: 'Retro Roadster Wooden Toy', description: 'A beautiful retro sports roadster toy inspired by classic 1950s convertible designs. Features rich grain patterns and a brass grill.', price: 2499.00, category: 'Cars', rating: 4.9, reviewsCount: 21, image: 'retro-roadster', specs: { ageRange: '3 Years +', material: 'Walnut Wood & Brass details', dimensions: '8.5" L x 3.5" W x 3" H' }, inStock: true },
  { name: 'Mighty Monster Truck', description: 'A chunky, oversized wooden monster truck with big rubber wheels and bold painted flames. Perfect for rough-and-tumble play.', price: 1599.00, category: 'Cars', rating: 4.6, reviewsCount: 29, image: 'monster-truck', specs: { ageRange: '2 Years +', material: 'Pine Wood & Rubber', dimensions: '9" L x 5" W x 5" H' }, inStock: true },
  { name: 'Vintage Fire Truck', description: 'A classic red fire engine toy complete with a pull-out wooden ladder, rotating wheels, and hand-painted details.', price: 2199.00, category: 'Cars', rating: 4.8, reviewsCount: 17, image: 'fire-truck', specs: { ageRange: '2 Years +', material: 'Solid Maple & Non-toxic Paint', dimensions: '10" L x 3.5" W x 4" H' }, inStock: true },

  // ── 3. Bikes ──────────────────────────────────────────────────────────────
  { name: 'Miniature Wooden Balance Bike', description: 'A beautiful tabletop ornamental miniature of a classic balance bike. A perfect decorative keepsake for playrooms.', price: 4999.00, category: 'Bikes', rating: 4.8, reviewsCount: 19, image: 'balance-bike', specs: { ageRange: 'Decorative / Collectors', material: 'Birch Plywood & Leatherette', dimensions: '12" L x 4" W x 8" H' }, inStock: true },
  { name: 'Retro Wooden Tricycle Model', description: 'An intricately detailed wooden tricycle model complete with rotating handlebars, miniature pedals, and a small back basket.', price: 5499.00, category: 'Bikes', rating: 4.6, reviewsCount: 11, image: 'tricycle', specs: { ageRange: 'Decorative / Collectors', material: 'Ash Wood & Steel Spokes', dimensions: '10" L x 6" W x 7.5" H' }, inStock: true },
  { name: 'Push & Glide Mini Scooter', description: 'A sturdy 3-wheeled wooden scooter for toddlers. Lean-to-steer mechanism builds balance and coordination with every ride.', price: 3299.00, category: 'Bikes', rating: 4.7, reviewsCount: 22, image: 'scooter-toy', specs: { ageRange: '2 - 5 Years', material: 'Bamboo & HDPE Deck', dimensions: '20" L x 9" W x 26" H' }, inStock: true },
  { name: 'Wooden Bicycle Decor Toy', description: 'A finely painted decorative wooden bicycle perfect for shelves or imaginative play. Available in pastel blue and pink.', price: 1799.00, category: 'Bikes', rating: 4.5, reviewsCount: 8, image: 'mini-bicycle', specs: { ageRange: '3 Years +', material: 'Pine Wood & Water Paint', dimensions: '8" L x 2.5" W x 6" H' }, inStock: true },

  // ── 4. Soft Toys ──────────────────────────────────────────────────────────
  { name: 'Forest Friends Plush Bear', description: 'An ultra-soft, organic cotton plush bear stuffed with recycled hypoallergenic materials. Features hand-stitched detailing and a vintage corduroy vest.', price: 2499.00, category: 'Soft Toys', rating: 4.7, reviewsCount: 19, image: 'plush-bear', specs: { ageRange: 'All Ages', material: 'Organic Cotton & Corduroy', dimensions: '14" Tall' }, inStock: true },
  { name: 'Cozy Cotton Bunny', description: 'A gentle and floppy plush rabbit made of premium organic gauze fabric. Designed to be a calming companion for newborns and toddlers.', price: 1999.00, category: 'Soft Toys', rating: 4.9, reviewsCount: 42, image: 'plush-bunny', specs: { ageRange: 'All Ages', material: 'Organic Cotton Gauze', dimensions: '16" Ear to Toe' }, inStock: true },
  { name: 'Ellie the Velvet Elephant', description: 'A velvety soft stuffed elephant with embroidered eyes and a satin ribbon bow. Machine washable and baby-safe certified.', price: 1699.00, category: 'Soft Toys', rating: 4.8, reviewsCount: 31, image: 'plush-elephant', specs: { ageRange: 'All Ages', material: 'Premium Velvet & PP Filling', dimensions: '12" Tall' }, inStock: true },
  { name: 'Finley the Plush Fox', description: 'A charming, russet-coloured stuffed fox with a fluffy white-tipped tail. Great for woodland-themed nurseries.', price: 2199.00, category: 'Soft Toys', rating: 4.6, reviewsCount: 14, image: 'plush-fox', specs: { ageRange: 'All Ages', material: 'Faux Fur & Polyester Fill', dimensions: '13" Tall' }, inStock: true },

  // ── 5. Brain Game Toys ────────────────────────────────────────────────────
  { name: 'Mind-Bender 3D Wooden Puzzle', description: 'An intricate, laser-cut 3D wooden clock puzzle. Assemble it without glue to create a working pendulum clock that keeps real time.', price: 3499.00, category: 'Brain Game Toys', rating: 4.5, reviewsCount: 15, image: '3d-puzzle', specs: { ageRange: '12 Years +', material: 'Laser-cut Plywood', dimensions: '8.5" x 6.2" x 14.5"' }, inStock: true },
  { name: 'Geometric Wooden Tangram Puzzle', description: 'A premium magnetic wooden board with 50 colored geometric blocks to create various shapes. Helps develop spatial awareness.', price: 1499.00, category: 'Brain Game Toys', rating: 4.9, reviewsCount: 84, image: 'tangram-puzzle', specs: { ageRange: '4 Years +', material: 'Eco-friendly Beech Wood', dimensions: '10" x 10" Board' }, inStock: true },
  { name: 'Wooden Sudoku Number Blocks', description: 'A smooth laser-engraved wooden Sudoku board with 81 numbered tiles. An offline brain-training activity for older kids and adults.', price: 1299.00, category: 'Brain Game Toys', rating: 4.6, reviewsCount: 22, image: 'sudoku-blocks', specs: { ageRange: '8 Years +', material: 'Beech Wood', dimensions: '9" x 9" Board' }, inStock: true },
  { name: 'Classic Wooden Abacus', description: 'A beautifully crafted 10-row abacus with multicoloured beads. Teaches counting, addition and subtraction in a hands-on way.', price: 999.00, category: 'Brain Game Toys', rating: 4.8, reviewsCount: 56, image: 'abacus-toy', specs: { ageRange: '3 Years +', material: 'Bamboo Frame & Wood Beads', dimensions: '9" x 7"' }, inStock: true },

  // ── 6. Cards ──────────────────────────────────────────────────────────────
  { name: 'Wildlife Trivia Card Deck', description: 'A premium gold-foiled card game featuring 100 beautifully illustrated trivia questions about animals and ecosystems.', price: 799.00, category: 'Cards', rating: 4.8, reviewsCount: 33, image: 'trivia-cards', specs: { ageRange: '6 Years +', material: 'Recycled Premium Cardstock', dimensions: '3.5" x 2.5" Box' }, inStock: true },
  { name: 'Memory Match Educational Cards', description: 'A set of 48 thick cardboard pairs featuring vintage watercolor illustrations of nature. Develops cognitive recall and memory skills.', price: 899.00, category: 'Cards', rating: 4.9, reviewsCount: 56, image: 'memory-cards', specs: { ageRange: '3 Years +', material: 'Ultra-thick linen cardboard', dimensions: '3" x 3" cards' }, inStock: true },
  { name: 'ABC Alphabet Flash Cards', description: 'A set of 26 sturdy, beautifully illustrated flash cards covering every letter of the alphabet with accompanying words and pictures.', price: 599.00, category: 'Cards', rating: 4.7, reviewsCount: 47, image: 'alphabet-cards', specs: { ageRange: '2 Years +', material: 'Laminated Cardstock', dimensions: '4" x 3" cards' }, inStock: true },
  { name: 'Animal Kingdom Snap Cards', description: 'A 52-card illustrated snap-and-match game featuring exotic animals from around the world. Encourages fast thinking and observation.', price: 699.00, category: 'Cards', rating: 4.6, reviewsCount: 29, image: 'animal-cards', specs: { ageRange: '4 Years +', material: 'Gloss Coated Cardstock', dimensions: '3.5" x 2.5" cards' }, inStock: true },

  // ── 7. Fancy Purses ───────────────────────────────────────────────────────
  { name: 'Miniature Embroidered Velvet Purse', description: 'A premium luxury kid-sized handbag made of soft plush velvet with vintage hand-embroidered flower patterns and a gold chain strap.', price: 1899.00, category: 'Fancy Purses', rating: 4.9, reviewsCount: 27, image: 'velvet-purse', specs: { ageRange: '4 Years +', material: 'Velvet, Cotton embroidery, Brass chain', dimensions: '6" W x 5" H x 2" D' }, inStock: true },
  { name: 'Handwoven Rattan Doll Purse', description: 'An adorable structured round handbag woven from natural rattan fibers, featuring a leather latch cover and a cotton lining.', price: 2299.00, category: 'Fancy Purses', rating: 4.8, reviewsCount: 39, image: 'rattan-purse', specs: { ageRange: '3 Years +', material: 'Natural Rattan, Organic Leather, Cotton', dimensions: '5.5" Diameter x 2.5" D' }, inStock: true },
  { name: 'Glitter Star Mini Handbag', description: 'A sparkling holographic glitter handbag shaped like a star with a faux-leather flap and gold chain strap. Every little princess will love it!', price: 1499.00, category: 'Fancy Purses', rating: 4.7, reviewsCount: 44, image: 'glitter-purse', specs: { ageRange: '4 Years +', material: 'PU Leather & Glitter Fabric', dimensions: '5.5" W x 5" H' }, inStock: true },
  { name: 'Butterfly Sequin Crossbody Bag', description: 'A fun and sparkly butterfly-shaped sequin crossbody bag with an adjustable strap. Changes colour when you swipe the sequins!', price: 1699.00, category: 'Fancy Purses', rating: 4.8, reviewsCount: 31, image: 'butterfly-bag', specs: { ageRange: '5 Years +', material: 'Two-way Sequins & Satin', dimensions: '7" W x 5.5" H' }, inStock: true },

  // ── 8. Key Chains ─────────────────────────────────────────────────────────
  { name: 'Unicorn Glitter Keychain', description: 'A sparkling resin unicorn keychain with glitter fill and a pastel rainbow tail. Comes in a cute gift box.', price: 199.00, category: 'Key Chains', rating: 4.8, reviewsCount: 68, image: 'keychain-unicorn', specs: { ageRange: '5 Years +', material: 'Resin, Glitter, Alloy ring', dimensions: '2.5" H x 1.5" W' }, inStock: true },
  { name: 'Wooden Animal Keychain Set', description: 'A set of 5 hand-painted miniature wooden animal keychains (lion, elephant, giraffe, fox, panda). Eco-friendly and non-toxic.', price: 349.00, category: 'Key Chains', rating: 4.7, reviewsCount: 44, image: 'keychain-animals', specs: { ageRange: '4 Years +', material: 'Birch Wood, Non-toxic paint, Steel ring', dimensions: '1.5" each figure' }, inStock: true },
  { name: 'Lucky Star Enamel Keychain', description: 'A polished metal enamel star keychain with a pearl inlay and gold plating. A collectible charm for bags, keys, or backpack zippers.', price: 249.00, category: 'Key Chains', rating: 4.6, reviewsCount: 52, image: 'keychain-star', specs: { ageRange: '5 Years +', material: 'Zinc Alloy & Enamel', dimensions: '1.8" Diameter' }, inStock: true },
  { name: 'Rainbow Pom Pom Keychain', description: 'A fluffy and vibrant rainbow-coloured pom pom keychain made from 100% faux fur. Soft to touch and fun to collect.', price: 179.00, category: 'Key Chains', rating: 4.9, reviewsCount: 73, image: 'keychain-rainbow', specs: { ageRange: 'All Ages', material: 'Faux Fur & Metal Ring', dimensions: '3" Diameter' }, inStock: true },
];

function initLocalDb() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
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
      const uri = process.env.MONGODB_URI || process.env.MONGO_URI || null;
      if (!uri) {
        console.warn('No MONGODB_URI provided. Falling back to local JSON DB.');
        this.isLocal = true;
        initLocalDb();
        return;
      }
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000
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
