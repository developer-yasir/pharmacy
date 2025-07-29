const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false, // Now optional
    unique: false, // No longer strictly unique if not provided
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false, // Now optional
    unique: false, // No longer strictly unique if not provided
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', UserSchema);