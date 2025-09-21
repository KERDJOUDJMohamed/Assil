import React, { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";

/* ──────────────────────────────────────────────────────────────────────────
   Brand palette (from logo)
────────────────────────────────────────────────────────────────────────── */
const BRAND = {
  violet: "#3E36B0",
  magenta: "#B0126F",
  dark: "#0F1021",
  light: "#ffffff",
  softViolet: "#FBFAFF",
  softMagenta: "#FFF6FB",
};

type LangCode = "ar" | "fr" | "en";
type Localized<T = string> = Record<LangCode, T>;

interface Socials {
  instagram: string;
  tiktok: string;
  facebook: string;
  mapsShare: string;
  whatsapp: string;
  phone1: string;
  phone2: string;
}

interface I18nEntry {
  langName: string;
  dir: "rtl" | "ltr";
  brand: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaBrowse: string;
  ctaContact: string;
  whoWeAreTitle: string;
  whoWeAreBody: string;
  productsTitle: string;
  productsNote: string;
  ourShopTitle: string;
  ourShopBody: string;
  testimonialsTitle: string;
  agentsTitle: string;
  agentRoleLabel: string;
  whereToFindUsTitle: string;
  addressLabel: string;
  phonesLabel: string;
  hoursLabel: string;
  openNow: string;
  closedNow: string;
  contactTitle: string;
  footer: string;
  days: Localized<{ short: string; long: string }>;
}


interface AgentProfile {
  id: number;
  name: Localized;
  role: Localized;
  bio: Localized;
  img: string;
}

/* ──────────────────────────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────────────────────────── */
const socials: Socials = {
  instagram: "https://www.instagram.com/assil_ceramica/",
  tiktok: "https://www.tiktok.com/@assil.ceramica",
  facebook: "https://www.facebook.com/profile.php?id=61567258324047",
  mapsShare: "https://share.google/u2vnzpiCWP6tERjoX",
  whatsapp: "https://wa.me/213770307138",
  phone1: "+213770307138",
  phone2: "+213554248788",
};

const i18n: Record<LangCode, I18nEntry> = {
  ar: {
    langName: "العربية",
    dir: "rtl",
    brand: "أسيل سيراميكا",
    heroTitle: "سيراميك وإكسسوارات حمّام ومطبخ — جودة وسعر مناسب",
    heroSubtitle:
      "نقترح إكسسوارات الحمام/التواليت، لوازم المطبخ، مغاسل، أحواض، خزائن، مرايا، دوشات، روبينيهات مع التوصيل إلى 58 ولاية.",
    ctaBrowse: "الأكثر مبيعًا",
    ctaContact: "اتصل بنا",
    whoWeAreTitle: "من نحن",
    whoWeAreBody:
      "أسيل سيراميكا متجر في الأربعاء (البليدة) يقترح إكسسوارات الحمام/التواليت، مغاسل، أحواض، خزائن، مرايا، دوشات، روبينيهات، لوازم المطبخ، مع التوصيل إلى 58 ولاية.",
    productsTitle: "الأكثر مبيعًا",
    productsNote: "الأسعار تقريبية وقد تتغير حسب التوفر. اتصل بنا للتأكيد.",
    ourShopTitle: "محلّنا",
    ourShopBody:
      "زورونا في الأربعاء — الخريطة أدناه. تابعوا العروض على فيسبوك وإنستغرام.",
    testimonialsTitle: "آراء الزبائن",
    agentsTitle: "فريق المبيعات",
    agentRoleLabel: "المنصب",
    whereToFindUsTitle: "أين تجدوننا",
    addressLabel: "العنوان",
    phonesLabel: "الهاتف",
    hoursLabel: "الساعات",
    openNow: "مفتوح الآن",
    closedNow: "مغلق الآن",
    contactTitle: "تواصل",
    footer:
      "© " + new Date().getFullYear() + " أسيل سيراميكا — الأربعاء، البليدة",
    days: {
      ar: { short: "السبت", long: "السبت" },
      fr: { short: "Sam", long: "Samedi" },
      en: { short: "Sat", long: "Saturday" },
    },
  },
  fr: {
    langName: "Français",
    dir: "ltr",
    brand: "Assil Ceramica",
    heroTitle: "Carrelage, sanitaires & cuisine — qualité au bon prix",
    heroSubtitle:
      "Assil Ceramica est un magasin à Larbâa (Blida) qui propose accessoires salle de bain/toilette, lavabo, évier, vasque, meuble, miroir, douchette, robinetterie, cuisine, avec livraison 58 wilayas.",
    ctaBrowse: "Meilleures ventes",
    ctaContact: "Nous contacter",
    whoWeAreTitle: "Qui sommes-nous",
    whoWeAreBody:
      "Assil Ceramica est un magasin à Larbâa (Blida) qui propose accessoires salle de bain/toilette, lavabo, évier, vasque, meuble, miroir, douchette, robinetterie, cuisine, avec livraison 58 wilayas.",
    productsTitle: "Meilleures ventes",
    productsNote:
      "Prix indicatifs, sujets à variation selon stock. Contactez-nous pour confirmer.",
    ourShopTitle: "Notre boutique",
    ourShopBody:
      "Venez nous voir à Larbâa — carte ci-dessous. Suivez nos offres sur Facebook et Instagram.",
    testimonialsTitle: "Témoignages",
    agentsTitle: "Nos agents",
    agentRoleLabel: "Poste",
    whereToFindUsTitle: "Où nous trouver",
    addressLabel: "Adresse",
    phonesLabel: "Téléphones",
    hoursLabel: "Horaires",
    openNow: "Ouvert",
    closedNow: "Fermé",
    contactTitle: "Contact",
    footer:
      "© " + new Date().getFullYear() + " Assil Ceramica — Larbâa, Blida",
    days: {
      ar: { short: "السبت", long: "السبت" },
      fr: { short: "Sam", long: "Samedi" },
      en: { short: "Sat", long: "Saturday" },
    },
  },
  en: {
    langName: "English",
    dir: "ltr",
    brand: "Assil Ceramica",
    heroTitle: "Ceramic tiles, bath & kitchen — great value",
    heroSubtitle:
      "We offer bathroom/toilet accessories, sinks, vanities, mirrors, shower heads, faucets, and kitchen accessories, with delivery to all 58 wilayas.",
    ctaBrowse: "Best sellers",
    ctaContact: "Contact us",
    whoWeAreTitle: "Who we are",
    whoWeAreBody:
      "Assil Ceramica is a store in Larbaa (Blida) offering bathroom/toilet accessories, sinks, vanities, mirrors, shower heads, faucets, and kitchen accessories, with delivery to all 58 wilayas.",
    productsTitle: "Best sellers",
    productsNote:
      "Prices are indicative and may change with availability. Contact us to confirm.",
    ourShopTitle: "Our shop",
    ourShopBody:
      "Visit us in Larbaa — map below. Follow our latest offers on Facebook and Instagram.",
    testimonialsTitle: "Testimonials",
    agentsTitle: "Our agents",
    agentRoleLabel: "Role",
    whereToFindUsTitle: "Where to find us",
    addressLabel: "Address",
    phonesLabel: "Phones",
    hoursLabel: "Hours",
    openNow: "Open now",
    closedNow: "Closed",
    contactTitle: "Contact",
    footer:
      "© " + new Date().getFullYear() + " Assil Ceramica — Larbaa, Blida",
    days: {
      ar: { short: "السبت", long: "السبت" },
      fr: { short: "Sam", long: "Samedi" },
      en: { short: "Sat", long: "Saturday" },
    },
  },
};

// Best sellers
const products = [
  {
    img: "/products/colone-de-douche-arthermo-dodel-dream.jpg",
    name: {
      ar: "عمود دش أرثيرمو دوديل دريم",
      fr: "Colone De Douche Arthermo Dodel Dream",
      en: "Shower Column Arthermo Dodel Dream",
    },
    price: 28500,
  },
  {
    img: "products/evier-cuisine-spane-model-82-45.jpg",
    name: {
      ar: "حوض مطبخ سباني موديل 82/45",
      fr: "Evier Cuisine Spane Model 82/45",
      en: "Kitchen Sink Spane Model 82/45",
    },
    price: 13000,
  },
  {
    img: "products/meuble-salle-de-bain-pvc-cresta-60cm.jpg",
    name: {
      ar: "أثاث حمام من PVC (كريستا 60 سم) مع حوض سيراميك ومرآة LED بثلاث وضعيات",
      fr: "Meubles Salle De Bain en PVC (Cresta 60cm) avec vasque en ceramique et mirroir LED 3 positions",
      en: "Bathroom Furniture in PVC (Cresta 60cm) with Ceramic Basin and 3-Position LED Mirror",
    },
    price: 34000,
  },
  {
    img: "products/mit-arthermo-lavabo-noire-model-eclips.jpg",
    name: {
      ar: "خلاط أرثيرمو أسود للمغسلة موديل إكليبس",
      fr: "Mit Arthermo Lavabo Noire Model Eclips",
      en: "Arthermo Black Basin Mixer Model Eclips",
    },
    price: 8500,
  },
];

const agents: AgentProfile[] = [
  {
    id: 1,
    name: { ar: "ياسر وشان", fr: "Yasser", en: "Yasser" },
    role: { ar: "مستشار مبيعات", fr: "Conseiller de vente", en: "Sales Advisor" },
    bio: {
      ar: "أسيل سيراميكا… كل ما تحتاجه لحمام ومطبخ عصري في مكان واحد.",
      fr: "Assil Ceramica… tout pour une salle de bain et une cuisine modernes au même endroit",
      en: "Assil Ceramica… everything you need for a modern bathroom and kitchen in one place.",
    },
    img: "agents/Yasser.jpg",
  },
  {
    id: 2,
    name: { ar: "يعقوب", fr: "Yaakoub", en: "Yaakoub" },
    role: { ar: "مستشار مبيعات", fr: "Conseiller de vente", en: "Sales Advisor" },
    bio: {
      ar: "من الاربعاء إلى 58 ولاية… أسيل سيراميكا توصلك أينما كنت",
      fr: "De Larbaâ vers les 58 wilayas… Assil Ceramica vous livre partout.",
      en: "From Larbaâ to all 58 wilayas… Assil Ceramica delivers to you anywhere.",
    },
    img: "agents/Yaakoub.jpg",
  },
  {
    id: 3,
    name: { ar: "هشام", fr: "Hichem", en: "Hichem" },
    role: { ar: "مستشار مبيعات", fr: "Conseiller de vente", en: "Sales Advisor" },    
    bio: {
      ar: "جودة، أناقة، وثقة… هذا ما يقدمه لك أسيل سيراميكا.",
      fr: "Qualité, élégance et confiance… c’est ce qu’Assil Ceramica vous offre.",
      en: "Quality, elegance, and trust… that’s what Assil Ceramica brings you.",
    },
    img: "agents/Hichem.jpg",
  },
  {
    id: 6,
    name: { ar: "مصعب", fr: "Mousaab", en: "Mousaab" },
    role: { ar: "مسير", fr: "Gérant", en: "Manager" },
    bio: {
      ar: "المدير الناجح هو الذي يحول الرؤية إلى واقع.",
      fr: "Un bon manager est celui qui transforme une vision en réalité.",
      en: "A great manager is the one who turns vision into reality.",
    },
    img: "agents/Mousaab.jpg",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────────────────── */

/** Persist language in localStorage; default from browser on first load. */
function useStoredLang(): {
  lang: LangCode;
  setLang: React.Dispatch<React.SetStateAction<LangCode>>;
} {
  const KEY = "assil:lang";
  const getInitial = (): LangCode => {
    const saved = localStorage.getItem(KEY) as LangCode | null;
    if (saved === "ar" || saved === "fr" || saved === "en") return saved;
    const nav = navigator.language || "";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("en")) return "en";
    return "ar";
  };
  const [lang, setLang] = useState<LangCode>(getInitial);
  useEffect(() => {
    localStorage.setItem(KEY, lang);
    document.documentElement.setAttribute("dir", i18n[lang].dir);
  }, [lang]);
  return { lang, setLang };
}

/** Current time in Africa/Algiers (HH:mm and weekday index 0=Sunday..6) */
function nowInAlgiers() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
    timeZone: "Africa/Algiers",
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);
  const wdShort = get("weekday");
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return { minutes: hour * 60 + minute, weekday: map[wdShort] ?? 0 };
}

/** 08:00–21:00 every day */
const WEEKLY_HOURS = Array.from({ length: 7 }, () => ({
  open: 8 * 60,
  close: 21 * 60,
}));

function useOpenNow() {
  const [{ open, nextChange }, setState] = useState({
    open: false,
    nextChange: "",
  });
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    function compute() {
      const { minutes, weekday } = nowInAlgiers();
      const { open: o, close: c } = WEEKLY_HOURS[weekday];
      const isOpen = minutes >= o && minutes < c;
      const nc =
        minutes < o
          ? `${pad(Math.floor(o / 60))}:${pad(o % 60)}`
          : `${pad(Math.floor(c / 60))}:${pad(c % 60)}`;
      setState({ open: isOpen, nextChange: nc });
    }
    compute();
    const id = setInterval(compute, 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return { open, nextChange };
}

/* ──────────────────────────────────────────────────────────────────────────
   UI bits
────────────────────────────────────────────────────────────────────────── */
const Price = ({ value }: { value: number }) => (
  <span style={{ color: BRAND.violet, fontWeight: 700 }}>
    {value.toLocaleString("fr-DZ")} DZD
  </span>
);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ──────────────────────────────────────────────────────────────────────────
   App
────────────────────────────────────────────────────────────────────────── */
const App = () => {
  const { lang, setLang } = useStoredLang();
  const { open, nextChange } = useOpenNow();
  const t = i18n[lang];
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // separate from lang dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdowns on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [langOpen]);

  const logoUrl = "/logo.jpg"; // place in public/
  // removed unused heroUrl

  // Map embed built from share link
  const mapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.1989153871305!2d3.151653075590034!3d36.573424080450465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e55007dc89f29%3A0x89aa37823290fb86!2sAssil%20ceramic!5e0!3m2!1sen!2sdz!4v1758462779297!5m2!1sen!2sdz"

  return (
    <div style={{ background: BRAND.light, color: BRAND.dark, minHeight: "100vh" }}>
      {/* Header (transparent over hero like dar-zellige) */}
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
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Assil Ceramica" className="w-9 h-9 rounded-full border" style={{ borderColor: BRAND.violet }} />
            <span className="font-bold text-lg" style={{ color: BRAND.violet }}>{t.brand}</span>
          </div>

          {/* desktop nav */}
          <nav className="ml-auto hidden md:flex gap-1 text-sm tracking-wide">
            {[
              { id: "who", label: t.whoWeAreTitle },
              { id: "products", label: t.productsTitle },
              { id: "gallery", label: "Gallery" },
              { id: "agents", label: t.agentsTitle },
              { id: "shop", label: t.ourShopTitle },
              { id: "findus", label: t.whereToFindUsTitle },
              { id: "contact", label: t.contactTitle },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="px-3 py-2 rounded-md hover:bg-gray-100"
                style={{ color: BRAND.dark }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* mobile hamburger (for nav) */}
          <button
            className="md:hidden ml-auto p-2 rounded"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{ background: BRAND.violet, color: BRAND.light }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>

          {/* language dropdown */}
          <div className="ml-3 relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="px-3 py-2 rounded-md font-semibold"
              style={{ background: BRAND.magenta, color: BRAND.light, border: `1px solid ${BRAND.magenta}` }}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {i18n[lang].langName}
            </button>
            {langOpen && (
              <ul className="absolute right-0 mt-2 w-36 rounded-md shadow" style={{ background: BRAND.light, border: `1px solid ${BRAND.violet}` }} role="listbox">
                {["ar", "fr", "en"].map((code) => (
                  <li key={code as string}>
                    <button
                      type="button"
                      onClick={() => { setLang(code as LangCode); setLangOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      style={{ color: BRAND.dark, fontWeight: lang === code ? 700 : 500 }}
                      role="option"
                      aria-selected={lang === code}
                    >
                      {i18n[code as LangCode].langName}
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
              {[
                { id: "who", label: t.whoWeAreTitle },
                { id: "products", label: t.productsTitle },
                { id: "gallery", label: "Gallery" },
                { id: "agents", label: t.agentsTitle },
                { id: "shop", label: t.ourShopTitle },
                { id: "findus", label: t.whereToFindUsTitle },
                { id: "contact", label: t.contactTitle },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollToId(item.id); setMenuOpen(false); }}
                  className="text-left px-3 py-2 rounded-md"
                  style={{ color: BRAND.dark, border: `1px solid ${BRAND.violet}20` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO — banner carousel */}
      <Hero />

      {/* WHO WE ARE */}
      <section id="who" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-4" style={{ color: BRAND.violet }}>{t.whoWeAreTitle}</h2>
        <p className="text-lg leading-relaxed" style={{ color: BRAND.dark }}>{t.whoWeAreBody}</p>
      </section>

      {/* BEST SELLERS — clean grid like a restaurant menu cards */}
      <section id="products" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-semibold" style={{ color: BRAND.violet }}>{t.productsTitle}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <article key={idx} className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: `${BRAND.violet}33` }}>
              <div className="relative aspect-[4/3]">
                <img src={p.img} alt={p.name[lang]} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,.85)", color: BRAND.magenta }}>
                  <Price value={p.price} />
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


      {/* OUR SHOP with open/close pill */}
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

      {/* AGENTS */}
      <section id="agents" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6" style={{ color: BRAND.violet }}>{t.agentsTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((a) => (
            <div key={a.id} className="rounded-2xl shadow overflow-hidden" style={{ border: `1px solid ${BRAND.violet}33`, background: BRAND.light }}>
              <div className="aspect-[4/3]" style={{ background: BRAND.softMagenta }}>
                <img src={a.img} alt={a.name[lang]} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold text-lg" style={{ color: BRAND.dark }}>{a.name[lang]}</div>
                <div className="text-sm mb-2" style={{ color: BRAND.violet }}>{t.agentRoleLabel}: {a.role[lang]}</div>
                <p style={{ color: BRAND.dark }}>{a.bio[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHERE TO FIND US */}
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

      {/* CONTACT (no form) */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-4" style={{ color: BRAND.violet }}>{t.contactTitle}</h2>
        <div className="flex flex-wrap gap-3">
          <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-full font-bold" style={{ background: BRAND.magenta, color: BRAND.light }}>WhatsApp</a>
          <a href={`tel:${socials.phone1}`} className="px-5 py-2 rounded-full font-bold" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet }}>{socials.phone1}</a>
          <a href={`tel:${socials.phone2}`} className="px-5 py-2 rounded-full font-bold" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet }}>{socials.phone2}</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm" style={{ borderTop: `1px solid ${BRAND.violet}20`, background: "#fafafa" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-5 mb-3">
            <a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: BRAND.magenta }}>Instagram</a>
            <a href={socials.facebook} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: BRAND.violet }}>Facebook</a>
            <a href={socials.tiktok} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: BRAND.dark }}>TikTok</a>
          </div>
          <div style={{ color: BRAND.dark }}>{t.footer}</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
