@echo off
setlocal
cd /d "%~dp0.."

echo.
echo === LEV Shawarma ===
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is missing. Install from https://nodejs.org and try again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is missing. Install Node.js from https://nodejs.org and try again.
  pause
  exit /b 1
)

echo Installing dependencies...
if not exist ".env" (
  copy /Y ".env.example" ".env" >nul
  echo Created .env
)
call npm install
if errorlevel 1 (
  echo npm install failed.
  pause
  exit /b 1
)

echo.
echo Preparing database...
call npm run setup
if errorlevel 1 (
  echo Setup failed.
  pause
  exit /b 1
)

echo.
echo Starting server on http://localhost:5000
echo Admin: http://localhost:5000/admin  ^(admin / levadmin^)
echo.
call npm start
