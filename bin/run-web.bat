@echo off
echo.
chcp 65001
echo.

%~d0
cd %~dp0

cd ..
npm run dev

pause
