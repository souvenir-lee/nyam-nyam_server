const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const editInfoController = require("../controller/editInfo");
const authMiddleware =require('../middleware/auth')
// multer setting
const upload = multer({
    storage: multer.diskStorage({
      // set a localstorage destination
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      // convert a file name
      filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      },
    }),
  });

router.post("/name", editInfoController.name.post);
router.post("/password", editInfoController.password.post);
router.post("/image", upload.single('img'), editInfoController.image.post);
router.post("/quit", editInfoController.quit.post);

module.exports = router;
