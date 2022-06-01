const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class ApiController {
  static GetFavorites = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ message: 'User not Found', error: true });
    }

    res.status(200).json({ user, error: false });
  };

  static ManageFavorites = async (req, res) => {
    const id = req.params.id;
    const { drinkId } = req.body;

    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ message: 'User not Found', error: true });
    }

    let newFavorites = [];

    user.favorites.map((favorite) => {
      if (drinkId != favorite) {
        newFavorites.push(favorite);
      }
    });

    try {
      const userUpdated = await User.updateOne(
        { _id: id },
        { favorites: [...newFavorites] },
      );
      res.status(200).json({ userUpdated, error: false });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
        error: true,
      });
    }
  };
};
