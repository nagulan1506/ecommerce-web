const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  productId: { type: String, required: true }, // Local-friendly product reference
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Store userId as string for local-friendliness
  items: [OrderItemSchema],
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String, default: 'Credit Card' },
  paymentResult: {
    id: String,
    status: String,
    update_time: String
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: true },
  paidAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
