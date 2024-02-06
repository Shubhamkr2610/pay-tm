const express = require("express");
const {signUpController} = require( '../controllers/authController')
const router = express.Router();



router.post("/signup",signUpController);
module.exports = router;
