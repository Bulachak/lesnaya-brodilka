# 🌲 Forest Wanderer (Lesnaya Brodilka)

[Русский](README.md) &nbsp;•&nbsp; **English**

A cozy 2D pixel art foraging web game about gathering edible mushrooms and forest herbs.

[![Play Online](https://img.shields.io/badge/🎮_Play_Online-GitHub_Pages-2ea44f?style=for-the-badge)](https://bulachak.github.io/lesnaya-brodilka/)
[![GitHub repo](https://img.shields.io/badge/GitHub-Bulachak%2Flesnaya--brodilka-181717?style=for-the-badge&logo=github)](https://github.com/Bulachak/lesnaya-brodilka)

> **Creator, Game Logic & All Original Pixel Art:** Lika  
> **Genre:** Foraging Game / Botanical Puzzle / Cozy Pixel Adventure  
> **Tech Stack:** Pure HTML5, CSS3, Vanilla JavaScript (zero external dependencies, fully offline-capable)  
> 🍄 **Live Game:** [bulachak.github.io/lesnaya-brodilka](https://bulachak.github.io/lesnaya-brodilka/)

---

## 🎮 Lore & Rules

You play as an adventurous forest forager wearing a purple cloak, a wizard's hat, and holding a walking staff.  
Hidden along the winding dirt trail are **10 stations**. At each station, you will encounter **two forest gifts**: one delicious and edible, the other a toxic or bitter lookalike twin.

1. Click on the **pulsing golden circles** one by one.
2. The forager smoothly walks along the trail to the station, opening the choice parchment.
3. Inspect the hand-drawn pixel illustrations and pick **only edible species** for your basket.
4. Complete all 10 stations across the forest to reach the **camp with a tent and campfire**.
5. Click **«🔥 Cook feast»** to brew dinner from your harvest and find out your fate!

### Endings:
* 🌿 **«Well done, you ate deliciously 🌿»** — 0 poisonous picks (perfect score).
* 🤢 **«Uh-oh, you feel sick, hurry to the doctor 🤢»** — 1 to 3 poisonous mistakes.
* 💀 **«Kaput, you were fatally poisoned 💀»** — more than 3 toxic items.

---

## 🌿 Botanical Field Guide (Lookalike Twin Pairs)

The game features authentic botanical lookalike pairs that real-life foragers frequently confuse in the wild:

| # | Edible Species | Poisonous or False Lookalike | Key Distinctions in Nature |
|---|----------------|------------------------------|----------------------------|
| 1 | **Boletus edulis**<br>*(Porcini / King Bolete)* | **Tylopilus felleus**<br>*(Bitter Bolete / False King)* | The bitter bolete has a dark net pattern on the stem, bitter flesh, and pores turn pinkish |
| 2 | **Russula aeruginea**<br>*(Grass-Green Russula)* | **Amanita phalloides**<br>*(Death Cap)* | The deadly Death Cap has a sack-like volva at the base and a skirt ring on the stem |
| 3 | **Armillaria mellea**<br>*(Honey Fungus)* | **Hypholoma fasciculare**<br>*(Sulphur Tuft)* | Sulphur tufts have greenish-yellow gills, intensely bitter taste, and lack a distinct ring |
| 4 | **Cantharellus cibarius**<br>*(Golden Chanterelle)* | **Hygrophoropsis aurantiaca**<br>*(False Chanterelle)* | False chanterelles have true, thin, crowded orange gills and a hollow stem |
| 5 | **Allium ursinum**<br>*(Wild Garlic / Ramsons)* | **Convallaria majalis**<br>*(Lily of the Valley)* | Lily of the valley is lethally toxic! Ramsons smell strongly of garlic; each leaf has its own stem |
| 6 | **Vaccinium myrtillus**<br>*(European Bilberry)* | **Paris quadrifolia**<br>*(Herb Paris)* | Bilberries grow on small shrubs; Herb Paris bears a single solitary black berry surrounded by 4 leaves |
| 7 | **Petroselinum crispum**<br>*(Wild / Curly Parsley)* | **Conium maculatum**<br>*(Poison Hemlock)* | Hemlock features purple/red blotches on smooth stems and a mousy odor (the poison of Socrates) |
| 8 | **Vaccinium vitis-idaea**<br>*(Lingonberry / Cowberry)* | **Maianthemum bifolium**<br>*(May Lily / False Lily)* | May lily berries are toxic; the plant has only two heart-shaped leaves on a slender stem |
| 9 | **Cerioporus squamosus**<br>*(Dryad's Saddle / Pheasant's Back)* | **Fomitopsis pinicola**<br>*(Red-Belted Conk)* | Dryad's saddle grows in spring on hardwoods and is tender and edible when young |
| 10 | **Prunus padus**<br>*(Bird Cherry / Hackberry)* | **Sambucus ebulus**<br>*(Danewort / Dwarf Elder)* | Danewort is toxic, with a pungent foul odor and seeds containing poisonous cyanogenic glycosides |

---

## 📁 Project Structure

```text
lesnaya-brodilka/
├── index.html       # HTML5 game canvas, start overlay, modal dialogues, cooking campfire
├── style.css        # Fairytale parchment aesthetics, golden glow animations, responsive sizing
├── game.js          # Player movement, station spawns, choice logic, score calculation
├── images.js        # Complete Base64 asset bundle (3072x2048 pixel map, wizard, botanical art)
├── .gitignore       # Git exclusion rules
├── .nojekyll        # Bypasses Jekyll processing for GitHub Pages hosting
├── README.md        # Documentation in Russian
└── README.en.md     # Documentation in English
```

---

## 🚀 Running Locally

Because the game is built with pure web standards and bundled assets, you can run it immediately without package managers or build steps:

### Option 1: Double-Click
Double-click [`index.html`](index.html) to open and play directly in any web browser.

### Option 2: Local HTTP Server (Recommended for Mobile Phone Testing)
```bash
# Using Python:
python -m http.server 8080

# Or using Node.js:
npx serve .
```
Navigate to `http://localhost:8080` on your desktop or via your local network IP on your smartphone.

---

## 🗺️ Roadmap & Future Enhancements

- [ ] **Bilingual Card Labels**: Show common names alongside Latin binomials (*e.g., "Golden Chanterelle (Cantharellus cibarius)"*).
- [ ] **Randomized Options**: Shuffle left/right card placement on each station for true replayability.
- [ ] **Trail Waypoint Navigation**: Animate the forager walking strictly along the winding dirt path.
- [ ] **Camp Cauldron Breakdown**: Display a visual receipt of your gathered harvest on victory/defeat.
- [ ] **Cozy Audio & SFX**: Retro 8-bit forest ambience, bird chirps, campfire crackle, and victory jingles.
- [ ] **Telegram Mini App**: Plug-and-play bot integration to play directly inside Telegram.
- [ ] **Companion Project**: "LA28 Olympic Coloring Book 🏄‍♀️" (interactive digital coloring game for Los Angeles 2028).

---

## 🤝 Collaboration & Contributing

1. Clone the repository:
   ```bash
   git clone https://github.com/Bulachak/lesnaya-brodilka.git
   ```
2. Make your edits and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Add new features or illustrations"
   git push origin main
   ```
3. The live deployment at **[GitHub Pages](https://bulachak.github.io/lesnaya-brodilka/)** updates automatically within seconds!
