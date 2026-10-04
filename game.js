// ===================================================================
// ДАННЫЕ ИГРЫ
// ===================================================================

const FIELD_W = 3072;
const FIELD_H = 2048;

const START_POS = { x: 85, y: 1870 };
const CAMP_POS  = { x: 142, y: 305 };

// 10 станций. poisonous: true — ядовитый.
const STATIONS = [
  { x: 256,  y: 1558, items: [
    { name: "Boletus edulis",       poisonous: false },
    { name: "Tylopilus felleus",    poisonous: true  } ] },

  { x: 1229, y: 1604, items: [
    { name: "Russula aeruginea",    poisonous: false },
    { name: "Amanita phalloides",   poisonous: true  } ] },

  { x: 1758, y: 1353, items: [
    { name: "Armillaria mellea",     poisonous: false },
    { name: "Hypholoma fasciculare", poisonous: true  } ] },

  { x: 1208, y: 968,  items: [
    { name: "Cantharellus cibarius",     poisonous: false },
    { name: "Hygrophoropsis aurantiaca", poisonous: true  } ] },

  { x: 404,  y: 968,  items: [
    { name: "Allium ursinum",       poisonous: false },
    { name: "Convallaria majalis",  poisonous: true  } ] },

  { x: 1098, y: 656,  items: [
    { name: "Vaccínium myrtíllus",  poisonous: false },
    { name: "Paris quadrifolia",    poisonous: true  } ] },

  { x: 2069, y: 565,  items: [
    { name: "Petroselinum crispum", poisonous: false },
    { name: "Conium maculatum",     poisonous: true  } ] },

  { x: 2574, y: 991,  items: [
    { name: "Vaccinium vitis-idaea", poisonous: false },
    { name: "Maianthemum bifolium",  poisonous: true  } ] },

  { x: 2464, y: 224,  items: [
    { name: "Fomitopsis pinicola",  poisonous: true  },
    { name: "Cerioporus squamosus", poisonous: false } ] },

  { x: 1481, y: 224,  items: [
    { name: "Sambucus ebulus",      poisonous: true  },
    { name: "Prunus padus",         poisonous: false } ] },
];

// ===================================================================
// СОСТОЯНИЕ ИГРЫ
// ===================================================================

const game = {
  charX: START_POS.x,
  charY: START_POS.y,
  currentStation: 0,
  poisonousCount: 0,
  moving: false,
  selectedOption: null,
  phase: "stations",   // "stations" | "toCamp" | "camp" | "end"
};

// ===================================================================
// ЭЛЕМЕНТЫ
// ===================================================================

const viewport      = document.getElementById("viewport");
const world         = document.getElementById("world");
const fieldEl       = document.getElementById("field");
const charEl        = document.getElementById("character");
const stationsLayer = document.getElementById("stationsLayer");
const campEl        = document.getElementById("camp");

const choiceOverlay = document.getElementById("choiceOverlay");
const choiceOptions = document.querySelectorAll(".option");
const choiceTitle   = document.getElementById("choiceTitle");
const collectBtn    = document.getElementById("collectBtn");

const cookOverlay   = document.getElementById("cookOverlay");
const cookBtn       = document.getElementById("cookBtn");

const endOverlay    = document.getElementById("endOverlay");
const endText       = document.getElementById("endText");
const restartBtn    = document.getElementById("restartBtn");

const startOverlay  = document.getElementById("startOverlay");
const startBtn      = document.getElementById("startBtn");

// ===================================================================
// МАСШТАБ ПОД ЭКРАН
// ===================================================================

function resize() {
  const scale = Math.min(
    window.innerWidth  / FIELD_W,
    window.innerHeight / FIELD_H
  );
  viewport.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener("resize", resize);

// ===================================================================
// ЗАГЛУШКА ДЛЯ КАРТИНОК (пока base64 пустые)
// ===================================================================

function placeholder(name) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <rect width="300" height="300" fill="#5c4a32"/>
      <text x="150" y="150" font-size="16" fill="#e8d5b0"
            text-anchor="middle" font-family="serif">${name}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function imgFor(name) {
  return IMAGES[name] || placeholder(name);
}

// ===================================================================
// ИНИЦИАЛИЗАЦИЯ
// ===================================================================

function init() {
  // фон поля
  if (IMAGES.field) fieldEl.style.backgroundImage = `url("${IMAGES.field}")`;
  if (IMAGES.character) charEl.style.backgroundImage = `url("${IMAGES.character}")`;

  // персонаж
  updateCharacter();

  // лагерь
  campEl.style.left = CAMP_POS.x + "px";
  campEl.style.top  = CAMP_POS.y + "px";

  // масштаб
  resize();

  // обработчики
  campEl.addEventListener("click", onCampClick);
  collectBtn.addEventListener("click", onCollect);
  cookBtn.addEventListener("click", onCook);
  restartBtn.addEventListener("click", restartGame);
  startBtn.addEventListener("click", startGame);

  choiceOptions.forEach(opt => {
    opt.addEventListener("click", () => selectOption(Number(opt.dataset.index)));
  });

  // ❗ Станции НЕ появляются пока — ждём кнопку "НАЧАТЬ"
}

// Запуск игры после нажатия "НАЧАТЬ"
function startGame() {
  startOverlay.classList.add("fade-out");
  setTimeout(() => startOverlay.remove(), 600);

  // теперь показываем первую станцию
  spawnStation(0);
}

// ===================================================================
// ПЕРСОНАЖ
// ===================================================================

function updateCharacter() {
  charEl.style.left = game.charX + "px";
  charEl.style.top  = game.charY + "px";
}

// ===================================================================
// СТАНЦИИ
// ===================================================================

function spawnStation(index) {
  if (index >= STATIONS.length) return;
  const st = STATIONS[index];
  const el = document.createElement("div");
  el.className = "station";
  el.style.left = st.x + "px";
  el.style.top  = st.y + "px";
  el.dataset.index = index;
  el.addEventListener("click", () => onStationClick(index));
  stationsLayer.appendChild(el);
}

function clearStations() {
  stationsLayer.innerHTML = "";
}

// ===================================================================
// ДВИЖЕНИЕ ПЕРСОНАЖА
// ===================================================================

function moveTo(tx, ty, duration, callback) {
  if (game.moving) return;
  game.moving = true;
  const sx = game.charX, sy = game.charY;
  const t0 = performance.now();

  function step(now) {
    const t = Math.min((now - t0) / duration, 1);
    // ease-in-out
    const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
    game.charX = sx + (tx - sx) * e;
    game.charY = sy + (ty - sy) * e;
    updateCharacter();
    if (t < 1) requestAnimationFrame(step);
    else {
      game.moving = false;
      if (callback) callback();
    }
  }
  requestAnimationFrame(step);
}

// ===================================================================
// КЛИК ПО СТАНЦИИ
// ===================================================================

function onStationClick(index) {
  if (game.moving || game.phase !== "stations") return;
  if (index !== game.currentStation) return;

  const st = STATIONS[index];

  // убираем кружок сразу, чтобы нельзя было кликнуть дважды
  clearStations();

  moveTo(st.x, st.y, 1500, () => {
    openChoice(index);
  });
}

// ===================================================================
// ОКНО ВЫБОРА
// ===================================================================

function openChoice(index) {
  const st = STATIONS[index];
  game.selectedOption = null;

  choiceOptions.forEach((opt, i) => {
    opt.classList.remove("selected");
    const item = st.items[i];
    opt.querySelector(".option-img").style.backgroundImage =
      `url("${imgFor(item.name)}")`;
    opt.querySelector(".option-name").textContent = item.name;
  });

  collectBtn.disabled = true;
  choiceTitle.textContent = `Станция ${index + 1} из 10 — что возьмёшь?`;
  choiceOverlay.classList.remove("hidden");
}

function selectOption(i) {
  game.selectedOption = i;
  choiceOptions.forEach((opt, idx) => {
    opt.classList.toggle("selected", idx === i);
  });
  collectBtn.disabled = false;
}

function onCollect() {
  if (game.selectedOption === null) return;
  const st = STATIONS[game.currentStation];
  const picked = st.items[game.selectedOption];

  if (picked.poisonous) game.poisonousCount++;

  choiceOverlay.classList.add("hidden");
  game.currentStation++;

  if (game.currentStation < STATIONS.length) {
    // следующая станция
    spawnStation(game.currentStation);
  } else {
    // все 10 пройдены → активируем лагерь
    game.phase = "camp";
    campEl.classList.add("active");
  }
}

// ===================================================================
// ЛАГЕРЬ
// ===================================================================

function onCampClick() {
  if (game.phase !== "camp" || game.moving) return;
  game.phase = "toCamp";
  campEl.classList.remove("active");

  moveTo(CAMP_POS.x, CAMP_POS.y, 1800, () => {
    // показываем кнопку "Приготовить явства"
    cookOverlay.classList.remove("hidden");
  });
}

function onCook() {
  cookOverlay.classList.add("hidden");
  game.phase = "end";

  let text;
  const p = game.poisonousCount;
  if (p === 0) {
    text = "Молодец, ты вкусно поел 🌿";
  } else if (p <= 3) {
    text = "Ой, тебе плохо, айда к врачу 🤢";
  } else {
    text = "Кпс, ты отравился насмерть 💀";
  }
  endText.textContent = text;
  endOverlay.classList.remove("hidden");
}

// ===================================================================
// ПЕРЕЗАПУСК
// ===================================================================

function restartGame() {
  endOverlay.classList.add("hidden");
  choiceOverlay.classList.add("hidden");
  cookOverlay.classList.add("hidden");
  clearStations();

  game.charX = START_POS.x;
  game.charY = START_POS.y;
  game.currentStation = 0;
  game.poisonousCount = 0;
  game.moving = false;
  game.selectedOption = null;
  game.phase = "stations";

  campEl.classList.remove("active");
  updateCharacter();
  spawnStation(0);
}

// ===================================================================
// СТАРТ
// ===================================================================

window.addEventListener("load", init);