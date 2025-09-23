
import type { I18nEntry, Socials, BrandPalette } from "../types";

type FindUsProps = {
  t: I18nEntry;
  socials: Socials;
  BRAND: BrandPalette;
  open: boolean;
  nextChange: string;
};

const FindUs: React.FC<FindUsProps> = ({ t, socials, BRAND, open, nextChange }) => (
  <section id="findus" style={{ background: BRAND.softViolet }}>
    <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4" style={{ color: BRAND.violet }}>{t.whereToFindUsTitle}</h2>
        <ul className="space-y-2">
          <li><span className="font-semibold" style={{ color: BRAND.magenta }}>{t.addressLabel}:</span> <a href={socials.mapsShare} className="underline" target="_blank" rel="noreferrer" style={{ color: BRAND.violet }}>Google Maps (share link)</a></li>
          <li><span className="font-semibold" style={{ color: BRAND.magenta }}>{t.phonesLabel}:</span> <a href={`tel:${socials.phone1}`} style={{ color: BRAND.violet }}>{socials.phone1}</a> · {" "}<a href={`tel:${socials.phone2}`} style={{ color: BRAND.violet }}>{socials.phone2}</a></li>
          <li><span className="font-semibold" style={{ color: BRAND.magenta }}>{t.hoursLabel}:</span> <span style={{ color: BRAND.dark }}>Saturday–Friday: 08:00–21:00</span></li>
        </ul>
      </div>
      <div className="rounded-2xl overflow-hidden border flex flex-col items-center justify-center" style={{ borderColor: BRAND.violet }}>
        {/* Open/close status and next change */}
        <span className="px-3 py-1 rounded-full text-sm font-bold mb-2 mt-4" style={{ background: open ? BRAND.violet : "#E53935", color: BRAND.light }}>
          {open ? t.openNow : t.closedNow} · {nextChange}
        </span>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.1989153871305!2d3.151653075590034!3d36.573424080450465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e55007dc89f29%3A0x89aa37823290fb86!2sAssil%20ceramic!5e0!3m2!1sen!2sdz!4v1758462779297!5m2!1sen!2sdz"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map - Assil Ceramica"
        ></iframe>
      </div>
    </div>
  </section>
);

export default FindUs;
