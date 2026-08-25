import type { PetCareBrand } from "@/lib/petCareBrands";

interface PetCareMarqueeProps {
  items: PetCareBrand[];
  heading?: string;
  supportingText?: string;
}

export function PetCareMarquee({ items, heading = "Trusted Names in Pet Care", supportingText = "Industry brands shown for demonstration purposes." }: PetCareMarqueeProps) {
  return <section className="pp-pet-care-marquee-section" aria-labelledby="pet-care-marquee-title">
    <div className="pp-pet-care-marquee-heading">
      <h2 id="pet-care-marquee-title">{heading}</h2>
      {supportingText ? <p>{supportingText}</p> : null}
    </div>
    <div className="pp-pet-care-marquee-viewport">
      <div className="pp-pet-care-marquee-track">
        <div className="pp-pet-care-marquee-group">
          {items.map((brand) => <div className={`pp-pet-care-marquee-logo${brand.onDark ? " is-on-dark" : ""}`} key={brand.name}><img src={brand.logo} alt={brand.name} loading="eager" decoding="async" /></div>)}
        </div>
        <div className="pp-pet-care-marquee-group" aria-hidden="true">
          {items.map((brand) => <div className={`pp-pet-care-marquee-logo${brand.onDark ? " is-on-dark" : ""}`} key={`${brand.name}-dup`}><img src={brand.logo} alt="" loading="eager" decoding="async" /></div>)}
        </div>
      </div>
    </div>
  </section>;
}
