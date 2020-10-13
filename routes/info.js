const express = require('express');
const router = express.Router();

const userInfoController = require('../controller/userInfo');

router.get('/userinfo', userInfoController.userInfo.get);

module.exports = router;
