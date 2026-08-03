import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for shared hosting (avoids CloudLinux node_modules symlink issues)
  output: "standalone",
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
};

export default nextConfig;
