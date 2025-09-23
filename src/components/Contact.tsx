
import type { I18nEntry, Socials, BrandPalette } from "../types";

type ContactProps = {
  t: I18nEntry;
  socials: Socials;
  BRAND: BrandPalette;
};

const Contact: React.FC<ContactProps> = ({ t, socials, BRAND }) => (
  <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
    <h2 className="text-3xl font-semibold mb-4" style={{ color: BRAND.violet }}>{t.contactTitle}</h2>
    <div className="flex flex-wrap gap-3">
      <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-full font-bold" style={{ background: BRAND.magenta, color: BRAND.light }}>WhatsApp</a>
      <a href={`tel:${socials.phone1}`} className="px-5 py-2 rounded-full font-bold" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet }}>{socials.phone1}</a>
      <a href={`tel:${socials.phone2}`} className="px-5 py-2 rounded-full font-bold" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet }}>{socials.phone2}</a>
    </div>
  </section>
);

export default Contact;
