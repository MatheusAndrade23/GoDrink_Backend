const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');
const { checkAuth } = require('../middlewares/CheckAuth');

router.get('/favorites/:id', checkAuth, ApiController.GetFavorites);
router.patch('/favorites/:id', checkAuth, ApiController.ManageFavorites);

module.exports = router;
