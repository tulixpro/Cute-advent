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
// Initialize audio system after DOM is ready
function initAudio() {
  try {
    elements.musicToggle = document.querySelector("#music-toggle");
    if (elements.musicToggle) {
      elements.musicToggle.addEventListener("click", toggleMusic);
    }
    // Create audio context on first user interaction
    document.body.addEventListener("click", () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isAudioEnabled = true;
      }
    });
  } catch (e) {
    // Audio not supported, continue without
  }
}

// Generate a bell sound using Web Audio API
function createBellSound(frequency, duration, volume) {
  if (!audioContext || !isAudioEnabled) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

// Generate a simple melody (like "Jingle Bells" motif)
function playJingleBellsPattern() {
  if (!audioContext || !isAudioEnabled) return;
  
  const notes = [392, 523, 659, 784]; // G5, C6, E5, G5
  const durations = [0.3, 0.3, 0.3, 1.0];
  
  const now = audioContext.currentTime;
  
  notes.forEach((note, index) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.value = note;
      gainNode.gain.value = 0.1;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(now + durations[index]);
    }, index * 200);
  });
}

// Play a single bell chime
function playBellChime() {
  if (!audioContext || !isAudioEnabled) return;
  
  // Create a short bell-like sound
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator1.type = "square";
  oscillator1.frequency.value = 523; // C5
  
  oscillator2.type = "triangle";
  oscillator2.frequency.value = 659; // E5
  
  gainNode.gain.value = 0.15;
  
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator1.start();
  oscillator2.start();
  
  // Add some decay
  setTimeout(() => {
    oscillator1.stop();
    oscillator2.stop();
  }, 300);
}

// Global sound control
let isSoundEnabled = true;

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  if (elements.sound) {
    elements.sound.textContent = isSoundEnabled ? "🔔" : "🔇";
    elements.sound.title = isSoundEnabled ? "Sound an" : "Sound aus";
  }
}

// Initialize audio on first user interaction
let audioContext = null;
let isAudioEnabled = false;

document.body.addEventListener("click", () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      isAudioEnabled = true;
    } catch (e) {
      // Audio not supported
    }
  }
});

// Make playSound available globally
window.playSound = function(soundType) {
  if (!isSoundEnabled || !audioContext) return;
  
  switch(soundType) {
    case "bell":
      playBellChime();
      break;
    case "click":
      // Simple click sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 1000;
      gainNode.gain.value = 0.05;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
      break;
    case "magic":
      // Magical chime sound
      createBellSound(523, 0.5, 0.1);
      break;
    case "success":
      // Success sound
      createBellSound(659, 0.3, 0.1);
      break;
  }
};

// Export initAudio for use on DOM ready
window.initAudio = initAudio;

// Make isAudioEnabled accessible
window.isAudioEnabled = isAudioEnabled;

// Initialisiere Audio beim Laden
document.addEventListener("DOMContentLoaded", initAudio);

const values = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

const houseElements = {
  dialog: document.querySelector("#house-room"),
  entry: document.querySelector("#house-entry"),
  close: document.querySelector("#room-close"),
  canvas: document.querySelector("#sled-canvas"),
  gameStatus: document.querySelector("#game-status"),
// Dev menu toggle - accessible with one click
let devMenuOpen = false;
let devMenuShowing = false;
function toggleDevMenu() {
  devMenuOpen = !devMenuOpen;
  devMenuShowing = true;
  elements.devMenu.hidden = !devMenuOpen;
  elements.devMenu.style.display = devMenuOpen ? "block" : "none";
  document.body.style.overflow = devMenuOpen ? "hidden" : "";
  // Auto-hide after 10 seconds if opened via button (not Konami)
  if (!devMenuOpen) {
    setTimeout(() => {
      if (devMenuShowing && !devMenuOpen) {
        toggleDevMenu();
        devMenuShowing = false;
      }
    }, 10000);
  }
}

// Add dev menu button near house entry
const devMenuButton = document.createElement("button");
devMenuButton.className = "house-entry-button";
devMenuButton.innerHTML = "🔧";
devMenuButton.title = "Entwickler-Menü";
devMenuButton.setAttribute("aria-label", "Entwickler-Menü öffnen");
devMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDevMenu();
  devMenuShowing = true;
  // Reset the auto-hide timer
  setTimeout(() => {
    if (devMenuShowing && !devMenuOpen) {
      toggleDevMenu();
      devMenuShowing = false;
    }
  }, 10000);
});

// Insert after house entry button in the HTML
const houseEntry = document.querySelector(".house-entry-button");
if (houseEntry) {
  houseEntry.parentNode.insertBefore(devMenuButton, houseEntry.nextSibling);
} else {
  // If no house entry button, add at the top of the activity section
  const activities = document.querySelector(".room-activities");
  if (activities) {
    activities.insertBefore(devMenuButton, activities.firstChild);
  }
}

// Add click handlers for house windows for Easter eggs
// Use a single event listener on the parent for efficiency
let windowClickCounts = {};
elements.windows.forEach((window, idx) => {
  window.setAttribute("data-window-index", idx);
});

elements.windows.parentElement.addEventListener("click", (e) => {
  const window = e.target.closest(".house-window");
  if (!window) return;
  
  windowClickCounts[window.getAttribute("data-window-index")] = 
    (windowClickCounts[window.getAttribute("data-window-index")] || 0) + 1;
  
  window.classList.add("window-glow");
  window.style.boxShadow = "0 0 30px rgba(255, 107, 107, 0.5)";
  
  // Secret: 3 window clicks open secret note
  if (windowClickCounts[window.getAttribute("data-window-index")] >= 3) {
    windowClickCounts[window.getAttribute("data-window-index")] = 0;
    showSecretNote();
  }
  
  // Reset glow after animation
  setTimeout(() => {
    window.style.boxShadow = "";
  }, 1500);
});

function showSecretNote() {
  const secretNotes = [
    "🎄 Frohe Weihnachten!",
    "✨ Frohe Ostern!",
    "🎃 Happy Halloween!",
    "❄️ Frohes Neues Jahr!",
    "🌸 Fröhlichen Frühling!"
  ];
  const note = secretNotes[Math.floor(Math.random() * secretNotes.length)];
  elements.note.textContent = note;
  elements.note.hidden = false;
  playChime("bell");
  
  setTimeout(() => {
    elements.note.hidden = true;
  }, 5000);
}

// Doorbell Easter egg
const doorbell = document.querySelector(".doorbell");
let doorbellCount = 0;
if (doorbell) {
  doorbell.addEventListener("click", () => {
    doorbellCount++;
    if (doorbellCount >= 3) {
      doorbellCount = 0;
      document.body.classList.add("easter-egg-active");
      setTimeout(() => {
        document.body.classList.remove("easter-egg-active");
      }, 3000);
      playChime("sleigh");
      showSanta();
    }
  });
}

// Secret: Konami code reveals special messages in console
function revealSecretMessages() {
  const messages = [
    "🔑 Konami code aktiviert! Geheimmodus an.",
    "✨ Willkommen in der versteckten Edition!",
    "🎄 Frohe Weihnachten und frohes neues Jahr!",
    "❄️ Schnee ist schön, aber Code ist cooler.",
    "🌟 Ihr habt das Geheimnis gelüftet!"
  ];
  const el = document.createElement("div");
  el.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: var(--card);
    border: 1px solid var(--muted);
    padding: 12px 16px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 12px;
    animation: slide-in 0.5s ease-out;
  `;
  el.textContent = messages[Math.floor(Math.random() * messages.length)];
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}

function activateKonami() {
  document.body.classList.add("konami-mode");
  elements.konamiOverlay.hidden = false;
  
  // Create celebration effect
  const celebration = document.createElement("div");
  celebration.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1000;
    background: var(--konami-celebration);
    opacity: 0.8;
  `;
  document.body.appendChild(celebration);
  
  // Reveal secret message
  revealSecretMessages();
  
  setTimeout(() => {
    document.body.classList.remove("konami-mode");
    elements.konamiOverlay.hidden = true;
    if (celebration.parentNode) {
      celebration.parentNode.removeChild(celebration);
    }
  }, 1500);
}
  console: document.querySelector("#console-power"),
  consoleLabel: document.querySelector("#tv-caption"),
  screenPrompt: document.querySelector("#tv-prompt"),
  calendar: document.querySelector("#calendar-grid"),
  calendarIntro: document.querySelector("#calendar-intro"),
  calendarNote: document.querySelector("#calendar-note")
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
    houseButton: "Ins Haus gehen", roomKicker: "EIN PLÄTZCHEN ZUM AUFWÄRMEN",
    roomTitle: "Willkommen im warmen Zuhause!",
    roomSubtitle: "Draußen tanzt der Schnee. Drinnen warten Lichter, Spiele und Weihnachtszauber.",
    closeHouse: "Haus schließen", roomAria: "Gemütliches Wohnzimmer mit Tannenbaum und Fernseher",
    gameTitle: "Schlittenfahrt",
    gameInstructions: "Lenke mit ← → oder halte die Knöpfe gedrückt. Drück zum Start die Konsole!",
    consoleStart: "Konsole drücken, um das Spiel zu starten",
    consolePause: "Konsole drücken, um zu pausieren",
    consoleResume: "Konsole drücken, um weiterzufahren",
    consoleRestart: "Konsole drücken, um nochmal zu fahren",
    consoleReady: "Drück die Konsole zum Spielen!",
    consolePlaying: "Du saust den Hang hinunter!",
    consolePaused: "Pause im Schneegestöber",
    consoleFinished: "Puh, das war eine wilde Fahrt!",
    gameReady: "Bist du bereit für eine kleine Schlittenfahrt?",
    gamePaused: "Kurz verschnaufen — drück die Konsole zum Weiterfahren.",
    gameOver: "Oh! Ein Schneehügel! Punkte:",
    gameScore: "Punkte",
    canvasLabel: "Schlitten-Spiel. Mit Pfeiltasten oder den Knöpfen lenken und Schneehindernissen ausweichen.",
    steerLabel: "Schlitten lenken", steerLeft: "Nach links lenken", steerRight: "Nach rechts lenken",
    calendarTitle: "Der kleine Adventskalender",
    calendarAria: "Adventskalender mit 24 Türchen",
    calendarDoor: "Türchen {day}",
    calendarWait: "Die erste Tür öffnet sich am {date} – noch {days} Tage!",
    calendarReady: "Heute ist Türchen {day} dran. Viel Freude beim Öffnen!",
    calendarFinished: "Alle 24 Türchen warten auf dich. Such dir eins aus!",
    calendarLocked: "Dieses Türchen ist noch verschlossen – schau an seinem Tag wieder vorbei! 🔒",
    calendarGift: [
      "Ein winziger Wichtelgruß für dich: Du machst die Welt ein bisschen heller! ✨",
      "Heute gibt es eine Tasse warmen Kakao und eine extra kuschelige Decke. ☕",
      "Ein kleines Glücks-Sternchen begleitet dich durch den Tag. ⭐",
      "Der Wichtel schenkt dir einen ruhigen Moment zum Durchatmen. 💛",
      "Hinter dem Türchen versteckt sich ein Schneeflockentanz! ❄️",
      "Du bist genau richtig, so wie du bist. Das wollte der Wichtel dir sagen. 💌",
      "Ein winziger Rentier-Keks ist heute nur für dich. 🍪",
      "Lass heute etwas Glitzer in deinen Tag – du hast es verdient! ✨",
      "Der Wichtel wünscht dir ein Lächeln, das bis zu den Sternen reicht. 😊",
      "Heute ist ein wunderbarer Tag für eine kleine Pause. 🧣",
      "Eine Schneeflocke hat dir ein geheimes Winterkompliment gebracht. ❄️",
      "Die halbe Adventszeit ist geschafft – du machst das toll! 🎄",
      "Der Wichtel hat dir ein bisschen Weihnachtszauber eingepackt. 🎁",
      "Heute darfst du besonders stolz auf dich sein. 🌟",
      "Ein kleiner Wunsch ist unterwegs zu dir. 💫",
      "Der Wichtel lässt ein paar Glitzerkrümel für dich da. ✨",
      "Zeit für eine Umarmung – auch eine selbstgemachte zählt! 🤗",
      "Hinter dem Türchen wartet ein freundliches Rentier-Winken. 🦌",
      "Du hast schon so viel geschafft. Der Wichtel klatscht für dich! 👏",
      "Mach es dir gemütlich und genieße einen kleinen Wohlfühlmoment. 🕯️",
      "Ein lieber Gedanke fliegt heute nur für dich durchs Winterwunderland. 💌",
      "Nur noch ein paar Tage bis zum Weihnachtszauber! 🎄",
      "Der Wichtel schickt dir eine Handvoll Sternenstaub. ✨",
      "Frohe Weihnachten! Du bist das schönste Geschenk. ❤️"
    ],
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
    houseButton: "Step inside", roomKicker: "A LITTLE PLACE TO WARM UP",
    roomTitle: "Welcome to our cozy home!",
    roomSubtitle: "Snow is dancing outside. Inside, there are twinkly lights, games, and Christmas magic.",
    closeHouse: "Close the house", roomAria: "Cozy living room with a Christmas tree and television",
    gameTitle: "Sleigh ride",
    gameInstructions: "Steer with ← → or hold the buttons. Press the console to start!",
    consoleStart: "Press the console to start the game",
    consolePause: "Press the console to pause",
    consoleResume: "Press the console to ride again",
    consoleRestart: "Press the console for another ride",
    consoleReady: "Press the console to play!",
    consolePlaying: "You're racing down the snowy hill!",
    consolePaused: "A little snow-day break",
    consoleFinished: "Phew, what a wild ride!",
    gameReady: "Ready for a little sleigh ride?",
    gamePaused: "Catch your breath — press the console to keep going.",
    gameOver: "Oh! A snowy bump! Score:",
    gameScore: "Score",
    canvasLabel: "Sleigh game. Steer with the arrow keys or buttons and dodge snowy obstacles.",
    steerLabel: "Steer the sleigh", steerLeft: "Steer left", steerRight: "Steer right",
    calendarTitle: "The little advent calendar",
    calendarAria: "Advent calendar with 24 little doors",
    calendarDoor: "Door {day}",
    calendarWait: "The first door opens on {date} — just {days} days to go!",
    calendarReady: "It's door {day}'s turn today. Enjoy opening it!",
    calendarFinished: "All 24 doors are waiting for you. Pick one!",
    calendarLocked: "This little door is still locked — come back on its day! 🔒",
    calendarGift: [
      "A tiny elf note for you: you make the world a little brighter! ✨",
      "Today brings a cup of warm cocoa and an extra-cozy blanket. ☕",
      "A little lucky star will keep you company today. ⭐",
      "The elf is giving you a quiet moment to take a deep breath. 💛",
      "A snowflake dance is hiding behind today's door! ❄️",
      "The elf wanted you to know: you are just right as you are. 💌",
      "A tiny reindeer cookie is just for you today. 🍪",
      "Let a little sparkle into your day — you deserve it! ✨",
      "The elf is wishing you a smile that reaches the stars. 😊",
      "Today is a lovely day for a little break. 🧣",
      "A snowflake brought you a secret winter compliment. ❄️",
      "Halfway through advent — you're doing wonderfully! 🎄",
      "The elf has wrapped up a little Christmas magic for you. 🎁",
      "Today, you get to feel extra proud of yourself. 🌟",
      "A little wish is on its way to you. 💫",
      "The elf left a few sparkly crumbs for you. ✨",
      "Time for a hug — giving yourself one counts too! 🤗",
      "A friendly reindeer wave is waiting behind today's door. 🦌",
      "You've done so much already. The elf is clapping for you! 👏",
      "Get comfy and enjoy a little moment of coziness. 🕯️",
      "A kind thought is flying through the winter wonderland just for you. 💌",
      "Only a few more days until Christmas magic! 🎄",
      "The elf is sending you a handful of stardust. ✨",
      "Merry Christmas! You are the loveliest gift. ❤️"
    ],
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
  updateHouseLanguage(now);
  applyTodaysPrank(now, atMidnight);
}

function updateCountdown(now, target) {
  let remaining = Math.max(0, target.getTime() - now.getTime());
  document.body.classList.toggle("last-24-hours", remaining > 0 && remaining <= 86400000);
}
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

function formatMessage(template, valuesToReplace) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (
    Object.hasOwn(valuesToReplace, key) ? valuesToReplace[key] : match
  ));
}

let openedCalendarYear = null;
let openedCalendarDoors = new Set();
let selectedCalendarDay = null;

function readOpenedCalendarDoors(year) {
  try {
    const saved = JSON.parse(localStorage.getItem(`jahreszeiten-advent-${year}`) || "[]");
    return new Set(Array.isArray(saved) ? saved.filter((day) => Number.isInteger(day) && day >= 1 && day <= 24) : []);
  } catch {
    return new Set();
  }
}

function updateCalendar(now) {
  const copy = translations[language];
  const year = now.getFullYear();
  if (openedCalendarYear !== year) {
    openedCalendarYear = year;
    openedCalendarDoors = readOpenedCalendarDoors(year);
    selectedCalendarDay = null;
  }

  const availableDay = now.getMonth() === 11 ? Math.min(now.getDate(), 24) : 0;
  if (availableDay === 0) {
    const openingDate = localDate(year, 11, 1);
    const daysUntil = Math.max(0, Math.ceil((openingDate.getTime() - now.getTime()) / 86400000));
    const formattedDate = new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-GB", {
      day: "numeric", month: "long"
    }).format(openingDate);
    houseElements.calendarIntro.textContent = formatMessage(copy.calendarWait, { date: formattedDate, days: daysUntil });
  } else if (availableDay < 24) {
    houseElements.calendarIntro.textContent = formatMessage(copy.calendarReady, { day: availableDay });
  } else {
    houseElements.calendarIntro.textContent = copy.calendarFinished;
  }

  houseElements.calendar.setAttribute("aria-label", copy.calendarAria);
  const fragment = document.createDocumentFragment();
  for (let day = 1; day <= 24; day += 1) {
    const door = document.createElement("button");
    door.className = "calendar-door";
    door.type = "button";
    door.textContent = String(day);
    door.disabled = day > availableDay;
    door.classList.toggle("is-today", day === availableDay && availableDay > 0);
    door.classList.toggle("is-opened", openedCalendarDoors.has(day));
    door.setAttribute("aria-label", formatMessage(copy.calendarDoor, { day }));
    door.dataset.day = String(day);
    fragment.append(door);
  }
  houseElements.calendar.replaceChildren(fragment);

  if (selectedCalendarDay !== null) {
    houseElements.calendarNote.textContent = copy.calendarGift[selectedCalendarDay - 1];
    houseElements.calendarNote.hidden = false;
  }
}

function updateHouseLanguage(now) {
  const copy = translations[language];
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const key = node.dataset.i18nAria;
    node.setAttribute("aria-label", copy[key]);
  });
  updateCalendar(now);
  if (!sledGame.running) {
    houseElements.gameStatus.textContent = sledGame.paused ? copy.gamePaused : (sledGame.hasPlayed ? `${copy.gameOver} ${Math.floor(sledGame.score)}.` : copy.gameReady);
  }
  updateConsoleUi();
}

const sledGame = {
  context: houseElements.canvas.getContext("2d"),
  running: false,
  paused: false,
  hasPlayed: false,
  animationFrame: 0,
  lastFrame: 0,
  spawnElapsed: 0,
  steering: 0,
  steeringVelocity: 0,
  playerX: 0,
  worldOffset: 0,
  obstacles: [],
  score: 0,
  width: 0,
  height: 0,
  pixelRatio: 1
};

function resizeSledCanvas() {
  const bounds = houseElements.canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  sledGame.width = bounds.width;
  sledGame.height = bounds.height;
  sledGame.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  houseElements.canvas.width = Math.round(bounds.width * sledGame.pixelRatio);
  houseElements.canvas.height = Math.round(bounds.height * sledGame.pixelRatio);
  sledGame.context.setTransform(sledGame.pixelRatio, 0, 0, sledGame.pixelRatio, 0, 0);
  drawSledScene();
}

function drawPineTree(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(73, 92, 104, .16)";
  ctx.beginPath();
  ctx.ellipse(0, size * .72, size * .48, size * .14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#72564d";
  ctx.fillRect(-size * .07, size * .28, size * .14, size * .45);
  const tiers = [
    { y: -.58, half: .2, h: .42, color: "#456c62" },
    { y: -.31, half: .31, h: .49, color: "#3d665c" },
    { y: -.02, half: .42, h: .56, color: "#355e55" }
  ];
  for (const tier of tiers) {
    ctx.fillStyle = tier.color;
    ctx.beginPath();
    ctx.moveTo(0, size * (tier.y - tier.h * .57));
    ctx.lineTo(size * tier.half, size * (tier.y + tier.h * .43));
    ctx.lineTo(-size * tier.half, size * (tier.y + tier.h * .43));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(247, 252, 255, .86)";
    ctx.lineWidth = Math.max(1, size * .035);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-size * tier.half * .65, size * (tier.y + tier.h * .14));
    ctx.quadraticCurveTo(0, size * (tier.y + tier.h * .32), size * tier.half * .72, size * (tier.y + tier.h * .13));
    ctx.stroke();
  }
  ctx.restore();
}

function drawSnowMound(ctx, x, y, size) {
  ctx.fillStyle = "rgba(91, 123, 145, .15)";
  ctx.beginPath();
  ctx.ellipse(x, y + size * .28, size * .8, size * .28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fbfdff";
  ctx.beginPath();
  ctx.moveTo(x - size * .8, y + size * .18);
  ctx.quadraticCurveTo(x - size * .42, y - size * .38, x, y - size * .12);
  ctx.quadraticCurveTo(x + size * .56, y - size * .52, x + size * .8, y + size * .18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(171, 197, 213, .75)";
  ctx.lineWidth = Math.max(1, size * .06);
  ctx.beginPath();
  ctx.moveTo(x - size * .38, y + size * .1);
  ctx.quadraticCurveTo(x, y - size * .1, x + size * .38, y + size * .08);
  ctx.stroke();
}

function sledRoadAt(depth) {
  const { width, height } = sledGame;
  const perspective = depth * depth;
  const curve = Math.sin(sledGame.worldOffset * .7 + depth * 2.4) * width * .022 * perspective;
  const roadHalf = width * (.12 + .37 * perspective);
  return {
    x: width * .5 + curve,
    half: roadHalf,
    y: height * (.15 + depth * 1.07)
  };
}

function drawSledRider(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgba(73, 87, 100, .2)";
  ctx.beginPath();
  ctx.ellipse(0, 26, 34, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#ece6df";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-20, 25);
  ctx.quadraticCurveTo(-7, 29, 21, 24);
  ctx.moveTo(-18, 30);
  ctx.quadraticCurveTo(0, 34, 23, 28);
  ctx.stroke();
  ctx.fillStyle = "#ae565c";
  ctx.beginPath();
  ctx.moveTo(-24, 21);
  ctx.quadraticCurveTo(-4, 17, 26, 20);
  ctx.lineTo(22, 27);
  ctx.quadraticCurveTo(0, 31, -22, 27);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#8c414a";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#d7a866";
  ctx.fillRect(-7, 20, 3, 7);
  ctx.fillRect(6, 20, 3, 7);

  ctx.strokeStyle = "#765d56";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-11, 12);
  ctx.lineTo(-20, 25);
  ctx.moveTo(10, 12);
  ctx.lineTo(18, 24);
  ctx.stroke();
  ctx.fillStyle = "#678a91";
  ctx.beginPath();
  ctx.moveTo(-15, -12);
  ctx.quadraticCurveTo(-18, 2, -11, 17);
  ctx.lineTo(13, 17);
  ctx.quadraticCurveTo(18, 1, 13, -12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#4d737b";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = "#e9c2a3";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-12, -6);
  ctx.lineTo(-24, 4);
  ctx.moveTo(12, -6);
  ctx.lineTo(24, 1);
  ctx.stroke();
  ctx.fillStyle = "#e8b99a";
  ctx.beginPath();
  ctx.arc(0, -21, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#b95e64";
  ctx.beginPath();
  ctx.arc(0, -24, 9, Math.PI, Math.PI * 2);
  ctx.quadraticCurveTo(10, -20, 7, -16);
  ctx.lineTo(-8, -16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff8ed";
  ctx.beginPath();
  ctx.ellipse(0, -15, 9, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#514a51";
  ctx.beginPath();
  ctx.arc(-3, -21, 1, 0, Math.PI * 2);
  ctx.arc(3, -21, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSledScene() {
  if (!sledGame.width || !sledGame.height) return;
  const { context: ctx, width, height } = sledGame;
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#9fb7cb");
  gradient.addColorStop(.32, "#e3edf3");
  gradient.addColorStop(1, "#f5f8fa");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#8399ac";
  ctx.beginPath();
  ctx.moveTo(0, height * .42);
  ctx.lineTo(width * .16, height * .13);
  ctx.lineTo(width * .31, height * .43);
  ctx.lineTo(width * .53, height * .06);
  ctx.lineTo(width * .73, height * .4);
  ctx.lineTo(width * .9, height * .16);
  ctx.lineTo(width, height * .36);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f9fcff";
  ctx.beginPath();
  ctx.moveTo(0, height * .48);
  ctx.lineTo(width * .16, height * .13);
  ctx.lineTo(width * .31, height * .43);
  ctx.lineTo(width * .53, height * .06);
  ctx.lineTo(width * .73, height * .4);
  ctx.lineTo(width * .9, height * .16);
  ctx.lineTo(width, height * .36);
  ctx.lineTo(width, height * .44);
  ctx.lineTo(width * .9, height * .27);
  ctx.lineTo(width * .73, height * .51);
  ctx.lineTo(width * .53, height * .17);
  ctx.lineTo(width * .31, height * .53);
  ctx.lineTo(width * .16, height * .22);
  ctx.lineTo(0, height * .56);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(74, 99, 116, .35)";
  ctx.fillRect(0, height * .47, width, height * .025);

  for (let index = 0; index < 8; index += 1) {
    const depth = ((index * .17 + sledGame.worldOffset * .045) % 1);
    const position = sledRoadAt(depth);
    const size = 4 + depth * 19;
    drawPineTree(ctx, position.x - position.half * 1.18, position.y, size);
    drawPineTree(ctx, position.x + position.half * 1.18, position.y, size * .82);
  }

  const near = sledRoadAt(1);
  const far = sledRoadAt(0);
  const mid = sledRoadAt(.5);
  ctx.fillStyle = "#f4f8fb";
  ctx.beginPath();
  ctx.moveTo(far.x - far.half, far.y);
  ctx.lineTo(far.x + far.half, far.y);
  ctx.lineTo(near.x + near.half, near.y);
  ctx.lineTo(near.x - near.half, near.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.85)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(far.x - far.half, far.y);
  ctx.quadraticCurveTo(mid.x - mid.half, mid.y, near.x - near.half, near.y);
  ctx.moveTo(far.x + far.half, far.y);
  ctx.quadraticCurveTo(mid.x + mid.half, mid.y, near.x + near.half, near.y);
  ctx.stroke();

  for (const track of [-.38, .32]) {
    ctx.strokeStyle = "rgba(167, 193, 210, .55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(far.x + track * far.half, far.y);
    ctx.quadraticCurveTo(mid.x + track * mid.half, mid.y, near.x + track * near.half, near.y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,.7)";
  ctx.lineWidth = 2;
  for (let index = 0; index < 12; index += 1) {
    const depth = ((index * .13 + sledGame.worldOffset * .12) % 1);
    const point = sledRoadAt(depth);
    const drift = Math.sin(index * 18.7 + sledGame.worldOffset * 2) * point.half * .8;
    ctx.beginPath();
    ctx.moveTo(point.x + drift, point.y);
    ctx.lineTo(point.x + drift + (index % 2 ? 4 : -3) * depth, point.y + 2 + depth * 7);
    ctx.stroke();
  }

  const visibleObstacles = [...sledGame.obstacles].sort((a, b) => a.depth - b.depth);
  for (const obstacle of visibleObstacles) {
    const position = sledRoadAt(obstacle.depth);
    const obstacleX = position.x + obstacle.offset * position.half;
    const obstacleSize = 5 + obstacle.depth * Math.min(width * .075, height * .22);
    if (obstacle.kind === "tree") drawPineTree(ctx, obstacleX, position.y, obstacleSize);
    else drawSnowMound(ctx, obstacleX, position.y, obstacleSize);
  }

  const playerRoad = sledRoadAt(.88);
  drawSledRider(ctx, playerRoad.x + sledGame.playerX * playerRoad.half * .72, playerRoad.y, Math.max(.82, Math.min(1.38, width / 440)));

  ctx.fillStyle = "#687a8b";
  ctx.font = "700 12px 'Trebuchet MS', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`${translations[language].gameScore}: ${Math.floor(sledGame.score)}`, 12, 12);
}

function updateConsoleUi() {
  const copy = translations[language];
  const state = sledGame.running ? "running" : sledGame.paused ? "paused" : sledGame.hasPlayed ? "finished" : "ready";
  const labelKeys = {
    ready: "consoleStart",
    running: "consolePause",
    paused: "consoleResume",
    finished: "consoleRestart"
  };
  const promptKeys = {
    ready: "consoleReady",
    running: "consolePlaying",
    paused: "consolePaused",
    finished: "consoleFinished"
  };
  houseElements.console.classList.toggle("is-on", sledGame.running);
  houseElements.console.setAttribute("aria-label", copy[labelKeys[state]]);
  houseElements.consoleLabel.textContent = copy[labelKeys[state]];
  houseElements.screenPrompt.textContent = copy[promptKeys[state]];
}

function setSledSteering(direction) {
  if (!sledGame.running) return;
  sledGame.steering = direction;
}

function pauseSledRide() {
  if (!sledGame.running) return;
  sledGame.running = false;
  sledGame.paused = true;
  sledGame.steering = 0;
  window.cancelAnimationFrame(sledGame.animationFrame);
  houseElements.gameStatus.textContent = translations[language].gamePaused;
  updateConsoleUi();
  drawSledScene();
}

function resumeSledRide() {
  if (!houseElements.dialog.open || sledGame.running) return;
  sledGame.running = true;
  sledGame.paused = false;
  sledGame.lastFrame = 0;
  houseElements.gameStatus.textContent = "";
  updateConsoleUi();
  sledGame.animationFrame = window.requestAnimationFrame((timestamp) => {
    sledGame.lastFrame = timestamp;
    runSledFrame(timestamp);
  });
}

function finishSledRide() {
  sledGame.running = false;
  sledGame.paused = false;
  sledGame.hasPlayed = true;
  sledGame.steering = 0;
  window.cancelAnimationFrame(sledGame.animationFrame);
  const copy = translations[language];
  houseElements.gameStatus.textContent = `${copy.gameOver} ${Math.floor(sledGame.score)}.`;
  updateConsoleUi();
  drawSledScene();
}

function runSledFrame(timestamp) {
  if (!sledGame.running) return;
  const delta = Math.min((timestamp - sledGame.lastFrame) / 1000, .05);
  sledGame.lastFrame = timestamp;
  sledGame.spawnElapsed += delta;
  sledGame.score += delta * 18;
  sledGame.steeringVelocity += sledGame.steering * 2.8 * delta;
  sledGame.steeringVelocity *= Math.exp(-3.2 * delta);
  sledGame.playerX = Math.max(-.84, Math.min(.84, sledGame.playerX + sledGame.steeringVelocity * delta));

  const speed = .24 + Math.min(sledGame.score / 1800, .46);
  sledGame.worldOffset += speed * delta;
  if (sledGame.spawnElapsed >= Math.max(.48, .82 - sledGame.score / 1200)) {
    sledGame.spawnElapsed = 0;
    sledGame.obstacles.push({
      offset: (Math.random() * 1.5) - .75,
      depth: .02,
      kind: Math.random() < .72 ? "tree" : "snow"
    });
  }

  sledGame.obstacles.forEach((obstacle) => { obstacle.depth += speed * delta; });
  if (sledGame.obstacles.some((obstacle) => (
    obstacle.depth > .86 && obstacle.depth < 1.02 && Math.abs(obstacle.offset - sledGame.playerX) < .16
  ))) {
    finishSledRide();
    return;
  }
  sledGame.obstacles = sledGame.obstacles.filter((obstacle) => obstacle.depth < 1.08);

  drawSledScene();
  sledGame.animationFrame = window.requestAnimationFrame(runSledFrame);
}

function startSledRide() {
  if (!houseElements.dialog.open || sledGame.running) return;
  resizeSledCanvas();
  sledGame.running = true;
  sledGame.paused = false;
  sledGame.hasPlayed = true;
  sledGame.lastFrame = 0;
  sledGame.spawnElapsed = 0;
  sledGame.steering = 0;
  sledGame.steeringVelocity = 0;
  sledGame.playerX = 0;
  sledGame.worldOffset = 0;
  sledGame.obstacles = [];
  sledGame.score = 0;
  houseElements.gameStatus.textContent = "";
  updateConsoleUi();
  sledGame.animationFrame = window.requestAnimationFrame((timestamp) => {
    sledGame.lastFrame = timestamp;
    runSledFrame(timestamp);
  });
  drawSledScene();
}

function stopSledRide() {
  if (!sledGame.running) return;
  sledGame.running = false;
  sledGame.paused = true;
  sledGame.steering = 0;
  window.cancelAnimationFrame(sledGame.animationFrame);
  houseElements.gameStatus.textContent = translations[language].gamePaused;
  updateConsoleUi();
  drawSledScene();
}

function toggleSledRide() {
  if (sledGame.running) pauseSledRide();
  else if (sledGame.paused) resumeSledRide();
  else startSledRide();
}

function openCalendarDoor(day) {
  const now = new Date();
  const availableDay = now.getMonth() === 11 ? Math.min(now.getDate(), 24) : 0;
  if (day > availableDay) {
    houseElements.calendarNote.textContent = translations[language].calendarLocked;
    houseElements.calendarNote.hidden = false;
    return;
  }

  selectedCalendarDay = day;
  openedCalendarDoors.add(day);
  try {
    localStorage.setItem(`jahreszeiten-advent-${openedCalendarYear}`, JSON.stringify([...openedCalendarDoors]));
  } catch {
    // The opened door remains visible until the page is closed if storage is unavailable.
  }
  updateCalendar(now);
function openCalendarDoor(day) {
  const now = new Date();
  const availableDay = now.getMonth() === 11 ? Math.min(now.getDate(), 24) : 0;
  if (day > availableDay) {
    houseElements.calendarNote.textContent = translations[language].calendarLocked;
    houseElements.calendarNote.hidden = false;
    return;
  }

  selectedCalendarDay = day;
  openedCalendarDoors.add(day);
  try {
    localStorage.setItem(`jahreszeiten-advent-${openedCalendarYear}`, JSON.stringify([...openedCalendarDoors]));
  } catch {
    // The opened door remains visible until the page is closed if storage is unavailable.
  }
  updateCalendar(now);

  // Bonus Easter eggs for specific doors
  const bonusDoors = [5, 12, 19]; // Special doors with extra surprises
  if (bonusDoors.includes(day) && !doorHasBonus(day)) {
    triggerDoorBonus(day);
  }
}

function doorHasBonus(day) {
  const saved = localStorage.getItem(`jahreszeiten-advent-bonus-${openedCalendarYear}`);
  if (saved) {
    const bonuses = JSON.parse(saved);
    return bonuses.includes(day);
  }
  return false;
}

function triggerDoorBonus(day) {
  // Mark the door as having a bonus
  const saved = localStorage.getItem(`jahreszeiten-advent-bonus-${openedCalendarYear}`);
  let bonuses = saved ? JSON.parse(saved) : [];
  if (!bonuses.includes(day)) {
    bonuses.push(day);
    try {
      localStorage.setItem(`jahreszeiten-advent-bonus-${openedCalendarYear}`, JSON.stringify(bonuses));
    } catch {
      // Bonus remains for this visit if storage is unavailable.
    }
  }

  // Add special class to the door element
  const doors = houseElements.calendar.querySelectorAll(`.calendar-door[data-day="${day}"]`);
  doors.forEach((door) => {
    door.classList.add("special");
    door.classList.add("bonus");
    
    // Play special chime
    playChime("bell");
    
    // Show special note after short delay
    setTimeout(() => {
      const bonusNotes = [
        "🎄 Ein kleiner Wunsch geht in Erfüllung!",
        "✨ Ein funkelnder Moment der Freude!",
        "🎁 Eine versteckte Überraschung wartet!",
        "❄️ Eine kleine Winter-Magie entfaltet sich!",
        "🌟 Ein strahlender Glücksmoment!"
      ];
      const note = bonusNotes[day % bonusNotes.length];
      elements.calendarNote.textContent = note;
      elements.calendarNote.hidden = false;
      elements.calendarNote.style.animation = "note-pop 300ms ease both";
    }, 500);
  });
}
}

houseElements.entry.addEventListener("click", () => {
  houseElements.dialog.showModal();
  window.requestAnimationFrame(resizeSledCanvas);
});
houseElements.close.addEventListener("click", () => houseElements.dialog.close());
houseElements.dialog.addEventListener("click", (event) => {
  if (event.target === houseElements.dialog) houseElements.dialog.close();
});
houseElements.dialog.addEventListener("close", stopSledRide);
houseElements.console.addEventListener("click", toggleSledRide);
houseElements.calendar.addEventListener("click", (event) => {
  const door = event.target.closest(".calendar-door");
  if (door) openCalendarDoor(Number(door.dataset.day));
});
document.querySelectorAll("[data-steer]").forEach((button) => {
  const startSteering = (event) => {
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    setSledSteering(Number(button.dataset.steer));
  };
  const stopSteering = () => setSledSteering(0);
  button.addEventListener("pointerdown", startSteering);
  button.addEventListener("pointerup", stopSteering);
  button.addEventListener("pointercancel", stopSteering);
  button.addEventListener("lostpointercapture", stopSteering);
});
document.addEventListener("keydown", (event) => {
  if (!houseElements.dialog.open || !sledGame.running) return;
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    setSledSteering(-1);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    setSledSteering(1);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    if (sledGame.steering < 0) setSledSteering(0);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    if (sledGame.steering > 0) setSledSteering(0);
  }
});
window.addEventListener("resize", () => {
  if (houseElements.dialog.open) resizeSledCanvas();
});

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
