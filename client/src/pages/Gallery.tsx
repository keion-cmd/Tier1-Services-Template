/**
 * Cross-page consistency pass: reuses the pp-page-hero/pp-page-outro system with a Tailwind grid for the photo wall.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { assets } from "@/lib/clinic-content";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const galleryImages = [
  { src: assets.clinicHero, alt: "Paws and Pine clinic consultation space" },
  { src: assets.serviceExam, alt: "Veterinarian examining a dog at Paws and Pine" },
  { src: assets.dogCare, alt: "A dog during a wellness visit" },
  { src: assets.catCare, alt: "A cat during a puppy and kitten care visit" },
  { src: assets.aboutPup, alt: "A small dog in a lime green sweater" },
  { src: assets.dentalCare, alt: "A dental care conversation at the clinic" },
  { src: assets.diagnosticsCare, alt: "A diagnostics and procedures conversation" },
  { src: assets.heroPets, alt: "Paws and Pine clinic dog and cat" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return <main className="neo-main pp-services-page">
    <PageMeta title="Gallery — Paws+Pine Veterinary Clinic" description="A look inside Paws+Pine Veterinary Clinic and the pets we care for." />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Gallery</span><h1>Moments<br /><em>from the clinic.</em></h1><p>A look at our space and the pets who visit &mdash; a glimpse of what to expect before your own first conversation.</p><Link href="/request" className="lime-link">Request a visit <ArrowUpRight size={15} /></Link></div>
      <div className="pp-services-hero-image"><img src={assets.clinicHero} alt="Paws and Pine clinic consultation space" /></div>
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="gallery-grid-title">
      <h2 id="gallery-grid-title" className="pp-page-eyebrow"><PawPrint size={15} /> Clinic & pet photos</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {galleryImages.map((image, index) => <button
          key={image.src}
          type="button"
          onClick={() => setActiveIndex(index)}
          className="pp-location-card overflow-hidden rounded-2xl p-0 cursor-pointer text-left transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label={`Enlarge photo: ${image.alt}`}
        >
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
        </button>)}
      </div>
    </section>

    <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background">
        {activeImage && <>
          <img src={activeImage.src} alt={activeImage.alt} className="w-full max-h-[75vh] object-contain bg-black" />
          <div className="p-4">
            <DialogTitle>{activeImage.alt}</DialogTitle>
            <DialogDescription>Paws+Pine Veterinary Clinic gallery</DialogDescription>
          </div>
        </>}
      </DialogContent>
    </Dialog>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>See it for<br /><em>yourself.</em></h2><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></section>
  </main>;
}
