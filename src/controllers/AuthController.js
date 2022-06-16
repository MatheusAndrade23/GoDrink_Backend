const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const User = require('../models/user');

module.exports = class LoginApiController {
  static Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'User not Found!',
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({
          message: 'Wrong Password!',
        });
      }

      try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            id: user._id,
          },
          secret,
          // {
          //   expiresIn: '18000s',
          // },
        );

        const userFiltered = await User.findOne({ email }, '-password');
        res
          .status(200)
          .json({ message: 'Logged with Success', token, user: userFiltered });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Internal Server Error! Try again later!',
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };

  static Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
      });
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(422).json({
          message: 'This Email is Already in Use!',
        });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        email: email,
        password: passwordHash,
        favorites: [],
      };

      User.create(newUser);

      res.status(201).json({
        message: 'User Created with Success!',
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
      });
    }
  };

  static ForgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 5);

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      mailer.sendMail(
        {
          to: email,
          from: 'account_management@godrink.com',
          template: 'mail/forgot_password',
          context: { token },
        },
        (err) => {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Something went wrong, try again later!' });
          }

          res.status(200).json({ message: 'Email sent!' });
        },
      );
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };

  static ResetPassword = async (req, res) => {
    const token = req.params.token;
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
      });
    }

    try {
      const user = await User.findOne({ email }).select(
        '+passwordResetToken passwordExpires',
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).json({ message: 'Invalid Token' });
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res.status(400).json({ message: 'Token Expired' });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate({ email }, { password: passwordHash });

      res.status(200).json({ message: 'New password generated!' });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };
};
