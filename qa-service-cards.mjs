import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = "http://127.0.0.1:3000";
const outputDir = "/home/ubuntu/qa-output/paws-pine-cross-page";
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const checks = [];

function record(name, passed, detail) {
  checks.push({ name, passed, detail });
  if (!passed) throw new Error(`${name}: ${detail}`);
}

async function verifyGallery(path, expectedCount, label) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  const cards = page.locator(".pp-service-card");
  record(`${label}: card count`, await cards.count() === expectedCount, `Expected ${expectedCount}, found ${await cards.count()}`);
  await cards.first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outputDir}/${label}-resting.png`, fullPage: true });
  for (let index = 0; index < expectedCount; index += 1) {
    const card = cards.nth(index);
    const visual = card.locator(".pp-service-card-image");
    const number = card.locator(".pp-service-card-index");
    const title = card.locator("h3");
    const description = card.locator("p");
    const originalBox = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(560);
    const activeBox = await card.boundingBox();
    const visualOpacity = await visual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
    const numberBox = await number.boundingBox();
    const titleBox = await title.boundingBox();
    const descriptionBox = await description.boundingBox();
    const inside = Boolean(activeBox && numberBox && numberBox.x >= activeBox.x && numberBox.y >= activeBox.y && numberBox.x + numberBox.width <= activeBox.x + activeBox.width && numberBox.y + numberBox.height <= activeBox.y + activeBox.height);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    record(`${label}: card ${index + 1} expands`, Boolean(originalBox && activeBox && activeBox.height > originalBox.height + 80), `resting=${originalBox?.height}, active=${activeBox?.height}`);
    record(`${label}: card ${index + 1} reveals image`, visualOpacity > 0.9, `opacity=${visualOpacity}`);
    record(`${label}: card ${index + 1} keeps title and description visible`, Boolean(titleBox && descriptionBox), `title=${Boolean(titleBox)}, description=${Boolean(descriptionBox)}`);
    record(`${label}: card ${index + 1} keeps number inside`, inside, "number bounds extend beyond card bounds");
    record(`${label}: card ${index + 1} has no horizontal overflow`, scrollWidth <= 1280, `scrollWidth=${scrollWidth}`);
    await page.screenshot({ path: `${outputDir}/${label}-hover-${index + 1}.png`, fullPage: true });
    await page.mouse.move(8, 8);
    await page.waitForTimeout(560);
    const resetBox = await card.boundingBox();
    const resetOpacity = await visual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
    record(`${label}: card ${index + 1} resets cleanly`, Boolean(originalBox && resetBox && Math.abs(originalBox.height - resetBox.height) < 12 && resetOpacity < 0.1), `resting=${originalBox?.height}, reset=${resetBox?.height}, opacity=${resetOpacity}`);
  }
  await cards.first().locator(".pp-service-card-top a").focus();
  await page.waitForTimeout(560);
  const focusOpacity = await cards.first().locator(".pp-service-card-image").evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
  record(`${label}: keyboard focus reveals image`, focusOpacity > 0.9, `opacity=${focusOpacity}`);
}

await verifyGallery("/", 4, "home");
await verifyGallery("/services", 6, "services");

for (const [width, height] of [[1440, 1000], [1280, 800], [1024, 768], [768, 1024], [430, 932], [390, 844], [360, 800]]) {
  await page.setViewportSize({ width, height });
  for (const path of ["/", "/services", "/request"]) {
    await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    record(`viewport ${width}x${height} ${path} has no horizontal overflow`, scrollWidth <= width, `scrollWidth=${scrollWidth}`);
  }
}

for (const [path, label, expectedCount] of [["/", "home", 4], ["/services", "services", 6]]) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  const cards = page.locator(".pp-service-card");
  record(`${label} mobile: card count`, await cards.count() === expectedCount, `Expected ${expectedCount}, found ${await cards.count()}`);
  await cards.first().scrollIntoViewIfNeeded();
  const visual = cards.first().locator(".pp-service-card-image");
  const visualBox = await visual.boundingBox();
  const opacity = await visual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
  record(`${label} mobile: image visible without hover`, Boolean(visualBox && visualBox.height > 120 && opacity > 0.9), `height=${visualBox?.height}, opacity=${opacity}`);
  await page.screenshot({ path: `${outputDir}/${label}-mobile-390.png`, fullPage: true });
}

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ baseUrl, checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
