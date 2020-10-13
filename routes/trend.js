const express = require("express");
const router = express.Router();

const trendController = require("../controller/updateSales");

//trend
router.get("/trend/dessertType", trendController.trendDessertType.get);
router.get("/trend/dessertType/array", trendController.trendDessertTypeArray.get);
router.get("/trend/ingredient", trendController.trendIngredient.get);
router.get("/trend/ingredient/array", trendController.trendIngredientArray.get);

//signature
router.get("/signature/dessertType", trendController.signatureDessertType.get);
router.get("/signature/dessertType/array", trendController.signatureDessertTypeArray.get);
router.get("/signature/ingredient", trendController.signatureIngredient.get);
router.get("/signature/ingredient/array", trendController.signatureIngredientArray.get);
//인피니트 스크롤을 하게 되면 서버측에서는 그냥 다 보내주어도 괜찮은 것인가?

//상세페이지
router.get("/signature/info", trendController.signatureInfo.get);

module.exports = router;
