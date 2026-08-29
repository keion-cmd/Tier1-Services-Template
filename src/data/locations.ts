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
  servicesOffered: string[];
  businessHours: { days: string; hours: string }[];
  imageKey: string;
}

export const locations: Location[] = [
  {
    slug: "location-1",
    name: "[LOCATION_1_NAME]",
    address: "[LOCATION_1_ADDRESS]",
    city: "[LOCATION_1_CITY]",
    phone: "[LOCATION_1_PHONE]",
    phoneDigits: "[LOCATION_1_PHONE_DIGITS]",
    email: "[LOCATION_1_EMAIL]",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=[LOCATION_1_ADDRESS]",
    landmark: "[LOCATION_1_LANDMARK]",
    description: "[LOCATION_1_DESCRIPTION]",
    servicesOffered: ["[SERVICE_1_NAME]", "[SERVICE_2_NAME]", "[SERVICE_3_NAME]"],
    businessHours: [
      { days: "[LOCATION_1_HOURS_ROW_1_DAYS]", hours: "[LOCATION_1_HOURS_ROW_1_HOURS]" },
      { days: "[LOCATION_1_HOURS_ROW_2_DAYS]", hours: "[LOCATION_1_HOURS_ROW_2_HOURS]" },
      { days: "[LOCATION_1_HOURS_ROW_3_DAYS]", hours: "[LOCATION_1_HOURS_ROW_3_HOURS]" },
    ],
    imageKey: "[LOCATION_1_IMAGE]",
  },
  {
    slug: "location-2",
    name: "[LOCATION_2_NAME]",
    address: "[LOCATION_2_ADDRESS]",
    city: "[LOCATION_2_CITY]",
    phone: "[LOCATION_2_PHONE]",
    phoneDigits: "[LOCATION_2_PHONE_DIGITS]",
    email: "[LOCATION_2_EMAIL]",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=[LOCATION_2_ADDRESS]",
    landmark: "[LOCATION_2_LANDMARK]",
    description: "[LOCATION_2_DESCRIPTION]",
    servicesOffered: ["[SERVICE_4_NAME]", "[SERVICE_5_NAME]", "[SERVICE_6_NAME]"],
    businessHours: [
      { days: "[LOCATION_2_HOURS_ROW_1_DAYS]", hours: "[LOCATION_2_HOURS_ROW_1_HOURS]" },
      { days: "[LOCATION_2_HOURS_ROW_2_DAYS]", hours: "[LOCATION_2_HOURS_ROW_2_HOURS]" },
      { days: "[LOCATION_2_HOURS_ROW_3_DAYS]", hours: "[LOCATION_2_HOURS_ROW_3_HOURS]" },
    ],
    imageKey: "[LOCATION_2_IMAGE]",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
