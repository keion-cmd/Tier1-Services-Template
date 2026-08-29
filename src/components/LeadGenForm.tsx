"use client";

import { useId, useState, type FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { copy, services } from "@/lib/business-content";
import { LEAD_FORM_ENDPOINT_URL } from "@/lib/leadForm";
import { cn } from "@/lib/utils";

export function LeadGenForm({ className }: { className?: string }) {
  const formId = useId();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!LEAD_FORM_ENDPOINT_URL || LEAD_FORM_ENDPOINT_URL.includes("[") || LEAD_FORM_ENDPOINT_URL.includes("]")) {
      setError("Form is not yet configured. Please contact us directly.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Apps Script Web Apps don't return CORS headers, so the response body
      // can't be read from the browser — `no-cors` lets the request fire without a
      // console error, and a resolved fetch (no thrown network error) is treated as success.
      await fetch(LEAD_FORM_ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          service,
          message,
          source: "homepage-lead-form",
          submittedAt: new Date().toISOString(),
        }),
      });
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please check your details and submit again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className={cn("mx-auto w-full max-w-lg bg-secondary/40 p-2", className)}>
        <CardContent>
          <Alert>
            <AlertTitle>{copy.home.leadGenForm.successMessage}</AlertTitle>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("mx-auto w-full max-w-lg bg-secondary/40", className)}>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-name`}>Full Name</Label>
            <Input
              id={`${formId}-name`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-email`}>Email Address</Label>
            <Input
              id={`${formId}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-phone`}>Phone Number</Label>
            <Input
              id={`${formId}-phone`}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              pattern="[\d\s()+\-]{7,}"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-service`}>Service of Interest</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id={`${formId}-service`} className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((item) => (
                  <SelectItem key={item.slug} value={item.title}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-message`}>Message / Inquiry</Label>
            <Textarea
              id={`${formId}-message`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can help..."
              rows={4}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Something went wrong.</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Spinner />}
            {copy.home.leadGenForm.submitButton}
          </Button>

          <p className="text-center text-xs leading-relaxed break-words text-muted-foreground">
            {copy.home.leadGenForm.privacyNote}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
