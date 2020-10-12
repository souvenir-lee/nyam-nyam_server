const express = require("express");
const router = express.Router();

const signupController = require("../controller/signup");

router.post("/signup/user", signupController.user.post);
router.post("/signup/store", signupController.store.post);
router.post("/signup/emailconfirm", signupController.emailConfirm.post);

module.exports = router;
