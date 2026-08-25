/**
 * Cross-page consistency pass: article detail reuses the same blue editorial field and card system as ServiceDetail.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight, Info, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { articles, assets, buildArticleSchema, buildBreadcrumbSchema, getArticleBySlug } from "@/lib/clinic-content";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <NotFound />;

  const related = articles.filter((entry) => entry.slug !== article.slug).slice(0, 3);

  return <main className="neo-main pp-services-page">
    <PageMeta title={`${article.title} — Paws+Pine Veterinary Clinic`} description={article.excerpt} path={`/resources/${article.slug}`} image={assets[article.imageKey]} jsonLd={[buildArticleSchema(article), buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: article.title, path: `/resources/${article.slug}` }])]} />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy">
        <Link href="/resources" className="pp-text-action"><ArrowLeft size={15} /> All Resources</Link>
        <span className="pp-page-eyebrow"><PawPrint size={15} /> {article.category} · {article.date} · {article.readingTime}</span>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <BookingButton label="Book an Appointment" className="lime-link" />
      </div>
      <div className="pp-services-hero-image"><img src={assets[article.imageKey]} alt="" aria-hidden="true" /></div>
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="article-body-title">
      <h2 id="article-body-title" className="pp-page-eyebrow"><PawPrint size={15} /> Article</h2>
      <div className="grid gap-4 mt-4 max-w-[720px]">
        {article.body.map((paragraph, index) => <p key={index} className="m-0 text-[16px] leading-[1.6]">{paragraph}</p>)}
      </div>
      {article.disclaimer && <p className="pp-location-note flex items-start gap-2 mt-6"><Info size={16} className="shrink-0 mt-1" /> This content is for general educational purposes and does not replace professional veterinary advice.</p>}
    </section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="article-related-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> Keep reading</span><h2 id="article-related-title">More helpful<br /><em>articles.</em></h2></div>
      <div className="pp-directions-grid">
        {related.map((entry) => <article key={entry.slug}>
          <img src={assets[entry.imageKey]} alt="" aria-hidden="true" className="w-full h-40 object-cover rounded-xl mb-3" />
          <span>{entry.category} · {entry.readingTime}</span>
          <h3>{entry.title}</h3>
          <p>{entry.excerpt}</p>
          <Link href={`/resources/${entry.slug}`} className="pp-text-action">Read article <ArrowUpRight size={17} /></Link>
        </article>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal">
      <span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span>
      <h2>Ready to start<br />the <em>conversation?</em></h2>
      <BookingButton label="Book an Appointment" className="lime-cta" iconSize={17} />
    </section>
  </main>;
}
