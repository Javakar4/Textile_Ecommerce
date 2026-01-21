import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true },
        sku: { type: String, required: true },

        name: { type: String, required: true },
        brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

        pricing: {
            current: Number,
            original: Number,
            discount: Number
        },

        rating: {
            score: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        },

        stock: {
            available: Boolean,
            quantity: Number
        },

        images: {
            main: String,
            thumbnails: [String]
        },

        sizes: [String],
        defaultSize: String,

        material: String,

        description: [String],

        features: [
            {
                icon: String,
                label: String
            }
        ],

        collections: [String],
        tags: [String]
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
