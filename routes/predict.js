const express = require("express");
const router = express.Router();

const predictController = require("../controller/predict");

router.get("/:date", predictController.predict.get);

module.exports = router;
