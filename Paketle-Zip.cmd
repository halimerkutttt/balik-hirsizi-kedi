@echo off
setlocal
cd /d "%~dp0"
title Balik Hirsizi Kedi - Zip Paketleyici
echo ========================================================
echo   ZIP PAKETLEYICI - ARKADASINLA PAYLASMA ARACI
echo ========================================================
echo.
echo Proje zip dosyasina paketleniyor...
powershell -Command "Compress-Archive -Path '*.*', 'js' -DestinationPath '..\Balik-Hirsizi-Kedi-v1.0.zip' -Force"
echo.
echo Islem tamamlandi!
echo 'projects\Balik-Hirsizi-Kedi-v1.0.zip' olusturuldu.
echo.
timeout /t 3 > nul
exit