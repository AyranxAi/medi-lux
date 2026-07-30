/*
  Worst-case contrast check for the Care Pathways accordion.

  Ivory type over four warm, very light photographs cannot be eyeballed. The
  hero taught this project the lesson the expensive way: HERO-02 measured 2.64
  against the 3.0 it needed, and looked completely fine.

  This does not model the crop or the gradient — it measures them. It drives the
  real page in Chromium, hides only the text (leaving the photograph and both
  scrims exactly as shipped), screenshots each panel, then samples every pixel
  under every text box and composites the text colour's own alpha over the
  worst — lightest — pixel it finds. So a single blown highlight under a word
  fails the check, which is the intent.

  Run it whenever the scrim stops, the object-position values, the copy or the
  photographs change:

      npm i --no-save playwright-core     # not a project dependency, see below
      npx next build && npx next start -p 3737
      node scripts/check-pathway-contrast.mjs

  playwright-core is deliberately not in package.json: it is needed by this one
  script and nothing that ships, and Chromium is already on the machine
  (PLAYWRIGHT_BROWSERS_PATH). Never run `playwright install`.

  WCAG AA: 4.5:1 for body type, 3:1 for large text (>=24px, or >=18.66px bold).
*/
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error(
    "playwright-core is not installed.\n" +
      "  npm i --no-save playwright-core\n" +
      "then re-run this script.",
  );
  process.exit(2);
}
import sharp from "sharp";

const URL = process.env.URL ?? "http://localhost:3737/";
const CHROME = "/opt/pw-browsers/chromium";
const WIDTHS = [1440, 1024, 768, 375];
const DSF = 2;

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) =>
  0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const over = (fg, alpha, bg) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));

/*
  Resolve any CSS colour to sRGB + alpha, in the browser rather than with a
  regex here. Tailwind v4 compiles `text-ivory/90` to `lab(97.34 0.26 3.26 /
  0.9)`, and an earlier version of this script happily parsed those L*a*b*
  numbers as if they were RGB — every reading it produced was fiction. Painting
  the colour over black and over white and solving for the two unknowns works
  for whatever syntax the browser hands back, today's and future.
*/
const RESOLVE_COLOR = `(css) => {
  const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const read = (backdrop) => {
    c.clearRect(0, 0, 1, 1);
    c.fillStyle = backdrop; c.fillRect(0, 0, 1, 1);
    c.fillStyle = css;      c.fillRect(0, 0, 1, 1);
    return [...c.getImageData(0, 0, 1, 1).data].slice(0, 3);
  };
  const black = read('#000'), white = read('#fff');
  const alpha = 1 - (white[0] - black[0]) / 255;
  if (alpha < 0.002) return [[0, 0, 0], 0];
  return [black.map((v) => Math.min(255, v / alpha)), alpha];
}`;

/* the WCAG bar for a given computed font size + weight */
function bar(px, weight) {
  const large = px >= 24 || (px >= 18.66 && Number(weight) >= 700);
  return large ? 3 : 4.5;
}

const browser = await chromium.launch({ executablePath: CHROME });
let failures = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: DSF,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.locator("section#pathways").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const panels = page.locator(".pathways-acc__panel");
  const count = await panels.count();
  console.log(`\n──────── ${width}px ────────`);

  /* open each panel in turn, so every photograph is measured in both states */
  for (let open = 0; open < count; open++) {
    await panels.nth(open).locator(".pathways-acc__trigger").click();
    await page.waitForTimeout(1000);

    for (let i = 0; i < count; i++) {
      const panel = panels.nth(i);
      const active = (await panel.getAttribute("data-active")) === "true";
      /* every photograph gets measured closed once and open once, no more */
      if (active !== (i === open)) continue;
      if (!active && open !== 0) continue;

      const boxes = await panel.evaluate((el, resolveSrc) => {
        const resolve = eval(resolveSrc);
        const layer = el.querySelector(
          el.dataset.active === "true"
            ? ".pathways-acc__layer--open"
            : ".pathways-acc__layer--closed",
        );
        const pr = el.getBoundingClientRect();
        const out = [];
        for (const node of layer.querySelectorAll("p, h3, span, a")) {
          if (!node.textContent.trim()) continue;
          const s = getComputedStyle(node);
          if (s.display === "none" || s.opacity === "0") continue;
          const r = node.getBoundingClientRect();
          if (r.width < 1 || r.height < 1) continue;
          out.push({
            text: node.textContent.trim().slice(0, 28),
            color: resolve(s.color),
            size: parseFloat(s.fontSize),
            weight: s.fontWeight,
            /* the chips carry their own translucent fill — measure through it */
            chipBg: resolve(s.backgroundColor),
            x: r.x - pr.x,
            y: r.y - pr.y,
            w: r.width,
            h: r.height,
          });
        }
        return { name: el.querySelector(".pathways-acc__trigger").ariaLabel, out };
      }, RESOLVE_COLOR);

      /*
        Hide the type, keep the photograph and both scrims exactly as shipped.

        Anything position:fixed goes too. An element screenshot composites
        whatever is painted over the element, and the floating WhatsApp button
        sits bottom-right of the viewport — it landed inside the last panel and
        reported 2.29:1 under a title that is nowhere near it.
      */
      await page.evaluate(() => {
        document
          .querySelectorAll(".pathways-acc__layer")
          .forEach((l) => (l.style.visibility = "hidden"));
        document.querySelectorAll("body *").forEach((n) => {
          if (getComputedStyle(n).position === "fixed")
            n.style.visibility = "hidden";
        });
      });
      const png = await panel.screenshot();
      await page.evaluate(() => {
        document
          .querySelectorAll('[style*="visibility"]')
          .forEach((n) => (n.style.visibility = ""));
      });

      const { data, info } = await sharp(png)
        .raw()
        .toBuffer({ resolveWithObject: true });

      console.log(`\n  ${boxes.name}  [${active ? "OPEN" : "closed"}]`);
      for (const b of boxes.out) {
        const [fg, alpha] = b.color;
        const [chip, chipA] = b.chipBg;
        const need = bar(b.size, b.weight);

        let worst = Infinity;
        const x0 = Math.max(0, Math.round(b.x * DSF));
        const y0 = Math.max(0, Math.round(b.y * DSF));
        const x1 = Math.min(info.width, Math.round((b.x + b.w) * DSF));
        const y1 = Math.min(info.height, Math.round((b.y + b.h) * DSF));
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const o = (y * info.width + x) * info.channels;
            let bg = [data[o], data[o + 1], data[o + 2]];
            if (chipA > 0) bg = over(chip, chipA, bg);
            const text = over(fg, alpha, bg);
            const r = ratio(text, bg);
            if (r < worst) worst = r;
          }
        }

        const ok = worst >= need;
        if (!ok) failures++;
        console.log(
          `    ${ok ? "ok  " : "FAIL"}  ${worst.toFixed(2)}:1 (needs ${need}) ` +
            `${b.size}px  "${b.text}"`,
        );
      }
    }
  }
  await ctx.close();
}

await browser.close();
console.log(
  failures ? `\n${failures} contrast failure(s)` : "\nAll text meets WCAG AA.",
);
process.exit(failures ? 1 : 0);
