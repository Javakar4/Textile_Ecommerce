const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        paymentGateway: String,
        transactionId: String,
        amount: Number,

        status: {
            type: String,
            enum: ["Success", "Failed", "Pending"]
        },

        paidAt: Date
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
