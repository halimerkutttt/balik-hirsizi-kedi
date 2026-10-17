@echo off
setlocal
cd /d "%~dp0"
title Balik Hirsizi Kedi - Python Sunucusu
echo ========================================================
echo   BALIK HIRSIZI KEDI - MOBIL SUNUCU (LAN VE TELEFON)
echo ========================================================
echo.
echo Sunucu baslatiliyor...
echo Tarayiciniz otomatik olarak acilacaktir.
echo Telefonunuzdan baglanmak icin ekranda yazan IP adresini kullanin.
echo.
python server.py
pause