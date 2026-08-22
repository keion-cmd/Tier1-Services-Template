import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = "http://127.0.0.1:3000";
const outputDir = "/home/ubuntu/qa-output/paws-pine-hero-nav";
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const checks = [];

function record(name, passed, detail) { checks.push({ name, passed, detail }); if (!passed) throw new Error(`${name}: ${detail}`); }

await page.goto(baseUrl, { waitUntil: "networkidle" });
const navbar = page.locator(".neo-nav-wrap");
const hero = page.locator(".fidelity-hero");
const title = page.locator(".fidelity-title-stack h1");
const pets = page.locator(".fidelity-pets");
const navBox = await navbar.boundingBox();
const titleBox = await title.boundingBox();
const petBox = await pets.boundingBox();
const headerCta = page.locator(".neo-header-cta");
const aboutStage = page.locator(".fidelity-about");
const faqStage = page.locator(".fidelity-faq");
const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
const overlaps = Boolean(titleBox && petBox && titleBox.x < petBox.x + petBox.width && titleBox.x + titleBox.width > petBox.x && titleBox.y < petBox.y + petBox.height && titleBox.y + titleBox.height > petBox.y);
const navbarStyle = await navbar.evaluate((node) => getComputedStyle(node));
const aboutBox = await aboutStage.boundingBox();
const faqBox = await faqStage.boundingBox();
const ctaBox = await headerCta.boundingBox();
record("desktop integrated navbar height", Boolean(navBox && navBox.height >= 58 && navBox.height <= 64), `height=${navBox?.height}`);
record("navbar is no longer a rounded floating container", navbarStyle.borderRadius === "0px", `borderRadius=${navbarStyle.borderRadius}`);
record("navbar CTA is restrained", Boolean(ctaBox && ctaBox.height >= 38 && ctaBox.height <= 42), `height=${ctaBox?.height}`);
record("About stage uses minimal page inset", Boolean(aboutBox && aboutBox.x <= 14 && aboutBox.width >= 1410), `x=${aboutBox?.x}, width=${aboutBox?.width}`);
record("FAQ stage uses minimal page inset", Boolean(faqBox && faqBox.x <= 14 && faqBox.width >= 1410), `x=${faqBox?.x}, width=${faqBox?.width}`);
record("desktop hero has no horizontal overflow", !horizontalOverflow, `overflow=${horizontalOverflow}`);
record("title overlaps the pet composition", overlaps, `title=${JSON.stringify(titleBox)}, pets=${JSON.stringify(petBox)}`);
await page.screenshot({ path: `${outputDir}/hero-desktop-1440.png`, fullPage: false });

await page.evaluate(() => window.scrollTo(0, 120));
await page.waitForTimeout(80);
const header = page.locator(".neo-header");
record("navbar applies sticky scroll state", await header.evaluate((node) => node.classList.contains("is-scrolled")), "is-scrolled class was not applied after scrolling");
record("navbar keeps editorial blur after scrolling", await header.evaluate((node) => getComputedStyle(node).backdropFilter.includes("blur")), `backdrop-filter=${await header.evaluate((node) => getComputedStyle(node).backdropFilter)}`);

for (const [width, height] of [[1280, 800], [1024, 768], [768, 1024], [430, 932], [390, 844], [360, 800]]) {
  await page.setViewportSize({ width, height });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  record(`hero ${width}x${height} has no horizontal overflow`, !overflow, `overflow=${overflow}`);
  await page.screenshot({ path: `${outputDir}/hero-${width}x${height}.png`, fullPage: false });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseUrl, { waitUntil: "networkidle" });
const menu = page.locator(".neo-menu");
record("mobile menu button is visible", await menu.isVisible(), "menu control is not visible");
await menu.click();
await page.waitForTimeout(80);
record("mobile menu exposes expanded state", await menu.getAttribute("aria-expanded") === "true", `expanded=${await menu.getAttribute("aria-expanded")}`);
record("mobile menu opens accessible navigation", await page.locator("#primary-mobile-menu").isVisible(), "mobile navigation is not visible");
record("mobile menu moves focus inside navigation", await page.evaluate(() => document.activeElement?.matches("#primary-mobile-menu a") ?? false), `active=${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 120))}`);
await page.keyboard.press("Escape");
await page.waitForTimeout(80);
record("Escape closes the mobile menu", await menu.getAttribute("aria-expanded") === "false", `expanded=${await menu.getAttribute("aria-expanded")}`);
record("Escape returns focus to menu button", await page.evaluate(() => document.activeElement?.classList.contains("neo-menu") ?? false), "focus did not return to menu button");

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(baseUrl, { waitUntil: "networkidle" });
record("reduced motion disables pet entrance animation", await pets.evaluate((node) => getComputedStyle(node).animationName === "none"), `animation=${await pets.evaluate((node) => getComputedStyle(node).animationName)}`);

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ baseUrl, checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
