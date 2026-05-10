import mongoose from "mongoose";
import { config } from "./config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
