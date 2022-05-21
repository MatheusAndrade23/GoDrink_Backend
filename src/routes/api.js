const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');

router.get('/drink/favorites', ApiController.GetFavorites);
router.post('/drink/favorites', ApiController.PushFavorite);

module.exports = router;
