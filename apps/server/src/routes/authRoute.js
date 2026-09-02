import express from "express";
import authController from "../controllers/authController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authenticator.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Admin user management routes
router.get("/admin/users", authenticateToken, requireAdmin, authController.getAllUsers);
router.get("/admin/users/:userId", authenticateToken, requireAdmin, authController.getUserDetails);
router.patch("/admin/users/:userId/status", authenticateToken, requireAdmin, authController.updateUserStatus);
router.patch("/admin/users/:userId/role", authenticateToken, requireAdmin, authController.updateUserRole);

// Google OAuth Routes
import passport from "passport";
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  authController.googleCallback
);

export default router;
