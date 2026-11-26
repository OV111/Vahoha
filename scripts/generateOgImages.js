// Renders the per-page-type link preview images into public/og/.
// Run by hand after changing a card's text: `node scripts/generateOgImages.js`.
// The PNGs are committed, so the build and the site never depend on this script.
import { readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { OG_CARDS } from "../constants/ogCards.js";

const OUT_DIR = "public/og";
const mark = readFileSync("src/assets/brand/vahoha-mark-circle.png").toString("base64");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = ({ kicker, title, subtitle }) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: linear-gradient(120deg, #3f2470 0%, #2c1f52 55%, #1e1838 100%);
    font-family: "Segoe UI", "Inter", system-ui, sans-serif; color: #fff;
  }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 34px; font-weight: 600; }
  .brand img { width: 64px; height: 64px; border-radius: 50%; }
  .kicker { font-size: 28px; color: #b59cf0; margin-bottom: 18px; text-transform: uppercase; letter-spacing: 2px; }
  h1 { font-size: 76px; line-height: 1.05; font-weight: 700; letter-spacing: -1.5px; max-width: 1000px; }
  p { margin-top: 22px; font-size: 32px; line-height: 1.35; color: #cfc6e6; max-width: 960px; }
  .url { font-size: 26px; color: #a78bfa; }
</style></head><body>
  <div class="brand"><img src="data:image/png;base64,${mark}" alt="">Vahoha</div>
  <div>
    <div class="kicker">${esc(kicker)}</div>
    <h1>${esc(title)}</h1>
    <p>${esc(subtitle)}</p>
  </div>
  <div class="url">vahoha.com</div>
</body></html>`;

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, card] of Object.entries(OG_CARDS)) {
  await tab.setContent(page(card), { waitUntil: "load" });
  await tab.screenshot({ path: join(OUT_DIR, `${name}.png`) });
  console.log(`og: ${OUT_DIR}/${name}.png`);
}
await browser.close();
