/**
 * Shared Tailwind + shadcn/ui building blocks used across every public page,
 * so hero, section-heading, and outro rhythm stays uniform site-wide.
 */
import type { ComponentProps, ElementType, ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cn } from "@/lib/utils";

export function Section({
  className,
  containerClassName,
  ...props
}: ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", containerClassName)}>{props.children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-primary uppercase">
      {children}
    </span>
  );
}

interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  cta: ReactNode;
  backLink?: { href: string; label: string };
  image?: { label: string; token?: string };
}

export function PageHero({ eyebrow, title, description, cta, backLink, image }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-20 lg:px-8",
          image ? "md:grid-cols-2 md:items-center" : ""
        )}
      >
        <div className="flex min-w-0 max-w-xl flex-col gap-5">
          {backLink && (
            <Link
              href={backLink.href}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft size={15} /> {backLink.label}
            </Link>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-foreground break-words sm:text-5xl">{title}</h1>
          <p className="text-base leading-relaxed break-words text-muted-foreground">{description}</p>
          {cta}
        </div>
        {image && (
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border border-border shadow-sm">
            <ImagePlaceholder label={image.label} token={image.token} className="h-full w-full border-0" />
          </div>
        )}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, action, align = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className
      )}
    >
      <div className={cn("flex min-w-0 max-w-2xl flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight text-foreground break-words sm:text-4xl">{title}</h2>
        {description && <p className="text-base leading-relaxed break-words text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageOutro({ eyebrow, title, cta }: { eyebrow: ReactNode; title: ReactNode; cta: ReactNode }) {
  return (
    <Section className="border-t border-border bg-primary text-primary-foreground">
      <div className="flex min-w-0 flex-col items-start gap-6">
        <Badge variant="secondary" className="w-fit max-w-full gap-1.5 rounded-full border-none bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide break-words text-primary-foreground uppercase">
          {eyebrow}
        </Badge>
        <h2 className="max-w-2xl break-words text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{title}</h2>
        {cta}
      </div>
    </Section>
  );
}

interface FeatureCardProps {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  as?: ElementType;
  href?: string;
  className?: string;
}

export function FeatureCard({ label, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn("h-full min-w-0 transition-colors hover:border-primary/40", className)}>
      <CardContent className="flex h-full min-w-0 flex-col gap-3">
        {label && <span className="text-xs font-semibold tracking-wide break-words text-primary uppercase">{label}</span>}
        <h3 className="text-lg leading-snug font-semibold break-words text-foreground">{title}</h3>
        {description && <p className="text-sm leading-relaxed break-words text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}

export function StepList({ steps }: { steps: { step: string; title: string; copy: string }[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item) => (
        <div key={item.step} className="flex min-w-0 flex-col gap-3 border-t-2 border-border pt-5">
          <span className="text-3xl font-bold break-words text-primary">{item.step}</span>
          <h3 className="text-lg font-semibold break-words text-foreground">{item.title}</h3>
          <p className="text-sm leading-relaxed break-words text-muted-foreground">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function StatBlock({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border sm:grid-cols-4 sm:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.label} className="flex min-w-0 flex-col gap-2 px-4 py-6 first:pl-0 sm:px-6">
          <strong className="text-3xl font-bold break-words text-primary sm:text-4xl">{stat.value}</strong>
          <span className="text-sm font-medium break-words text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
