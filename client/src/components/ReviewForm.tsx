import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, MessageCircleHeart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";

type ReviewErrors = Record<string, string>;

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submitReview = trpc.reviewSubmission.submit.useMutation({ onSuccess: (result) => { setReference(result.requestId); setSubmitted(true); setSubmissionError(null); }, onError: (error) => setSubmissionError(error.message) });

  function validate(form: FormData) {
    const next: ReviewErrors = {};
    const name = String(form.get("reviewerName") || "").trim();
    const email = String(form.get("reviewerEmail") || "").trim();
    const feedback = String(form.get("reviewFeedback") || "").trim();
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add an email address."; else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please use a valid email format.";
    if (!rating) next.rating = "Please choose a rating.";
    if (!feedback) next.feedback = "Please share your review.";
    if (form.get("reviewConsent") !== "on") next.consent = "Please confirm staff may review your submission.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const next = validate(form); setErrors(next); setSubmissionError(null); if (Object.keys(next).length) return;
    submitReview.mutate({ name: String(form.get("reviewerName") || "").trim(), email: String(form.get("reviewerEmail") || "").trim(), rating, feedback: String(form.get("reviewFeedback") || "").trim(), consentConfirmed: true, displayConsent: form.get("reviewDisplayConsent") === "on" });
  }

  if (submitted) return <div className="pp-review-success" role="status"><CheckCircle2 size={42} /><span className="pp-page-eyebrow">Review received</span><h3>Thank you for<br /><em>sharing your experience.</em></h3><p>Your review is now with the clinic team. If you gave display permission and staff approves it, it may appear in this Reviews section.</p>{reference && <p className="pp-request-reference"><strong>Review reference</strong><span>{reference}</span></p>}<Button onClick={() => { setSubmitted(false); setReference(null); setErrors({}); }} className="lime-cta">Write another review</Button></div>;

  return <form className="pp-review-form" noValidate onSubmit={handleSubmit} aria-busy={submitReview.isPending}><div className="pp-review-form-grid"><label className="pp-form-field"><span>Your name *</span><Input name="reviewerName" aria-invalid={Boolean(errors.name)} placeholder="Your name" />{errors.name && <small>{errors.name}</small>}</label><label className="pp-form-field"><span>Email address *</span><Input name="reviewerEmail" type="email" aria-invalid={Boolean(errors.email)} placeholder="you@example.com" />{errors.email && <small>{errors.email}</small>}</label></div><fieldset className="pp-review-rating" aria-describedby={errors.rating ? "review-rating-error" : undefined}><legend>Your rating *</legend><div role="radiogroup" aria-label="Your rating">{[1, 2, 3, 4, 5].map((value) => <button type="button" key={value} className={value <= rating ? "is-selected" : ""} aria-pressed={value === rating} aria-label={`${value} out of 5 stars`} onClick={() => { setRating(value); setErrors((current) => { const next = { ...current }; delete next.rating; return next; }); }}><Star size={18} fill="currentColor" /></button>)}</div>{errors.rating && <small id="review-rating-error">{errors.rating}</small>}</fieldset><label className="pp-form-field"><span>Your review *</span><Textarea name="reviewFeedback" aria-invalid={Boolean(errors.feedback)} placeholder="What did you appreciate, or what could we improve?" />{errors.feedback && <small>{errors.feedback}</small>}</label><div className="pp-review-submit"><label className="pp-consent"><input name="reviewConsent" type="checkbox" aria-invalid={Boolean(errors.consent)} /><span>I agree that clinic staff may review this submission and contact me if needed.</span></label>{errors.consent && <small>{errors.consent}</small>}<label className="pp-consent"><input name="reviewDisplayConsent" type="checkbox" /><span>I give staff permission to publish my approved review using a staff-selected display name.</span></label><p>Reviews appear on this page only when the reviewer gives permission and clinic staff explicitly approve them.</p>{submissionError && <p className="pp-submit-error" role="alert">{submissionError}</p>}<Button type="submit" className="lime-cta" disabled={submitReview.isPending}>{submitReview.isPending ? <><LoaderCircle size={17} className="pp-spinner" />Sending review…</> : <><MessageCircleHeart size={17} />Send review</>}</Button></div></form>;
}
