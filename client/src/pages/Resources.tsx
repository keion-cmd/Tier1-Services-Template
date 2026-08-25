import { Link } from "wouter";
import { Info, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { articles, clinic } from "@/lib/business-content";

export default function Resources() {
  return (
    <main>
      <PageMeta
        title={`Health & Wellness Resources — ${clinic.name} ${clinic.descriptor}`}
        description={`General educational articles on wellness, preventive care, and long-term care from ${clinic.name} ${clinic.descriptor}.`}
        path="/resources"
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow="Health & wellness resources"
        title={
          <>
            Helpful reading <span className="text-primary">before your visit.</span>
          </>
        }
        description="General, educational articles to help you feel more prepared for a conversation with your care team."
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Resource image", token: "[RESOURCE_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{String(articles.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">articles</span>
          </div>
          <p className="flex max-w-md items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <Info size={17} className="mt-0.5 shrink-0" /> This content is for general educational purposes and does
            not replace professional advice from our team.
          </p>
          <BookingButton label="Talk to our team" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section aria-labelledby="resources-grid-title">
        <SectionHeading
          icon={ShieldCheck}
          eyebrow="Latest articles"
          title={
            <span id="resources-grid-title">
              Read at your <span className="text-primary">own pace.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`}>
              <Card className="h-full gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md">
                <ImagePlaceholder label="Resource image" token={article.imageKey} className="h-40 w-full border-0" />
                <div className="flex flex-col gap-1.5 p-5">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {article.category} · {article.date} · {article.readingTime}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Still have <span className="text-primary-foreground/80">questions?</span>
          </>
        }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
