import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { isPlaceholderToken } from "@/lib/utils";

/**
 * Keyless Google Maps embed (public `output=embed` endpoint — no API key required)
 * built from address + city. Shared by /contact (when a client has locations) and
 * /locations/[slug], so the URL-building logic lives in exactly one place.
 */
export function LocationMap({
  address,
  city,
  landmark,
  landmarkLabel = "Nearby landmark",
  className,
}: {
  address: string;
  city: string;
  landmark?: string;
  landmarkLabel?: string;
  className?: string;
}) {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${address}, ${city}`)}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address}, ${city}`)}`;
  const showLandmark = landmark && !isPlaceholderToken(landmark);

  return (
    <Card className={`relative min-h-[400px] gap-0 overflow-hidden p-0 md:min-h-[510px] ${className ?? ""}`}>
      {showLandmark && (
        <div className="absolute top-4 left-4 z-10 grid max-w-[calc(100%-2rem)] min-w-0 gap-0.5 rounded-xl bg-foreground/85 px-3.5 py-2.5 text-background">
          <span className="text-[10px] font-bold tracking-wide text-primary-foreground/70 uppercase">{landmarkLabel}</span>
          <strong className="min-w-0 break-words text-lg font-medium">{landmark}</strong>
        </div>
      )}
      <iframe
        className="h-full min-h-[400px] w-full border-0 md:min-h-[510px]"
        title={`Google Maps location for ${address}, ${city}`}
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-md hover:bg-primary/90"
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open driving directions <ArrowUpRight size={14} />
      </a>
    </Card>
  );
}
