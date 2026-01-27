import express from "express";
import * as wishlistController from "../controllers/wishlistController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

// Wishlist routes (protected)
router.get("/", authenticateToken, wishlistController.getWishlist);
router.post("/add", authenticateToken, wishlistController.addToWishlist);
router.delete(
    "/remove/:productId",
    authenticateToken,
    wishlistController.removeFromWishlist
);
router.delete(
    "/clear",
    authenticateToken,
    wishlistController.clearWishlist
);

export default router;
