const addressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: String,
        phone: String,
        address: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
        country: { type: String, default: "India" },
        isDefault: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
