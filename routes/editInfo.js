const express = require("express");
const router = express.Router();

const editInfoController = require("../controller/editInfo");

router.post("/name", editInfoController.name.post);
router.post("/password", editInfoController.password.post);
router.post("/image", editInfoController.image.post);
router.post("/quit", editInfoController.quit.post);

module.exports = router;
