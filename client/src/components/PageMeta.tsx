/**
 * Companion Field Notes design reminder: metadata stays clear, warm, and accurate.
 */
import { useEffect } from "react";

const SITE_ORIGIN = "https://summit-air-home-demo.vercel.app";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attr, key); document.head.appendChild(tag); }
  tag.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) { tag = document.createElement("link"); tag.setAttribute("rel", rel); document.head.appendChild(tag); }
  tag.setAttribute("href", href);
}

export function PageMeta({ title, description, path, image, jsonLd }: { title: string; description: string; path?: string; image?: string; jsonLd?: Record<string, unknown> | Record<string, unknown>[] }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);

    const canonicalUrl = `${SITE_ORIGIN}${path ?? window.location.pathname}`;
    upsertLink("canonical", canonicalUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    if (image) upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    const scriptId = "pp-page-jsonld";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById(scriptId)?.remove(); };
  }, [title, description, path, image, jsonLd]);

  return null;
}

export { SITE_ORIGIN };
