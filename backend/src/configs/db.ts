import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connected ✅");
    } catch (error) {
        console.error("Database connection failed ❌", error);
        process.exit(1); // stop server
    }
};

export default prisma;
