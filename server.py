#!/usr/bin/env python3
"""
Balık Hırsızı Kedi - Yerel Geliştirici Sunucusu (server.py)
Bu sunucu sayesinde hem bilgisayarından hem de yerel ağdaki (aynı Wi-Fi) 
telefonundan mobil prototipi gerçek cihazında test edebilirsin!
"""

import http.server
import socketserver
import socket
import os
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Gerçek yerel IP adresini bul
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    local_ip = get_local_ip()
    url_local = f"http://localhost:{PORT}"
    url_lan = f"http://{local_ip}:{PORT}"

    print("=" * 60)
    print("🐾 BALIK HIRSIZI KEDİ - MOBİL PROTOTİP SUNUCUSU")
    print("=" * 60)
    print(f"💻 Bilgisayarından açmak için:  {url_local}")
    print(f"📱 Telefonundan açmak için (aynı Wi-Fi): {url_lan}")
    print("=" * 60)
    print("Durdurmak için Ctrl+C tuşlarına basabilirsin.\n")

    # Otomatik olarak tarayıcıda aç
    webbrowser.open(url_local)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nSunucu durduruldu. İyi çalışmalar Halim-kun!")

if __name__ == "__main__":
    run()
