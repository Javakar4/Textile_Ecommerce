import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

import "./models/BrandSchema.js";
import "./models/CategorySchema.js";
import "./models/ProductSchema.js";

import connectDB from "./db.js";          // <-- IMPORTANT
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";

dotenv.config();

const app = express();

/* Connect MongoDB */
connectDB();   // <-- IMPORTANT

/* MIDDLEWARES */
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

/* SENTRY */
Sentry.init({
    dsn: "https://f4e05cd1941d76c9181a986aaff465c5@o4510458469613568.ingest.us.sentry.io/4510458475446272",
    sendDefaultPii: true
});

app.use(express.static("uploads"));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

/* ROUTES */
app.use("/api/v1/auth", authRoutes);
app.use("/api/products", productRoutes);

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
