const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbHelper = require('./utils/dbHelper');

// Load environment variables
dotenv.config();

const app = express();

// Initialize Middlewares
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Fallback database status: ${dbHelper.isLocal ? 'LOCAL_JSON' : 'PENDING/MONGO'}`);
});
