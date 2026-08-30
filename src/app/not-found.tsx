import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, PageOutro } from "@/components/blocks/PageBlocks";
import { clinic, copy, getBusinessTagline } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Page not found — ${getBusinessTagline()}`,
  description: `This page could not be found. Return to the ${clinic.name} homepage or browse our services.`,
});

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="404 · Page not found"
        title={copy.notFound.heroTitle}
        description={copy.notFound.heroSubtitle}
        cta={
          <Button asChild size="lg" className="w-fit rounded-full">
            <Link href="/">
              Back to home <ArrowUpRight size={16} />
            </Link>
          </Button>
        }
      />

      <PageOutro
        eyebrow={getBusinessTagline()}
        title={copy.notFound.ctaTitle}
        cta={
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/">
                Go to homepage <ArrowUpRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link href="/services">
                Browse our services <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>
        }
      />
    </main>
  );
}
