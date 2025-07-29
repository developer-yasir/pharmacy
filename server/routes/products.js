const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/products
// @desc    Get all products with optional filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
  const category = req.query.category ? { category: req.query.category } : {};

  try {
    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin only)
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  const { name, description, price, countInStock, imageUrl, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      category,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  const { name, description, price, countInStock, imageUrl, category } = req.body;

  // Build product object
  const productFields = {};
  if (name) productFields.name = name;
  if (description) productFields.description = description;
  if (price) productFields.price = price;
  if (countInStock) productFields.countInStock = countInStock;
  if (imageUrl) productFields.imageUrl = imageUrl;
  if (category) productFields.category = category;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
