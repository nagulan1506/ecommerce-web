const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbHelper = require('./utils/dbHelper');

// Load environment variables
dotenv.config();

const app = express();

// CORS - Allow Netlify frontend and localhost for dev
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  /\.netlify\.app$/
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    return callback(new Error('CORS policy violation: ' + origin));
  },
  credentials: true
}));

app.use(express.json());

// Root health check
app.get('/', (req, res) => {
  res.json({ message: 'Bommai Kadai API is running!', status: 'OK' });
});

// Connect Database (and seed products if empty)
dbHelper.connect();

// Define Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: dbHelper.isLocal ? 'Local JSON File' : 'MongoDB',
    timestamp: new Date()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  res.status(500).json({ msg: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Bommai Kadai server started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${dbHelper.isLocal ? 'LOCAL_JSON (fallback)' : 'MongoDB'}`);
});
