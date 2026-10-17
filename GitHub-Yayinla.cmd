@echo off
setlocal
cd /d "%~dp0"
title Balik Hirsizi Kedi - GitHub Yayinlayici

echo ========================================================
echo   BALIK HIRSIZI KEDI - GITHUB PAGES YAYINLAMA ARACI
echo ========================================================
echo.
echo Bu script projeyi 'https://github.com/halimerkutttt/balik-hirsizi-kedi.git'
echo adresine yukleyecek ve portfolyo linki yapmanizi saglayacaktir.
echo.
echo Onceden GitHub'da 'balik-hirsizi-kedi' adinda PUBLIC bir repo actiysaniz
echo devam etmek icin bir tusa basin...
pause > nul
echo.
echo [1/4] Git dosyalari hazirlaniyor...
if exist ".git" (
    git remote remove origin 2>nul
) else (
    git init
    git branch -M main
)

echo [2/4] Dosyalar ekleniyor...
git add index.html style.css README.md Baslat.cmd Sunucu-Baslat.cmd js\*

echo [3/4] Commit olusturuluyor...
git commit -m "feat: Balik Hirsizi Kedi Mobil Kelime Uygulamasi v1.0"

echo [4/4] GitHub'a yukleniyor...
git remote add origin https://github.com/halimerkutttt/balik-hirsizi-kedi.git 2>nul
git push -u origin main --force

echo.
echo ========================================================
echo YUKLEME BASARIYLA TAMAMLANDI!
echo Simdi GitHub reponuza gidin:
echo https://github.com/halimerkutttt/balik-hirsizi-kedi/settings/pages
echo 'Branch' kismindan 'main' secip Save'e tiklayin.
echo Canli portfolyo linkiniz 30 saniye icinde hazir olacaktir:
echo https://halimerkutttt.github.io/balik-hirsizi-kedi
echo ========================================================
echo.
pause