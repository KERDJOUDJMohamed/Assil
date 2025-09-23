
import type { I18nEntry, BrandPalette, Socials } from "../types";

type ShopProps = {
  t: I18nEntry;
  open: boolean;
  nextChange: string;
  BRAND: BrandPalette;
  socials: Socials;
  mapsEmbed: string;
};

const Shop: React.FC<ShopProps> = ({ t, open, nextChange, BRAND, socials, mapsEmbed }) => (
  <section id="shop" style={{ background: BRAND.softMagenta }}>
    <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="text-3xl font-semibold mb-3" style={{ color: BRAND.violet }}>{t.ourShopTitle}</h2>
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: open ? BRAND.violet : "#E53935", color: BRAND.light }}>
            {open ? t.openNow : t.closedNow} · {nextChange}
          </span>
        </div>
        <p className="mb-4" style={{ color: BRAND.dark }}>{t.ourShopBody}</p>
        <div className="flex gap-3">
          <a href={socials.instagram} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full font-bold" style={{ background: BRAND.violet, color: BRAND.light }}>Instagram</a>
          <a href={socials.facebook} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full font-bold" style={{ background: BRAND.magenta, color: BRAND.light }}>Facebook</a>
          <a href={socials.tiktok} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full font-bold" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet }}>TikTok</a>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: BRAND.violet }}>
        <iframe title="Google Map" src={mapsEmbed} className="w-full h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
);

export default Shop;
