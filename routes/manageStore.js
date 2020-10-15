const express = require("express");
const router = express.Router();

const manageStoreController = require("../controller/manageStore");

router.get("/mystore", manageStoreController.myStore.get);
router.post("/deletestroe", manageStoreController.deleteStore.post);
router.post("/addstore", manageStoreController.addStore.post);

module.exports = router;
