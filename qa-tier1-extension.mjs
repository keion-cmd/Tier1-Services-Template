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
const activeLocationNav = page.locator(".neo-desktop-nav .neo-nav-link.current");
record("desktop navigation exposes the complimentary Location Page", await page.getByRole("navigation", { name: "Primary navigation" }).getByText("Clinic location").count() === 1, "location navigation link missing");
record("Location Page has an accurate active navigation state", (await activeLocationNav.textContent())?.includes("Clinic location") ?? false, `active=${await activeLocationNav.textContent()}`);
record("location navigation omits the removed FREE label", await activeLocationNav.getByText("Free").count() === 0, "free benefit label still visible");
record("location route renders Google Maps embed", (await mapEmbed.getAttribute("src"))?.includes("google.com/maps") ?? false, `src=${await mapEmbed.getAttribute("src")}`);
record("location route uses the supplied directions embed", (await mapEmbed.getAttribute("src"))?.includes("Hayop%20Kalinga%20Veterinary%20Clinic") ?? false, `src=${await mapEmbed.getAttribute("src")}`);
record("location route includes the approved Calamba Trade Center landmark", await page.getByText("Calamba Trade Center").count() >= 1, "landmark missing");
record("location route provides an external driving-directions action", (await page.getByRole("link", { name: /Open driving directions/i }).getAttribute("href"))?.includes("maps/dir/?api=1") ?? false, "directions action missing");
const mapCardBox = await page.locator(".pp-supplied-map").boundingBox();
const mapBox = await mapEmbed.boundingBox();
const routeLabelBox = await page.locator(".pp-supplied-map .pp-map-heading").boundingBox();
const directionsActionBox = await page.getByRole("link", { name: /Open driving directions/i }).boundingBox();
record("Google Maps fills the complete right-hand map card", Boolean(mapCardBox && mapBox && Math.abs(mapCardBox.height - mapBox.height) < 3), JSON.stringify({ mapCardBox, mapBox }));
record("driving-route label is positioned on the right side of the map", Boolean(mapBox && routeLabelBox && routeLabelBox.x > mapBox.x + mapBox.width / 2), "route label overlays the left map area");
record("directions action is centered inside the lower map area", Boolean(mapCardBox && mapBox && directionsActionBox && directionsActionBox.y >= mapBox.y + mapBox.height * 0.7 && directionsActionBox.y + directionsActionBox.height <= mapBox.y + mapBox.height - 8 && Math.abs((directionsActionBox.x + directionsActionBox.width / 2) - (mapCardBox.x + mapCardBox.width / 2)) < 12), JSON.stringify({ mapCardBox, mapBox, directionsActionBox }));
record("location driving action has a readable touch target", Boolean(directionsActionBox && directionsActionBox.height >= 44), JSON.stringify(directionsActionBox));
record("location route keeps demo disclosure", (await page.locator(".pp-location-note").textContent())?.includes("fictional demonstration clinic") ?? false, "disclosure missing");
record("location route presents business hours", await page.getByRole("heading", { name: /Plan your visit/i }).count() === 1, "business hours section missing");

const footer = page.locator(".neo-footer-socials");
record("footer renders Facebook placeholder icon", await footer.getByLabel("Facebook placeholder profile").count() === 1, "Facebook placeholder missing");
record("footer renders Instagram placeholder icon", await footer.getByLabel("Instagram placeholder profile").count() === 1, "Instagram placeholder missing");

await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open menu" }).click();
record("mobile menu exposes the complimentary Location Page", await page.getByRole("navigation", { name: "Mobile navigation" }).getByText("Clinic location").count() === 1, "mobile location navigation missing");
record("mobile menu omits the removed complimentary label", await page.getByText("Complimentary page").count() === 0, "mobile benefit label still visible");
await page.getByRole("button", { name: "Close menu" }).click();
await page.setViewportSize({ width: 1280, height: 900 });

await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
record("homepage hero uses the revised care-focused headline", await page.getByRole("heading", { name: /Your best friend deserves care/i }).count() === 1, "revised hero headline missing");
const heroSupport = page.locator(".hero-value p");
const heroSupportSize = Number.parseFloat(await heroSupport.evaluate(element => getComputedStyle(element).fontSize));
const heroActionBox = await page.locator(".hero-value .lime-link").boundingBox();
const footerActionSize = Number.parseFloat(await page.locator(".neo-footer-cta").evaluate(element => getComputedStyle(element).fontSize));
const firstServiceAction = page.locator(".pp-service-card-top a").first();
const firstServiceActionBox = await firstServiceAction.boundingBox();
const heroAction = page.locator(".hero-value .lime-link");
await heroAction.hover();
await page.waitForTimeout(220);
const heroActionHoverState = await heroAction.evaluate(element => ({ transform: getComputedStyle(element).transform, boxShadow: getComputedStyle(element).boxShadow }));
record("homepage support message uses readable display text", heroSupportSize >= 32, `font-size=${heroSupportSize}`);
record("homepage Explore services action has a readable touch target", Boolean(heroActionBox && heroActionBox.height >= 44), JSON.stringify(heroActionBox));
record("desktop hero action has visible hover feedback", heroActionHoverState.transform !== "none" && heroActionHoverState.boxShadow !== "none", JSON.stringify(heroActionHoverState));
record("footer action uses enlarged readable text", footerActionSize >= 14, `font-size=${footerActionSize}`);
record("service cards expose readable labelled request actions", await page.getByText("Start a request", { exact: true }).count() >= 4, "service-card action labels missing");
record("service-card request action has an enlarged touch target", Boolean(firstServiceActionBox && firstServiceActionBox.height >= 40), JSON.stringify(firstServiceActionBox));
record("homepage uses client-ready Reviews language", await page.getByText("Reviews", { exact: true }).count() >= 1, "Reviews heading missing");
record("homepage explains authentic Google Reviews pathway", await page.getByText("Share an authentic experience directly on Google. Google manages sign-in, review publication, and its own community safeguards.").count() === 1, "Google Reviews disclosure missing");
const googleReviewLink = page.getByRole("link", { name: /Review us on Google Maps/i });
record("homepage exposes the approved Google review action", await googleReviewLink.count() === 1, "Google review CTA missing");
record("Google review CTA opens the supplied destination in a new tab", await googleReviewLink.getAttribute("href") === "https://maps.app.goo.gl/NJJubY67EdFb4NEs9" && await googleReviewLink.getAttribute("target") === "_blank", "Google review destination or new-tab behavior missing");
record("homepage has no temporary review form", await page.locator('input[name="reviewerName"]').count() === 0 && await page.locator('textarea[name="reviewFeedback"]').count() === 0, "temporary review form still present");

await page.goto(`${baseUrl}/request`, { waitUntil: "domcontentloaded" });
const email = page.locator('input[name="email"]');
const phone = page.locator('input[name="phone"]');
const requestSubmitBox = await page.locator(".pp-submit").boundingBox();
record("request submit action has a readable touch target", Boolean(requestSubmitBox && requestSubmitBox.height >= 44), JSON.stringify(requestSubmitBox));
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

await page.getByRole("button", { name: "Cancellation & contact policy" }).click();
record("cancellation and contact policy opens in an accessible modal", await page.getByRole("dialog").getByText("Cancellation & contact").count() === 1, "policy dialog missing");
await page.keyboard.press("Escape");

let mockMutationSeen = false;
await page.route("**/api/trpc/appointmentRequest.submit**", async route => {
  mockMutationSeen = true;
  await new Promise(resolve => setTimeout(resolve, 300));
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify([{ result: { data: { json: { requestId: "qa_request_001", status: "Pending staff review" } } } }]),
  });
});

await page.locator('input[name="name"]').fill("Alex Visitor");
await page.locator('input[name="petName"]').fill("Milo");
await page.locator('textarea[name="message"]').fill("Routine wellness question.");
await page.locator('input[name="date"]').fill("2030-08-30");
await page.locator('input[name="time"]').fill("10:30");
await page.locator('input[name="consentConfirmed"]').check();
await page.getByRole("button", { name: "Send visit request" }).click();
record("request submission shows loading feedback", await page.getByText("Sending securely to the clinic’s staff-review workflow…").count() === 1, "loading feedback missing");
await page.getByText("Google Sheet request recorded").waitFor();
record("request submission uses mocked non-writing intake", mockMutationSeen, "mutation route not seen");
record("request submission shows truthful staff-review success", (await page.locator(".pp-success-state").textContent())?.includes("not yet a confirmed appointment") ?? false, "truthful success message missing");
record("request submission displays returned request reference", (await page.locator(".pp-request-reference").textContent())?.includes("qa_request_001") ?? false, "request reference missing");

await browser.close();
await writeFile(`${outputDir}/results.json`, JSON.stringify({ status: "pass", checks }, null, 2));
console.log(JSON.stringify({ status: "pass", checks }, null, 2));
