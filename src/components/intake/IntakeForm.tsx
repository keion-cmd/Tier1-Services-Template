"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { sectionVisibility } from "@/lib/business-content";
import type { IntakeFormData, SectionContentAnswers } from "@/types/intake";

const sectionContentChecklist: { key: keyof typeof sectionVisibility; question: string }[] = [
  { key: "industryBrandsMarquee", question: "Do you have partner/vendor brands to display?" },
  { key: "insuranceMarquee", question: "Do you accept insurance and want it listed?" },
  { key: "trustStats", question: "Do you have stats to highlight (years in business, clients served, etc.)?" },
  { key: "whyChooseUs", question: "Do you have differentiators/reasons to choose you?" },
  { key: "meetTheTeam", question: "Do you have team photos/bios for the homepage?" },
  { key: "howItWorks", question: "Do you have a defined step-by-step process to show?" },
  { key: "clinicExperience", question: "Do you have 4+ facility/experience photos?" },
  { key: "reviewsMarquee", question: "Do you have short review quotes to scroll on the homepage?" },
  { key: "clientStories", question: "Do you have longer client success stories?" },
  { key: "healthResources", question: "Do you have articles/resources to publish?" },
  { key: "carePlans", question: "Do you offer membership/care plans to list?" },
  { key: "faqTeaser", question: "Do you have FAQs?" },
  { key: "proofStories", question: "Do you have stories for a dedicated proof/testimonials page?" },
  { key: "proofCareStats", question: "Do you have stats for a proof/testimonials page?" },
  { key: "aboutTeamGrid", question: "Do you want a team grid on your About page?" },
  { key: "teamProvidersGrid", question: "Do you want individual team member profile pages?" },
];

const sectionContentSchema = z.object(
  Object.fromEntries(sectionContentChecklist.map(({ key }) => [key, z.boolean()])) as Record<
    keyof SectionContentAnswers,
    z.ZodBoolean
  >
);

const schema = z.object({
  businessName: z.string().min(1, "Business name is required").max(150),
  contactName: z.string().min(1, "Contact name is required").max(100),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(1, "Contact phone is required").max(20),
  niche: z.string().min(1, "Please describe your business type"),
  numberOfLocations: z.number({ error: "Must be a number" }).int().min(1, "Must be at least 1 location"),
  currentBookingSystem: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  sectionContent: sectionContentSchema,
});

const sectionContentDefaults: SectionContentAnswers = Object.fromEntries(
  sectionContentChecklist.map(({ key }) => [key, false])
) as unknown as SectionContentAnswers;

export function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { sectionContent: sectionContentDefaults },
  });

  const sectionContentValues = watch("sectionContent");

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Request received!");
        setIsSuccess(true);
      } else {
        toast.error(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary">
          <Check size={26} className="text-primary-foreground" strokeWidth={3} />
        </div>
        <h2 className="text-xl font-bold text-foreground">Thanks — we&apos;ve got it!</h2>
        <p className="max-w-sm text-sm text-muted-foreground">We&apos;ll be in touch about setting up your clone.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <Field label="Business Name" id="businessName" error={errors.businessName?.message}>
        <Input id="businessName" placeholder="Acme Dental" {...register("businessName")} aria-invalid={!!errors.businessName} />
      </Field>

      <Field label="Contact Name" id="contactName" error={errors.contactName?.message}>
        <Input id="contactName" placeholder="Jane Smith" {...register("contactName")} aria-invalid={!!errors.contactName} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Contact Email" id="contactEmail" error={errors.contactEmail?.message}>
          <Input id="contactEmail" type="email" placeholder="you@example.com" {...register("contactEmail")} aria-invalid={!!errors.contactEmail} />
        </Field>
        <Field label="Contact Phone" id="contactPhone" error={errors.contactPhone?.message}>
          <Input id="contactPhone" type="tel" placeholder="(555) 123-4567" {...register("contactPhone")} aria-invalid={!!errors.contactPhone} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business Type" id="niche" error={errors.niche?.message}>
          <Input id="niche" placeholder="Dental Clinic, Law Office, etc." {...register("niche")} aria-invalid={!!errors.niche} />
        </Field>
        <Field label="Number of Locations" id="numberOfLocations" error={errors.numberOfLocations?.message}>
          <Input
            id="numberOfLocations"
            type="number"
            min={1}
            placeholder="1"
            {...register("numberOfLocations", { valueAsNumber: true })}
            aria-invalid={!!errors.numberOfLocations}
          />
        </Field>
      </div>

      <Field label="Current Booking System" id="currentBookingSystem" error={errors.currentBookingSystem?.message} optional>
        <Input
          id="currentBookingSystem"
          placeholder="Calendly, none, phone only, etc."
          {...register("currentBookingSystem")}
          aria-invalid={!!errors.currentBookingSystem}
        />
      </Field>

      <Field label="Notes" id="notes" error={errors.notes?.message} optional>
        <Textarea id="notes" rows={4} placeholder="Anything else we should know?" {...register("notes")} aria-invalid={!!errors.notes} />
      </Field>

      <div>
        <p className="mb-3 text-sm font-semibold text-foreground">
          Content Checklist <span className="text-destructive">*</span>
        </p>
        <p className="mb-3 text-xs text-muted-foreground">
          Let us know which optional sections you already have content for.
        </p>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          {sectionContentChecklist.map(({ key, question }) => (
            <div key={key} className="flex items-start gap-3">
              <Checkbox
                id={`sectionContent.${key}`}
                checked={sectionContentValues?.[key] ?? false}
                onCheckedChange={(checked) => setValue(`sectionContent.${key}`, checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor={`sectionContent.${key}`} className="text-sm font-normal text-foreground">
                {question}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, error, optional, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {label} {optional ? <span className="text-muted-foreground">(optional)</span> : <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
