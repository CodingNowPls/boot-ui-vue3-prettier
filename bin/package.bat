@echo off
echo.
chcp 65001
echo.

%~d0
cd %~dp0

cd ..
npm install --registry=https://registry.npmmirror.com

pause
