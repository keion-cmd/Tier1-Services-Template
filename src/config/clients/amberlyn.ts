import * as business from "../../../test-fixtures/phase7-cloneability/amberlyn-source-business";
import * as locationsModule from "../../../test-fixtures/phase7-cloneability/amberlyn-source-locations";
import { fromLegacyFixture } from "./legacy-adapter";

/** Amberlyn Home Renovation & Design Studio — Phase 7's "detailed" fixture (9 services, 7 providers, 3 locations, semantic slugs). */
export const amberlyn = fromLegacyFixture(business, locationsModule);
