/**
 * Balık Hırsızı Kedi - Kelime Veritabanı (words-data.js)
 * 10'ar kelimelik tematik paketler halinde yapılandırılmıştır.
 * Flashcard anatomisi: Ön yüz (Görsel, Kelime, Telaffuz, Cümle) / Arka yüz (Türkçe, İpucu)
 */

const WORD_PACKS = [
  {
    id: "pack-1",
    title: "1. Paket: Meraklı Patiler & Günlük Macera",
    level: "A1-A2",
    theme: "Kediler, Ev ve Keşif",
    description: "Karakterimizin dünyasına ilk adım. Temel fiiller ve sevimli nesneler.",
    words: [
      {
        id: "w101",
        word: "sneak",
        phonetic: "/sniːk/",
        pos: "verb",
        meaning: "gizlice sokulmak, süzülmek",
        sentence: "The cat tried to sneak toward the fish bucket.",
        sentenceTr: "Kedi balık kovasına doğru gizlice sokulmaya çalıştı.",
        hint: "Gizlice yürürken parmak ucunda atılan adımları düşün.",
        icon: "🐾",
        svgType: "paw"
      },
      {
        id: "w102",
        word: "snore",
        phonetic: "/snɔːr/",
        pos: "verb",
        meaning: "horlamak",
        sentence: "The tired fisherman began to snore on his wooden chair.",
        sentenceTr: "Yorgun balıkçı ahşap sandalyesinde horlamaya başladı.",
        hint: "Zzz... balıkçı derin uykuda!",
        icon: "💤",
        svgType: "snore"
      },
      {
        id: "w103",
        word: "bucket",
        phonetic: "/ˈbʌk.ɪt/",
        pos: "noun",
        meaning: "kova",
        sentence: "A fresh silver fish was shining inside the bucket.",
        sentenceTr: "Kovanın içinde taptaze gümüş bir balık parlıyordu.",
        hint: "İçi su veya balık dolu kap.",
        icon: "🪣",
        svgType: "bucket"
      },
      {
        id: "w104",
        word: "curious",
        phonetic: "/ˈkjʊr.i.əs/",
        pos: "adj",
        meaning: "meraklı",
        sentence: "The curious kitten sniffed the mysterious bait.",
        sentenceTr: "Meraklı yavru kedi gizemli yemi kokladı.",
        hint: "Her deliğe burnunu sokan kedi bakışı.",
        icon: "🧐",
        svgType: "curious"
      },
      {
        id: "w105",
        word: "delicious",
        phonetic: "/dɪˈlɪʃ.əs/",
        pos: "adj",
        meaning: "lezzetli, nefis",
        sentence: "The grilled mackerel smelled so delicious.",
        sentenceTr: "Izgara uskumru o kadar lezzetli kokuyordu ki.",
        hint: "Ağzı sulandıran bir ziyafet.",
        icon: "🐟",
        svgType: "fish"
      },
      {
        id: "w106",
        word: "nap",
        phonetic: "/næp/",
        pos: "noun",
        meaning: "kestirme, şekerleme",
        sentence: "After eating the fish, he took a warm afternoon nap.",
        sentenceTr: "Balığı yedikten sonra ılık bir öğleden sonra kestirmesi yaptı.",
        hint: "Güneşin vurduğu minderde kısa tatlı bir uyku.",
        icon: "☀️",
        svgType: "nap"
      },
      {
        id: "w107",
        word: "clumsy",
        phonetic: "/ˈklʌm.zi/",
        pos: "adj",
        meaning: "sakar, patavatsız",
        sentence: "If you are clumsy, you might knock over the bucket!",
        sentenceTr: "Eğer sakar olursan kovayı devirebilirsin!",
        hint: "Ayağı kayıp gürültü çıkaran tombiş kedi.",
        icon: "💥",
        svgType: "clumsy"
      },
      {
        id: "w108",
        word: "whisper",
        phonetic: "/ˈwɪs.pər/",
        pos: "verb",
        meaning: "fısıldamak",
        sentence: "The wind whispered softly across the harbor.",
        sentenceTr: "Rüzgar liman boyunca usulca fısıldadı.",
        hint: "Balıkçıyı uyandırmamak için sessizce konuş.",
        icon: "🤫",
        svgType: "whisper"
      },
      {
        id: "w109",
        word: "reward",
        phonetic: "/rɪˈwɔːd/",
        pos: "noun",
        meaning: "ödül",
        sentence: "Your reward for being quiet is a fat juicy salmon.",
        sentenceTr: "Sessiz olmanın ödülü tombik ve sulu bir somondur.",
        hint: "Görev başarıldığında kazanılan kupa ya da lezzet.",
        icon: "🏆",
        svgType: "reward"
      },
      {
        id: "w110",
        word: "escape",
        phonetic: "/ɪˈskeɪp/",
        pos: "verb",
        meaning: "kaçmak, firar etmek",
        sentence: "Grab the fish and escape before he opens his eyes!",
        sentenceTr: "Gözlerini açmadan önce balığı kap ve kaç!",
        hint: "Patiyi alıp hızla uzaklaşmak.",
        icon: "💨",
        svgType: "escape"
      }
    ]
  },
  {
    id: "pack-2",
    title: "2. Paket: Tombul Kedi Spor Salonu & Enerji",
    level: "A2",
    theme: "Sağlık, Egzersiz ve Form Tutma",
    description: "Kedi çok balık yedi ve şişmanladı! Onu forma sokacak kelimeler.",
    words: [
      {
        id: "w201",
        word: "stretch",
        phonetic: "/stretʃ/",
        pos: "verb",
        meaning: "esnemek, gerinmek",
        sentence: "The cat stretched its long paws before morning exercise.",
        sentenceTr: "Kedi sabah egzersizinden önce uzun patilerini esnetti.",
        hint: "Uykudan uyanıp arka patileri geriye uzatmak.",
        icon: "🤸",
        svgType: "stretch"
      },
      {
        id: "w202",
        word: "heavy",
        phonetic: "/ˈhev.i/",
        pos: "adj",
        meaning: "ağır, kilolu",
        sentence: "He ate ten fish and became too heavy to jump.",
        sentenceTr: "On balık yedi ve zıplayamayacak kadar ağırlaştı.",
        hint: "Tartıda yukarı fırlayan ibre.",
        icon: "⚖️",
        svgType: "scale"
      },
      {
        id: "w203",
        word: "routine",
        phonetic: "/ruːˈtiːn/",
        pos: "noun",
        meaning: "günlük düzen, rutin",
        sentence: "Reviewing words every day became our morning routine.",
        sentenceTr: "Her gün kelimeleri tekrar etmek sabah rutinimiz oldu.",
        hint: "Her gün şaşmadan yapılan alışkanlık.",
        icon: "📅",
        svgType: "routine"
      },
      {
        id: "w204",
        word: "agile",
        phonetic: "/ˈædʒ.aɪl/",
        pos: "adj",
        meaning: "çevik, atak",
        sentence: "After training, the fluffy cat became agile again.",
        sentenceTr: "Antrenmandan sonra pofuduk kedi yeniden çevik oldu.",
        hint: "Çatıdan çatıya hafifçe sıçrayabilen.",
        icon: "⚡",
        svgType: "agile"
      },
      {
        id: "w205",
        word: "sweat",
        phonetic: "/swet/",
        pos: "verb",
        meaning: "terlemek",
        sentence: "Running on the treadmill made the chonky cat sweat.",
        sentenceTr: "Koşu bandında koşmak tombul kediyi terletti.",
        hint: "Egzersiz yaparken dökülen alın teri damlası.",
        icon: "💦",
        svgType: "sweat"
      },
      {
        id: "w206",
        word: "healthy",
        phonetic: "/ˈhel.θi/",
        pos: "adj",
        meaning: "sağlıklı, sıhhatli",
        sentence: "A balanced diet keeps your fur shiny and healthy.",
        sentenceTr: "Dengeli beslenme tüylerini parlak ve sağlıklı tutar.",
        hint: "Zinde ve taze bir bünye.",
        icon: "🥗",
        svgType: "healthy"
      },
      {
        id: "w207",
        word: "challenge",
        phonetic: "/ˈtʃæl.ɪndʒ/",
        pos: "noun",
        meaning: "meydan okuma, zorlu görev",
        sentence: "Losing weight is a fun challenge for our team.",
        sentenceTr: "Kilo vermek ekibimiz için eğlenceli bir meydan okuma.",
        hint: "Aşılması gereken heyecan verici engel.",
        icon: "🎯",
        svgType: "target"
      },
      {
        id: "w208",
        word: "jump",
        phonetic: "/dʒʌmp/",
        pos: "verb",
        meaning: "zıplamak, sıçramak",
        sentence: "He jumped over the fence with renewed energy.",
        sentenceTr: "Yenilenen enerjisiyle çitin üzerinden zıpladı.",
        hint: "Yerden yukarı yay gibi fırlamak.",
        icon: "🦘",
        svgType: "jump"
      },
      {
        id: "w209",
        word: "stamina",
        phonetic: "/ˈstæm.ɪ.nə/",
        pos: "noun",
        meaning: "dayanıklılık, kondisyon",
        sentence: "Spaced repetition practice builds great mental stamina.",
        sentenceTr: "Aralıklı tekrar pratiği harika bir zihinsel dayanıklılık kurar.",
        hint: "Yorulmadan yola devam edebilme gücü.",
        icon: "🔋",
        svgType: "battery"
      },
      {
        id: "w210",
        word: "proud",
        phonetic: "/praʊd/",
        pos: "adj",
        meaning: "gururlu, kıvançlı",
        sentence: "Halim-kun felt proud when the cat reached its target weight.",
        sentenceTr: "Kedi hedef kilosuna ulaştığında Halim-kun gurur duydu.",
        hint: "Başarı sonrası göğsü kabaran mutluluk.",
        icon: "✨",
        svgType: "proud"
      }
    ]
  },
  {
    id: "pack-3",
    title: "3. Paket: Gece Limanı & Balıkçı Gizemleri",
    level: "B1",
    theme: "Liman, Deniz ve Macera",
    description: "İskele rıhtımında esrarengiz bir gece. İleri düzey ifadeler.",
    words: [
      {
        id: "w301",
        word: "shadow",
        phonetic: "/ˈʃæd.əʊ/",
        pos: "noun",
        meaning: "gölge",
        sentence: "The cat blended into the shadow under the dock.",
        sentenceTr: "Kedi iskelenin altındaki gölgeye karıştı.",
        hint: "Işığın arkasında kalan koyuluk.",
        icon: "🌑",
        svgType: "shadow"
      },
      {
        id: "w302",
        word: "distract",
        phonetic: "/dɪˈstrækt/",
        pos: "verb",
        meaning: "dikkatini dağıtmak",
        sentence: "A falling leaf distracted the guard for two seconds.",
        sentenceTr: "Düşen bir yaprak iki saniyeliğine nöbetçinin dikkatini dağıttı.",
        hint: "Gözü başka tarafa çevirtmek.",
        icon: "🍂",
        svgType: "distract"
      },
      {
        id: "w303",
        word: "treasure",
        phonetic: "/ˈtreʒ.ər/",
        pos: "noun",
        meaning: "hazine, değerli ganimet",
        sentence: "To our feline hero, that bucket of sardines was treasure.",
        sentenceTr: "Kedi kahramanımız için o sardalya kovası bir hazineydi.",
        hint: "Sandıktaki veya kovadaki paha biçilmez şey.",
        icon: "💎",
        svgType: "treasure"
      },
      {
        id: "w304",
        word: "cautious",
        phonetic: "/ˈkɔː.ʃəs/",
        pos: "adj",
        meaning: "temkinli, tedbirli",
        sentence: "Be cautious when taking the third step.",
        sentenceTr: "Üçüncü adımı atarken temkinli ol.",
        hint: "Her ihtimale karşı uyanık davranmak.",
        icon: "⚠️",
        svgType: "cautious"
      },
      {
        id: "w305",
        word: "breeze",
        phonetic: "/briːz/",
        pos: "noun",
        meaning: "tatlı esinti, meltem",
        sentence: "A salty sea breeze chilled the wooden pier.",
        sentenceTr: "Tuzlu bir deniz meltemi ahşap iskeleyi serinletti.",
        hint: "Yüzü okşayan serin rüzgâr.",
        icon: "🌬️",
        svgType: "breeze"
      },
      {
        id: "w306",
        word: "glance",
        phonetic: "/ɡlɑːns/",
        pos: "verb",
        meaning: "hızlıca göz atmak, süzmek",
        sentence: "The fisherman glanced around, but saw nothing.",
        sentenceTr: "Balıkçı etrafına hızlıca bir göz attı ama hiçbir şey görmedi.",
        hint: "Bir anlığına bakıp geçmek.",
        icon: "👀",
        svgType: "glance"
      },
      {
        id: "w307",
        word: "silent",
        phonetic: "/ˈsaɪ.lənt/",
        pos: "adj",
        meaning: "sessiz, çıt çıkarmayan",
        sentence: "Velvet paws allow completely silent movement.",
        sentenceTr: "Kadife patiler tamamen sessiz harekete olanak tanır.",
        hint: "Gecenin sessizliği.",
        icon: "🔇",
        svgType: "silent"
      },
      {
        id: "w308",
        word: "patience",
        phonetic: "/ˈpeɪ.ʃəns/",
        pos: "noun",
        meaning: "sabır, sebat",
        sentence: "Stealing fish requires great patience and timing.",
        sentenceTr: "Balık aşırmak büyük bir sabır ve zamanlama gerektirir.",
        hint: "Doğru anı beklemeyi bilmek.",
        icon: "⏳",
        svgType: "patience"
      },
      {
        id: "w309",
        word: "victory",
        phonetic: "/ˈvɪk.tər.i/",
        pos: "noun",
        meaning: "zafer, galibiyet",
        sentence: "They celebrated their midnight victory with a feast.",
        sentenceTr: "Gece yarısı zaferlerini bir ziyafetle kutladılar.",
        hint: "Bütün soruları bilip balığı kapma sevinci.",
        icon: "🎉",
        svgType: "victory"
      },
      {
        id: "w310",
        word: "memory",
        phonetic: "/ˈmem.ər.i/",
        pos: "noun",
        meaning: "hafıza, anı",
        sentence: "Repeat the words so they stick permanently in your memory.",
        sentenceTr: "Kelimeleri tekrar et ki hafızanda kalıcı olarak yer etsin.",
        hint: "Unutulmayan, zihinde korunan bilgi.",
        icon: "🧠",
        svgType: "brain"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORD_PACKS };
}
