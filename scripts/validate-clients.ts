/**
 * The Phase 8 regression suite for cloneability: validates every registered client config
 * (template + the three Phase 7 fixtures) for duplicate slugs and dangling cross-references,
 * independent of which one is currently ACTIVE_CLIENT in src/config/active-client.ts. Replaces
 * the old regex-based test-fixtures/phase7-cloneability/validate-relationships.mjs, which
 * scanned raw source text — this runs the same structural checks (`validateClientConfig`)
 * `src/config/active-client.ts` runs against the active client on every dev/build load, just
 * against all four configs at once.
 *
 * Run with: npm run validate:clients
 */
import { validateClientConfig } from "../src/config/validate";
import { template } from "../src/config/clients/template";
import { clearview } from "../src/config/clients/clearview";
import { cascade } from "../src/config/clients/cascade";
import { amberlyn } from "../src/config/clients/amberlyn";

const clients: Record<string, typeof template> = {
  template,
  clearview,
  cascade,
  amberlyn,
};

let failed = false;
for (const [id, config] of Object.entries(clients)) {
  try {
    validateClientConfig(config, id);
    console.log(`✓ ${id} passed validation (${config.services.length} services, ${config.providers.length} providers, ${config.locations.length} locations)`);
  } catch (error) {
    failed = true;
    console.error(`✗ ${id} FAILED validation`);
    console.error(error instanceof Error ? error.message : error);
  }
}

if (failed) {
  console.error("\nOne or more client configs failed validation.");
  process.exit(1);
}

console.log(`\nAll ${Object.keys(clients).length} client configs passed. Clearview / Cascade / Amberlyn / Template all still work.`);
