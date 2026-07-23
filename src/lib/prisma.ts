import "dotenv/config";
import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL || "file:./dev.db";
  if (!url.startsWith("file:")) return url;

  const filePath = url.replace("file:", "");
  if (path.isAbsolute(filePath)) return url;

  return `file:${path.join(process.cwd(), filePath)}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: getDatabaseUrl() });
  return new PrismaClient({ adapter });
}

function resolvePrismaClient() {
  const cached = globalForPrisma.prisma;
  if (cached && "aboutPage" in cached && "deliveryPage" in cached && "contactPage" in cached && "homePage" in cached) {
    return cached;
  }

  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

export const prisma = resolvePrismaClient();
