"use client";

/**
 * Homepage FAQ section — eyebrow-pill + heading header row (matching the
 * About/Services header pattern), then a 2-column layout: a portrait photo
 * card on the left, an accordion of real `faqs` entries on the right (each
 * row a horizontal bar with a circular +/- toggle instead of shadcn's
 * default chevron trigger — built directly on the Radix primitive rather
 * than editing the shared ui/accordion.tsx trigger used elsewhere).
 */
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EyebrowPill } from "@/components/blocks/PageBlocks";
import { type Faq } from "@/lib/business-content";

export function HomeFaqSection({
  eyebrow,
  title,
  description,
  faqs,
  imageKey = "[FAQ_IMAGE]",
}: {
  eyebrow: string;
  title: string;
  description: string;
  faqs: Faq[];
  imageKey?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex min-w-0 flex-col gap-6 md:mb-14 md:flex-row md:items-start md:justify-between md:gap-12">
          <EyebrowPill className="shrink-0">{eyebrow}</EyebrowPill>
          <div className="flex min-w-0 max-w-2xl flex-col gap-3">
            <h2 className="font-heading min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="min-w-0 break-words text-base leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="grid min-w-0 gap-10 md:grid-cols-[0.8fr_1fr] md:gap-12">
          <div className="relative aspect-[3/4] min-w-0 overflow-hidden rounded-xl border border-border">
            <ImagePlaceholder label="FAQ photo" token={imageKey} className="h-full w-full border-0" />
          </div>

          <AccordionPrimitive.Root type="single" collapsible className="min-w-0 divide-y divide-border border-t border-border">
            {faqs.slice(0, 5).map((faq, index) => (
              <AccordionPrimitive.Item key={faq.question} value={`home-faq-${index}`} className="min-w-0">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex min-w-0 w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="min-w-0 break-words text-base font-semibold text-foreground">{faq.question}</span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-transform duration-200 group-data-[state=open]:rotate-45">
                      <Plus size={16} />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down min-w-0 overflow-hidden text-sm">
                  <p className="min-w-0 max-w-2xl break-words pb-5 leading-relaxed text-muted-foreground">{faq.answer}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>

        <div className="mt-10 flex min-w-0 flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <span className="min-w-0 break-words text-sm font-medium text-foreground">Still have questions?</span>
          <Link href="/contact">
            <Button size="sm">
              Get in touch <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
