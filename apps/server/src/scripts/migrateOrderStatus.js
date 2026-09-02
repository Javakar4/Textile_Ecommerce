import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI not found in .env");
    process.exit(1);
}

async function migrate() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const db = mongoose.connection.db;
        const result = await db.collection("orders").updateMany(
            { trackingStatus: "Ordered" },
            { $set: { trackingStatus: "Placed" } }
        );

        console.log(`✅ Migration complete: ${result.modifiedCount} orders updated from "Ordered" → "Placed"`);
    } catch (err) {
        console.error("❌ Migration failed:", err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

migrate();
