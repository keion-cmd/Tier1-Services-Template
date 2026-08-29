import { ShieldCheck } from "lucide-react";
import type { InsuranceProvider } from "@/data/insurance";

interface InsuranceMarqueeProps {
  items: InsuranceProvider[];
  heading?: string;
  supportingText?: string;
}

export function InsuranceMarquee({
  items,
  heading = "Insurance & Coverage We Accept",
  supportingText = "We work with most major providers — ask us if yours isn't listed.",
}: InsuranceMarqueeProps) {
  const groups = [items, items];

  return (
    <section className="bg-secondary/40 py-10 md:py-14" aria-labelledby="insurance-marquee-title">
      <div className="mx-auto mb-8 max-w-md min-w-0 px-6 text-center">
        <h2 id="insurance-marquee-title" className="break-words text-lg font-semibold text-foreground">
          {heading}
        </h2>
        {supportingText && <p className="mt-1.5 break-words text-sm text-muted-foreground">{supportingText}</p>}
      </div>
      <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee running hover:paused">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center gap-5 px-6" aria-hidden={groupIndex === 1 ? true : undefined}>
              {group.map((provider) => (
                <div
                  key={`${provider.id}-${groupIndex}`}
                  className="flex h-16 w-44 min-w-0 shrink-0 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 text-center shadow-sm transition-colors hover:border-primary/50 sm:h-20 sm:w-52"
                  aria-label={groupIndex === 0 ? provider.name : undefined}
                >
                  <ShieldCheck size={16} className="shrink-0 text-muted-foreground" aria-hidden />
                  <span className="min-w-0 break-words text-sm font-semibold tracking-tight text-muted-foreground sm:text-base">
                    {provider.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
