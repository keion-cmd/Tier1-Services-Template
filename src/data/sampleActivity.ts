// Simulated social-proof feed for <ActivityNotification />. Every entry is explicitly
// fake (isSimulated: true) — replace the placeholder names/locations with real ones only
// if the client has consented to displaying recent-activity social proof; otherwise this
// feature can be safely left with placeholders or removed by not mounting the component.
export interface BookingActivity {
  id: number;
  name: string;
  location: string;
  service: string;
  minutesAgo: number;
  isSimulated: true;
}

export const sampleActivity: BookingActivity[] = [
  { id: 1, name: "[SAMPLE_ACTIVITY_NAME_1]", location: "[SAMPLE_ACTIVITY_LOCATION_1]", service: "[SERVICE_1_NAME]", minutesAgo: 5, isSimulated: true },
  { id: 2, name: "[SAMPLE_ACTIVITY_NAME_2]", location: "[SAMPLE_ACTIVITY_LOCATION_2]", service: "[SERVICE_2_NAME]", minutesAgo: 12, isSimulated: true },
  { id: 3, name: "[SAMPLE_ACTIVITY_NAME_3]", location: "[SAMPLE_ACTIVITY_LOCATION_3]", service: "[SERVICE_3_NAME]", minutesAgo: 2, isSimulated: true },
  { id: 4, name: "[SAMPLE_ACTIVITY_NAME_4]", location: "[SAMPLE_ACTIVITY_LOCATION_1]", service: "[SERVICE_4_NAME]", minutesAgo: 30, isSimulated: true },
  { id: 5, name: "[SAMPLE_ACTIVITY_NAME_5]", location: "[SAMPLE_ACTIVITY_LOCATION_2]", service: "[SERVICE_1_NAME]", minutesAgo: 1, isSimulated: true },
  { id: 6, name: "[SAMPLE_ACTIVITY_NAME_6]", location: "[SAMPLE_ACTIVITY_LOCATION_3]", service: "[SERVICE_2_NAME]", minutesAgo: 18, isSimulated: true },
  { id: 7, name: "[SAMPLE_ACTIVITY_NAME_7]", location: "[SAMPLE_ACTIVITY_LOCATION_1]", service: "[SERVICE_3_NAME]", minutesAgo: 7, isSimulated: true },
  { id: 8, name: "[SAMPLE_ACTIVITY_NAME_8]", location: "[SAMPLE_ACTIVITY_LOCATION_2]", service: "[SERVICE_4_NAME]", minutesAgo: 45, isSimulated: true },
];

export function formatMinutesAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutesAgo / 60);
  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export { shuffled };
