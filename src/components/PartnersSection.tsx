import React from "react";
import { partners } from "../data/partners";
import { BRAND } from "../utils/brand";
import type { LangCode } from "../types";

interface PartnersSectionProps {
  lang: LangCode;
  partnersTitle: Record<string, string>;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ lang, partnersTitle }) => (
  <section id="partners" className="max-w-6xl mx-auto px-4 py-16" style={{ background: '#fff', borderRadius: 16, color: BRAND.dark, marginTop: 32, scrollMarginTop: 100, boxShadow: '0 2px 16px #0001' }}>
    <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: BRAND.violet }}>{partnersTitle[lang]}</h2>
    <div style={{
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      padding: '12px 0',
    }}>
      <div
        className="partners-marquee"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          width: 'max-content',
          animation: 'partners-marquee 40s linear infinite',
        }}
      >
        {partners.concat(partners).map((p, idx) => (
          <img
            key={p.name + idx}
            src={p.img}
            alt={p.name}
            style={{ height: 56, width: 'auto', objectFit: 'contain', filter: 'grayscale(0.2)', opacity: 0.95 }}
            loading="lazy"
          />
        ))}
      </div>
      <style>{`
        @keyframes partners-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  </section>
);
