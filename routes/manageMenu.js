const express = require('express');
const router = express.Router();

const manageMenuController = require('../controller/manageMenu');
const authMiddleware = require('../middleware/auth');

router.get('/mymenu', authMiddleware, manageMenuController.myMenu.get);
router.post('/editmenu', authMiddleware, manageMenuController.editMenu.post);
router.get('/editmenu', authMiddleware, manageMenuController.editMenu.get);
router.post('/addmenu', authMiddleware, manageMenuController.addMenu.post);
router.post('/deletemenu', authMiddleware, manageMenuController.deleteMenu.post);
router.get('/detail/:id', manageMenuController.detail.get);

module.exports = router;
