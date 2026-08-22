import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = "http://127.0.0.1:3000";
const outputDir = "/home/ubuntu/qa-output/paws-pine-fidelity";
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const checks = [];

function record(name, passed, detail) {
  checks.push({ name, passed, detail });
  if (!passed) throw new Error(`${name}: ${detail}`);
}

await page.goto(baseUrl, { waitUntil: "networkidle" });
const cards = page.locator(".fidelity-service-card");
record("service card count", await cards.count() === 4, `Expected 4 cards, found ${await cards.count()}`);
await cards.first().scrollIntoViewIfNeeded();
await page.screenshot({ path: `${outputDir}/resting.png`, fullPage: true });

for (let index = 0; index < 4; index += 1) {
  const card = cards.nth(index);
  const visual = card.locator(".service-card-visual");
  const number = card.locator(".service-card-index");
  const originalBox = await card.boundingBox();
  await card.hover();
  await page.waitForTimeout(550);
  const activeBox = await card.boundingBox();
  const opacity = await visual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
  const numberBox = await number.boundingBox();
  const inside = Boolean(activeBox && numberBox && numberBox.x >= activeBox.x && numberBox.y >= activeBox.y && numberBox.x + numberBox.width <= activeBox.x + activeBox.width && numberBox.y + numberBox.height <= activeBox.y + activeBox.height);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  record(`card ${index + 1} expands`, Boolean(originalBox && activeBox && activeBox.height > originalBox.height + 70), `resting=${originalBox?.height}, active=${activeBox?.height}`);
  record(`card ${index + 1} image reveals`, opacity > 0.9, `opacity=${opacity}`);
  record(`card ${index + 1} number remains inside`, inside, "number bounds extend beyond card bounds");
  record(`card ${index + 1} has no horizontal overflow`, scrollWidth <= 1280, `scrollWidth=${scrollWidth}`);
  await page.screenshot({ path: `${outputDir}/hover-card-${index + 1}.png`, fullPage: true });
  await page.mouse.move(20, 20);
  await page.waitForTimeout(550);
  const resetBox = await card.boundingBox();
  const resetOpacity = await visual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
  record(`card ${index + 1} resets after pointer leave`, Boolean(originalBox && resetBox && Math.abs(resetBox.height - originalBox.height) < 12 && resetOpacity < 0.1), `resting=${originalBox?.height}, reset=${resetBox?.height}, opacity=${resetOpacity}`);
}

const focusCard = cards.first();
await focusCard.locator(".service-card-head a").focus();
await page.waitForTimeout(550);
const focusVisualOpacity = await focusCard.locator(".service-card-visual").evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
record("keyboard focus reveals service visual", focusVisualOpacity > 0.9, `opacity=${focusVisualOpacity}`);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseUrl, { waitUntil: "networkidle" });
const mobileCards = page.locator(".fidelity-service-card");
await mobileCards.first().scrollIntoViewIfNeeded();
const mobileVisual = mobileCards.first().locator(".service-card-visual");
const mobileVisualBox = await mobileVisual.boundingBox();
const mobileOpacity = await mobileVisual.evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
record("mobile service image is visible without hover", Boolean(mobileVisualBox && mobileVisualBox.height > 100 && mobileOpacity > 0.9), `height=${mobileVisualBox?.height}, opacity=${mobileOpacity}`);
record("mobile has no horizontal overflow", mobileScrollWidth <= 390, `scrollWidth=${mobileScrollWidth}`);
await page.screenshot({ path: `${outputDir}/mobile-390.png`, fullPage: true });

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ baseUrl, checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
