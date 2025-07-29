const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files for the main client (frontend website)
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Serve static files for the admin dashboard
app.use('/admin', express.static(path.join(__dirname, '..', 'admin-dashboard', 'dist')));

// Import routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('*', (req, res) => {
  if (req.path.startsWith('/admin')) {
    res.sendFile(path.resolve(__dirname, '..', 'admin-dashboard', 'dist', 'index.html'));
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});