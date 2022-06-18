const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/signin', AuthController.Login);
router.post('/signup', AuthController.Register);

module.exports = router;
