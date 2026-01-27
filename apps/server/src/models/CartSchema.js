import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        productCode: {
          type: String, // PRD-2024-302
          required: true
        },

        name: {
          type: String,
          required: true
        },

        category: {
          type: String, // MC
          required: true
        },

        image: {
          type: String,
          required: true
        },

        pricing: {
          current: { type: Number, required: true },
          original: { type: Number, required: true },
          discount: { type: Number, required: true },
          savings: { type: Number, required: true }
        },

        size: {
          type: String,
          required: true
        },

        quantity: {
          type: Number,
          min: 1,
          default: 1
        },

        created_at: {
          type: Date,
          default: Date.now
        }
      }
    ],

    status: {
      type: String,
      enum: ["ACTIVE", "CHECKED_OUT"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

export default mongoose.model("Cart", cartSchema);
