import * as business from "../../../test-fixtures/phase7-cloneability/clearview-source-business";
import * as locationsModule from "../../../test-fixtures/phase7-cloneability/clearview-source-locations";
import { fromLegacyFixture } from "./legacy-adapter";

/** Clearview Home Cleaning — Phase 7's "sparse" fixture (1 service category pair, 1 provider, 1 location). */
export const clearview = fromLegacyFixture(business, locationsModule);
