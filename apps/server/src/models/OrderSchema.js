import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        productId: {
          type: String
        },

        productCode: String,
        name: String,
        category: String,

        pricing: {
          current: Number,
          original: Number,
          discount: Number
        },

        quantity: Number,
        size: String,
        image: String
      }
    ],

    total: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "NET_BANKING", "Online"]
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Initiated", "Confirmed", "Failed", "Refunded", "Refund_Failed"],
      default: "Pending"
    },

    trackingStatus: {
      type: String,
      enum: ["Ordered", "Packed", "Shipped", "Delivered"],
      default: "Ordered"
    },

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
