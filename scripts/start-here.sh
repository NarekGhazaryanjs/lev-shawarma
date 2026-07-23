#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo
echo "=== LEV Shawarma ==="
echo

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is missing. Install from https://nodejs.org and try again."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is missing. Install Node.js from https://nodejs.org and try again."
  exit 1
fi

echo "Installing dependencies..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env"
fi
npm install

echo
echo "Preparing database..."
npm run setup

echo
echo "Starting server on http://localhost:3000"
echo "Admin: http://localhost:3000/admin  (admin / levadmin)"
echo
npm start
