const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register User
router.post('/register', async (req, res) => {
  const { phoneNumber, name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ msg: 'User with this phone number already exists' });
    }

    user = new User({
      phoneNumber,
      username: name, // Using name as username for simplicity
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration Error:', err); // Log the full error object
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

// Login User (for general users)
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // 'identifier' can be phone, email, or username

  try {
    let user = await User.findOne({
      $or: [
        { phoneNumber: identifier },
        { email: identifier },
        { username: identifier },
      ],
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login Error:', err); // Log the full error object
    res.status(500).json({ msg: 'Server error during login' });
  }
});

// Admin Login (special endpoint)
router.post('/admin-login', async (req, res) => {
  const { password } = req.body;

  // Hardcoded admin password for simplicity (INSECURE FOR PRODUCTION)
  const ADMIN_PASSWORD = "Admin"; 

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ msg: 'Invalid Admin Password' });
  }

  try {
    // Find an existing admin user or create one if none exists
    let adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      // Create a default admin user if it doesn't exist
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('defaultadminpass', salt); // A default password for the created admin
      adminUser = new User({
        phoneNumber: '0000000000', // Dummy phone number for default admin
        username: 'AdminUser',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log('Default admin user created.');
    }

    const payload = {
      user: {
        id: adminUser.id,
        role: adminUser.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Admin Login Error:', err);
    res.status(500).json({ msg: 'Server error during admin login' });
  }
});

// @route   GET /api/auth
// @desc    Get logged in user data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Auth Get User Error:', err); // Log the full error object
    res.status(500).json({ msg: 'Server Error fetching user data' });
  }
});

module.exports = router;