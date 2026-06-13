#!/bin/bash

# MedPath - Setup & Run script for macOS / Linux

# Move to the directory where this script is located
cd "$(dirname "$0")"

echo "============================================"
echo "           MedPath Setup & Run"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[خطا] Node.js پیدا نشد."
    echo ""
    echo "لطفاً ابتدا Node.js را از آدرس زیر نصب کنید:"
    echo "https://nodejs.org"
    echo ""
    echo "بعد از نصب، دوباره این اسکریپت را اجرا کنید."
    read -p "برای خروج Enter را بزنید..."
    exit 1
fi

echo "Node.js پیدا شد. نسخه:"
node -v
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "در حال نصب پکیج‌ها... این مرحله ممکن است چند دقیقه طول بکشد."
    echo ""
    if ! npm install; then
        echo ""
        echo "نصب عادی با خطا مواجه شد. در حال تلاش با --legacy-peer-deps ..."
        if ! npm install --legacy-peer-deps; then
            echo ""
            echo "[خطا] نصب پکیج‌ها ناموفق بود. لطفاً پیام خطا را بررسی کنید."
            read -p "برای خروج Enter را بزنید..."
            exit 1
        fi
    fi
else
    echo "پکیج‌ها قبلاً نصب شده‌اند."
fi

echo ""
echo "============================================"
echo " در حال اجرای سرور توسعه..."
echo " بعد از چند ثانیه مرورگر باز می‌شود."
echo " برای توقف سرور، Ctrl+C را بزنید."
echo "============================================"
echo ""

# Open the browser after a short delay (in background)
(
  sleep 6
  if command -v open &> /dev/null; then
    open http://localhost:3000   # macOS
  elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000   # Linux
  fi
) &

# Run the dev server (this will keep running in the foreground)
npm run dev
