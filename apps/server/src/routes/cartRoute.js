import express from "express";
import * as cartController from "../controllers/cartController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

// Cart operations require logged-in user
router.get("/", authenticateToken, cartController.getCart);
router.post("/add", authenticateToken, cartController.addToCart);
router.post("/sync", authenticateToken, cartController.syncCart);
router.put("/item", authenticateToken, cartController.updateItem);
router.delete("/item", authenticateToken, cartController.removeItem);
router.delete("/", authenticateToken, cartController.clearCart);

export default router;
