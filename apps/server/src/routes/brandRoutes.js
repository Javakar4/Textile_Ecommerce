import express from "express";
import * as brandController from "../controllers/brandController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

// Public
router.get("/", brandController.getAllBrands);
router.get("/:id", brandController.getBrandById);

// Admin (protected)
router.post("/", authenticateToken, brandController.createBrand);
router.patch("/:id", authenticateToken, brandController.updateBrand);
router.delete("/:id", authenticateToken, brandController.deleteBrand);

export default router;
