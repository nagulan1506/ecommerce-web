const express = require('express');
const router = express.Router();
const dbHelper = require('../utils/dbHelper');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await dbHelper.getProducts();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await dbHelper.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
