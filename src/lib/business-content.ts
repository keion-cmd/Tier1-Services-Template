/**
 * Engine-side facade over the active client config (`@/config/active-client`). Every page and
 * component keeps importing from this module by the same names as before — only the underlying
 * data source moved, to `src/config/clients/*`. See `TIER1_CLONING_WORKFLOW.md` for how to add
 * a new client and switch `ACTIVE_CLIENT` in `src/config/active-client.ts`.
 */
import { clientConfig } from "@/config/active-client";
import type { Article, Faq, LogoMarqueeGroup, Provider, Service } from "@/config/schema";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildPersonSchema,
  getArticleBySlug,
  getBusinessTagline,
  getProviderBySlug,
  getProvidersByService,
  getServiceBySlug,
  getServicesByProvider,
  staff,
} from "@/config/helpers";

export const businessConfig = {
  ...clientConfig.business,
  bookingMode: clientConfig.siteSettings.bookingMode,
  isTemplateDemo: clientConfig.siteSettings.isTemplateDemo,
};

/** Backward-compatible alias — prefer `businessConfig` in new code. */
export const clinic = businessConfig;

export type { LogoMarqueeGroup };
export const LOCATIONS_ADJACENT_MARQUEE_ID = clientConfig.content.locationsAdjacentMarqueeId;
export const logoMarquees = clientConfig.content.logoMarquees;
export const sectionVisibility = clientConfig.sectionVisibility;
export const copy = clientConfig.copy;

export const aboutValues = clientConfig.content.aboutValues;

export type { Service };
export const services = clientConfig.services;

export const trustStats = clientConfig.content.trustStats;
export const differentiators = clientConfig.content.differentiators;
export const howItWorks = clientConfig.content.howItWorks;
export const healthResources = clientConfig.content.healthResources;
export const marqueeReviews = clientConfig.testimonials;

export type { Faq };
export const faqs = clientConfig.faqs;

export const emergencyInfo = clientConfig.content.emergencyInfo;
export const paymentInfo = clientConfig.content.paymentInfo;

export type { Provider };
export const providers = clientConfig.providers;

export type { Article };
export const articles = clientConfig.resources;

export const carePlans = clientConfig.content.carePlans;
export const serviceChoiceSteps = clientConfig.content.serviceChoiceSteps;
export const newClientSteps = clientConfig.content.newClientSteps;
export const whatToBring = clientConfig.content.whatToBring;
export const clinicExperienceFeatures = clientConfig.content.clinicExperienceFeatures;
export const clientStories = clientConfig.stories;
export const proofStatHighlight = clientConfig.content.proofStatHighlight;
export const proofCareStats = clientConfig.content.proofCareStats;
export const proofPageStories = clientConfig.content.proofPageStories;

export const SITE_ORIGIN = clientConfig.seo.siteOrigin;

export {
  staff,
  getBusinessTagline,
  getServiceBySlug,
  getProviderBySlug,
  getServicesByProvider,
  getProvidersByService,
  getArticleBySlug,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildFaqSchema,
  buildPersonSchema,
  buildArticleSchema,
};
