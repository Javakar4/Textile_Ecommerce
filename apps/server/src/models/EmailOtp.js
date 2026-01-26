import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: { 
        type: String, 
        required: true, 
        index: true 
    },

    otpHash: { 
        type: String,
        required: true 
    },

    ip: { 
        type: String 
    },
    expiresAt: { 
        type: Date, 
        required: true, 
        index: {
            expires: 0 
        }
    },
  },
  { timestamps: true },
);

export default mongoose.model("EmailOtp", emailOtpSchema);
