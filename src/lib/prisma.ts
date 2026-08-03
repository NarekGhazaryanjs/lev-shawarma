import "dotenv/config";
import path from "path";

import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || "file:./dev.db";

  if (!url.startsWith("file:")) {
    return url;
  }

  const filePath = url.slice("file:".length);

  if (path.isAbsolute(filePath)) {
    return url;
  }

  return `file:${path.resolve(process.cwd(), filePath)}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaLibSql({
    url: getDatabaseUrl(),
  });

  return new PrismaClient({ adapter });
}

function resolvePrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;

  if (
    cached &&
    "aboutPage" in cached &&
    "deliveryPage" in cached &&
    "contactPage" in cached &&
    "homePage" in cached
  ) {
    return cached;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = resolvePrismaClient();