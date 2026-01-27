import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

// Public
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// Admin / Protected
router.post("/", authenticateToken, categoryController.createCategory);
router.patch("/:id", authenticateToken, categoryController.updateCategory);
router.delete("/:id", authenticateToken, categoryController.deleteCategory);

export default router;
