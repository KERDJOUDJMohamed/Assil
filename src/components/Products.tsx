import type { Product, LangCode, Socials } from "../types";
type BrandPalette = {
  violet: string;
  magenta: string;
  dark: string;
  light: string;
  softViolet: string;
  softMagenta: string;
};

type ProductsProps = {
  products: Product[];
  lang: LangCode;
  BRAND: BrandPalette;
  socials: Socials;
  Price: React.FC<{ value: number }>;
};
import React from "react";

const Products: React.FC<ProductsProps> = ({ products, lang, BRAND, socials, Price }) => (
  <section id="products" className="max-w-6xl mx-auto px-4 py-16">
    <div className="flex items-end justify-between mb-8">
      <h2 className="text-3xl font-semibold" style={{ color: BRAND.violet }}>Best sellers</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p, idx) => (
        <article key={idx} className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: `${BRAND.violet}33` }}>
          <div className="relative aspect-[4/3]">
            <img src={p.img} alt={p.name[lang]} className="w-full h-full object-cover" />
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,.85)", color: BRAND.magenta }}>
              <Price value={p.priceDzd} />
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold" style={{ color: BRAND.dark }}>{p.name[lang]}</h3>
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm px-3 py-1.5 rounded-full font-bold" style={{ background: BRAND.magenta, color: BRAND.light }}>WhatsApp</a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Products;
