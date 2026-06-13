@echo off
title MedPath Setup and Run
color 0B

echo ================================================
echo            MedPath Setup and Run
echo ================================================
echo.

cd /d "%~dp0"

echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js was not found.
    echo Please install it from https://nodejs.org and restart your computer.
    echo.
    pause
    exit /b 1
)

node -v
echo.

if not exist "node_modules" (
    echo Installing packages, this may take a few minutes...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo Normal install failed, retrying with --legacy-peer-deps ...
        call npm install --legacy-peer-deps
        if %errorlevel% neq 0 (
            echo.
            echo ERROR: npm install failed. See the message above.
            pause
            exit /b 1
        )
    )
) else (
    echo Packages already installed.
)

echo.
echo ================================================
echo  Starting the dev server...
echo  Your browser will open automatically.
echo  Press Ctrl+C to stop the server.
echo ================================================
echo.

start /b cmd /c "timeout /t 6 >nul && start http://localhost:3000"

call npm run dev

pause
