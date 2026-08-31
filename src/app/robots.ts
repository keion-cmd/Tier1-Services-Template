import type { MetadataRoute } from "next";
import { businessConfig, SITE_ORIGIN } from "@/lib/business-content";

// An un-cloned template deployment (isTemplateDemo: true) ships placeholder-token content and
// must never be indexed — same gate Footer.tsx uses for <TemplateSelfPromo />.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: businessConfig.isTemplateDemo ? [] : "/", disallow: businessConfig.isTemplateDemo ? "/" : [] },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
