import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3000";
const outputDir = "/home/ubuntu/qa-output/paws-pine-page-shell";
const routes = [
  { path: "/", stage: ".fidelity-hero", active: "Home" },
  { path: "/services", stage: ".pp-page-hero", active: "Our services" },
  { path: "/request", stage: ".pp-request-hero", active: "Request a visit" },
];
const viewports = [[1440, 1000], [1280, 800], [1024, 768], [768, 1024], [430, 932], [390, 844]];
const checks = [];

function record(name, passed, detail) {
  checks.push({ name, passed, detail });
  if (!passed) throw new Error(`${name}: ${detail}`);
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage();

for (const [width, height] of viewports) {
  await page.setViewportSize({ width, height });
  for (const route of routes) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
    const header = page.locator(".neo-header");
    const stage = page.locator(route.stage);
    const headerBox = await header.boundingBox();
    const stageBox = await stage.boundingBox();
    const stageStyle = await stage.evaluate((node) => getComputedStyle(node));
    const activeText = await page.locator(".neo-nav-link.current").textContent();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const expectedHeaderHeight = width <= 768 ? 60 : 62;

    record(`${route.path} ${width}px header height`, Boolean(headerBox && Math.abs(headerBox.height - expectedHeaderHeight) <= 2), `height=${headerBox?.height}`);
    record(`${route.path} ${width}px active navigation`, activeText?.trim() === route.active, `active=${activeText}`);
    record(`${route.path} ${width}px full-width hero stage`, Boolean(stageBox && stageBox.x === 0 && Math.abs(stageBox.width - width) <= 1), `x=${stageBox?.x}, width=${stageBox?.width}`);
    record(`${route.path} ${width}px lower-only hero rounding`, stageStyle.borderTopLeftRadius === "0px" && stageStyle.borderTopRightRadius === "0px" && Number.parseFloat(stageStyle.borderBottomLeftRadius) > 0, `radii=${stageStyle.borderTopLeftRadius}/${stageStyle.borderTopRightRadius}/${stageStyle.borderBottomLeftRadius}`);
    record(`${route.path} ${width}px no horizontal overflow`, !overflow, `overflow=${overflow}`);

    await page.evaluate(() => window.scrollTo(0, 180));
    await page.waitForTimeout(100);
    const scrolledBox = await header.boundingBox();
    record(`${route.path} ${width}px sticky header remains at top`, Boolean(scrolledBox && Math.abs(scrolledBox.y) <= 1), `y=${scrolledBox?.y}`);
    record(`${route.path} ${width}px scrolled header state`, await header.evaluate((node) => node.classList.contains("is-scrolled")), "is-scrolled missing");
  }
}

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
