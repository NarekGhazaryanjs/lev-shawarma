const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");

if (!fs.existsSync(schemaPath)) {
  console.log("Skipping prisma generate (prisma/schema.prisma not in current directory)");
  process.exit(0);
}

execSync("npx prisma generate", { stdio: "inherit" });
