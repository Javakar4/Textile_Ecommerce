import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import * as Sentry from "@sentry/node";

import connectDB from "./db.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import profileRoutes from "./routes/profileRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import passport from "passport";
import "./config/passport.js";
dotenv.config();


// Connect to Database
connectDB();

const app = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* SENTRY */
Sentry.init({
  dsn: "https://f4e05cd1941d76c9181a986aaff465c5@o4510458469613568.ingest.us.sentry.io/4510458475446272",
  sendDefaultPii: true,
});

app.use(express.static("uploads"));

/* ROUTES */
app.use(passport.initialize()); // Initialize passport
app.use("/api/v1/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/categories", categoryRoutes);



/* SENTRY ERROR HANDLER */
Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* GRACEFUL SHUTDOWN */
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} signal received. Shutting down gracefully...`);
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
