import { Link } from "wouter";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { PageHero, PageOutro } from "@/components/PageBlocks";
import { clinic } from "@/lib/business-content";

export default function NotFound() {
  return (
    <main>
      <PageMeta
        title={`Page not found — ${clinic.name} ${clinic.descriptor}`}
        description={`This page could not be found. Return to the ${clinic.name} homepage or browse our services.`}
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow="404 · Page not found"
        title={
          <>
            That page <span className="text-primary">wandered off.</span>
          </>
        }
        description="The page you're looking for doesn't exist, may have moved, or was never here. Let's get you back on track."
        cta={
          <Button asChild size="lg" className="w-fit rounded-full">
            <Link href="/">
              Back to home <ArrowUpRight size={16} />
            </Link>
          </Button>
        }
      />

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Try one of these <span className="text-primary-foreground/80">instead.</span>
          </>
        }
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
