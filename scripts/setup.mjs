import { copyFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const envExamplePath = path.join(root, ".env.example");

function run(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("LEV Shawarma setup…");

if (!existsSync(envPath)) {
  if (!existsSync(envExamplePath)) {
    console.error("Missing .env.example");
    process.exit(1);
  }
  copyFileSync(envExamplePath, envPath);
  console.log("Created .env from .env.example");
} else {
  console.log(".env already exists");
}

run("npx", ["prisma", "generate"]);
run("npx", ["prisma", "db", "push"]);
run("npx", ["tsx", "prisma/seed.ts"]);

console.log("\nSetup done.");
console.log("Run:  npm start");
console.log("Site: http://localhost:5000");
console.log("Admin: http://localhost:5000/admin  (admin / levadmin)");
