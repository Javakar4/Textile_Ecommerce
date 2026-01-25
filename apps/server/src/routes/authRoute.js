import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/sendOtp", authController.signUserAndSendOTP);
router.post("/verifyOtpSignup", authController.verifyOTP);
router.post("/login", authController.login);

export default router;
