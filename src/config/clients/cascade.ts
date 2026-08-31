import * as business from "../../../test-fixtures/phase7-cloneability/cascade-source-business";
import * as locationsModule from "../../../test-fixtures/phase7-cloneability/cascade-source-locations";
import { fromLegacyFixture } from "./legacy-adapter";

/** Cascade Point Physical Therapy & Wellness — Phase 7's "normal" fixture (7 services, 4 providers, 2 locations). */
export const cascade = fromLegacyFixture(business, locationsModule);
