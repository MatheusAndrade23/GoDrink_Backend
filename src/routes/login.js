const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.post('/signin', LoginController.Login);
router.post('/signup', LoginController.Register);
router.post('/forgot_password', LoginController.ForgotPassword);
router.post('/resetPassword', LoginController.ResetPassword);

module.exports = router;
