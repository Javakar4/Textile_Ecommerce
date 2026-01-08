const express=require("express");
const router=express.Router();
const authController = require("../controllers/authController");
// const {authenticateToken} = require("../middlewares/authenticator")

// router.use("")

router.post("/sendOtp",authController.signUserAndSendOTP);//200
router.post("/verifyOtpSignup",authController.verifyOTP); //200
router.post("/login", authController.login); //


module.exports=router;