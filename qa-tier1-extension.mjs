import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3000";
const outputDir = "/home/ubuntu/qa-output/paws-pine-tier1-extension";
const checks = [];

function record(name, passed, detail) {
  checks.push({ name, passed, detail });
  if (!passed) throw new Error(`${name}: ${detail}`);
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto(`${baseUrl}/location`, { waitUntil: "domcontentloaded" });
const mapEmbed = page.locator("iframe.pp-location-embed");
await mapEmbed.waitFor();
record("location route renders Google Maps embed", (await mapEmbed.getAttribute("src"))?.includes("google.com/maps") ?? false, `src=${await mapEmbed.getAttribute("src")}`);
record("location route keeps demo disclosure", (await page.locator(".pp-location-note").textContent())?.includes("fictional demonstration clinic") ?? false, "disclosure missing");

const footer = page.locator(".neo-footer-socials");
record("footer renders Facebook placeholder icon", await footer.getByLabel("Facebook placeholder profile").count() === 1, "Facebook placeholder missing");
record("footer renders Instagram placeholder icon", await footer.getByLabel("Instagram placeholder profile").count() === 1, "Instagram placeholder missing");

await page.goto(`${baseUrl}/request`, { waitUntil: "domcontentloaded" });
const email = page.locator('input[name="email"]');
const phone = page.locator('input[name="phone"]');
await email.fill("not-an-email");
await email.blur();
record("invalid email shows inline error", (await page.locator(".pp-form-field").filter({ has: email }).locator("small").textContent())?.includes("valid email") ?? false, "email error missing");
await phone.fill("1234");
await phone.blur();
record("invalid phone shows inline error", (await page.locator(".pp-form-field").filter({ has: phone }).locator("small").textContent())?.includes("7 phone digits") ?? false, "phone error missing");
await email.fill("alex@example.test");
await phone.fill("555-0100");
record("valid email clears inline error", await page.locator(".pp-form-field").filter({ has: email }).locator("small").count() === 0, "email error remained");
record("valid phone clears inline error", await page.locator(".pp-form-field").filter({ has: phone }).locator("small").count() === 0, "phone error remained");

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ status: "pass", checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
