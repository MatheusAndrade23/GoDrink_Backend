const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class ApiController {
  static GetFavorites = async (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        res.status(500).json({ user, error: true });
      } else if (user) {
        res.status(200).json({ user });
      }
    });
  };

  static PushFavorite = async (req, res) => {};
};
