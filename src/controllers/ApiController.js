const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class ApiController {
  static GetFavorites = async (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        res.status(500).json({
          message: 'Internal Server Error!',
          error: true,
        });
      } else if (user) {
        res.status(200).json({ user });
      }
    });
  };

  static ManageFavorites = async (req, res) => {
    let newFavorites = [];

    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        res.status(500).json({
          message: 'Internal Server Error!',
          error: true,
        });
      } else if (user) {
        user.favorites.map((drinkId) => {
          if (drinkId != req.body.drinkId) {
            newFavorites.push(drinkId);
          }
        });
        if (newFavorites.length === user.favorites.length) {
          newFavorites.push(req.body.drinkId);
        }
        User.updateOne(
          { email: req.body.email },
          { favorites: [...newFavorites] },
          (error, resp) => {
            if (error) {
              res.status(500).json({
                message: 'Internal Server Error!',
                error: true,
              });
            } else if (resp) {
              User.findOne({ email: req.body.email }, (error, userUpdated) => {
                if (error) {
                  res.status(500).json({
                    message: 'Internal Server Error!',
                    error: true,
                  });
                } else if (userUpdated) {
                  res.status(200).json({ user: userUpdated });
                }
              });
            }
          },
        );
      }
    });
  };
};
