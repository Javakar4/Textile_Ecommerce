const orderSchema = new mongoose.Schema(
    {
        orderId: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: String,
                category: String,
                price: Number,
                quantity: Number,
                size: String,
                image: String
            }
        ],

        total: Number,

        paymentStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Failed"],
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
