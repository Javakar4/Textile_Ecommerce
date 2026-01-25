import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email:           { type: String, required: true, unique: true, index: true },
    username:        { type: String, required: true, unique: true },
    passwordHash:    { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    role:            { type: String, default: "user" },
    status:          { type: String, default: "active" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
