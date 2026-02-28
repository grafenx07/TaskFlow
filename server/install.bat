@echo off
echo ========================================
echo   TaskFlow - Backend Installation
echo ========================================
echo.

cd server
echo Installing backend dependencies...
call npm install

echo.
echo ========================================
echo Creating .env file...
echo ========================================
if not exist .env (
    copy ..\\.env.example .env
    echo .env file created! Please update with your configuration.
) else (
    echo .env file already exists.
)

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update server/.env with your MongoDB URI
echo 2. Make sure MongoDB is running
echo 3. Run: npm run seed (to create admin user)
echo 4. Run: npm run dev (to start backend)
echo.
pause
