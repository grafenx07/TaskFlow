@echo off
echo ========================================
echo   TaskFlow - Frontend Installation
echo ========================================
echo.

cd client
echo Installing frontend dependencies...
call npm install

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure backend is running on port 5000
echo 2. Run: npm run dev (to start frontend)
echo 3. Open browser at http://localhost:3000
echo.
pause
