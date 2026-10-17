/**
 * Balık Hırsızı Kedi - Arkadaş Kulübü & Skor Tablosu (friends.js)
 * 
 * Halim-kun ve 2 arkadaşının (Deniz ve Kaan) oluşturduğu kedi çetesi.
 * Özellikler:
 * - Kedi ağırlığı & tombulluk ligi
 * - Günlük seri (Streak) ve kelime sayıları
 * - Takım Ortak Hedefi (Örn: Haftalık 150 Balık Aşırma)
 * - Arkadaşına pati atma / miyavlama dürtmesi
 */

class FriendsManager {
  constructor(app) {
    this.app = app;
    this.teamGoal = {
      target: 100,
      current: 68,
      rewardText: "Özel Korsan Göz Bandı 🏴‍☠️"
    };
  }

  getFriendsData() {
    // Halim-kun'un kendi güncel durumu
    const myWordsCount = Object.keys(this.app.state.learnedWords).length;

    return [
      {
        id: "halim",
        name: "Halim-kun (Sen)",
        catName: this.app.state.catName,
        catWeight: this.app.state.catWeight,
        streak: this.app.state.streakDays,
        wordsCount: myWordsCount,
        avatarIcon: "👑",
        status: "Liman Lideri"
      },
      {
        id: "deniz",
        name: "Deniz",
        catName: "Fındık",
        catWeight: 5.4,
        streak: 5,
        wordsCount: 24,
        avatarIcon: "🎨",
        status: "Tombiş Avcı"
      },
      {
        id: "kaan",
        name: "Kaan",
        catName: "Gölge",
        catWeight: 4.1,
        streak: 7,
        wordsCount: 30,
        avatarIcon: "⚡",
        status: "Çevik Casus"
      }
    ];
  }

  renderFriends() {
    const container = document.getElementById("tab-friends");
    if (!container) return;

    const friends = this.getFriendsData();

    container.innerHTML = `
      <div class="friends-screen">
        <div class="friends-header">
          <h2>🐾 Kedi Çetesi & Arkadaşlar</h2>
          <p class="friends-subtitle">Halim-kun ve ekibinin liman skor tablosu</p>
        </div>

        <!-- Takım Ortak Hedef Kartı -->
        <div class="team-goal-card">
          <div class="goal-info">
            <span class="goal-tag">HAFTALIK TAKIM HEDEFİ</span>
            <div class="goal-title">Liman Kovalarından 100 Balık Aşırma</div>
            <div class="goal-reward">Ödül: ${this.teamGoal.rewardText}</div>
          </div>
          <div class="goal-progress-wrap">
            <div class="goal-bar-track">
              <div class="goal-bar-fill" style="width: ${(this.teamGoal.current / this.teamGoal.target) * 100}%"></div>
            </div>
            <span class="goal-progress-text">${this.teamGoal.current} / ${this.teamGoal.target} Balık</span>
          </div>
        </div>

        <!-- Arkadaş Sıralama Listesi -->
        <div class="friends-list">
          ${friends.map((f, idx) => `
            <div class="friend-card ${f.id === 'halim' ? 'my-card' : ''}">
              <div class="friend-rank">${idx + 1}</div>
              <div class="friend-avatar">${f.avatarIcon}</div>
              <div class="friend-details">
                <div class="friend-top">
                  <strong>${f.name}</strong>
                  <span class="cat-tag">${f.catName} (${f.catWeight.toFixed(1)} kg)</span>
                </div>
                <div class="friend-bottom">
                  <span>🔥 ${f.streak} Gün Seri</span>
                  <span>📖 ${f.wordsCount} Kelime</span>
                </div>
              </div>
              <div class="friend-action">
                ${f.id !== 'halim' ? `
                  <button class="nudge-btn" data-name="${f.name}">
                    🐾 Miyavla
                  </button>
                ` : '<span class="you-badge">Sen</span>'}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Dayanışma Mesajı -->
        <div class="friends-footer-tip">
          💡 Arkadaşlarının kedileri tombullaştığında onlara spor yapmaları için bir pati atabilirsin!
        </div>
      </div>
    `;

    // Dürt / Miyavla butonu
    container.querySelectorAll(".nudge-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const friendName = btn.getAttribute("data-name");
        if (window.sound) window.sound.playMeow(1.3);
        alert(`🐾 ${friendName}'in kedisine sevimli bir miyavlama dürtmesi gönderdin!`);
      });
    });
  }
}

window.FriendsManager = FriendsManager;
