const express = require('express');
const router = express.Router();

const searchController = require('../controller/search');

router.get('/search/:production', searchController.production.get);
router.get('/search/:ingredient', searchController.ingredient.get);
router.get('/search/:store', searchController.store.get);

module.exports = router;
