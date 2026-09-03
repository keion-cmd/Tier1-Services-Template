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
        "relative flex w-full min-w-0 flex-col items-center justify-center gap-1.5 overflow-hidden border border-border bg-gradient-to-br from-muted via-muted/70 to-secondary/40 p-3 text-center",
        aspect,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--foreground)/0.06),transparent_60%)]" aria-hidden="true" />
      <ImageOff size={20} strokeWidth={1.25} className="relative shrink-0 text-muted-foreground/50" />
      <span className="relative max-w-full break-words text-[11px] font-bold tracking-wide text-muted-foreground uppercase">{label}</span>
      {/* Full-opacity text-muted-foreground, not a diluted /50-/60 variant — confirmed via
          axe-core that anything past ~/90 fails WCAG AA's 4.5:1 at this font size. */}
      {token && <code className="relative max-w-full break-words text-[10px] font-mono text-muted-foreground">{token}</code>}
      <span className="relative text-[10px] leading-snug text-muted-foreground">Replace with client photo</span>
    </div>
  );
}
