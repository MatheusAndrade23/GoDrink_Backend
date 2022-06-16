const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/signin', AuthController.Login);
router.post('/signup', AuthController.Register);
router.post('/forgot_password', AuthController.ForgotPassword);
router.post('/resetPassword/:token', AuthController.ResetPassword);

module.exports = router;
