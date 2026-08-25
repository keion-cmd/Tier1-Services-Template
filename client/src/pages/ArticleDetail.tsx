import { Link, useParams } from "wouter";
import { ArrowUpRight, Info, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { articles, buildArticleSchema, buildBreadcrumbSchema, clinic, copy, getArticleBySlug } from "@/lib/business-content";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <NotFound />;

  const related = articles.filter((entry) => entry.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <PageMeta
        title={`${article.title} — ${clinic.name} ${clinic.descriptor}`}
        description={article.excerpt}
        path={`/resources/${article.slug}`}
        jsonLd={[
          buildArticleSchema(article),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow={`${article.category} · ${article.date} · ${article.readingTime}`}
        title={article.title}
        description={article.excerpt}
        cta={<BookingButton label="Book an Appointment" />}
        backLink={{ href: "/resources", label: "All Resources" }}
        image={{ label: "Resource image", token: article.imageKey }}
      />

      <Section aria-labelledby="article-body-title">
        <SectionHeading icon={ShieldCheck} eyebrow="Article" title={<span id="article-body-title" className="sr-only">Article</span>} className="mb-6" />
        <div className="flex max-w-180 flex-col gap-4">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        {article.disclaimer && (
          <p className="mt-6 flex max-w-180 items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info size={16} className="mt-0.5 shrink-0" /> This content is for general educational purposes and does
            not replace professional advice from our team.
          </p>
        )}
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="article-related-title">
        <SectionHeading
          icon={ShieldCheck}
          eyebrow="Keep reading"
          title={<span id="article-related-title">{copy.articleDetail.relatedTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {related.map((entry) => (
            <Card key={entry.slug} className="gap-3 p-4">
              <ImagePlaceholder label="Resource image" token={entry.imageKey} className="h-40 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {entry.category} · {entry.readingTime}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{entry.excerpt}</p>
                <Link
                  href={`/resources/${entry.slug}`}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Read article <ArrowUpRight size={15} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.articleDetail.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
