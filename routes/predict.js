const express = require("express");
const router = express.Router();

const predictController = require("../controller/predict");

router.post("/:date", predictController.predict.post);

module.exports = router;
