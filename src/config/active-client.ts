import { template } from "./clients/template";
import { clearview } from "./clients/clearview";
import { cascade } from "./clients/cascade";
import { amberlyn } from "./clients/amberlyn";
import { validateClientConfig } from "./validate";
import type { ClientConfig } from "./schema";

const CLIENTS = { template, clearview, cascade, amberlyn } satisfies Record<string, ClientConfig>;

/**
 * The one line that decides which business this site renders. Cloning for a new client is:
 * add a `src/config/clients/<name>.ts`, register it in `CLIENTS` above, and point this at it.
 * No page, layout, or component needs to change. See TIER1_CLONING_WORKFLOW.md.
 */
const ACTIVE_CLIENT: keyof typeof CLIENTS = "template";

export function getActiveClient(): ClientConfig {
  const config = CLIENTS[ACTIVE_CLIENT];
  validateClientConfig(config, ACTIVE_CLIENT);
  return config;
}

export const clientConfig: ClientConfig = getActiveClient();
