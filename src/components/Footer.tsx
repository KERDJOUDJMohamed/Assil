import React, { useRef } from "react";
import type { I18nEntry, Socials, BrandPalette } from "../types";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

type FooterProps = {
  t: I18nEntry;
  socials: Socials;
  BRAND: BrandPalette;
};

const Footer: React.FC<FooterProps> = ({ t, socials, BRAND }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // For fixed footer, always visible
  const visible = true;

  return (
    <footer
      className="text-center text-sm w-full"
      style={{
        borderTop: `1px solid ${BRAND.violet}20`,
        background: `${BRAND.magenta}cc`,
        color: BRAND.light,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 -2px 16px #0001",
        transition: "padding 0.4s, font-size 0.4s, background 0.3s",
        paddingTop: "20px",
        paddingBottom: "20px",
        fontSize: "1rem",
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        className={[
          "max-w-6xl mx-auto px-4 transform-gpu",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          "will-change-transform",
        ].join(" ")}
        style={{ minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="flex justify-center gap-5 mb-3">
          <a
            href={socials.instagram ? socials.instagram : undefined}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center"
            style={{ color: "#fff", opacity: socials.instagram ? 1 : 0.3, pointerEvents: socials.instagram ? 'auto' : 'none' }}
          >
            <FaInstagram size={22} />
          </a>
          <a
            href={socials.facebook ? socials.facebook : undefined}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-flex items-center"
            style={{ color: "#fff", opacity: socials.facebook ? 1 : 0.3, pointerEvents: socials.facebook ? 'auto' : 'none' }}
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href={socials.tiktok ? socials.tiktok : undefined}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="inline-flex items-center"
            style={{ color: "#fff", opacity: socials.tiktok ? 1 : 0.3, pointerEvents: socials.tiktok ? 'auto' : 'none' }}
          >
            <FaTiktok size={22} />
          </a>
        </div>
        <div style={{ color: "#fff", fontWeight: 500, fontSize: 15, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{t.footer}</div>
      </div>
    </footer>
  );
};

export default Footer;
