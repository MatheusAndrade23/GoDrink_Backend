const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class ApiController {
  static GetFavorites = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    res.status(200).json({ user });
  };

  static ManageFavorites = async (req, res) => {
    const id = req.params.id;
    const { drinkId } = req.body;

    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    let newFavorites = [...user.favorites];

    if (newFavorites.includes(drinkId)) {
      const index = newFavorites.indexOf(drinkId);
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push(drinkId);
    }

    try {
      const update = await User.updateOne(
        { _id: id },
        { favorites: newFavorites },
      );
      const userUpdated = await User.findById(id, '-password');
      res.status(200).json({ user: userUpdated });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
      });
    }
  };
};
