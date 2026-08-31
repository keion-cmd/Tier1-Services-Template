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
    name: "Cascade Point — Brightwater Clinic",
    address: "482 Alder Ridge Way, Suite 200",
    city: "Brightwater, OR",
    phone: "(541) 555-0142",
    phoneDigits: "5415550142",
    email: "brightwater@cascadepointpt.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=482+Alder+Ridge+Way+Suite+200+Brightwater+OR",
    landmark: "Across from Brightwater Regional Medical Center, next to the Alder Ridge Shopping Center",
    description: "Our flagship clinic and main gym floor, home to orthopedic, post-surgical, manual therapy, and performance recovery care.",
    serviceSlugs: ["service-1", "service-2", "service-3", "service-6"],
    providerSlugs: ["provider-1", "provider-2"],
    businessHours: [
      { days: "Monday – Friday", hours: "7:00 AM – 7:00 PM" },
      { days: "Saturday", hours: "8:00 AM – 1:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    imageKey: "location-brightwater",
    accessNotes: "Free surface parking directly in front of the building. Ground-floor entrance with no stairs; the Brightwater Transit Route 4 bus stops just outside the shopping center.",
  },
  {
    slug: "location-2",
    name: "Cascade Point — Alder Creek Clinic",
    address: "119 Creekside Commons Drive",
    city: "Alder Creek, OR",
    phone: "(541) 555-0187",
    phoneDigits: "5415550187",
    email: "aldercreek@cascadepointpt.com",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=119+Creekside+Commons+Drive+Alder+Creek+OR",
    landmark: "Inside the Creekside Commons medical building, second floor above Alder Creek Family Dentistry",
    description: "Our smaller satellite clinic focused on vestibular, pelvic health, and senior mobility care, with dedicated private treatment rooms.",
    serviceSlugs: ["service-4", "service-5", "service-7"],
    providerSlugs: ["provider-3", "provider-4"],
    businessHours: [
      { days: "Monday – Thursday", hours: "8:00 AM – 6:00 PM" },
      { days: "Friday", hours: "8:00 AM – 3:00 PM" },
      { days: "Saturday – Sunday", hours: "Closed" },
    ],
    imageKey: "location-alder-creek",
    accessNotes: "Elevator access to the second floor and reserved patient parking spots near the building entrance. Street parking is also available along Creekside Commons Drive.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
