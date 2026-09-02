import Wishlist from "../models/WishListSchema.js";

export const wishlistService = {
    async getWishlist(userId, { page = 1, limit = 8 } = {}) {
        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist || wishlist.products.length === 0) {
            return {
                ok: true,
                data: {
                    products: [],
                    page: 1,
                    totalPages: 0,
                    totalItems: 0,
                },
            };
        }

        const totalItems = wishlist.products.length;
        const totalPages = Math.ceil(totalItems / limit);
        const safetyPage = Math.min(Math.max(1, page), totalPages);
        const startIndex = (safetyPage - 1) * limit;
        const endIndex = startIndex + limit;

        // Sort by addedAt descending (newest first) before slicing
        const sorted = [...wishlist.products].sort(
            (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
        const paginatedProductRefs = sorted.slice(startIndex, endIndex);

        // Populate only the paginated slice
        const populatedWishlist = await Wishlist.populate(
            { products: paginatedProductRefs },
            { path: "products.productId" }
        );

        return {
            ok: true,
            data: {
                products: populatedWishlist.products,
                page: safetyPage,
                totalPages,
                totalItems,
            },
        };
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
