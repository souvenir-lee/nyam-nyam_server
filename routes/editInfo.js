const express = require("express");
const router = express.Router();

const editInfoController = require("../controller/editInfo");

router.post("/userinfo/name", editInfoController.name.post);
router.post("/userinfo/password", editInfoController.password.post);
router.post("/userinfo/image", editInfoController.image.post);
router.post("/userinfo/quit", editInfoController.quit.post);

module.exports = router;
