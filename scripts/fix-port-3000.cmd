@echo off
echo ============================================
echo  LEV Shawarma - Port 3000 fix (Admin only)
echo ============================================
echo.
echo Windows has reserved port 3000. This script removes that reservation.
echo Right-click this file and choose "Run as administrator".
echo.
pause

netsh int ipv4 delete excludedportrange protocol=tcp startport=3000 numberofports=1
if %errorlevel% neq 0 (
  echo.
  echo Failed. Make sure you run as Administrator.
  pause
  exit /b 1
)

echo.
echo Port 3000 should be free now. Restart your PC if npm start still fails.
echo.
pause
