/**
 * Balık Hırsızı Kedi - Tombul Kedi Spor Salonu & Aralıklı Tekrar (game-gym.js)
 * 
 * Spaced Repetition (Aralıklı Tekrar) Mekaniği:
 * - Kedi balık yedikçe şişmanlar (3.5 kg -> 4.5 kg -> 6.8 kg -> 9.0 kg Chonky!).
 * - Çok kilo alınca kedi tembelleşir, hareket kabiliyeti düşer.
 * - Kediye spor ve diyet yaptırmak için eski kelimeler tekrar edilir.
 * - Her doğru tekrarda kedi kalori yakar, ip atlar/koşar ve kilosu düşerek fit forma yaklaşır!
 */

class GymGame {
  constructor(app) {
    this.app = app;
    this.reviewWords = [];
    this.currentIndex = 0;
    this.targetWeight = 3.8; // İdeal fit kedi kilosu
    this.repsCompleted = 0;
    this.totalReps = 5;
  }

  start() {
    // Öğrenilmiş kelimelerden tekrar havuzu oluştur
    const learnedIds = Object.keys(this.app.state.learnedWords);
    const allWords = this.app.getAllWords();

    if (learnedIds.length === 0) {
      // Henüz öğrenilen kelime yoksa mevcut kelimelerden pratik yaptır
      this.reviewWords = allWords.slice(0, 5);
    } else {
      // Öğrenilen kelimelerden en az tekrar edilen veya rastgele 5 kelime seç
      const learned = allWords.filter(w => learnedIds.includes(w.id));
      this.reviewWords = [...learned].sort(() => Math.random() - 0.5).slice(0, 5);
      if (this.reviewWords.length < 5) {
        // Eksik kalanları diğer kelimelerle tamamla
        const others = allWords.filter(w => !learnedIds.includes(w.id));
        this.reviewWords.push(...others.slice(0, 5 - this.reviewWords.length));
      }
    }

    this.currentIndex = 0;
    this.repsCompleted = 0;
    this.totalReps = this.reviewWords.length;

    this.renderGymView();
    this.loadExercise();

    if (window.sound) {
      window.sound.playWhistle();
    }
  }

  renderGymView() {
    const container = document.getElementById("tab-gym");
    if (!container) return;

    const catStatus = this.app.getCatStatus();

    container.innerHTML = `
      <div class="gym-screen">
        <!-- Başlık & Kilo Durum Çubuğu -->
        <div class="gym-topbar">
          <div class="gym-badge">
            <span class="gym-icon">🏋️</span> Tombul Kedi Antrenmanı
          </div>
          <div class="gym-scale-pill">
            <span class="scale-icon">⚖️</span>
            <span id="gym-weight-display">${this.app.state.catWeight.toFixed(1)} kg</span>
            <span class="weight-label">(${catStatus.label})</span>
          </div>
        </div>

        <!-- Spor Salonu Sahnesi: Koşu Bandı / İp Atlama & Terleyen Kedi -->
        <div class="gym-stage">
          <div class="gym-backdrop">
            <div class="gym-clock">⏱️ 08:00 AM</div>
            <div class="gym-banner">SPOR VE DİYET ZAMANI!</div>
          </div>

          <div class="cat-workout-container" id="cat-workout-box">
            <!-- Ter Damlası -->
            <div class="sweat-drop" id="sweat-drop">💦</div>

            <!-- Kedi Egzersiz Görseli -->
            <div class="cat-gym-sprite ${this.app.state.catWeight > 6.0 ? 'extra-chonk' : 'fit-mode'}" id="cat-gym-sprite">
              <svg viewBox="0 0 120 100" class="gym-cat-svg">
                <!-- Egzersiz Bandanası -->
                <path d="M 68 28 Q 78 22 88 28" stroke="#E63946" stroke-width="4" fill="none" stroke-linecap="round" />
                <!-- Gövde -->
                <ellipse cx="60" cy="58" rx="${28 + (this.app.state.catWeight - 3.5) * 4}" ry="${22 + (this.app.state.catWeight - 3.5) * 3}" fill="#F4A261" />
                <ellipse cx="60" cy="60" rx="${22 + (this.app.state.catWeight - 3.5) * 3}" ry="${16 + (this.app.state.catWeight - 3.5) * 2}" fill="#FCEADE" />
                <!-- Kafa -->
                <circle cx="78" cy="38" r="17" fill="#F4A261" />
                <!-- Kulaklar -->
                <polygon points="72,24 77,10 83,24" fill="#E07A5F" />
                <polygon points="82,24 88,11 93,26" fill="#E07A5F" />
                <!-- Gözler (Azimli sporcu bakışı) -->
                <path d="M 74 36 L 79 38" stroke="#2B2D42" stroke-width="2" stroke-linecap="round" />
                <path d="M 83 38 L 88 36" stroke="#2B2D42" stroke-width="2" stroke-linecap="round" />
                <circle cx="76" cy="39" r="1.5" fill="#2B2D42" />
                <circle cx="85" cy="39" r="1.5" fill="#2B2D42" />
                <!-- Pembe Yanaklar -->
                <circle cx="72" cy="43" r="3" fill="#FFB4A2" opacity="0.7" />
                <circle cx="88" cy="43" r="3" fill="#FFB4A2" opacity="0.7" />
                <!-- Bıyıklar -->
                <line x1="66" y1="42" x2="72" y2="43" stroke="#2B2D42" stroke-width="1.2" />
                <line x1="88" y1="43" x2="94" y2="42" stroke="#2B2D42" stroke-width="1.2" />
                <!-- Ağırlık / Dambıl veya İp -->
                <rect x="42" y="52" width="6" height="18" fill="#457B9D" rx="2" class="gym-dumbbell" />
                <rect x="74" y="52" width="6" height="18" fill="#457B9D" rx="2" class="gym-dumbbell" />
                <line x1="45" y1="61" x2="77" y2="61" stroke="#A8DADC" stroke-width="3" />
                <!-- Koşu Bandı Zemin -->
                <rect x="15" y="86" width="90" height="8" rx="4" fill="#343A40" />
                <line x1="20" y1="90" x2="100" y2="90" stroke="#6C757D" stroke-width="2" stroke-dasharray="4,4" class="treadmill-stripes" />
              </svg>
            </div>
          </div>

          <!-- İlerleme Çubuğu -->
          <div class="gym-rep-meter">
            <div class="rep-label">Tekrar Hedefi: <strong id="gym-rep-count">${this.repsCompleted} / ${this.totalReps}</strong> Set</div>
            <div class="rep-progress-track">
              <div class="rep-progress-bar" id="gym-rep-bar" style="width: ${(this.repsCompleted / this.totalReps) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Egzersiz Soru Kartı -->
        <div class="gym-card-area" id="gym-card-area">
          <!-- Dinamik egzersiz sorusu -->
        </div>
      </div>
    `;
  }

  loadExercise() {
    if (this.currentIndex >= this.reviewWords.length) {
      this.handleGymWorkoutComplete();
      return;
    }

    const word = this.reviewWords[this.currentIndex];
    const cardArea = document.getElementById("gym-card-area");
    if (!cardArea) return;

    // Seçenekler için çeldiriciler
    const allWords = this.app.getAllWords().filter(w => w.id !== word.id);
    const distractors = [...allWords].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [
      { text: word.meaning, correct: true },
      ...distractors.map(d => ({ text: d.meaning, correct: false }))
    ].sort(() => Math.random() - 0.5);

    cardArea.innerHTML = `
      <div class="gym-quiz-box fade-in">
        <div class="gym-word-header">
          <span class="gym-icon-sm">🏃‍♂️</span>
          <h2 class="gym-target-word">${word.word}</h2>
          <button class="quiz-speak-btn" id="gym-speak-btn">🔊</button>
        </div>
        <p class="gym-example-prompt">"${word.sentence}"</p>
        <p class="gym-instruction">Bu kelimenin doğru anlamını seçerek kediyi koştur!</p>

        <div class="gym-options-grid">
          ${options.map((opt, idx) => `
            <button class="gym-opt-btn" data-correct="${opt.correct}">
              ${opt.text}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("gym-speak-btn")?.addEventListener("click", () => {
      if (window.sound) window.sound.speakText(word.word);
    });

    const optButtons = cardArea.querySelectorAll(".gym-opt-btn");
    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-correct") === "true";
        this.handleExerciseAnswer(isCorrect, btn, optButtons);
      });
    });
  }

  handleExerciseAnswer(isCorrect, chosenBtn, allButtons) {
    if (isCorrect) {
      chosenBtn.classList.add("correct-btn");
      this.repsCompleted++;

      // Kedi kilo verir (-0.15 kg)
      this.app.burnCatCalories(0.15);

      if (window.sound) {
        window.sound.playStep();
        window.sound.playWhistle();
      }

      // Animasyonları tetikle
      const catSprite = document.getElementById("cat-gym-sprite");
      const sweat = document.getElementById("sweat-drop");
      if (catSprite) {
        catSprite.classList.add("workout-boost");
        setTimeout(() => catSprite.classList.remove("workout-boost"), 500);
      }
      if (sweat) {
        sweat.classList.add("sweat-splash");
        setTimeout(() => sweat.classList.remove("sweat-splash"), 500);
      }

      // UI Güncelle
      this.updateGymStats();

      setTimeout(() => {
        this.currentIndex++;
        this.loadExercise();
      }, 700);

    } else {
      chosenBtn.classList.add("wrong-btn");
      allButtons.forEach(b => {
        if (b.getAttribute("data-correct") === "true") b.classList.add("reveal-correct-btn");
      });

      if (window.sound) {
        window.sound.playWrong();
      }

      setTimeout(() => {
        this.currentIndex++;
        this.loadExercise();
      }, 1000);
    }
  }

  updateGymStats() {
    const weightDisplay = document.getElementById("gym-weight-display");
    if (weightDisplay) {
      weightDisplay.innerText = `${this.app.state.catWeight.toFixed(1)} kg`;
    }

    const repCount = document.getElementById("gym-rep-count");
    if (repCount) {
      repCount.innerText = `${this.repsCompleted} / ${this.totalReps} Set`;
    }

    const repBar = document.getElementById("gym-rep-bar");
    if (repBar) {
      repBar.style.width = `${(this.repsCompleted / this.totalReps) * 100}%`;
    }
  }

  handleGymWorkoutComplete() {
    if (window.sound) {
      window.sound.playVictory();
      window.sound.playPurr();
    }

    const cardArea = document.getElementById("gym-card-area");
    if (!cardArea) return;

    const burnedWeight = (this.repsCompleted * 0.15).toFixed(1);
    const catStatus = this.app.getCatStatus();

    cardArea.innerHTML = `
      <div class="gym-result-box fade-in">
        <div class="gym-result-icon">🥇✨🐱</div>
        <h2>ANTRENMAN TAMAMLANDI!</h2>
        <p class="gym-result-text">
          Aralıklı tekrar seti başarıyla bitti! Kedi harika bir kardiyo yaptı ve 
          <strong>-${burnedWeight} kg</strong> vererek daha çevik hale geldi.
        </p>
        <div class="gym-status-badge">
          Yeni Form: <strong>${catStatus.label} (${this.app.state.catWeight.toFixed(1)} kg)</strong>
        </div>
        <div class="result-actions">
          <button class="primary-action-btn" id="btn-gym-finish">Kampa Dön</button>
        </div>
      </div>
    `;

    document.getElementById("btn-gym-finish")?.addEventListener("click", () => {
      this.app.switchTab("home");
    });
  }
}

window.GymGame = GymGame;
