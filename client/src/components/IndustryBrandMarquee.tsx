import type { IndustryBrand } from "@/lib/industryBrands";
import { cn } from "@/lib/utils";

interface IndustryBrandMarqueeProps {
  items: IndustryBrand[];
  heading?: string;
  supportingText?: string;
}

export function IndustryBrandMarquee({
  items,
  heading = "Trusted Industry Partners",
  supportingText = "Industry brands shown for demonstration purposes.",
}: IndustryBrandMarqueeProps) {
  const groups = [items, items];

  return (
    <section className="bg-secondary/40 py-10 md:py-14" aria-labelledby="industry-brand-marquee-title">
      <div className="mx-auto mb-6 max-w-md px-6 text-center">
        <h2 id="industry-brand-marquee-title" className="text-lg font-semibold text-foreground">
          {heading}
        </h2>
        {supportingText && <p className="mt-1.5 text-sm text-muted-foreground">{supportingText}</p>}
      </div>
      <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee running hover:paused">
          {groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center gap-14 px-6"
              aria-hidden={groupIndex === 1 ? true : undefined}
            >
              {group.map((brand) => (
                <div
                  key={`${brand.name}-${groupIndex}`}
                  className={cn(
                    "flex h-9 shrink-0 items-center",
                    brand.onDark && "rounded-lg bg-foreground px-3.5"
                  )}
                >
                  <img
                    src={brand.logo}
                    alt={groupIndex === 0 ? brand.name : ""}
                    loading="eager"
                    decoding="async"
                    className={cn(
                      "h-full w-auto max-w-33 object-contain grayscale opacity-55 transition-[filter,opacity] hover:grayscale-0 hover:opacity-100",
                      brand.onDark && "h-[60%] grayscale-0 opacity-80 hover:opacity-100"
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
