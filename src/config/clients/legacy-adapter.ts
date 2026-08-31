import type { ClientConfig, PageCopy } from "../schema";

/**
 * The flat, single-file shape every Phase 7 fixture (and the pre-Phase-8 business-content.ts)
 * exported. `clearview.ts`, `cascade.ts`, and `amberlyn.ts` adapt their source data — which
 * still lives in `test-fixtures/phase7-cloneability/*-source-*.ts` in this legacy shape — into
 * the current `ClientConfig` via `fromLegacyFixture` below, rather than hand-retyping every
 * field (and risking transcription drift in long-form bios/articles) into the new shape.
 */
export interface LegacyBusinessModule {
  businessConfig: {
    bookingMode: "modal" | "external";
    isTemplateDemo: boolean;
    name: string;
    shortName: string;
    tagline: string;
    descriptor: string;
    schemaType: string;
    address: string;
    city: string;
    phone: string;
    phoneDigits: string;
    email: string;
    hours: string;
    googleReviewUrl: string;
    mapsUrl: string;
    businessHours: { days: string; hours: string }[];
    socialLinks: { label: string; href: string; placeholder: boolean }[];
  };
  sectionVisibility: ClientConfig["sectionVisibility"];
  copy: PageCopy;
  aboutValues: ClientConfig["content"]["aboutValues"];
  services: ClientConfig["services"];
  trustStats: ClientConfig["content"]["trustStats"];
  differentiators: ClientConfig["content"]["differentiators"];
  howItWorks: ClientConfig["content"]["howItWorks"];
  healthResources: ClientConfig["content"]["healthResources"];
  marqueeReviews: ClientConfig["testimonials"];
  faqs: ClientConfig["faqs"];
  emergencyInfo: ClientConfig["content"]["emergencyInfo"];
  paymentInfo: ClientConfig["content"]["paymentInfo"];
  providers: ClientConfig["providers"];
  articles: ClientConfig["resources"];
  carePlans: ClientConfig["content"]["carePlans"];
  serviceChoiceSteps: ClientConfig["content"]["serviceChoiceSteps"];
  newClientSteps: ClientConfig["content"]["newClientSteps"];
  whatToBring: ClientConfig["content"]["whatToBring"];
  clinicExperienceFeatures: ClientConfig["content"]["clinicExperienceFeatures"];
  clientStories: ClientConfig["stories"];
  proofStatHighlight: ClientConfig["content"]["proofStatHighlight"];
  proofCareStats: ClientConfig["content"]["proofCareStats"];
  proofPageStories: ClientConfig["content"]["proofPageStories"];
  logoMarquees: ClientConfig["content"]["logoMarquees"];
  LOCATIONS_ADJACENT_MARQUEE_ID: string;
  SITE_ORIGIN: string;
}

export interface LegacyLocationsModule {
  locations: ClientConfig["locations"];
}

export function fromLegacyFixture(business: LegacyBusinessModule, locationsModule: LegacyLocationsModule): ClientConfig {
  return {
    business: {
      name: business.businessConfig.name,
      shortName: business.businessConfig.shortName,
      tagline: business.businessConfig.tagline,
      descriptor: business.businessConfig.descriptor,
      schemaType: business.businessConfig.schemaType,
      address: business.businessConfig.address,
      city: business.businessConfig.city,
      phone: business.businessConfig.phone,
      phoneDigits: business.businessConfig.phoneDigits,
      email: business.businessConfig.email,
      hours: business.businessConfig.hours,
      googleReviewUrl: business.businessConfig.googleReviewUrl,
      mapsUrl: business.businessConfig.mapsUrl,
      businessHours: business.businessConfig.businessHours,
      socialLinks: business.businessConfig.socialLinks,
    },
    siteSettings: {
      bookingMode: business.businessConfig.bookingMode,
      isTemplateDemo: business.businessConfig.isTemplateDemo,
    },
    seo: { siteOrigin: business.SITE_ORIGIN },
    sectionVisibility: business.sectionVisibility,
    copy: business.copy,
    services: business.services,
    providers: business.providers,
    locations: locationsModule.locations,
    testimonials: business.marqueeReviews,
    stories: business.clientStories,
    resources: business.articles,
    faqs: business.faqs,
    content: {
      aboutValues: business.aboutValues,
      trustStats: business.trustStats,
      differentiators: business.differentiators,
      howItWorks: business.howItWorks,
      healthResources: business.healthResources,
      carePlans: business.carePlans,
      serviceChoiceSteps: business.serviceChoiceSteps,
      newClientSteps: business.newClientSteps,
      whatToBring: business.whatToBring,
      clinicExperienceFeatures: business.clinicExperienceFeatures,
      emergencyInfo: business.emergencyInfo,
      paymentInfo: business.paymentInfo,
      proofStatHighlight: business.proofStatHighlight,
      proofCareStats: business.proofCareStats,
      proofPageStories: business.proofPageStories,
      logoMarquees: business.logoMarquees,
      locationsAdjacentMarqueeId: business.LOCATIONS_ADJACENT_MARQUEE_ID,
    },
  };
}
