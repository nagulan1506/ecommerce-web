const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dbHelper = require('../utils/dbHelper');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  const { items, shippingAddress, totalPrice } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ msg: 'No order items' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ msg: 'Shipping address is required' });
    }

    const orderData = {
      user: req.user.id,
      items,
      shippingAddress,
      totalPrice,
      isPaid: true,
      paidAt: new Date()
    };

    const createdOrder = await dbHelper.createOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error('Order placement error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders
// @desc    Get logged in user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await dbHelper.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (err) {
    console.error('Order fetch error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
