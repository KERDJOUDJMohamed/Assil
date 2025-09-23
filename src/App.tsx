
import React, { useState } from "react";
import Hero from "./components/Hero";
import { useStoredLang } from "./helpers";
import { i18n } from "./data/i18n";
import { useOpenNow } from "./hooks/useOpenNow";
import { BRAND } from "./utils/brand";
import { scrollToId } from "./utils/scrollToId";
// import type { LangCode, I18nEntry } from "./types";
import Header from "./components/Header";
import ProductsSection from "./components/ProductsSection";
import { products } from "./data/products";
// import { socials } from "./data/socials";
import { AgentsSection } from "./components/AgentsSection";
import { PartnersSection } from "./components/PartnersSection";
import { ContactSection } from "./components/ContactSection";
import Footer from "./components/Footer";
import { socials } from "./data/socials";

/* ──────────────────────────────────────────────────────────────────────────
   App
────────────────────────────────────────────────────────────────────────── */





const App = () => {
  const { lang, setLang } = useStoredLang(i18n, "fr");
  const { open, nextChange } = useOpenNow();
  const t = i18n[lang];

  // Navbar shrink and scroll spy logic (not used in modular version)
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // separate from lang dropdown
  // (Scroll event logic omitted for modular version)

  return (
    <div style={{ background: BRAND.light, color: BRAND.dark, minHeight: "100vh" }}>
      <Header
        lang={lang}
        setLang={setLang}
        langOpen={langOpen}
        setLangOpen={setLangOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
  dropdownRef={undefined as unknown as React.RefObject<HTMLDivElement>}
        BRAND={BRAND}
        i18n={i18n}
        t={t}
        scrollToId={scrollToId}
      />
      <Hero />
      <section id="who" className="max-w-6xl mx-auto px-4 py-16" style={{ background: '#fff' }}>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: BRAND.violet }}>{t.whoWeAreTitle}</h2>
        <p className="text-lg leading-relaxed text-center" style={{ color: BRAND.dark }}>{t.whoWeAreBody}</p>
      </section>
      <ProductsSection
        products={products}
        socials={socials}
        lang={lang}
        title={{ ar: t.productsTitle, fr: t.productsTitle, en: t.productsTitle }}
      />
      <AgentsSection lang={lang} t={t} />
      <PartnersSection lang={lang} partnersTitle={{
        ar: "شركاؤنا",
        fr: "Nos partenaires",
        en: "Our partners",
      }} />
      <ContactSection lang={lang} t={t} open={open} nextChange={nextChange} />
  <Footer t={t} socials={socials} BRAND={BRAND} />
    </div>
  );
};


export default App;

