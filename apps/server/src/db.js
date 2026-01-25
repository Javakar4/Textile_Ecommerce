import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://textile:textile1234@cluster0.mjdvu2r.mongodb.net/?appName=Cluster0");

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    }
};

export default connectDB;
