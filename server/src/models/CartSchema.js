const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: String,
                sku: String,
                size: String,
                color: String,
                material: String,
                price: Number,
                quantity: Number,
                image: String
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
