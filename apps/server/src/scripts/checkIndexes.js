import mongoose from "mongoose";
import EmailOtp from "../models/EmailOtp.js";
import connectDB from "../db.js";

const checkIndexes = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const indexes = await EmailOtp.collection.listIndexes().toArray();
    console.log("Indexes:", JSON.stringify(indexes, null, 2));
  } catch (error) {
    console.error("Check FAILED:", error);
  } finally {
    await mongoose.disconnect();
  }
};

checkIndexes();
