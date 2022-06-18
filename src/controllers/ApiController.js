const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class ApiController {
  static GetFavorites = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id, '-password');

      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };

  static ManageFavorites = async (req, res) => {
    const id = req.params.id;
    const { drinkId } = req.body;

    try {
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
      const update = await User.updateOne(
        { _id: id },
        { favorites: newFavorites },
      );
      const userUpdated = await User.findById(id, '-password');
      res.status(200).json({ user: userUpdated });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };
};
