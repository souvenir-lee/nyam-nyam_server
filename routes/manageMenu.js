const express = require('express');
const router = express.Router();

const manageMenuController = require('../controller/manageMenu');

router.get('/mymenu', manageMenuController.myMenu.get);
router.post('/editmenu', manageMenuController.editMenu.post);
router.get('/editmenu', manageMenuController.editMenu.get);
router.post('/addmenu', manageMenuController.addMenu.post);
router.post('/deletemenu', manageMenuController.deleteMenu.post);
router.get('/detail', manageMenuController.detail.get);

module.exports = router;
