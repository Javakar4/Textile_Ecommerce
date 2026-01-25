import mongoose from "mongoose";
import EmailOtp from "../models/EmailOtp.js";
import User from "../models/UserSchema.js";
import connectDB from "../db.js";

const verifyOtpSchema = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for OTP verification");

    // 1. Create a dummy user for the reference (since userId is required now)
    const dummyUser = await User.create({
      email: `otp_test_${Date.now()}@example.com`,
      username: `otp_test_${Date.now()}`,
      passwordHash: "dummyhash",
      fullName: "OTP Test User",
      phone: "0000000000",
    });

    console.log("Dummy user created:", dummyUser._id);

    // 2. Drop existing index if it exists (to ensure we test the NEW definition)
    try {
      await EmailOtp.collection.dropIndex("expiresAt_1");
      console.log("Old expiresAt_1 index dropped.");
    } catch (e) {
      console.log("Index might not exist, continuing...");
    }

    // Force recreation of indexes based on current schema
    await EmailOtp.syncIndexes();
    console.log("Indexes synced.");

    // 3. Create an OTP
    const otpRecord = new EmailOtp({
      userId: dummyUser._id,
      email: dummyUser.email,
      otpHash: "somehashedotp",
      ip: "127.0.0.1",
      expiresAt: new Date(Date.now() + 5000),
    });

    const savedOtp = await otpRecord.save();
    console.log("OTP record saved successfully:", savedOtp._id);

    // 4. Verify Indexes
    const indexes = await EmailOtp.collection.listIndexes().toArray();
    console.log("All Indexes:", JSON.stringify(indexes, null, 2));

    const ttlIndex = indexes.find(
      (idx) => idx.expireAfterSeconds !== undefined && idx.key.expiresAt,
    );
    if (ttlIndex) {
      console.log("✅ TTL Index found:", ttlIndex);
      if (ttlIndex.expireAfterSeconds === 0) {
        console.log("✅ TTL Index configured correctly (expires: 0)");
      } else {
        throw new Error(
          `TTL Index has wrong expireAfterSeconds: ${ttlIndex.expireAfterSeconds}`,
        );
      }
    } else {
      throw new Error("❌ TTL Index NOT found on attributes!");
    }

    // Cleanup
    await EmailOtp.deleteOne({ _id: savedOtp._id });
    await User.deleteOne({ _id: dummyUser._id });
    console.log("Test data cleaned up.");
  } catch (error) {
    console.error("Verification FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

verifyOtpSchema();
