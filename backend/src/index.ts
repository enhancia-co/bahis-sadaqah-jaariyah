import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import prisma, { connectDB } from "./configs/db";

import authRoutes from "./routes/auth.routes";
import contributorRoutes from "./routes/contributor.routes";
import collectionRoutes from "./routes/collection.routes";


configDotenv();

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/api/auth", authRoutes);
app.use("/api/contributor", contributorRoutes);
app.use("/api/collection", collectionRoutes);

app.get("/api/health", async (_, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: "ok", db: "connected" });
    } catch {
        res.status(500).json({ status: "error", db: "disconnected" });
    }
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} ✅`) 
    });
};

startServer();
