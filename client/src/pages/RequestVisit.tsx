/**
 * Companion Field Notes design reminder: the request flow behaves like a clear paper form—calm, accessible, and honest about its limits.
 */
import { FormEvent, useState } from "react";
import { CheckCircle2, ChevronRight, CircleAlert, ClipboardCheck, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageMeta } from "@/components/PageMeta";
import { clinic, services } from "@/lib/clinic-content";

type FormErrors = Record<string, string>;

export default function RequestVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(form: FormData) {
    const next: FormErrors = {};
    if (!String(form.get("name") || "").trim()) next.name = "Please add your name.";
    const email = String(form.get("email") || "").trim();
    if (!email) next.email = "Please add an email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please use a valid email format.";
    if (!String(form.get("phone") || "").trim()) next.phone = "Please add a phone number.";
    if (!String(form.get("petName") || "").trim()) next.petName = "Please add your pet’s name.";
    if (!String(form.get("message") || "").trim()) next.message = "Please tell us a little about your request.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(new FormData(event.currentTarget));
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted(true);
  }

  return (
    <main>
      <PageMeta title="Request a Visit — Paws & Pine Veterinary Clinic Demo" description="A non-live Tier 1 veterinary visit request prototype for the fictional Paws & Pine clinic demonstration." />
      <section className="request-hero"><div className="shell-width"><span className="eyebrow"><PawPrint size={14} /> Booking / Order Request · Tier 1</span><h1>Begin with the <em>right few details.</em></h1><p>In a real Tier 1 clinic site, this page can collect an approved visit or inquiry request and write it to a provider-managed Google Sheet for staff follow-up.</p></div></section>
      <section className="request-section"><div className="shell-width request-layout"><aside className="request-aside"><div className="request-aside-card"><span className="eyebrow">How this demo works</span><ol><li><span>01</span><div><strong>You describe the need</strong><p>Use only the fields a real clinic has approved.</p></div></li><li><span>02</span><div><strong>The request is recorded</strong><p>Production setup can write a timestamped row to a provider-managed Google Sheet.</p></div></li><li><span>03</span><div><strong>The clinic follows up</strong><p>A request is not a confirmed appointment, payment, or availability promise.</p></div></li></ol></div><div className="aside-contact"><span className="footer-label">Sample fallback contact</span><p>{clinic.phone}<br />{clinic.email}</p><small>Fictional demonstration contact details only.</small></div></aside>
        <div className="form-panel">{submitted ? <div className="success-state" role="status"><CheckCircle2 size={42} /><span className="eyebrow">Sample confirmation</span><h2>Your request stayed <em>right here.</em></h2><p>This is a frontend prototype, so no data was sent, stored, or used to book an appointment. A production Tier 1 site should show success only after its configured endpoint confirms that the request was recorded.</p><Button onClick={() => { setSubmitted(false); setErrors({}); }} className="request-submit">Return to the form <ChevronRight size={16} /></Button></div> : <form noValidate onSubmit={handleSubmit}>
          <div className="form-heading"><div><span className="eyebrow">Visit request form</span><h2>Tell us a little about what you need.</h2></div><span className="required-key"><i /> Required</span></div>
          <div className="demo-disclaimer"><CircleAlert size={17} /><p><strong>Demo boundary:</strong> Do not enter real personal or medical information. This form does not submit information, create a booking, or guarantee availability.</p></div>
          <div className="field-grid"><label className="field"><span>Your name <i>*</i></span><Input name="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Sample pet parent" />{errors.name && <small id="name-error">{errors.name}</small>}</label><label className="field"><span>Email address <i>*</i></span><Input name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />{errors.email && <small id="email-error">{errors.email}</small>}</label><label className="field"><span>Phone number <i>*</i></span><Input name="phone" type="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="(000) 000 0000" />{errors.phone && <small id="phone-error">{errors.phone}</small>}</label><label className="field"><span>Pet’s name <i>*</i></span><Input name="petName" aria-invalid={Boolean(errors.petName)} aria-describedby={errors.petName ? "pet-error" : undefined} placeholder="Sample pet name" />{errors.petName && <small id="pet-error">{errors.petName}</small>}</label><label className="field"><span>Care path</span><select name="service" defaultValue=""><option value="">Choose a topic (optional)</option>{services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}</select></label><label className="field"><span>Preferred date</span><Input name="date" type="date" /></label><label className="field field-wide"><span>What would you like to discuss? <i>*</i></span><Textarea name="message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} placeholder="For this demo, use fictional details only." rows={5} />{errors.message && <small id="message-error">{errors.message}</small>}</label></div>
          <label className="consent-row"><input type="checkbox" required /><span>I understand this is a fictional, non-live demonstration and I will not provide real personal or medical information.</span></label>
          <Button type="submit" className="request-submit">Show sample confirmation <ClipboardCheck size={17} /></Button>
        </form>}</div></div></section>
    </main>
  );
}
