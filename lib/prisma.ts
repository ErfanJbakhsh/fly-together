import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Add it to your .env file (e.g. DATABASE_URL=\"mysql://user:password@host:port/database\")."
  );
}

const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

export { prisma };
