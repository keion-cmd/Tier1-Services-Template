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
import type { IntakeFormData } from "@/types/intake";

const schema = z.object({
  businessName: z.string().min(1, "Business name is required").max(150),
  contactName: z.string().min(1, "Contact name is required").max(100),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(1, "Contact phone is required").max(20),
  niche: z.string().min(1, "Please describe your business type"),
  numberOfLocations: z.number({ error: "Must be a number" }).int().min(1, "Must be at least 1 location"),
  currentBookingSystem: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

export function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

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
