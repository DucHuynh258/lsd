@echo off
chcp 65001 >nul
title Deploy len Vercel
echo ============================================================
echo         DANG CHUAN BI DEPLOY WEBSITE LEN VERCEL...
echo ============================================================
echo.
echo Lenh se tu dong ket noi voi Vercel de xuat ban website.
echo Neu la lan dau tien, trinh duyet se mo de ban dang nhap Vercel.
echo.
npx vercel --prod
echo.
echo ============================================================
pause
