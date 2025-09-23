import type { FC } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

/* ──────────────────────────────────────────────────────────────────────────
   Brand palette (adjust to your exact hex codes if needed)
────────────────────────────────────────────────────────────────────────── */
const BRAND = {
  violet: "#3E36B0",
  magenta: "#B0126F",
  dark: "#0F1021",
  light: "#ffffff",
} as const;

/* ──────────────────────────────────────────────────────────────────────────
   Types
────────────────────────────────────────────────────────────────────────── */
type LangCode = "ar" | "fr" | "en";
type Localized<T = string> = Record<LangCode, T>;

interface Socials {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  mapsShare?: string; // share link
  whatsapp: string;
  phone1?: string;
  phone2?: string;
}

interface Product {
  img: string;
  name: Localized<string>;
  price: number;
}

interface ProductsSectionProps {
  products: Product[];
  socials: Socials;
  lang: LangCode;
  title?: Localized<string>;
  className?: string;
}

/* ──────────────────────────────────────────────────────────────────────────
   Tiny Price component (format however you like)
────────────────────────────────────────────────────────────────────────── */
const Price: FC<{ value: number; currency?: string }> = ({ value, currency = "DZD" }) => {
  // Simple formatting; customize to locale/currency if you prefer
  const formatted = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(value);
  return <>{formatted} {currency}</>;
};

/* ──────────────────────────────────────────────────────────────────────────
   ProductsSection
────────────────────────────────────────────────────────────────────────── */
const ProductsSection: FC<ProductsSectionProps> = ({
  products,
  socials,
  lang,
  title,
  className = "",
}) => {
  return (
    <section
      id="products"
      className={`w-full py-16 ${className}`}
      style={{ background: '#f7f7fb', boxShadow: '0 2px 16px #0001' }}
    >
      {title && (
        <div className="mb-8">
          <h2
            className="text-3xl font-semibold text-center font-sans"
            style={{ color: BRAND.violet, letterSpacing: 0.5 }}
          >
            {title[lang]}
          </h2>
          <div className="mx-auto mt-2 mb-1" style={{ width: 56, height: 5, background: BRAND.magenta, borderRadius: 8 }} />
        </div>
      )}

      <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p, idx) => (
          <article
            key={idx}
            className="rounded-2xl border flex flex-col shadow-md bg-white h-full min-h-[340px] max-w-[260px] mx-auto"
            style={{ borderColor: `${BRAND.violet}33`, fontFamily: 'inherit' }}
          >
            {/* Image wrapper */}
            <div className="relative w-full aspect-[3/2] overflow-hidden flex items-stretch justify-center">
              <Zoom>
                <img
                  src={p.img}
                  alt={p.name[lang]}
                  className="w-full h-full object-cover rounded-t-2xl cursor-zoom-in block"
                  style={{ background: "#f7f7fb", minHeight: 0, minWidth: 0 }}
                />
              </Zoom>
              {/* Price badge */}
              <span
                className="absolute top-2 right-2 rounded-xl px-3 py-1 font-bold text-base shadow-lg border-2 border-white z-10"
                style={{ background: BRAND.magenta, color: BRAND.light, fontSize: 15 }}
              >
                <Price value={p.price} />
              </span>
            </div>
            {/* Info section */}
            <div className="flex flex-col flex-1 items-center justify-between w-full px-4 pt-2 pb-4">
              <h3
                className="font-bold text-center mb-2 text-[16px] min-h-[36px] break-words font-sans"
                style={{ color: BRAND.violet, fontFamily: 'inherit', letterSpacing: 0.2 }}
              >
                {p.name[lang]}
              </h3>
              <div className="flex-1" />
              {/* WhatsApp button pinned to bottom */}
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-sm mt-2"
                style={{ background: BRAND.magenta, color: BRAND.light }}
              >
                <FaWhatsapp size={18} />
                <span className="sr-only">Contact on WhatsApp</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
