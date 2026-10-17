/**
 * Balık Hırsızı Kedi - Gardırop ve Aksesuar Sistemi (wardrobe.js)
 * 
 * Özellikler:
 * - Balıkçı şapkası, dedektif kasketi, bando şapkası (Kitauji dokunuşu), papyon ve altın tasma.
 * - Başarılı balık avlarıyla kazanılan balıklarla kilit açma.
 * - Seçilen aksesuarı anında kediye giydirme.
 */

const ACCESSORIES = [
  {
    id: "none",
    name: "Doğal Kürk",
    type: "hat",
    cost: 0,
    unlocked: true,
    description: "Sade, özgür ve rüzgarı hisseden tüyler.",
    icon: "🐱"
  },
  {
    id: "fisherman-hat",
    name: "Balıkçı Kasketi",
    type: "hat",
    cost: 1,
    unlocked: true,
    description: "İskele nöbetlerinde kamufle olmak için birebir.",
    icon: "👒",
    svg: `<path d="M 60 22 C 62 14 84 14 86 22 Z" fill="#2A9D8F" /><ellipse cx="73" cy="22" rx="15" ry="3.5" fill="#264653" />`
  },
  {
    id: "detective-hat",
    name: "Dedektif Şapkası",
    type: "hat",
    cost: 2,
    unlocked: false,
    description: "Kovadaki balıkların izini süren usta dedektif.",
    icon: "🕵️",
    svg: `<path d="M 62 20 Q 73 10 84 20 Z" fill="#6A4235" /><ellipse cx="73" cy="20" rx="16" ry="3" fill="#8D5B4C" />`
  },
  {
    id: "band-hat",
    name: "Kitauji Bando Şapkası",
    type: "hat",
    cost: 3,
    unlocked: false,
    description: "Euphonium melodileriyle ritim tutan müzisyen şapkası!",
    icon: "🎺",
    svg: `<rect x="64" y="10" width="18" height="12" fill="#1D3557" rx="2"/><ellipse cx="73" cy="22" rx="13" ry="2.5" fill="#E63946"/><line x1="64" y1="18" x2="82" y2="18" stroke="#E9D8A6" stroke-width="2"/>`
  },
  {
    id: "bowtie",
    name: "Kırmızı Papyon",
    type: "collar",
    cost: 1,
    unlocked: true,
    description: "Balık ziyafetlerine şık katılmak isteyen beyefendilere.",
    icon: "🎀",
    svg: `<polygon points="68,50 63,46 63,54" fill="#E63946"/><polygon points="78,50 83,46 83,54" fill="#E63946"/><circle cx="73" cy="50" r="2.5" fill="#D62828"/>`
  },
  {
    id: "gold-bell",
    name: "Altın Zilli Tasma",
    type: "collar",
    cost: 2,
    unlocked: false,
    description: "Gizlice avlanırken çalmaması için pamukla tıkandı!",
    icon: "🔔",
    svg: `<path d="M 64 48 Q 73 53 82 48" stroke="#E76F51" stroke-width="2.5" fill="none"/><circle cx="73" cy="51" r="3" fill="#E9C46A"/>`
  }
];

class WardrobeManager {
  constructor(app) {
    this.app = app;
  }

  renderWardrobe() {
    const container = document.getElementById("tab-wardrobe");
    if (!container) return;

    const currentHat = this.app.state.equippedHat || "none";
    const currentCollar = this.app.state.equippedCollar || "none";

    container.innerHTML = `
      <div class="wardrobe-screen">
        <div class="wardrobe-header">
          <h2>🐱 Kedi Gardırobu</h2>
          <div class="fish-currency-pill">
            <span class="fish-icon">🐟</span>
            <span id="wardrobe-fish-count">${this.app.state.fishCount} Balık</span>
          </div>
        </div>

        <!-- Önizleme Kartı -->
        <div class="wardrobe-preview-box">
          <div class="preview-cat-avatar" id="wardrobe-avatar-preview">
            ${this.renderCatWithAccessories(currentHat, currentCollar)}
          </div>
          <div class="preview-cat-caption">
            <strong>${this.app.state.catName}</strong> • ${this.app.getCatStatus().label}
          </div>
        </div>

        <!-- Aksesuar Seçim Listesi -->
        <div class="accessory-grid">
          ${ACCESSORIES.map(acc => {
            const isEquipped = (acc.type === "hat" && currentHat === acc.id) || (acc.type === "collar" && currentCollar === acc.id);
            const isUnlocked = this.app.state.unlockedAccessories.includes(acc.id) || acc.cost === 0;

            return `
              <div class="acc-card ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}" data-id="${acc.id}">
                <div class="acc-icon">${acc.icon}</div>
                <div class="acc-info">
                  <div class="acc-name">${acc.name}</div>
                  <div class="acc-desc">${acc.description}</div>
                  <div class="acc-price">
                    ${isUnlocked ? '<span class="status-owned">Sahipsin</span>' : `<span>🐟 ${acc.cost} Balık</span>`}
                  </div>
                </div>
                <button class="acc-action-btn ${isEquipped ? 'btn-equipped' : ''}" data-id="${acc.id}">
                  ${isEquipped ? 'Giydirildi' : (isUnlocked ? 'Giy' : 'Kilidi Aç')}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    // Buton dinleyicileri
    container.querySelectorAll(".acc-action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.handleAccessoryAction(id);
      });
    });
  }

  handleAccessoryAction(id) {
    const acc = ACCESSORIES.find(a => a.id === id);
    if (!acc) return;

    const isUnlocked = this.app.state.unlockedAccessories.includes(id) || acc.cost === 0;

    if (!isUnlocked) {
      // Satın al
      if (this.app.state.fishCount >= acc.cost) {
        this.app.state.fishCount -= acc.cost;
        this.app.state.unlockedAccessories.push(id);
        this.app.saveState();
        if (window.sound) window.sound.playVictory();
      } else {
        alert(`Bu aksesuar için ${acc.cost} balık gerekiyor! Daha fazla balık aşırmak için av moduna gir.`);
        return;
      }
    }

    // Giydir
    if (acc.type === "hat") {
      this.app.state.equippedHat = id;
    } else if (acc.type === "collar") {
      this.app.state.equippedCollar = id;
    }

    this.app.saveState();
    if (window.sound) window.sound.playPurr();
    this.renderWardrobe();
    this.app.updateHeaderStats();
  }

  renderCatWithAccessories(hatId, collarId) {
    const hat = ACCESSORIES.find(a => a.id === hatId);
    const collar = ACCESSORIES.find(a => a.id === collarId);

    const isChonky = this.app.state.catWeight > 6.0;

    return `
      <svg viewBox="0 0 120 100" class="cat-avatar-svg">
        <!-- Gövde -->
        <ellipse cx="60" cy="58" rx="${26 + (isChonky ? 7 : 0)}" ry="${20 + (isChonky ? 5 : 0)}" fill="#F4A261" />
        <ellipse cx="60" cy="58" rx="${19 + (isChonky ? 5 : 0)}" ry="${14 + (isChonky ? 4 : 0)}" fill="#FCEADE" />
        <!-- Kafa -->
        <circle cx="78" cy="38" r="16" fill="#F4A261" />
        <polygon points="72,25 76,12 82,25" fill="#E07A5F" />
        <polygon points="81,25 87,13 92,27" fill="#E07A5F" />
        <!-- Yüz -->
        <circle cx="75" cy="37" r="2" fill="#2B2D42" />
        <circle cx="83" cy="37" r="2" fill="#2B2D42" />
        <polygon points="79,40 77,39 81,39" fill="#E76F51" />
        <line x1="68" y1="40" x2="74" y2="41" stroke="#2B2D42" stroke-width="1.2" />
        <line x1="84" y1="41" x2="90" y2="40" stroke="#2B2D42" stroke-width="1.2" />
        <!-- Tasma Eklentisi -->
        ${collar && collar.svg ? collar.svg : ""}
        <!-- Şapka Eklentisi -->
        ${hat && hat.svg ? hat.svg : ""}
      </svg>
    `;
  }
}

window.WardrobeManager = WardrobeManager;
window.ACCESSORIES = ACCESSORIES;
