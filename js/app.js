/**
 * Balık Hırsızı Kedi - Ana Uygulama Yöneticisi (app.js)
 * 
 * Uygulama Durumu (State), Yerel Depolama (LocalStorage), Sekme Yönlendirmeleri
 * Flashcard 3D deste sistemi ve kelime kütüphanesi.
 */

class App {
  constructor() {
    this.state = this.loadState();
    this.currentCardIndex = 0;
    this.activePack = WORD_PACKS[0];

    // Modüller
    this.heistGame = new HeistGame(this);
    this.gymGame = new GymGame(this);
    this.wardrobe = new WardrobeManager(this);
    this.friends = new FriendsManager(this);

    this.init();
  }

  loadState() {
    const saved = localStorage.getItem("balik_hirsizi_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("State parse hatası:", e);
      }
    }

    // Başlangıç varsayılan durumu
    return {
      catName: "Pati",
      catWeight: 4.2, // kg (3.5 fit, 6.0 tombiş, 8.5 mega chonk)
      fishCount: 3,   // Başlangıç balık parası
      streakDays: 4,
      lastDate: new Date().toISOString().split("T")[0],
      currentPackId: "pack-1",
      learnedWords: {}, // { "w101": { learnedAt: "...", reviewCount: 1 } }
      unlockedAccessories: ["none", "fisherman-hat", "bowtie"],
      equippedHat: "fisherman-hat",
      equippedCollar: "bowtie"
    };
  }

  saveState() {
    localStorage.setItem("balik_hirsizi_state", JSON.stringify(this.state));
  }

  getAllWords() {
    return WORD_PACKS.flatMap(p => p.words);
  }

  getCatStatus() {
    const w = this.state.catWeight;
    if (w < 4.0) return { label: "Çevik & Fit", badgeClass: "status-fit", icon: "⚡" };
    if (w < 5.5) return { label: "Hafif Pofuduk", badgeClass: "status-soft", icon: "🐾" };
    if (w < 7.5) return { label: "Tombiş Kedi", badgeClass: "status-chonk", icon: "🥟" };
    return { label: "Mega Tombul (Ultra Chonk)", badgeClass: "status-megachonk", icon: "🛋️" };
  }

  init() {
    this.setupNavigation();
    this.updateHeaderStats();
    this.renderHomeTab();

    // Ses motorunu ilk tıklamada uyandır
    document.addEventListener("click", () => {
      if (window.sound) window.sound.init();
    }, { once: true });

    // Cihaz çerçevesi aç/kapa (Masaüstünde telefon çerçevesi modu)
    document.getElementById("toggle-frame-btn")?.addEventListener("click", () => {
      document.body.classList.toggle("frameless-mode");
    });

    // Ses kısma butonu
    document.getElementById("btn-mute-toggle")?.addEventListener("click", (e) => {
      if (window.sound) {
        const isMuted = window.sound.toggleMute();
        e.currentTarget.innerText = isMuted ? "🔇" : "🔊";
      }
    });
  }

  setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const tab = item.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabName) {
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-tab") === tabName);
    });

    document.querySelectorAll(".tab-page").forEach(page => {
      page.classList.toggle("active", page.id === `tab-${tabName}`);
    });

    if (window.sound) window.sound.playStep();

    // Sekmeye özel başlatma
    switch (tabName) {
      case "home":
        this.renderHomeTab();
        break;
      case "cards":
        this.renderCardsTab();
        break;
      case "heist":
        this.heistGame.start(this.activePack);
        break;
      case "gym":
        this.gymGame.start();
        break;
      case "wardrobe":
        this.wardrobe.renderWardrobe();
        break;
      case "friends":
        this.friends.renderFriends();
        break;
      case "library":
        this.renderLibraryTab();
        break;
    }

    this.updateHeaderStats();
  }

  updateHeaderStats() {
    const weightEl = document.getElementById("stat-weight");
    const fishEl = document.getElementById("stat-fish");
    const streakEl = document.getElementById("stat-streak");

    if (weightEl) weightEl.innerText = `${this.state.catWeight.toFixed(1)} kg`;
    if (fishEl) fishEl.innerText = `${this.state.fishCount}`;
    if (streakEl) streakEl.innerText = `${this.state.streakDays}`;
  }

  // ============================================
  // TAB 1: KAMP (HOME)
  // ============================================
  renderHomeTab() {
    const container = document.getElementById("tab-home");
    if (!container) return;

    const status = this.getCatStatus();
    const learnedCount = Object.keys(this.state.learnedWords).length;
    const totalWords = this.getAllWords().length;

    container.innerHTML = `
      <div class="home-screen fade-in">
        <!-- Günlük Seri & Selamlama -->
        <div class="home-greeting-bar">
          <div class="greeting-text">
            <h2>Miyav, Halim-kun! 👋</h2>
            <p>Bugün balıkçının kovası ağzına kadar dolu!</p>
          </div>
          <div class="streak-badge" title="Günlük Çalışma Serisi">
            <span class="flame-icon">🔥</span>
            <span class="streak-count">${this.state.streakDays} Gün</span>
          </div>
        </div>

        <!-- Tombul Kedi Görsel Vitrini -->
        <div class="cat-display-card">
          <div class="cat-status-pill ${status.badgeClass}">
            ${status.icon} ${status.label} (${this.state.catWeight.toFixed(1)} kg)
          </div>

          <div class="cat-visual-wrap" id="home-cat-interactive">
            ${this.wardrobe.renderCatWithAccessories(this.state.equippedHat, this.state.equippedCollar)}
          </div>

          <!-- Kilo Barı (Fit ile Mega Chonk arası) -->
          <div class="chonk-meter-wrap">
            <div class="chonk-labels">
              <span>Fit (3.5kg)</span>
              <span>Tombiş (6.0kg)</span>
              <span>Mega Chonk (8.5kg)</span>
            </div>
            <div class="chonk-track">
              <div class="chonk-fill" style="width: ${Math.min(100, Math.max(10, ((this.state.catWeight - 3.5) / 5) * 100))}%"></div>
            </div>
          </div>

          <div class="cat-interaction-row">
            <button class="action-pill-btn" id="btn-pet-cat">
              💕 Kediyi Sev / Mırıldat
            </button>
            <button class="action-pill-btn secondary" id="btn-goto-wardrobe">
              👒 Gardırop
            </button>
          </div>
        </div>

        <!-- Bugünün 10 Kelimelik Görevi Kartı -->
        <div class="active-pack-card">
          <div class="pack-badge-row">
            <span class="pack-tag">${this.activePack.level}</span>
            <span class="pack-count">10 Kelime</span>
          </div>
          <h3>${this.activePack.title}</h3>
          <p class="pack-desc">${this.activePack.description}</p>

          <div class="pack-stats-row">
            <div class="p-stat">
              <span class="label">Öğrenilen:</span>
              <strong>${learnedCount} / ${totalWords}</strong>
            </div>
            <div class="p-stat">
              <span class="label">Ödül:</span>
              <strong>+1 Taze Balık 🐟</strong>
            </div>
          </div>

          <div class="pack-btn-row">
            <button class="primary-btn-large" id="btn-start-pack">
              🃏 10 Kelimelik Paketi Aç
            </button>
            <button class="heist-direct-btn" id="btn-direct-heist" title="Doğrudan Balık Avına Git">
              🎣 Balık Avı
            </button>
          </div>
        </div>

        <!-- Hızlı Kısayollar (Aralıklı Tekrar & Sözlük) -->
        <div class="quick-nav-grid">
          <div class="quick-card" id="btn-quick-gym">
            <span class="q-icon">🏋️</span>
            <div class="q-info">
              <strong>Kedi Spor Salonu</strong>
              <small>Eski kelimeleri tekrar et, kilo ver</small>
            </div>
          </div>
          <div class="quick-card" id="btn-quick-library">
            <span class="q-icon">🐟</span>
            <div class="q-info">
              <strong>Balık Akvaryumu</strong>
              <small>Öğrenilen kelimeler sözlüğü</small>
            </div>
          </div>
        </div>
      </div>
    `;

    // Etkileşimler
    document.getElementById("btn-pet-cat")?.addEventListener("click", () => {
      if (window.sound) {
        window.sound.playPurr();
        setTimeout(() => window.sound.playMeow(1.2), 300);
      }
      const catWrap = document.getElementById("home-cat-interactive");
      if (catWrap) {
        catWrap.classList.add("purr-bounce");
        setTimeout(() => catWrap.classList.remove("purr-bounce"), 600);
      }
    });

    document.getElementById("btn-goto-wardrobe")?.addEventListener("click", () => {
      this.switchTab("wardrobe");
    });

    document.getElementById("btn-start-pack")?.addEventListener("click", () => {
      this.switchTab("cards");
    });

    document.getElementById("btn-direct-heist")?.addEventListener("click", () => {
      this.switchTab("heist");
    });

    document.getElementById("btn-quick-gym")?.addEventListener("click", () => {
      this.switchTab("gym");
    });

    document.getElementById("btn-quick-library")?.addEventListener("click", () => {
      this.switchTab("library");
    });
  }

  // ============================================
  // TAB 2: FLASHCARD 3D DESTE (CARDS)
  // ============================================
  renderCardsTab() {
    const container = document.getElementById("tab-cards");
    if (!container) return;

    const words = this.activePack.words;
    const currentWord = words[this.currentCardIndex];

    container.innerHTML = `
      <div class="cards-screen fade-in">
        <!-- Üst Paket Bilgisi -->
        <div class="cards-topbar">
          <div class="pack-title-pill">
            ${this.activePack.title}
          </div>
          <div class="card-counter">
            ${this.currentCardIndex + 1} / ${words.length}
          </div>
        </div>

        <!-- 3D Dönebilen Flashcard -->
        <div class="flashcard-container" id="flashcard-box">
          <div class="flashcard" id="active-flashcard">
            <!-- ÖN YÜZ: İngilizce, Telaffuz, Görsel ve Cümle -->
            <div class="card-face card-front">
              <div class="card-hint-badge">Kartı Çevirmek İçin Tıkla 🔄</div>

              <div class="word-visual-icon">
                ${currentWord.icon}
              </div>

              <h1 class="card-english-word">${currentWord.word}</h1>

              <div class="card-phonetic-row">
                <span class="phonetic-text">${currentWord.phonetic}</span>
                <span class="pos-tag">${currentWord.pos}</span>
                <button class="sound-bubble-btn" id="card-speak-btn" title="İngilizce Telaffuzu Dinle">
                  🔊
                </button>
              </div>

              <div class="card-sentence-box">
                <p class="sentence-en">"${currentWord.sentence}"</p>
              </div>
            </div>

            <!-- ARKA YÜZ: Türkçe Anlamı ve Hafıza İpucu -->
            <div class="card-face card-back">
              <div class="card-hint-badge">Ön Yüze Dön 🔄</div>

              <div class="back-accent-icon">💡</div>

              <h2 class="card-turkish-meaning">${currentWord.meaning}</h2>

              <div class="back-sentence-tr">
                <p class="sentence-tr-label">Cümle Çevirisi:</p>
                <p class="sentence-tr">"${currentWord.sentenceTr}"</p>
              </div>

              <div class="card-memory-hint">
                <span class="hint-title">🐾 Kedi İpucu / Hafıza Çengeli:</span>
                <p class="hint-body">${currentWord.hint}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Alt Kontrol ve İlerleme Butonları -->
        <div class="cards-action-footer">
          <div class="card-nav-row">
            <button class="nav-arrow-btn" id="btn-card-prev" ${this.currentCardIndex === 0 ? "disabled" : ""}>
              ◀ Önceki
            </button>
            <button class="nav-flip-btn" id="btn-card-flip">
              🔄 Kartı Çevir
            </button>
            <button class="nav-arrow-btn" id="btn-card-next" ${this.currentCardIndex === words.length - 1 ? "disabled" : ""}>
              Sonraki ▶
            </button>
          </div>

          <!-- 10 Kelime İncelendiğinde Açılan Balık Avı Çağrısı -->
          <div class="heist-cta-box">
            <button class="heist-cta-btn" id="btn-start-heist-from-cards">
              🎣 Balık Avına Başla (10 Adımlık Test)
            </button>
          </div>
        </div>
      </div>
    `;

    const card = document.getElementById("active-flashcard");
    const flipCard = () => {
      card?.classList.toggle("is-flipped");
      if (window.sound) window.sound.playStep();
    };

    card?.addEventListener("click", flipCard);
    document.getElementById("btn-card-flip")?.addEventListener("click", flipCard);

    document.getElementById("card-speak-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.sound) window.sound.speakText(currentWord.word);
    });

    document.getElementById("btn-card-prev")?.addEventListener("click", () => {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
        this.renderCardsTab();
      }
    });

    document.getElementById("btn-card-next")?.addEventListener("click", () => {
      if (this.currentCardIndex < words.length - 1) {
        this.currentCardIndex++;
        this.renderCardsTab();
      }
    });

    document.getElementById("btn-start-heist-from-cards")?.addEventListener("click", () => {
      this.switchTab("heist");
    });

    // Otomatik telaffuz
    setTimeout(() => {
      if (window.sound) window.sound.speakText(currentWord.word);
    }, 200);
  }

  // ============================================
  // TAB 6: KELİME KÜTÜPHANESİ & AKVARYUM
  // ============================================
  renderLibraryTab() {
    const container = document.getElementById("tab-library");
    if (!container) return;

    const allWords = this.getAllWords();
    const learnedIds = Object.keys(this.state.learnedWords);

    container.innerHTML = `
      <div class="library-screen fade-in">
        <div class="library-header">
          <h2>🐟 Kelime Akvaryumu</h2>
          <p>Öğrendiğin ve avladığın tüm kelimeler</p>
        </div>

        <div class="library-summary-bar">
          <div class="summary-pill active">
            Tümü (${allWords.length})
          </div>
          <div class="summary-pill learned-pill">
            Öğrenilenler (${learnedIds.length})
          </div>
        </div>

        <div class="library-list">
          ${allWords.map(w => {
            const isLearned = learnedIds.includes(w.id);
            return `
              <div class="library-item-card ${isLearned ? 'is-learned' : ''}">
                <div class="lib-icon">${w.icon}</div>
                <div class="lib-info">
                  <div class="lib-word-row">
                    <strong class="lib-word">${w.word}</strong>
                    <span class="lib-phonetic">${w.phonetic}</span>
                    ${isLearned ? '<span class="learned-tag">✓ Hafızada</span>' : '<span class="pending-tag">Avlanacak</span>'}
                  </div>
                  <div class="lib-meaning">${w.meaning}</div>
                  <div class="lib-sentence">"${w.sentence}"</div>
                </div>
                <button class="lib-speak-btn" data-word="${w.word}">🔊</button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".lib-speak-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const word = btn.getAttribute("data-word");
        if (window.sound) window.sound.speakText(word);
      });
    });
  }

  // ============================================
  // OYUN İÇİ ETKİLER (State Değişiklikleri)
  // ============================================
  recordLearnedWords(words) {
    const now = new Date().toISOString();
    words.forEach(w => {
      if (!this.state.learnedWords[w.id]) {
        this.state.learnedWords[w.id] = {
          learnedAt: now,
          reviewCount: 1
        };
      } else {
        this.state.learnedWords[w.id].reviewCount++;
      }
    });
    this.saveState();
  }

  feedCatFish(amount = 1) {
    this.state.fishCount += amount;
    // Her balıkta +0.4 kg kilo alır
    this.state.catWeight = Math.min(9.5, this.state.catWeight + 0.4);
    this.saveState();
    this.updateHeaderStats();
  }

  burnCatCalories(amount = 0.15) {
    // Kilo verir ama minimum 3.5 kg'dan aşağı düşmez
    this.state.catWeight = Math.max(3.5, this.state.catWeight - amount);
    this.saveState();
    this.updateHeaderStats();
  }
}

// Uygulamayı başlat
window.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
