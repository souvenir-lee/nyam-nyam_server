const express = require('express');
const router = express.Router();

const signupController = require('../controller/signup');

router.post('/signup', signupController.signup.post);
router.post('/emailconfirm', signupController.emailConfirm.post);

module.exports = router;
