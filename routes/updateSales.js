const express = require("express");
const router = express.Router();

const updateSalesController = require("../controller/updateSales");

//판매내역을 가져오는 get요청은 userinfo/mymenu api를 이용한다
router.post("/sales", updateSalesController.updateSales.post);

module.exports = router;
