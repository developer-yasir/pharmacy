const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User'); // Import User model
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST /api/orders
// @desc    Create new order (can be guest or logged-in user)
// @access  Public (for guest), Private (for logged-in user)
router.post('/', async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, guestUsername } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ msg: 'No order items' });
    return;
  }

  try {
    let user = null;
    if (req.user && req.user.id) { // Check if user is logged in (from auth middleware)
      user = req.user.id;
    } else if (guestUsername) { // Handle guest user
      // Find or create a guest user based on username (or a unique identifier)
      // For simplicity, we'll create a dummy user if not found. In a real app,
      // you might want a more robust guest user management.
      let guestUser = await User.findOne({ username: guestUsername });
      if (!guestUser) {
        guestUser = new User({
          username: guestUsername,
          phoneNumber: `guest_${Date.now()}`, // Unique dummy phone number
          password: Date.now().toString(), // Dummy password
          role: 'user',
        });
        await guestUser.save();
      }
      user = guestUser._id;
    } else {
      return res.status(400).json({ msg: 'User or guest username is required' });
    }

    // Update product stock (simple example, more robust in real app)
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock -= item.qty;
        await product.save();
      }
    }

    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders/guest/:username
// @desc    Get guest user orders by username
// @access  Public
router.get('/guest/:username', async (req, res) => {
  try {
    const guestUser = await User.findOne({ username: req.params.username });
    if (!guestUser) {
      return res.status(404).json({ msg: 'Guest user not found' });
    }
    const orders = await Order.find({ user: guestUser._id }).populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders/guest/:username/:id
// @desc    Get single guest order by username and order ID
// @access  Public
router.get('/guest/:username/:id', async (req, res) => {
  try {
    const guestUser = await User.findOne({ username: req.params.username });
    if (!guestUser) {
      return res.status(404).json({ msg: 'Guest user not found' });
    }
    const order = await Order.findOne({ _id: req.params.id, user: guestUser._id }).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found for this user' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Ensure only order owner or admin can view
      if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ msg: 'Order not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', [auth, admin], async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', [auth, admin], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ msg: 'Order not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;