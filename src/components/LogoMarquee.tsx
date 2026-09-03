import type { ReactNode } from "react";

interface LogoMarqueeItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

interface LogoMarqueeProps {
  items: LogoMarqueeItem[];
  heading: string;
  supportingText?: string;
  ariaId: string;
  className?: string;
}

export function LogoMarquee({ items, heading, supportingText, ariaId, className = "bg-secondary/40" }: LogoMarqueeProps) {
  if (items.length === 0) return null;
  const groups = [items, items];

  return (
    <section className={`${className} py-8 md:py-10`} aria-labelledby={ariaId}>
      {/* Single horizontal editorial strip: proof statement left, continuous marquee
          right — not a heading stacked above a centered marquee. Stacks on mobile
          since there isn't room for both side by side at small widths. */}
      <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:gap-10 lg:px-10">
        <div className="min-w-0 shrink-0 sm:max-w-52">
          <h2 id={ariaId} className="break-words text-sm leading-snug font-semibold text-foreground">
            {heading}
          </h2>
          {supportingText && <p className="mt-1 break-words text-xs text-muted-foreground">{supportingText}</p>}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee running hover:paused">
            {groups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex shrink-0 items-center gap-10 pr-10"
                aria-hidden={groupIndex === 1 ? true : undefined}
              >
                {group.map((item) => (
                  <div
                    key={`${item.key}-${groupIndex}`}
                    className="flex min-w-0 shrink-0 items-center gap-2"
                    aria-label={groupIndex === 0 ? item.label : undefined}
                  >
                    {item.icon}
                    <span className="min-w-0 break-words text-base font-semibold tracking-tight whitespace-nowrap text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
