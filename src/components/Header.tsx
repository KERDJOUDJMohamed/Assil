import type { I18nEntry, LangCode } from "../types";
import React, { useEffect, useState } from "react";
import type { RefObject } from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "./TypewriterText";

type BrandPalette = {
  violet: string;
  magenta: string;
  dark: string;
  light: string;
  softViolet: string;
  softMagenta: string;
};

type HeaderProps = {
  t: I18nEntry;
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement>;
  BRAND: BrandPalette;
  i18n: Record<LangCode, I18nEntry>;
  scrollToId: (id: string) => void;
};


const NAV_SECTIONS = [
  { id: "who", label: "whoWeAreTitle" },
  { id: "products", label: "productsTitle" },
  { id: "agents", label: "agentsTitle" },
  { id: "partners", label: "partnersTitle" },
  { id: "findus", label: "contactTitle" },
];

export const Header: React.FC<HeaderProps> = ({ t, lang, setLang, langOpen, setLangOpen, menuOpen, setMenuOpen, dropdownRef, BRAND, i18n, scrollToId }) => {
  const [navShrink, setNavShrink] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => setNavShrink(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 4;
      let found = NAV_SECTIONS[0].id;
      for (const section of NAV_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top) {
            found = section.id;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${BRAND.violet}20`,
        transition: 'padding 0.25s, height 0.25s',
      }}
    >
      <div
        className="max-w-6xl mx-auto px-4 flex items-center gap-3"
        style={{
          paddingTop: navShrink ? 6 : 20,
          paddingBottom: navShrink ? 6 : 20,
          transition: 'padding 0.5s',
        }}
      >
        <div className="flex items-center">
          <span
            style={{
              display: 'inline-block',
              perspective: 1200,
              width: navShrink ? 43.2 : 57.6,
              height: navShrink ? 43.2 : 57.6,
              borderRadius: '50%',
              position: 'relative',
            }}
          >
            <motion.img
              src="/A.png"
              alt="Assil Ceramica"
              className="rounded-full border shadow-lg"
              style={{
                borderColor: BRAND.violet,
                width: '100%',
                height: '100%',
                maxHeight: '100%',
                transition: 'width 0.25s, height 0.25s, max-height 0.25s',
                objectFit: 'cover',
                background: '#fff',
                willChange: 'transform',
                transformOrigin: '50% 50%',
                display: 'block',
                boxShadow: '0 2px 12px #0002',
              }}
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            {/* Lighting overlay for 3D effect */}
            <motion.span
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.18) 100%)',
                mixBlendMode: 'soft-light',
              }}
              animate={{ rotateY: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
          </span>
          {/* Typewriter effect for SSIL */}
          <TypewriterText text="SSIL CERAMICA" navShrink={navShrink} />
        </div>
        {/* desktop nav */}
        <nav className="ml-auto hidden md:flex gap-1 text-sm tracking-wide">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="px-2 py-1.5 rounded-md hover:bg-gray-100"
              style={{
                color: activeSection === item.id ? BRAND.magenta : BRAND.dark,
                fontWeight: activeSection === item.id ? 700 : 500,
                fontSize: 14,
                textDecoration: activeSection === item.id ? 'underline' : 'none',
                textUnderlineOffset: 4,
                opacity: activeSection === item.id ? 1 : 0.7,
                transition: 'color 0.2s, opacity 0.2s',
              }}
            >
              {String(t[item.label as keyof I18nEntry])}
            </button>
          ))}
        </nav>
        {/* mobile hamburger (for nav) */}
        <div className="md:hidden ml-auto relative">
            <button
              className="p-2 rounded sm:p-2.5"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: BRAND.violet, color: BRAND.light, fontSize: '1.1rem', padding: '7px 10px' }}
            >
              <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </button>
          </div>
        {/* language dropdown */}
        <div className="ml-3 relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="px-2 py-1 rounded-full font-semibold flex items-center gap-2 shadow-sm border sm:px-2.5 sm:py-1.5"
              style={{
                background: langOpen ? BRAND.violet : BRAND.magenta,
                color: BRAND.light,
                border: `1.5px solid ${langOpen ? BRAND.violet : BRAND.magenta}`,
                fontSize: '0.95rem',
                minWidth: 30,
                transition: 'background 0.2s, border 0.2s',
              }}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <svg width="15" height="15" className="sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: 4, opacity: 0.8 }}><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
              {i18n[lang].langName}
              <svg width="12" height="12" className="sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginLeft: 2, opacity: 0.7 }}><path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          {langOpen && (
            <ul
              className="absolute right-0 mt-2 w-36 rounded-xl shadow-2xl border z-50 animate-fade-in"
              style={{
                background: '#fff',
                border: `1.5px solid ${BRAND.violet}`,
                padding: 6,
                boxShadow: '0 8px 32px #0003',
              }}
              role="listbox"
            >
              {(Object.keys(i18n) as LangCode[]).map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    onClick={() => { setLang(code); setLangOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      color: lang === code ? BRAND.violet : BRAND.dark,
                      fontWeight: lang === code ? 700 : 500,
                      background: lang === code ? `${BRAND.violet}10` : 'transparent',
                      fontSize: 14,
                      letterSpacing: 0.2,
                      transition: 'background 0.15s, color 0.15s',
                      boxShadow: lang === code ? '0 2px 8px #0002' : undefined,
                    }}
                    role="option"
                    aria-selected={lang === code}
                  >
                    <span style={{ fontSize: 16, width: 20, display: 'inline-block', textAlign: 'center' }}>
                      {code === 'ar' ? '🇩🇿' : code === 'fr' ? '🇫🇷' : '🇬🇧'}
                    </span>
                    {i18n[code].langName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* mobile nav dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: `${BRAND.violet}20`, background: BRAND.light }}>
          <nav className="px-4 py-3 grid gap-2">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollToId(item.id); setMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-md"
                style={{
                  color: activeSection === item.id ? BRAND.magenta : BRAND.dark,
                  fontWeight: activeSection === item.id ? 700 : 500,
                  fontSize: 15,
                  border: `1px solid ${BRAND.violet}20`,
                  textDecoration: activeSection === item.id ? 'underline' : 'none',
                  textUnderlineOffset: 4,
                  opacity: activeSection === item.id ? 1 : 0.7,
                  transition: 'color 0.2s, opacity 0.2s',
                }}
              >
                {String(t[item.label as keyof I18nEntry])}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
