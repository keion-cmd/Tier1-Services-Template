import type { IndustryBrand } from "@/lib/industryBrands";

interface IndustryBrandMarqueeProps {
  items: IndustryBrand[];
  heading: string;
  supportingText?: string;
}

export function IndustryBrandMarquee({ items, heading, supportingText }: IndustryBrandMarqueeProps) {
  if (items.length === 0) return null;
  const groups = [items, items];

  return (
    <section className="bg-secondary/40 py-10 md:py-14" aria-labelledby="industry-brand-marquee-title">
      <div className="mx-auto mb-8 max-w-md min-w-0 px-6 text-center">
        <h2 id="industry-brand-marquee-title" className="break-words text-lg font-semibold text-foreground">
          {heading}
        </h2>
        {supportingText && <p className="mt-1.5 break-words text-sm text-muted-foreground">{supportingText}</p>}
      </div>
      <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee running hover:paused">
          {groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center gap-5 px-6"
              aria-hidden={groupIndex === 1 ? true : undefined}
            >
              {group.map((brand) => (
                <div
                  key={`${brand.name}-${groupIndex}`}
                  className="flex h-16 w-44 min-w-0 shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-card px-4 text-center shadow-sm transition-colors hover:border-primary/50 sm:h-20 sm:w-52"
                  aria-label={groupIndex === 0 ? brand.name : undefined}
                >
                  <span className="min-w-0 break-words text-sm font-semibold tracking-tight text-muted-foreground sm:text-base">
                    {brand.name}
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
