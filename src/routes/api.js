const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');

const CheckAuth = require('../middlewares/CheckAuth').checkAuth;

router.get('/favorites', CheckAuth, ApiController.GetFavorites);
router.post('/favorites', CheckAuth, ApiController.PushFavorite);

module.exports = router;
