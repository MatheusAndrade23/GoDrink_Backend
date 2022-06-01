const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class LoginApiController {
  static Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
        error: true,
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
        error: true,
      });
    }

    //-- Check if User exists --//
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: 'User not Found!',
        error: true,
      });
    }

    //-- Check if password match --//
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: 'Wrong Password',
        error: true,
      });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: '18000s',
        },
      );

      res
        .status(200)
        .json({ message: 'Logged with Success', error: false, token });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
        error: true,
      });
    }
  };

  static Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
        error: true,
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
        error: true,
      });
    }

    //-- Check if User exists --//
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({
        message: 'This Email is Already in Use!',
        error: true,
      });
    }

    //-- Create Password --//
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      email: email,
      password: passwordHash,
      favorites: [],
    };

    try {
      User.create(newUser);
      res.status(201).json({
        message: 'User Created with Success!',
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
        error: true,
      });
    }
  };
};
