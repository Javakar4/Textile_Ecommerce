import express from "express";
import settingsController from "../controllers/settingsController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authenticator.js";

const router = express.Router();

// Apply admin authentication to all setting routes
router.use(authenticateToken);
router.use(requireAdmin);

// Settings Endpoints
router.put("/change-password", settingsController.changePassword);
router.get("/maintenance", settingsController.getSystemSettings);
router.post("/maintenance", settingsController.toggleMaintenanceMode);

export default router;
