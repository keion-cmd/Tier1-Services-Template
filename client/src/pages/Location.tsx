import { ArrowUpRight, Clock3, MapPin, PawPrint, Phone } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { clinic } from "@/lib/clinic-content";

function ClinicMap() {
  const locationQuery = encodeURIComponent(`${clinic.address}, ${clinic.city}`);
  return <div className="pp-location-map-card"><iframe className="pp-location-map pp-location-embed" title={`Google Maps search for ${clinic.address}, ${clinic.city}`} src={`https://www.google.com/maps?q=${locationQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><p className="pp-map-status">Google Maps search for the current demonstration address. Replace it with the client-approved physical address before launch.</p></div>;
}

export default function Location() {
  return <main className="neo-main pp-location-page">
    <PageMeta title={`Location — ${clinic.name} ${clinic.descriptor}`} description={`Find ${clinic.name} at ${clinic.address}, ${clinic.city}.`} />
    <section className="pp-location-hero pp-reveal"><div><span className="pp-page-eyebrow"><PawPrint size={15} /> Optional location page</span><h1>Find care<br /><em>close by.</em></h1></div><div><p>Visit Paws+Pine in Cedarfield for a clear, thoughtful starting point. Request a visit first and our team will follow up directly.</p></div></section>
    <section className="pp-location-content pp-reveal"><div className="pp-location-card"><span className="pp-page-eyebrow">Visit Paws+Pine</span><h2>Start with<br /><em>the right place.</em></h2><div className="pp-location-facts"><div className="pp-location-fact"><MapPin size={20} /><div><span>Address</span><p>{clinic.address}<br />{clinic.city}</p></div></div><div className="pp-location-fact"><Clock3 size={20} /><div><span>Hours</span><p>{clinic.hours}</p></div></div><div className="pp-location-fact"><Phone size={20} /><div><span>Contact</span><p>{clinic.phone}<br />{clinic.email}</p></div></div></div><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></div><ClinicMap /></section>
    <p className="pp-location-note">Paws+Pine is a fictional demonstration clinic. Before launch, replace this content and map search with the client-approved physical address and contact details.</p>
  </main>;
}
