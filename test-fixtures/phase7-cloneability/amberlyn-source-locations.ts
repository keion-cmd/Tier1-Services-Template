// Multi-location data — a clone with a single location just keeps one entry here;
// a multi-location business adds more. No place names are hardcoded anywhere else
// in the app (nav, home page, etc.) — everything reads from this array.
export interface Location {
  slug: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  phoneDigits: string;
  email: string;
  mapsUrl: string;
  landmark: string;
  description: string;
  /** Slugs into `services[]` (business-content.ts) — resolved via getServiceBySlug, not matched by name, so a service rename can't silently desync a location's offered-services list. */
  serviceSlugs: string[];
  /** Optional slugs into `providers[]` (business-content.ts) — which team members work at this location. */
  providerSlugs?: string[];
  businessHours: { days: string; hours: string }[];
  imageKey: string;
  /** Optional parking/transit/accessibility notes — answers "how do I actually get there." */
  accessNotes?: string;
}

export const locations: Location[] = [
  {
    slug: "ashford-mills-studio",
    name: "Ashford Mills Studio & Showroom",
    address: "482 Foundry Row, Ashford Mills, OR 97045",
    city: "Ashford Mills, OR",
    phone: "(503) 555-0148",
    phoneDigits: "5035550148",
    email: "hello@amberlynstudio.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=482+Foundry+Row%2C+Ashford+Mills%2C+OR+97045",
    landmark: "In the old Kiln Alley millworks building, across from Foundry Row Coffee",
    description: "Our headquarters studio, design center, and material showroom, where most consultations, design sessions, and material selection meetings take place.",
    serviceSlugs: [
      "whole-home-renovation",
      "kitchen-remodeling",
      "bathroom-remodeling",
      "interior-design-space-planning",
      "smart-home-integration",
    ],
    providerSlugs: ["provider-1", "provider-3", "provider-5", "provider-7"],
    businessHours: [
      { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    imageKey: "location-ashford-mills-studio",
    accessNotes: "Free client parking is available directly behind the building, off Kiln Alley. Street parking is also available on Foundry Row, metered until 6 PM. The studio entrance is wheelchair accessible via the ramp at the north door, and our showroom floor is fully accessible.",
  },
  {
    slug: "northgate-design-center",
    name: "Northgate Design Center",
    address: "1917 Larchmont Avenue, Suite 220, Northgate, OR 97220",
    city: "Northgate, OR",
    phone: "(503) 555-0173",
    phoneDigits: "5035550173",
    email: "northgate@amberlynstudio.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=1917+Larchmont+Avenue%2C+Suite+220%2C+Northgate%2C+OR+97220",
    landmark: "Second floor of the Larchmont Professional Center, above Northgate Hardware",
    description: "Our satellite design center serving the Northgate area, focused on structural projects — additions, basement finishing, and historic restoration — with our architecture and restoration teams on site.",
    serviceSlugs: ["home-additions", "basement-finishing", "historic-home-restoration"],
    providerSlugs: ["provider-2", "provider-6", "provider-4"],
    businessHours: [
      { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
      { days: "Saturday", hours: "By appointment only" },
      { days: "Sunday", hours: "Closed" },
    ],
    imageKey: "location-northgate-design-center",
    accessNotes: "A dedicated visitor lot sits directly in front of the Larchmont Professional Center off Larchmont Avenue. The building has an elevator to the second floor, and our suite is the first door on the left. Northgate's #14 bus line stops directly across the street.",
  },
  {
    slug: "riverbend-project-office",
    name: "Riverbend Project Office",
    address: "6604 Millpond Crossing, Riverbend, OR 97080",
    city: "Riverbend, OR",
    phone: "(503) 555-0192",
    phoneDigits: "5035550192",
    email: "riverbend@amberlynstudio.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=6604+Millpond+Crossing%2C+Riverbend%2C+OR+97080",
    landmark: "Small standalone office at the entrance to the Millpond Crossing business park, near the river trailhead",
    description: "Our field project office for outdoor living and larger renovation projects on the east side of the region, primarily used for on-site client meetings and material staging rather than showroom visits.",
    serviceSlugs: ["outdoor-living-deck-design", "whole-home-renovation", "home-additions"],
    providerSlugs: ["provider-4", "provider-6"],
    businessHours: [
      { days: "Monday – Friday", hours: "By appointment only" },
      { days: "Saturday", hours: "9:00 AM – 12:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    imageKey: "location-riverbend-project-office",
    accessNotes: "Gravel client parking is available directly outside the office entrance. This location does not have a full showroom — bring any material questions to the Ashford Mills studio, or ask your project manager to bring samples to your on-site meeting. The office is ground-level and fully wheelchair accessible.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
