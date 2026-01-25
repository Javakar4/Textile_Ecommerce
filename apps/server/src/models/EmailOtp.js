import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        email: { type: String, index: true },
        otpHash: { type: String },
        ip: { type: String },
        expiresAt: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.model("EmailOtp", emailOtpSchema);
