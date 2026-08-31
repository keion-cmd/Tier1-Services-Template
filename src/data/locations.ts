/** Facade over the active client's locations — see `src/lib/business-content.ts` for the pattern. */
import { clientConfig } from "@/config/active-client";
import type { Location } from "@/config/schema";
import { getLocationBySlug } from "@/config/helpers";

export type { Location };
export const locations = clientConfig.locations;
export { getLocationBySlug };
