"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Shield, FileText, ChevronRight, Check, Loader2, ArrowLeft, Phone, Mail, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InsuranceCombobox } from "@/components/insurance/InsuranceCombobox";
import { businessConfig, copy, services } from "@/lib/business-content";
import type { BookingFormData } from "@/types/booking";

const schema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
    phone: z.string().min(10, "Please enter a valid phone number").max(20),
    email: z.string().email("Please enter a valid email address"),
    serviceInterest: z.string().min(1, "Please select a service"),
    insuranceProvider: z.string().min(1, "Please select your insurance provider"),
    otherInsurance: z.string().optional(),
    notes: z.string().min(10, "Please provide at least 10 characters").max(1000),
    smsConsent: z.boolean().refine((val) => val === true, { message: "Please confirm SMS consent to continue." }),
  })
  .superRefine((data, ctx) => {
    if (data.insuranceProvider === "Other / Not Listed" && !data.otherInsurance?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify your insurance provider.", path: ["otherInsurance"] });
    }
  });

const STEP_FIELDS: Record<number, (keyof BookingFormData)[]> = {
  1: ["fullName", "phone", "email"],
  2: ["serviceInterest", "insuranceProvider", "otherInsurance"],
  3: ["notes", "smsConsent"],
};

const STEP_LABELS = ["Your Info", "Service & Coverage", "Details"];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { smsConsent: false },
  });

  const watchedInsurance = watch("insuranceProvider");
  const showOtherInsurance = watchedInsurance === "Other / Not Listed";

  useEffect(() => {
    if (!showOtherInsurance) setValue("otherInsurance", "", { shouldValidate: false });
  }, [showOtherInsurance, setValue]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setReference("");
    }, 300);
  }, [onClose]);

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pageSource: window.location.href }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Booking received!");
        setReference(json.reference);
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

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={!isSuccess ? handleClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
      >
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-1 flex-col items-center justify-center px-8 py-10 text-center"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary"
            >
              <Check size={32} className="text-primary-foreground" strokeWidth={3} />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">{copy.booking.successHeadline}</h2>
            <p className="mb-5 max-w-xs text-sm text-muted-foreground">{copy.booking.successMessage}</p>
            <div className="mb-6 w-full max-w-sm rounded-xl border border-border bg-muted p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reference Number</p>
              <p className="font-mono text-xl font-bold tracking-wide text-foreground">{reference}</p>
            </div>
            <div className="flex w-full max-w-sm gap-3">
              <button onClick={handleClose} className="flex-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Done
              </button>
              <a
                href={`tel:${businessConfig.phoneDigits}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <Phone size={14} />
                Call Us
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="shrink-0 border-b border-border px-6 pb-4 pt-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">Step {step} of 3</p>
                  <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">
                    {copy.booking.modalHeadline}
                  </h2>
                </div>
                <button onClick={handleClose} className="ml-4 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <div className="mb-2 flex gap-2" aria-hidden>
                {[1, 2, 3].map((s) => (
                  <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div animate={{ width: step >= s ? "100%" : "0%" }} transition={{ duration: 0.35 }} className="h-full rounded-full bg-primary" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {STEP_LABELS.map((label, i) => (
                  <span key={label} className={`text-[10px] font-semibold transition-colors ${step >= i + 1 ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col overflow-hidden" noValidate>
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
                    {step === 1 && (
                      <>
                        <Field label="Full Name" id="fullName" error={errors.fullName?.message} icon={User}>
                          <Input id="fullName" placeholder="Jane Smith" {...register("fullName")} aria-invalid={!!errors.fullName} />
                        </Field>
                        <Field label="Phone Number" id="phone" error={errors.phone?.message} icon={Phone}>
                          <Input id="phone" type="tel" placeholder="(555) 123-4567" {...register("phone")} aria-invalid={!!errors.phone} />
                        </Field>
                        <Field label="Email Address" id="email" error={errors.email?.message} icon={Mail}>
                          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={!!errors.email} />
                        </Field>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Field label="Service Interest" id="serviceInterest" error={errors.serviceInterest?.message} icon={Wrench}>
                          <select
                            id="serviceInterest"
                            {...register("serviceInterest")}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                          >
                            <option value="">Select a service…</option>
                            {services.map((s) => (
                              <option key={s.slug} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Insurance Provider" id="insuranceProvider" error={errors.insuranceProvider?.message} icon={Shield}>
                          <Controller
                            name="insuranceProvider"
                            control={control}
                            render={({ field }) => (
                              <InsuranceCombobox value={field.value || ""} onChange={field.onChange} onBlur={field.onBlur} hasError={!!errors.insuranceProvider} />
                            )}
                          />
                        </Field>
                        {showOtherInsurance && (
                          <Field label="Other Insurance Provider" id="otherInsurance" error={errors.otherInsurance?.message} icon={Shield}>
                            <Input id="otherInsurance" placeholder="Name your insurance provider" {...register("otherInsurance")} aria-invalid={!!errors.otherInsurance} />
                          </Field>
                        )}
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <p className="text-sm leading-relaxed text-muted-foreground">{copy.booking.modalSubtext}</p>
                        <Field label="Tell us more" id="notes" error={errors.notes?.message} icon={FileText}>
                          <Textarea id="notes" rows={5} placeholder="What would you like help with?" {...register("notes")} aria-invalid={!!errors.notes} />
                        </Field>
                        <div className="flex items-start gap-3 pt-1">
                          <Controller
                            name="smsConsent"
                            control={control}
                            render={({ field }) => (
                              <Checkbox id="smsConsent" checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" aria-invalid={!!errors.smsConsent} />
                            )}
                          />
                          <Label htmlFor="smsConsent" className="text-xs font-normal leading-relaxed text-muted-foreground">
                            I agree to receive SMS text messages from {businessConfig.name} regarding my inquiry and appointment scheduling. Message and data rates may apply. Reply STOP to
                            opt out. Consent is not a condition of receiving services.
                          </Label>
                        </div>
                        {errors.smsConsent && (
                          <p className="text-xs text-destructive" role="alert">
                            {errors.smsConsent.message}
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="shrink-0 border-t border-border px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-muted">
                      <ArrowLeft size={15} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                    >
                      Continue
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" aria-hidden />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Book Appointment
                          <Check size={15} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
}

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function Field({ label, id, error, icon: Icon, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Icon size={14} className="text-muted-foreground" />
        {label} <span className="text-destructive">*</span>
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
