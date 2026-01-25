import express from "express";
import profileController from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

router.use(authenticateToken); // Protect all profile routes

router.get("/", profileController.getUserProfile);
router.put("/", profileController.updateUserProfile);
router.post("/address", profileController.addAddress);
router.delete("/address/:id", profileController.removeAddress);
router.put("/address/:id/default", profileController.setDefaultAddress);

export default router;
