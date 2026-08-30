import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { articles, buildArticleSchema, buildBreadcrumbSchema, copy, getArticleBySlug, getBusinessTagline, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: `${article.title} — ${getBusinessTagline()}`,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
  });
}

export default async function ArticleDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = articles.filter((entry) => entry.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <JsonLd
        data={[
          buildArticleSchema(article),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${article.category} · By ${article.author} · ${article.date} · ${article.readingTime}`}
        title={article.title}
        description={article.excerpt}
        cta={<BookingButton label="Book an Appointment" />}
        backLink={{ href: "/resources", label: "All Resources" }}
        image={{ label: "Resource image", token: article.imageKey }}
      />

      <Section aria-labelledby="article-body-title">
        <SectionHeading eyebrow={copy.articleDetail.bodyEyebrow} title={<span id="article-body-title" className="sr-only">{copy.articleDetail.bodyEyebrow}</span>} className="mb-6" />
        <div className="flex min-w-0 max-w-180 flex-col gap-4">
          {article.body.map((paragraph, index) => (
            <p key={index} className="min-w-0 break-words text-base leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        {article.disclaimer && (
          <p className="mt-6 flex min-w-0 max-w-180 items-start gap-2 text-xs leading-relaxed break-words text-muted-foreground">
            <Info size={16} className="mt-0.5 shrink-0" /> {copy.articleDetail.disclaimerText}
          </p>
        )}
      </Section>

      {sectionVisibility.relatedArticles && related.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="article-related-title">
          <SectionHeading
            eyebrow={copy.articleDetail.relatedEyebrow}
            title={<span id="article-related-title">{copy.articleDetail.relatedTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((entry) => (
              <Card key={entry.slug} className="gap-3 p-4">
                <ImagePlaceholder label="Resource image" token={entry.imageKey} className="aspect-[16/10] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                    {entry.category} · {entry.readingTime}
                  </span>
                  <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">{entry.title}</h3>
                  <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{entry.excerpt}</p>
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
      )}

      <PageOutro
        eyebrow={getBusinessTagline()}
        title={copy.articleDetail.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
