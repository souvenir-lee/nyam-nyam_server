const express = require("express");
const router = express.Router();

const logController = require("../controller/log");

router.post("/login", logController.login.post);
router.post("/logout", logController.logout.post);

module.exports = router;
