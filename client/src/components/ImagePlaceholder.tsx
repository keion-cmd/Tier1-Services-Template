/**
 * Cloneable stand-in for a real client photo. Renders a dashed, labeled block instead of an
 * <img>, so anyone cloning this template can see exactly which slots need a real image.
 */
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Human-readable description of what belongs here, e.g. "Hero image". */
  label: string;
  /** Bracketed token shown under the label, e.g. "[HERO_IMAGE]". */
  token?: string;
  /** Tailwind aspect-ratio class; ignored when className sets an explicit height. */
  aspect?: string;
  className?: string;
}

export function ImagePlaceholder({ label, token, aspect = "aspect-[4/3]", className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-muted-foreground/25 bg-muted/60 p-3 text-center",
        aspect,
        className
      )}
    >
      <ImageOff size={18} strokeWidth={1.5} className="text-muted-foreground/40" />
      <span className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">{label}</span>
      {token && <code className="text-[10px] font-mono text-muted-foreground/60">{token}</code>}
      <span className="text-[10px] leading-snug text-muted-foreground/50">Replace with client photo</span>
    </div>
  );
}
