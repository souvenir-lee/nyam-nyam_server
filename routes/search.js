const express = require('express');
const router = express.Router();

const searchController = require('../controller/search');

router.get("/:id", searchController.searchProduction.get);

//후순위
// router.get('/search/:ingredient', searchController.ingredient.get);
// router.get('/search/:store', searchController.store.get);

//&searchby=

module.exports = router;
