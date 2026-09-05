"use client";

/**
 * Net-new full-width newsletter section — nothing like it previously existed
 * on the homepage (the only email capture was a small form embedded in
 * Footer.tsx, now removed in favor of this dedicated section owning that
 * job). Reuses the same real siteShell.emailCapture* copy fields and the
 * same fire-and-forget FOOTER_SIGNUP_ENDPOINT_URL stub pattern as the old
 * footer form, since no other newsletter-signup endpoint exists.
 */
import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { FOOTER_SIGNUP_ENDPOINT_URL } from "@/lib/footerSignup";

export function NewsletterCTA({
  badgeLabel,
  heading,
  body,
  placeholder,
  submitLabel,
  successMessage,
  imageKey = "[NEWSLETTER_IMAGE]",
}: {
  badgeLabel: string;
  heading: string;
  body: string;
  placeholder: string;
  submitLabel: string;
  successMessage: string;
  imageKey?: string;
}) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isConfigured =
    !!FOOTER_SIGNUP_ENDPOINT_URL && !FOOTER_SIGNUP_ENDPOINT_URL.includes("[") && !FOOTER_SIGNUP_ENDPOINT_URL.includes("]");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await fetch(FOOTER_SIGNUP_ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email, source: "homepage-newsletter-cta", submittedAt: new Date().toISOString() }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative min-w-0 overflow-hidden py-20 md:py-28">
      <ImagePlaceholder label="Newsletter background" token={imageKey} aspect="aspect-auto" className="absolute inset-0 h-full w-full border-0" />
      <div className="absolute inset-0 bg-foreground/80" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-3xl min-w-0 flex-col items-start gap-6 px-6 lg:px-8">
        <span className="inline-flex w-fit min-w-0 items-center rounded-full border border-background/30 bg-background/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide break-words text-background uppercase backdrop-blur-sm">
          {badgeLabel}
        </span>
        <h2 className="font-heading min-w-0 max-w-xl break-words text-3xl leading-[1.1] font-bold tracking-tight text-background sm:text-4xl">
          {heading}
        </h2>

        {status === "success" ? (
          <p className="text-sm text-background/85">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md min-w-0 flex-col items-start gap-3">
            <p className="min-w-0 break-words text-sm leading-relaxed text-background/70">{body}</p>
            <div className="flex min-w-0 items-center gap-2">
              <Label htmlFor={inputId} className="sr-only">
                Email address
              </Label>
              <Input
                id={inputId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="min-w-0 flex-1 border-background/25 bg-background/10 text-background placeholder:text-background/50"
              />
              <Button
                type="submit"
                size="icon-circle"
                variant="secondary"
                aria-label={submitLabel}
                disabled={status === "submitting"}
              >
                <ArrowUpRight size={16} />
              </Button>
            </div>
            {status === "error" && (
              <p className="text-xs text-background/70">
                {isConfigured ? "Something went wrong. Please try again." : "Signup is not yet configured."}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
