# 🐟🐾 Balık Hırsızı Kedi (The Fish Thief Cat)
### Mobil İngilizce Kelime Öğrenme ve Oyunlaştırma Prototipi (v1.0)

Halim-kun ve 2 arkadaşının (Deniz & Kaan) geliştirdiği, eğlenceli ve bağımlılık yapıcı bir öğrenme döngüsüne sahip mobil İngilizce kelime uygulaması prototipi.

---

## 🌟 Temel Oyunlaştırma & Öğrenme Mimarisi

### 1. 10 Kelimelik Paketler & 3D Flashcard Anatomisi
- **Ön Yüz:** İlgili simge/illüstrasyon + İngilizce kelime + Fonetik okunuş (`/sniːk/`) + Kelime türü + Örnek cümle + **🔊 Sesli Telaffuz Düğmesi (Web Speech API)**.
- **Arka Yüz:** Türkçe anlamı + Cümle çevirisi + **🐾 Kedi Hafıza İpucu / Çengeli**.
- **3D Çevirme:** Kartın üzerine tıklandığında yumuşak 3D perspektif dönüşü ile hafızaya alma.

### 2. Balık Avı / Balıkçı Kovası Aşırma Mini Oyunu (The Heist)
- **Karakterler:** Gizlice parmak ucunda yaklaşan kedi, iskelede ahşap sandalyesinde uyuyan balıkçı (`Zzz...`) ve içi parıldayan taze balık dolu kova!
- **10 Adım:** Her doğru cevaplanan soruda (kelime anlamı, İngilizce karşılık, cümledeki boşluğu doldurma) kedi kovaya 1 adım yaklaşır.
- **3 Can / Hata Sistemi:** Hata yapıldığında 1 pati canı gider; balıkçının horultusu sallanır ve balıkçı `!!?` ile sıçrar. 3 hatada balıkçı tamamen uyanır, kedi kaçar ve tur yeniden başlar.
- **Zafer & Ödül:** 10/10 adım tamamlandığında kedi balığı kapıp yer (*"Nom nom nom!"*), mutlu miyavlar ve 10 kelime kalıcı olarak **"Öğrenilen Kelimeler"** kütüphanesine aktarılır.

### 3. Aralıklı Tekrar (Spaced Repetition): Tombul Kedi (Chonky Cat)
- Kedi balık aşırdıkça ve ziyafet çektikçe kilo alır (+0.4 kg)!
  - `3.5 kg` → Çevik & Fit
  - `5.0 kg` → Hafif Pofuduk
  - `6.5 kg` → Tombiş Kedi
  - `8.5 kg` → Mega Tombul (Ultra Chonk)
- Kedinin formunu koruyabilmesi için **Kedi Spor Salonu'nda (Gym)** antrenman yapması gerekir.
- **Zayıflama Şartı:** Eski öğrenilen kelimelerin aralıklı tekrarı! Her doğru tekrarda kedi koşu bandında ter atar (`💦`), dambıl kaldırır ve kalori yakarak (-0.15 kg) fit formuna döner.

### 4. Ek Özellikler & Yan Sistemler
- **🐱 Gardırop & Kozmetik:** Kazanılan taze balıklarla açılabilen balıkçı şapkası, dedektif kasketi, Kitauji bando şapkası (Euphonium esintisi!), kırmızı papyon ve altın zilli tasma.
- **👥 Kedi Çetesi & Arkadaşlar:** Halim-kun, Deniz ve Kaan'ın kedilerinin kilo ve günlük serilerini (Streak 🔥) gösteren liderlik tablosu, haftalık 100 balık takım hedefi ve arkadaşına miyavlama dürtmesi gönderme.
- **🐟 Kelime Akvaryumu (Sözlük):** Öğrenilen tüm kelimelerin dinlenebildiği ve filtreli listelendiği sözlük.

---

## 🚀 Nasıl Çalıştırılır ve Test Edilir?

### Seçenek 1: Tek Tıkla Masaüstünde Başlatma
Klasör içindeki `Baslat.cmd` dosyasına çift tıklayarak varsayılan tarayıcında hemen açabilirsin.

### Seçenek 2: Mobil Cihazından (Aynı Wi-Fi) Test Etme
Telefonundan gerçek bir mobil uygulama gibi dokunmatik test etmek için:
```bash
python server.py
```
Komut satırında çıkan yerel ağ adresini (örn: `http://192.168.1.x:8080`) telefonunun tarayıcısına yazarak anında test edebilirsin!

---

## 🛠️ Teknik Altyapı ve Dosya Düzeni

- `index.html`: Mobil cihaz çerçevesi (iPhone Dynamic Island & Status Bar) ve tek sayfa sekme mimarisi.
- `style.css`: Sıcak pastel renk paleti, 3D CSS dönüşleri, gece rıhtımı animasyonları ve koşu bandı efektleri.
- `js/words-data.js`: 10'ar kelimelik tematik paket veri tabanı.
- `js/audio.js`: **Web Audio API** saf kod sentezleyicisi (miyav, mırıltı, adım, kova şıpırtısı, horultu, zafer fanfarı) ve **Web Speech API** İngilizce doğal seslendirici.
- `js/game-heist.js`: 10 adımlık balıkçı kovası mini oyunu motoru.
- `js/game-gym.js`: Aralıklı tekrar & kalori yakma spor salonu motoru.
- `js/wardrobe.js`: Kedi kostüm ve giydirme motoru.
- `js/friends.js`: Takım skoru ve arkadaş etkileşimleri.
- `js/app.js`: Global state yönetimi ve `LocalStorage` kalıcılığı.
