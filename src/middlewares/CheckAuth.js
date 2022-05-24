const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.checkAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Please log in before!', error: true });
  } else {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        res.status(500).json({
          message: 'Internal Server Error!',
          error: true,
        });
      } else if (user) {
        if (req.body.password === user.password) {
          next();
        } else {
          res.status(401).json({ message: 'Wrong Password!', error: true });
        }
      } else {
        res.status(406).json({
          message: 'User not Found! Please create an account before!',
          error: true,
        });
      }
    });
  }
};
