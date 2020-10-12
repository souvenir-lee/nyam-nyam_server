const express = require("express");
const router = express.Router();

const predictController = require("../controller/predict");

router.get("/today", predictController.today.get);
router.get("/tommorrow", predictController.tommorrow.get);
router.get("/dayafter", predictController.dayAfter.get);

module.exports = router;
