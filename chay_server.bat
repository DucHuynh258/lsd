@echo off
chcp 65001 >nul
title On Tap Lich Su Dang - LAN Server
echo ============================================================
echo   DANG KHOI CHAY SERVER DE CAC THIET BI TRUY CAP LAN...
echo ============================================================
echo.

where node >nul 2>nul
if %errorlevel% equ 0 (
    node server.js
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [Thong bao] Khong tim thay Node.js, dang chay bang Python...
    echo Hay mo trinh duyet tren dien thoai truy cap:
    echo    http://192.168.1.9:3000
    echo.
    python -m http.server 3000 --bind 0.0.0.0
    goto end
)

echo [Loi] May tinh chua cai dat Node.js hoac Python.
echo Vui long cai dat Node.js hoac Python de chay server.
pause

:end
