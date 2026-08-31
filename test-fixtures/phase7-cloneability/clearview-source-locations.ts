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
    slug: "location-1",
    name: "Clearview Home Cleaning — Foster-Powell",
    address: "4417 SE Foster Rd, Suite B",
    city: "Portland, OR 97206",
    phone: "(503) 555-0148",
    phoneDigits: "5035550148",
    email: "hello@clearviewhomecleaning.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=4417+SE+Foster+Rd+Suite+B+Portland+OR+97206",
    landmark: "Two blocks east of the Foster & 44th intersection, next to Foster Farmhouse Kitchen",
    description: "Our home base in the Foster-Powell neighborhood, serving Southeast Portland including Woodstock, Mount Tabor, and Mount Scott-Arleta.",
    serviceSlugs: ["service-1", "service-2"],
    providerSlugs: ["provider-1"],
    businessHours: [
      { days: "Monday – Friday", hours: "8:00am – 5:00pm" },
      { days: "Saturday", hours: "9:00am – 1:00pm" },
      { days: "Sunday", hours: "Closed" },
    ],
    imageKey: "[LOCATION_1_IMAGE]",
    accessNotes: "Street parking is available on SE Foster Rd and the surrounding side streets. This is an administrative office only — all cleanings happen at your home.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
