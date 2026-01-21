const wishlistSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                addedAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
