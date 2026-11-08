"use strict";

const elements = {
  label: document.querySelector("#season-label"),
  title: document.querySelector("#page-title"),
  message: document.querySelector("#season-message"),
  emoji: document.querySelector("#season-emoji"),
  caption: document.querySelector("#countdown-caption"),
  today: document.querySelector("#today-label"),
  footer: document.querySelector("#footer-message"),
  footerEmoji: document.querySelector("#footer-emoji"),
  footerEmojiEnd: document.querySelector("#footer-emoji-end"),
  note: document.querySelector("#elf-note"),
  extra: document.querySelector("#seasonal-extra"),
  layer: document.querySelector("#surprise-layer"),
  card: document.querySelector(".countdown-card"),
  windows: document.querySelectorAll(".house-window"),
  language: document.querySelector("#language-select"),
  sound: document.querySelector("#sound-toggle"),
  flight: document.querySelector("#flight-layer"),
  hero: document.querySelector("#hero-layout"),
  flightLaugh: document.querySelector("#flight-laugh-text")
};

const values = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

const themes = {
  nikolaus: { accent: "#bd8067", soft: "#f8e9dc" },
  christmas: { accent: "#8da98d", soft: "#eaf2e8" },
  newyear: { accent: "#aa91c9", soft: "#f0eafa" },
  spring: { accent: "#e99cae", soft: "#fdebf0" },
  summer: { accent: "#e4ae61", soft: "#fff2d6" },
  halloween: { accent: "#9b82c4", soft: "#efe9f8" }
};

const surprises = {
  nikolaus: [
    { emoji: "🌿", kind: "wiggle", position: "bottom" },
    { emoji: "✨", kind: "sparkle", position: "random" },
    { emoji: "🥾", kind: "pop", position: "bottom" }
  ],
  christmas: [
    { emoji: "❄️", kind: "rain", position: "random" },
    { emoji: "🧝", kind: "wave", position: "bottom" },
    { emoji: "✨", kind: "sparkle", position: "random" }
  ],
  newyear: [
    { emoji: "🎆", kind: "pop", position: "random" },
    { emoji: "✨", kind: "sparkle", position: "random" },
    { emoji: "🎇", kind: "pop", position: "top" }
  ],
  spring: [
    { emoji: "🐰", kind: "wave", position: "bottom" },
    { emoji: "🥚", kind: "pop", position: "random" },
    { emoji: "🌸", kind: "rain", position: "random" },
    { emoji: "🦋", kind: "wave", position: "middle" }
  ],
  summer: [
    { emoji: "☀️", kind: "sparkle", position: "top" },
    { emoji: "🦋", kind: "wave", position: "middle" },
    { emoji: "🌼", kind: "pop", position: "random" }
  ],
  halloween: [
    { emoji: "👻", kind: "wave", position: "middle" },
    { emoji: "🎃", kind: "wiggle", position: "bottom" },
    { emoji: "🧟", kind: "wave", position: "bottom" },
    { emoji: "✨", kind: "sparkle", position: "random" }
  ]
};

const translations = {
  de: {
    brand: "Kleine Jahreszeiten-Magie", languageLabel: "Sprache auswählen",
    days: "Tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden",
    guideKicker: "KLEINE VORFREUDE FÜRS GANZE JAHR",
    guideTitle: "Was bringt die nächste Zeit?",
    guideIntro: "Die kleinen Szenen wechseln mit dem Kalender – und jede Jahreszeit hat ihre eigene Überraschung.",
    christmasGuideTitle: "Dezemberzauber",
    christmasGuideText: "Ab dem 1. Dezember schaut der Wichtel aus seiner Tür. Um Mitternacht hinterlässt er manchmal einen kleinen Streich. Ab dem 7. Dezember zählt die Uhr bis Heiligabend – mit Schnee, Elf und Weihnachtsmann.",
    yearGuideTitle: "Das ganze Jahr",
    yearGuideText: "Zu Silvester funkeln kleine Feuerwerke, im Frühling hoppelt der Osterhase, im Sommer flattern Schmetterlinge und im Herbst wird es spooky-cute.",
    footerLeft: "Mit einer Prise Glitzer gemacht", footerRight: "und ganz viel Gemütlichkeit",
    elfNote: "Hihi, der Wichtel war da! ✨",
    soundOn: "Ton ausschalten", soundOff: "Ton einschalten",
    seasons: {
      nikolaus: {
        label: "DIE GEMÜTLICHE NIKOLAUSZEIT", title: "Der Nikolaus kommt<br>bald vorbei!",
        message: "Mach es dir kuschelig – der Nikolaus schaut bald mit seinem Sack an der Haustür vorbei.",
        caption: "bis zum Nikolaustag", footer: "Ein warmer Kakao und ein bisschen Vorfreude? Klingt perfekt."
      },
      christmas: {
        label: "KLEINE WICHTEL-WERKSTATT", title: "Weihnachten ist<br>schon ganz nah 🎄",
        message: "Der Wichtel werkelt hinter seiner Tür. Manchmal rieselt Schnee oder ein Elf winkt herein.",
        caption: "bis Heiligabend", footer: "Psst … vielleicht war der Wichtel heute Nacht schon da."
      },
      holidays: {
        label: "DIE ALLERSCHÖNSTE ZEIT", title: "Frohe Weihnachten!<br>Mach es dir schön 🎄",
        message: "Der Wichtel hinterlässt kleine Überraschungen, während du die Weihnachtstage genießt.",
        caption: "bis zum Ende der Weihnachtstage", footer: "Der Wichtel wünscht dir ganz viel Weihnachtszauber."
      },
      newyear: {
        label: "KLEINE SILVESTER-MAGIE", title: "Das neue Jahr<br>funkelt schon! 🎆",
        message: "Bald funkelt der Himmel und ein frisches, neues Jahr beginnt.",
        caption: "bis zum Neujahr", footer: "Auf all die schönen kleinen Dinge, die kommen."
      },
      newyearAfter: {
        label: "EIN FUNKELNDER NEUANFANG", title: "Hallo, neues Jahr!<br>Wie schön, dass du da bist ✨",
        message: "Ein ganz neues Kapitel wartet auf dich – mit vielen kleinen Glücksmomenten.",
        caption: "bis zum nächsten Neujahr", footer: "Auf all die schönen kleinen Dinge, die kommen."
      },
      spring: {
        label: "FRÜHLING UND OSTERZAUBER", title: "Der Frühling<br>hoppelt herbei 🌷",
        message: "Bald wird alles wieder bunt – und irgendwo versteckt sich bestimmt ein Osterei.",
        caption: "bis zum Ostersonntag", footer: "Sonne im Herzen, Blümchen am Wegesrand."
      },
      summer: {
        label: "KLEINE SOMMERPAUSE", title: "Sonnenschein und<br>Schmetterlingszeit ☀️",
        message: "Genieß die langen Tage – der nächste kleine Zauber wartet schon am Horizont.",
        caption: "bis zum Halloween-Zauber", footer: "Sammle Sonnenstrahlen und schöne Erinnerungen."
      },
      halloween: {
        label: "SPOOKY-CUTE-ZEIT", title: "Ein kleines bisschen<br>Spuk liegt in der Luft 👻",
        message: "Keine Angst – hier sind die Geister ganz lieb und die Kürbisse kichern nur.",
        caption: "bis Halloween", footer: "Süßes, sanftes Gruseln und ganz viel Kuscheldecke."
      }
    }
  },
  en: {
    brand: "Little Seasonal Magic", languageLabel: "Choose language",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    guideKicker: "A LITTLE SOMETHING TO LOOK FORWARD TO",
    guideTitle: "What magic is coming next?",
    guideIntro: "The little scenes change with the calendar, and every season brings its own surprise.",
    christmasGuideTitle: "December magic",
    christmasGuideText: "From December 1, a tiny elf peeks out of the little door. At midnight, there may be a tiny prank. From December 7, count down to Christmas Eve with snow, an elf, and Santa.",
    yearGuideTitle: "All through the year",
    yearGuideText: "Enjoy tiny fireworks for New Year's, a hopping bunny in spring, butterflies in summer, and sweet, spooky surprises in autumn.",
    footerLeft: "Made with a little sparkle", footerRight: "and lots of cozy",
    elfNote: "Hehe, the little elf has been here! ✨",
    soundOn: "Turn sound off", soundOff: "Turn sound on",
    seasons: {
      nikolaus: {
        label: "COZY ST. NICHOLAS SEASON", title: "St. Nicholas is<br>coming soon!",
        message: "Get cozy — St. Nicholas will soon stop by the front door with his gift sack.",
        caption: "until St. Nicholas Day", footer: "A warm cocoa and a little anticipation? Sounds lovely."
      },
      christmas: {
        label: "THE LITTLE ELF WORKSHOP", title: "Christmas is<br>just around the corner 🎄",
        message: "The elf is busy behind the little door. Sometimes snow falls or an elf waves hello.",
        caption: "until Christmas Eve", footer: "Psst … maybe the elf visited while you were asleep."
      },
      holidays: {
        label: "THE MOST WONDERFUL DAYS", title: "Merry Christmas!<br>Make yourself cozy 🎄",
        message: "The elf is leaving little surprises while you enjoy the Christmas holidays.",
        caption: "until the holidays wind down", footer: "The elf wishes you a little extra Christmas magic."
      },
      newyear: {
        label: "A LITTLE NEW YEAR'S MAGIC", title: "The new year is<br>already sparkling! 🎆",
        message: "Soon the sky will sparkle and a fresh new year will begin.",
        caption: "until New Year's Day", footer: "Here's to all the lovely little things still to come."
      },
      newyearAfter: {
        label: "A SPARKLING NEW BEGINNING", title: "Hello, new year!<br>We're glad you're here ✨",
        message: "A brand-new chapter is waiting, filled with lots of little happy moments.",
        caption: "until next New Year's Day", footer: "Here's to all the lovely little things still to come."
      },
      spring: {
        label: "SPRINGTIME AND EASTER MAGIC", title: "Spring is<br>hopping our way 🌷",
        message: "Soon everything will turn colourful, and a little Easter egg may be hiding nearby.",
        caption: "until Easter Sunday", footer: "Sunshine in your heart and flowers along the way."
      },
      summer: {
        label: "A LITTLE SUMMER BREAK", title: "Sunshine and<br>butterfly days ☀️",
        message: "Enjoy the long days — the next little bit of magic is just around the corner.",
        caption: "until Halloween magic", footer: "Collect sunshine and lovely memories."
      },
      halloween: {
        label: "SPOOKY-CUTE SEASON", title: "A tiny bit of<br>friendly fright is in the air 👻",
        message: "No worries — these ghosts are sweet, and the pumpkins only giggle.",
        caption: "until Halloween", footer: "Sweet, gentle spooks and a very cozy blanket."
      }
    }
  }
};

let language = "de";
let soundEnabled = false;
let audioContext;
let nightMode = false;

function localDate(year, month, day) {
  return new Date(year, month, day, 0, 0, 0, 0);
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return localDate(year, month - 1, day);
}

function getSeason(now) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  if (month === 10 || (month === 11 && day <= 6)) {
    return seasonWithCopy("nikolaus", localDate(year, 11, 6), "nikolaus");
  }

  if (month === 11 && day <= 23) {
    return seasonWithCopy("christmas", localDate(year, 11, 24), "christmas");
  }

  if (month === 11 && day <= 26) {
    return seasonWithCopy("christmas", localDate(year, 11, 27), "holidays");
  }

  if (month === 11 && day >= 27) {
    return seasonWithCopy("newyear", localDate(year + 1, 0, 1), "newyear");
  }

  if (month === 0 && day === 1) {
    return seasonWithCopy("newyear", localDate(year + 1, 0, 1), "newyearAfter");
  }

  if (month <= 3) {
    let target = easterSunday(year);
    if (target < localDate(year, month, day)) target = easterSunday(year + 1);
    return seasonWithCopy("spring", target, "spring");
  }

  if (month >= 4 && month <= 7) {
    return seasonWithCopy("summer", localDate(year, 9, 31), "summer");
  }

  return seasonWithCopy("halloween", localDate(year, 9, 31), "halloween");
}

function seasonWithCopy(id, target, copyKey) {
  const copy = translations[language].seasons[copyKey];
  const seasonalArt = {
    nikolaus: ["🥾", "☕", "✨"],
    christmas: ["🎄", "🚪", "✨"],
    holidays: ["🎁", "🧝", "💚"],
    newyear: ["🎆", "✨", "🥂"],
    newyearAfter: ["🎆", "✨", "🥂"],
    spring: ["🌷", "🌼", "☀️"],
    summer: ["🦋", "🍓", "☀️"],
    halloween: ["🎃", "🦇", "🍬"]
  }[copyKey];
  return { id, target, ...copy, emoji: seasonalArt[0], footerEmoji: seasonalArt[1], footerEnd: seasonalArt[2] };
}

function updateTheme(season) {
  const theme = themes[season.id];
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-soft", theme.soft);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme.soft);
  elements.card.dataset.season = season.id;
  elements.extra.textContent = isWichtelSeason(new Date()) ? "🚪" : "";
  document.body.classList.toggle("has-nicholas-boots", season.id === "nikolaus");
  document.body.classList.toggle("has-santa-season", season.id === "nikolaus" || season.id === "christmas");
  document.body.classList.toggle("snow-season", ["nikolaus", "christmas", "newyear"].includes(season.id));
}

function isWichtelSeason(date) {
  return date.getMonth() === 11 && date.getDate() >= 1 && date.getDate() <= 26;
}

function updatePage(now, season, atMidnight = false) {
  const previousSeason = elements.card.dataset.season;
  if (previousSeason && previousSeason !== season.id) {
    elements.hero.classList.remove("season-transition");
    void elements.hero.offsetWidth;
    elements.hero.classList.add("season-transition");
    window.setTimeout(() => elements.hero.classList.remove("season-transition"), 1200);
  }

  const copy = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = copy[key];
    if (key === "languageLabel") elements.language.setAttribute("aria-label", copy[key]);
  });
  elements.label.textContent = season.label;
  elements.title.innerHTML = season.title;
  elements.message.textContent = season.message;
  elements.caption.textContent = season.caption;
  elements.emoji.textContent = season.emoji;
  elements.footer.textContent = season.footer;
  elements.footerEmoji.textContent = season.footerEmoji;
  elements.footerEmojiEnd.textContent = season.footerEnd;
  elements.today.textContent = new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-GB", {
    weekday: "long", day: "numeric", month: "long"
  }).format(now);
  document.title = language === "de" ? "Kleine Jahreszeiten-Magie" : "Little Seasonal Magic";
  elements.flightLaugh.textContent = language === "de" ? "Ho ho ho!" : "Ho ho ho!";
  updateSoundControl();
  updateTheme(season);
  applyTodaysPrank(now, atMidnight);
}

function updateCountdown(now, target) {
  let remaining = Math.max(0, target.getTime() - now.getTime());
  document.body.classList.toggle("last-24-hours", remaining > 0 && remaining <= 86400000);
  const valuesNow = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };

  for (const [unit, value] of Object.entries(valuesNow)) {
    const formatted = String(value).padStart(2, "0");
    if (values[unit].textContent !== formatted) {
      values[unit].textContent = formatted;
      values[unit].classList.remove("tick");
      void values[unit].offsetWidth;
      values[unit].classList.add("tick");
    }
  }
}

function showSurprise() {
  const season = getSeason(new Date());
  const options = surprises[season.id];
  const surprise = options[Math.floor(Math.random() * options.length)];
  const sprite = document.createElement("span");
  sprite.className = `surprise ${surprise.kind}`;
  sprite.textContent = surprise.emoji;

  if (surprise.position === "random") {
    sprite.style.left = `${8 + Math.random() * 78}%`;
    sprite.style.top = `${10 + Math.random() * 70}%`;
  } else if (surprise.position === "top") {
    sprite.style.left = `${18 + Math.random() * 64}%`;
    sprite.style.top = "8%";
  } else if (surprise.position === "bottom") {
    sprite.style.left = `${8 + Math.random() * 78}%`;
    sprite.style.top = "78%";
  } else {
    sprite.style.top = `${25 + Math.random() * 40}%`;
  }

  elements.layer.append(sprite);
  playChime("sparkle");
  window.setTimeout(() => sprite.remove(), 7500);
}

function scheduleSurprise() {
  const delay = 10000 + Math.random() * 20000;
  window.setTimeout(() => {
    showSurprise();
    scheduleSurprise();
  }, delay);
}

function showSanta() {
  const season = getSeason(new Date()).id;
  if (season !== "nikolaus" && season !== "christmas") return;
  document.body.classList.remove("santa-rings");
  void document.body.offsetWidth;
  document.body.classList.add("santa-rings");
  playChime("bell");
  window.setTimeout(() => document.body.classList.remove("santa-rings"), 8200);
}

function scheduleSanta(delay = 1200) {
  window.setTimeout(() => {
    showSanta();
    scheduleSanta(22000 + Math.random() * 26000);
  }, delay);
}

function flySanta() {
  const season = getSeason(new Date()).id;
  if (!["nikolaus", "christmas", "newyear"].includes(season)) return;
  elements.flight.classList.remove("flying");
  void elements.flight.offsetWidth;
  elements.flight.classList.add("flying");
  playChime("sleigh");
  sayHoHoHo();
  window.setTimeout(() => elements.flight.classList.remove("flying"), 12500);
}

function scheduleSantaFlight(delay = 16000) {
  window.setTimeout(() => {
    flySanta();
    scheduleSantaFlight(35000 + Math.random() * 40000);
  }, delay);
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return null;
    audioContext = new AudioContextConstructor();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playChime(kind) {
  if (!soundEnabled) return;
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const notes = kind === "bell" ? [880, 1174] : kind === "sleigh" ? [659, 784, 988] : [784, 988];
  notes.forEach((frequency, index) => {
    const start = now + index * 0.13;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(kind === "bell" ? 0.055 : 0.035, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.48);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.5);
  });
}

function sayHoHoHo() {
  if (!soundEnabled || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
  window.speechSynthesis.cancel();
  const laugh = new SpeechSynthesisUtterance("Ho ho ho!");
  laugh.lang = language === "de" ? "de-DE" : "en-US";
  laugh.rate = 0.82;
  laugh.pitch = 1.05;
  laugh.volume = 0.72;
  window.speechSynthesis.speak(laugh);
}

function updateSoundControl() {
  const label = translations[language][soundEnabled ? "soundOn" : "soundOff"];
  elements.sound.textContent = soundEnabled ? "🔔" : "🔇";
  elements.sound.title = label;
  elements.sound.setAttribute("aria-label", label);
  elements.sound.setAttribute("aria-pressed", String(soundEnabled));
}

function toggleNightMode() {
  nightMode = !nightMode;
  document.body.classList.toggle("night-mode", nightMode);
  changeHouseLights();
  playChime("sparkle");
}

function addSnowflakes() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 34; index += 1) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.style.setProperty("--snow-left", `${Math.random() * 100}%`);
    flake.style.setProperty("--snow-size", `${3 + Math.random() * 5}px`);
    flake.style.setProperty("--snow-duration", `${9 + Math.random() * 10}s`);
    flake.style.setProperty("--snow-delay", `${-Math.random() * 18}s`);
    flake.style.setProperty("--snow-drift", `${-55 + Math.random() * 110}px`);
    flake.style.setProperty("--snow-opacity", `${0.3 + Math.random() * 0.55}`);
    fragment.append(flake);
  }
  document.querySelector("#snowfall").append(fragment);
}

function changeHouseLights() {
  const litCount = nightMode ? elements.windows.length : Math.floor(Math.random() * (elements.windows.length + 1));
  const litWindows = new Set();
  while (litWindows.size < litCount) {
    litWindows.add(Math.floor(Math.random() * elements.windows.length));
  }
  elements.windows.forEach((windowElement, index) => {
    windowElement.classList.toggle("lit", litWindows.has(index));
  });

  window.setTimeout(changeHouseLights, 7000 + Math.random() * 15000);
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function applyTodaysPrank(now, atMidnight = false) {
  if (!isWichtelSeason(now)) {
    elements.note.hidden = true;
    elements.card.classList.remove("elf-prank", "elf-glitter");
    return;
  }

  let prank;
  try {
    const saved = JSON.parse(localStorage.getItem("jahreszeiten-wichtel") || "null");
    if (saved && saved.date === getDateKey(now)) prank = saved.type;
  } catch {
    prank = undefined;
  }

  if (!prank && (atMidnight || (now.getHours() === 0 && now.getMinutes() === 0))) {
    const choices = ["tilt", "glitter", "note"];
    prank = choices[now.getDate() % choices.length];
    try {
      localStorage.setItem("jahreszeiten-wichtel", JSON.stringify({ date: getDateKey(now), type: prank }));
    } catch {
      // The tiny prank still works for this visit if browser storage is unavailable.
    }
  }

  elements.card.classList.toggle("elf-prank", prank === "tilt");
  elements.card.classList.toggle("elf-glitter", prank === "glitter");
  elements.note.hidden = prank !== "note";
  if (prank === "note") elements.note.textContent = translations[language].elfNote;
}

let activeDate = getDateKey(new Date());
function tick() {
  const now = new Date();
  const today = getDateKey(now);
  if (today !== activeDate) {
    activeDate = today;
    const season = getSeason(now);
    updatePage(now, season);
  }
  const season = getSeason(now);
  updateCountdown(now, season.target);
}

const initialNow = new Date();
addSnowflakes();
try {
  const savedLanguage = localStorage.getItem("jahreszeiten-sprache");
  if (savedLanguage === "de" || savedLanguage === "en") language = savedLanguage;
} catch {
  language = "de";
}
elements.language.value = language;
updatePage(initialNow, getSeason(initialNow));
updateCountdown(initialNow, getSeason(initialNow).target);
window.setInterval(tick, 250);
scheduleSurprise();
scheduleSanta();
scheduleSantaFlight();
changeHouseLights();
window.setInterval(toggleNightMode, 5 * 60 * 1000);

elements.language.addEventListener("change", () => {
  language = elements.language.value === "en" ? "en" : "de";
  try {
    localStorage.setItem("jahreszeiten-sprache", language);
  } catch {
    // The selected language still applies for this visit when storage is unavailable.
  }
  const now = new Date();
  const season = getSeason(now);
  updatePage(now, season);
  updateCountdown(now, season.target);
});

elements.sound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    const context = getAudioContext();
    if (!context) {
      soundEnabled = false;
      elements.sound.title = language === "de" ? "Audio wird in diesem Browser nicht unterstützt" : "Audio is not supported in this browser";
    } else {
      playChime("bell");
    }
  }
  updateSoundControl();
});

function scheduleMidnightCheck() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  window.setTimeout(() => {
    const midnight = new Date();
    const season = getSeason(midnight);
    updatePage(midnight, season, true);
    scheduleMidnightCheck();
  }, Math.max(50, nextMidnight.getTime() - now.getTime() + 100));
}

scheduleMidnightCheck();
