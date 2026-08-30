import type { Metadata } from "next";
import { getBusinessTagline, SITE_ORIGIN } from "@/lib/business-content";

/**
 * Shared per-page metadata builder. Every routed page should call this instead of
 * hand-rolling its own `export const metadata` object, so title formatting, canonical
 * URLs, and OG/Twitter tags stay consistent site-wide. JSON-LD structured data is NOT
 * part of Next's Metadata API (there's no field for arbitrary <script> tags) — render
 * the `<JsonLd data={...} />` component directly in the page body for that instead.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const canonicalUrl = `${SITE_ORIGIN}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: getBusinessTagline(),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
