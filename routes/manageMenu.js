const express = require("express");
const router = express.Router();

const manageMenuController = require("../controller/manageMenu");

router.get("/userinfo/mymenu", manageMenuController.myMenu.get);
router.post("/userinfo/editmenu", manageMenuController.editMenu.post);
router.post("/userinfo/addmenu", manageMenuController.addMenu.post);

module.exports = router;
