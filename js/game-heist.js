/**
 * Balık Hırsızı Kedi - Balıkçı Kovası Aşırma Mini Oyunu (game-heist.js)
 * 
 * Mekanikler:
 * - 10 kelimelik paket üzerinden soru üretimi (Çoktan seçmeli, Cümle tamamlama, Anlam eşleştirme)
 * - 10 Adım: Doğru cevapta kedi kovaya 1 adım yaklaşır.
 * - 3 Can: Hata yapıldığında 1 pati canı gider, balıkçının horultusu sallanır.
 * - 3 Hata = Balıkçı uyanır, kedi panikle kaçar, tur sıfırlanır.
 * - 10/10 = Kedi balığı kapar, yer (kilo alır!), kelimeler kalıcı öğrenilenlere geçer.
 */

class HeistGame {
  constructor(app) {
    this.app = app;
    this.currentPack = null;
    this.words = [];
    this.currentQuestionIndex = 0;
    this.step = 0; // 0 to 10
    this.lives = 3;
    this.maxLives = 3;
    this.currentQuestion = null;
    this.isAnswering = false;
    this.snoreInterval = null;
  }

  start(pack) {
    this.currentPack = pack;
    // Kelimeleri karıştır
    this.words = [...pack.words].sort(() => Math.random() - 0.5);
    this.currentQuestionIndex = 0;
    this.step = 0;
    this.lives = 3;
    this.isAnswering = false;

    this.renderGameView();
    this.loadQuestion();
    this.startFishermanSnore();

    if (window.sound) {
      window.sound.playMeow(1.1);
    }
  }

  startFishermanSnore() {
    this.stopFishermanSnore();
    // Balıkçının hafif aralıklı horultu sesi
    this.snoreInterval = setInterval(() => {
      if (this.lives > 0 && this.step < 10) {
        if (window.sound && Math.random() > 0.4) {
          window.sound.playSnore();
        }
      }
    }, 4500);
  }

  stopFishermanSnore() {
    if (this.snoreInterval) {
      clearInterval(this.snoreInterval);
      this.snoreInterval = null;
    }
  }

  renderGameView() {
    const container = document.getElementById("tab-heist");
    if (!container) return;

    container.innerHTML = `
      <div class="heist-screen">
        <!-- Üst Bilgi Barı: Canlar, İlerleme ve Kaçış Durumu -->
        <div class="heist-topbar">
          <div class="heist-lives" id="heist-lives">
            ${this.renderLivesHtml()}
          </div>
          <div class="heist-step-badge">
            <span class="step-num" id="heist-step-text">${this.step}</span> / 10 Adım
          </div>
          <button class="heist-exit-btn" id="heist-exit-btn" title="Geri Dön">✕</button>
        </div>

        <!-- Rıhtım / İskele Görsel Sahnesi (SVG Animasyonlu) -->
        <div class="heist-stage" id="heist-stage">
          <!-- Ay & Gece Gökyüzü -->
          <div class="night-sky">
            <span class="moon">🌙</span>
            <span class="star s1">✦</span>
            <span class="star s2">✦</span>
          </div>

          <!-- Ahşap İskele Zemin -->
          <div class="pier-deck"></div>

          <!-- Solda Yaklaşan Kedi -->
          <div class="cat-sneaker" id="cat-sneaker" style="left: ${10 + this.step * 6.5}%;">
            <div class="cat-sprite" id="cat-sprite">
              <svg viewBox="0 0 100 80" class="cat-svg">
                <!-- Kuyruk -->
                <path d="M 15 50 Q 5 35 12 20" stroke="#E07A5F" stroke-width="6" fill="none" stroke-linecap="round" class="cat-tail"/>
                <!-- Gövde -->
                <ellipse cx="45" cy="50" rx="${22 + (this.app.state.catWeight > 6 ? 6 : 0)}" ry="${16 + (this.app.state.catWeight > 6 ? 4 : 0)}" fill="#F4A261" />
                <ellipse cx="45" cy="50" rx="${17 + (this.app.state.catWeight > 6 ? 4 : 0)}" ry="${12 + (this.app.state.catWeight > 6 ? 3 : 0)}" fill="#FCEADE" />
                <!-- Kafa -->
                <circle cx="68" cy="40" r="15" fill="#F4A261" />
                <!-- Kulaklar -->
                <polygon points="62,28 66,16 72,28" fill="#E07A5F" />
                <polygon points="70,28 76,17 80,30" fill="#E07A5F" />
                <!-- Yüz & Gözler -->
                <circle cx="66" cy="38" r="2" fill="#2B2D42" />
                <circle cx="74" cy="38" r="2" fill="#2B2D42" />
                <!-- Burun & Bıyık -->
                <polygon points="70,42 68,40 72,40" fill="#E76F51" />
                <line x1="58" y1="41" x2="64" y2="42" stroke="#2B2D42" stroke-width="1.2" />
                <line x1="58" y1="44" x2="64" y2="44" stroke="#2B2D42" stroke-width="1.2" />
                <line x1="76" y1="42" x2="82" y2="41" stroke="#2B2D42" stroke-width="1.2" />
                <line x1="76" y1="44" x2="82" y2="44" stroke="#2B2D42" stroke-width="1.2" />
                <!-- Patiler -->
                <circle cx="32" cy="64" r="5" fill="#E07A5F" class="paw-back" />
                <circle cx="44" cy="64" r="5" fill="#E07A5F" class="paw-mid" />
                <circle cx="58" cy="64" r="5" fill="#E07A5F" class="paw-front" />
              </svg>
            </div>
            <div class="cat-shadow"></div>
          </div>

          <!-- Sağda Uyuyan Balıkçı ve Kova -->
          <div class="fisherman-zone">
            <!-- Horultu Baloncuğu -->
            <div class="snore-bubble" id="snore-bubble">
              <span>Z</span><span>z</span><span>z</span><span>...</span>
            </div>

            <!-- Balıkçı Figürü -->
            <div class="fisherman-sprite" id="fisherman-sprite">
              <svg viewBox="0 0 100 120" class="fisherman-svg">
                <!-- Sandalye -->
                <rect x="35" y="65" width="30" height="6" fill="#8D5B4C" rx="2" />
                <rect x="38" y="71" width="4" height="30" fill="#6A4235" />
                <rect x="58" y="71" width="4" height="30" fill="#6A4235" />
                <rect x="33" y="35" width="6" height="35" fill="#6A4235" rx="2" />
                <!-- Vücut (Sarı Yağmurluk) -->
                <path d="M 38 48 Q 52 45 65 52 L 68 78 L 38 78 Z" fill="#F4A261" />
                <!-- Kafa & Balıkçı Şapkası -->
                <circle cx="52" cy="38" r="12" fill="#E8C5A5" />
                <path d="M 38 32 C 40 22 64 22 66 32 Z" fill="#2A9D8F" />
                <ellipse cx="52" cy="32" rx="18" ry="4" fill="#264653" />
                <!-- Sakal ve Uyuyan Yüz -->
                <path d="M 46 41 Q 52 46 58 41" stroke="#2B2D42" stroke-width="1.5" fill="none" />
                <path d="M 44 43 Q 52 56 60 43 Z" fill="#D3D3D3" />
                <!-- Kol & Olta -->
                <line x1="68" y1="58" x2="88" y2="40" stroke="#8D5B4C" stroke-width="3" stroke-linecap="round" />
                <line x1="88" y1="40" x2="88" y2="90" stroke="#E9D8A6" stroke-width="1" stroke-dasharray="2,2" />
              </svg>
            </div>

            <!-- İçi Balık Dolu Parıldayan Kova -->
            <div class="bucket-sprite" id="bucket-target">
              <svg viewBox="0 0 60 70" class="bucket-svg">
                <path d="M 12 25 L 18 65 L 42 65 L 48 25 Z" fill="#457B9D" />
                <ellipse cx="30" cy="25" rx="18" ry="6" fill="#1D3557" />
                <ellipse cx="30" cy="26" rx="15" ry="4.5" fill="#A8DADC" />
                <!-- Kovadan Dışarı Taşmış Balık -->
                <path d="M 24 23 Q 32 14 38 20 Q 32 26 24 23" fill="#E63946" class="fish-glow" />
                <circle cx="35" cy="18" r="1.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Soru ve Etkileşim Kartı -->
        <div class="heist-card-area" id="heist-card-area">
          <!-- Soru içeriği dinamik yüklenir -->
        </div>
      </div>
    `;

    document.getElementById("heist-exit-btn")?.addEventListener("click", () => {
      this.stopFishermanSnore();
      this.app.switchTab("cards");
    });
  }

  renderLivesHtml() {
    let html = "";
    for (let i = 0; i < this.maxLives; i++) {
      if (i < this.lives) {
        html += `<span class="life-paw active">🐾</span>`;
      } else {
        html += `<span class="life-paw lost">💀</span>`;
      }
    }
    return html;
  }

  loadQuestion() {
    if (this.step >= 10) {
      this.handleVictory();
      return;
    }

    if (this.lives <= 0) {
      this.handleGameOver();
      return;
    }

    const currentWord = this.words[this.step % this.words.length];
    this.currentQuestion = this.generateQuestion(currentWord);

    const cardArea = document.getElementById("heist-card-area");
    if (!cardArea) return;

    this.isAnswering = false;

    cardArea.innerHTML = `
      <div class="quiz-box fade-in">
        <div class="quiz-header">
          <span class="quiz-tag">${this.currentQuestion.typeLabel}</span>
          <button class="quiz-speak-btn" id="quiz-speak-btn" title="Dinle">🔊 Dinle</button>
        </div>

        <div class="quiz-prompt">
          <h3 class="quiz-target-text">${this.currentQuestion.promptText}</h3>
          ${this.currentQuestion.subText ? `<p class="quiz-subtext">${this.currentQuestion.subText}</p>` : ""}
        </div>

        <div class="quiz-options">
          ${this.currentQuestion.options.map((opt, idx) => `
            <button class="quiz-opt-btn" data-index="${idx}">
              <span class="opt-key">${["A", "B", "C", "D"][idx]}</span>
              <span class="opt-val">${opt.text}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    // Ses dinleme butonu
    document.getElementById("quiz-speak-btn")?.addEventListener("click", () => {
      if (window.sound) {
        window.sound.speakText(currentWord.word);
      }
    });

    // Otomatik ilk telaffuz (sessiz ve tatlı bir başlangıç)
    setTimeout(() => {
      if (window.sound && this.currentQuestion.type === "en-to-tr") {
        window.sound.speakText(currentWord.word);
      }
    }, 250);

    // Seçenek tıklamaları
    const buttons = cardArea.querySelectorAll(".quiz-opt-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        this.checkAnswer(idx, buttons);
      });
    });
  }

  generateQuestion(targetWord) {
    const qTypes = ["en-to-tr", "tr-to-en", "sentence-blank"];
    const type = qTypes[this.step % qTypes.length];

    // Diğer kelimelerden 3 çeldirici seç
    const allOtherWords = this.app.getAllWords().filter(w => w.id !== targetWord.id);
    const distractors = [...allOtherWords].sort(() => Math.random() - 0.5).slice(0, 3);

    let promptText = "";
    let subText = "";
    let typeLabel = "";
    let correctText = "";
    let options = [];

    if (type === "en-to-tr") {
      typeLabel = "Kelime Anlamı";
      promptText = targetWord.word;
      subText = targetWord.phonetic + " • " + targetWord.pos;
      correctText = targetWord.meaning;

      options = [
        { text: targetWord.meaning, correct: true },
        ...distractors.map(d => ({ text: d.meaning, correct: false }))
      ];
    } else if (type === "tr-to-en") {
      typeLabel = "İngilizce Karşılığı";
      promptText = targetWord.meaning;
      subText = "Bu anlamı taşıyan İngilizce kelimeyi bul:";
      correctText = targetWord.word;

      options = [
        { text: targetWord.word, correct: true },
        ...distractors.map(d => ({ text: d.word, correct: false }))
      ];
    } else {
      typeLabel = "Cümle Tamamlama";
      // Cümledeki kelimeyi boşluğa çevir
      const regex = new RegExp(targetWord.word, "gi");
      promptText = targetWord.sentence.replace(regex, "______");
      subText = `Anlamı: "${targetWord.sentenceTr}"`;
      correctText = targetWord.word;

      options = [
        { text: targetWord.word, correct: true },
        ...distractors.map(d => ({ text: d.word, correct: false }))
      ];
    }

    // Seçenekleri karıştır
    options.sort(() => Math.random() - 0.5);

    return {
      type,
      typeLabel,
      promptText,
      subText,
      options,
      correctWord: targetWord
    };
  }

  checkAnswer(selectedIndex, buttons) {
    if (this.isAnswering) return;
    this.isAnswering = true;

    const chosenOption = this.currentQuestion.options[selectedIndex];
    const chosenBtn = buttons[selectedIndex];

    if (chosenOption.correct) {
      // DOĞRU CEVAP
      chosenBtn.classList.add("correct-btn");
      if (window.sound) {
        window.sound.playStep();
        if (this.step % 3 === 0) window.sound.playPurr();
      }

      this.step++;
      this.updateStepAnimation();

      setTimeout(() => {
        this.loadQuestion();
      }, 700);

    } else {
      // YANLIŞ CEVAP
      chosenBtn.classList.add("wrong-btn");
      // Doğru olanı da yeşil yap ki öğrensin
      buttons.forEach(btn => {
        const i = parseInt(btn.getAttribute("data-index"), 10);
        if (this.currentQuestion.options[i].correct) {
          btn.classList.add("reveal-correct-btn");
        }
      });

      this.lives--;
      this.updateLivesDisplay();

      if (window.sound) {
        window.sound.playWrong();
        window.sound.playAlarm();
      }

      // Balıkçı ve horultuyu sars
      this.shakeFisherman();

      setTimeout(() => {
        if (this.lives <= 0) {
          this.handleGameOver();
        } else {
          this.loadQuestion();
        }
      }, 1200);
    }
  }

  updateStepAnimation() {
    const stepText = document.getElementById("heist-step-text");
    if (stepText) stepText.innerText = this.step;

    const catSneaker = document.getElementById("cat-sneaker");
    if (catSneaker) {
      const targetLeft = 10 + this.step * 6.5;
      catSneaker.style.left = `${targetLeft}%`;
      catSneaker.classList.add("cat-step-anim");
      setTimeout(() => catSneaker.classList.remove("cat-step-anim"), 400);
    }
  }

  updateLivesDisplay() {
    const livesContainer = document.getElementById("heist-lives");
    if (livesContainer) {
      livesContainer.innerHTML = this.renderLivesHtml();
    }
  }

  shakeFisherman() {
    const fisherman = document.getElementById("fisherman-sprite");
    const bubble = document.getElementById("snore-bubble");

    if (fisherman) {
      fisherman.classList.add("shake-alarm");
      setTimeout(() => fisherman.classList.remove("shake-alarm"), 600);
    }

    if (bubble) {
      bubble.innerHTML = `<span>!</span><span>!</span><span>?</span>`;
      bubble.classList.add("bubble-alert");
      setTimeout(() => {
        bubble.innerHTML = `<span>Z</span><span>z</span><span>z</span><span>...</span>`;
        bubble.classList.remove("bubble-alert");
      }, 1000);
    }
  }

  handleVictory() {
    this.stopFishermanSnore();

    if (window.sound) {
      window.sound.playSplash();
      setTimeout(() => window.sound.playNomNom(), 300);
      setTimeout(() => window.sound.playVictory(), 800);
    }

    // Kelimeleri kalıcı öğrenildi olarak kaydet
    this.app.recordLearnedWords(this.currentPack.words);

    // Kedi balığı yediği için kilo alır (+0.4 kg) ve balık sayacı artar
    this.app.feedCatFish(1);

    const cardArea = document.getElementById("heist-card-area");
    if (!cardArea) return;

    cardArea.innerHTML = `
      <div class="heist-result-box victory-box fade-in">
        <div class="result-icon-celebrate">🐟✨🐾</div>
        <h2>BALIK AŞIRILDI!</h2>
        <p class="result-desc">
          Kedi balığı sessizce kapıp bir çırpıda yedi: <strong>"Nom nom nom!"</strong><br>
          10 yeni kelime hafızana ve kütüphanene kalıcı olarak eklendi!
        </p>
        <div class="result-stats">
          <div class="stat-pill">+10 Kelime</div>
          <div class="stat-pill">+1 Taze Balık</div>
          <div class="stat-pill chonk-gain">+0.4 kg Tombulluk</div>
        </div>
        <div class="result-actions">
          <button class="primary-action-btn" id="btn-victory-home">Kampa Dön & Kediyi Sev</button>
        </div>
      </div>
    `;

    document.getElementById("btn-victory-home")?.addEventListener("click", () => {
      this.app.switchTab("home");
    });
  }

  handleGameOver() {
    this.stopFishermanSnore();

    const catSneaker = document.getElementById("cat-sneaker");
    if (catSneaker) {
      catSneaker.classList.add("cat-flee-anim");
    }

    const cardArea = document.getElementById("heist-card-area");
    if (!cardArea) return;

    cardArea.innerHTML = `
      <div class="heist-result-box gameover-box fade-in">
        <div class="result-icon-alarm">🎣💥😱</div>
        <h2>BALIKÇI UYANDI!</h2>
        <p class="result-desc">
          <em>"Hey! Orada ne oluyor?!"</em><br>
          3 hata yapınca balıkçı sıçradı ve kedi hızla karanlığa kaçtı!
        </p>
        <div class="result-tips">
          <p>💡 <strong>İpucu:</strong> Flashcard bölümünden kelimeleri bir kez daha inceleyip hafızanı tazeleyebilirsin.</p>
        </div>
        <div class="result-actions">
          <button class="secondary-action-btn" id="btn-retry-heist">Tekrar Dene</button>
          <button class="secondary-action-btn outline" id="btn-back-cards">Kartlara Bak</button>
        </div>
      </div>
    `;

    document.getElementById("btn-retry-heist")?.addEventListener("click", () => {
      this.start(this.currentPack);
    });

    document.getElementById("btn-back-cards")?.addEventListener("click", () => {
      this.app.switchTab("cards");
    });
  }
}

window.HeistGame = HeistGame;
