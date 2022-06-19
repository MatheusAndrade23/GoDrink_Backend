const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');
const { CheckAuth } = require('../middlewares/CheckAuth');

router.get('/favorites/:id', CheckAuth, ApiController.GetFavorites);
router.patch('/favorites/:id', CheckAuth, ApiController.ManageFavorites);

module.exports = router;
