const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.post('/login/signin', LoginController.SignIn);
router.post('/login/signup', LoginController.SignUp);

module.exports = router;
