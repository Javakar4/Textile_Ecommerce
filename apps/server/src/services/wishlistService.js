import Wishlist from "../models/WishListSchema.js";

export const wishlistService = {
    async getWishlist(userId) {
        const wishlist = await Wishlist.findOne({ userId })
            .populate("products.productId");

        if (!wishlist) {
            return { ok: true, data: { products: [] } };
        }

        return { ok: true, data: wishlist };
    },

    async addToWishlist(userId, productId) {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                userId,
                products: [{ productId }]
            });
            return { ok: true };
        }

        const exists = wishlist.products.some(
            (p) => p.productId.toString() === productId
        );

        if (exists) {
            return { ok: false, message: "Product already in wishlist" };
        }

        wishlist.products.push({ productId });
        await wishlist.save();

        return { ok: true };
    },

    async removeFromWishlist(userId, productId) {
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return { ok: false, message: "Wishlist not found" };
        }

        wishlist.products = wishlist.products.filter(
            (p) => p.productId.toString() !== productId
        );

        await wishlist.save();
        return { ok: true };
    },

    async clearWishlist(userId) {
        await Wishlist.findOneAndUpdate(
            { userId },
            { products: [] },
            { new: true }
        );

        return { ok: true };
    }
};
