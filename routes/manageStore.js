const express = require("express");
const router = express.Router();

const manageStoreController = require("../controller/manageStore");

router.get("/userinfo/mystore", manageStoreController.myStore.get);
router.post("/userinfo/deletestroe", manageStoreController.deleteStore.post);
router.post("/userinfo/addstore", manageStoreController.addStore.post);

module.exports = router;
