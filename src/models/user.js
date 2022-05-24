const mongoose = require('mongoose');

const User = mongoose.model('users', {
  _id: String,
  email: String,
  password: String,
  favorites: Array,
});

module.exports = User;
