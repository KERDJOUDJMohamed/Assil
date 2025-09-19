import React, { useState, useEffect, type JSX } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Globe, Languages, ChevronRight, Clock } from "lucide-react";

// =======================
// Metro Pizza — TS + React
// =======================
// - TypeScript-ready single file component (use as App.tsx)
// - Multilingual (FR/EN/AR) with RTL for Arabic
// - Modern UI (Tailwind), wallpaper background, mobile drawer nav
// - Sections: About, Menu, Ambiance, Testimonials, Visit, Contact

// ▶ Put your wallpaper in /public/wallpaper.jpg (Vite) or edit this path
const WALLPAPER: string = "/wallpaper.jpg";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type LangCode = "en" | "fr" | "ar";

type Testimonial = {
  name: string;
  text: string;
};

type Dictionary = {
  brand: string;
  nav: { about: string; menu: string; ambiance: string; testimonials: string; visit: string; contact: string };
  hero: { title: string; subtitle: string; cta: string };
  about: { title: string; body: string; badges: string[] };
  menu: {
    title: string;
    pizzaSize: string;
    simple: string;
    mega: string;
    currency: string;
    supplements: string;
    salads: string;
    tortillas: string;
    souffle: string;
    drinks: string;
    desserts: string;
    crepes: string;
    categories: { incontournables: string; suprems: string; extras: string; signatures: string };
  };
  ambiance: { title: string; caption: string };
  testimonials: { title: string; items: Testimonial[] };
  visit: { title: string; hours: string; today: string; addressLabel: string; mapCta: string };
  contact: { title: string; subtitle: string; name: string; message: string; send: string; alt: string };
};

type PizzaItem = { name: string; simple: number; mega: number | null; desc?: string };

type Supplement = { name: string; simple: number; mega: number };

type SimplePriced = { name: string; price: number; desc?: string };

// ──────────────────────────────────────────────────────────────────────────────
// i18n dictionary
// ──────────────────────────────────────────────────────────────────────────────
const DICTIONARY: Record<LangCode, Dictionary> = {
  en: {
    brand: "Metro Pizza",
    nav: { about: "Who we are", menu: "Menu", ambiance: "Ambiance", testimonials: "Testimonials", visit: "Where to find us", contact: "Contact us" },
    hero: { title: "Authentic taste, metro vibes.", subtitle: "Fresh dough, generous toppings, and warm service in the heart of Algiers.", cta: "See the Menu" },
  about: { title: "Who we are", body: "At Metro Pizza, we blend Italian tradition with Algerian generosity to create a unique dining experience. Our passionate team brings decades of culinary expertise, ensuring every pizza is a celebration of flavor and hospitality. We use only the freshest ingredients—our dough is made daily, our sauces simmer slowly, and every pizza is baked to order. Whether you’re a regular or a first-time guest, you’ll feel right at home in our warm, family-friendly atmosphere. Join us for a slice of joy, crafted with care and served with a smile.", badges: ["Fresh Dough Daily", "100% Mozzarella", "Family Friendly", "Passionate Team", "Authentic Recipes"] },
    menu: { title: "Menu", pizzaSize: "Size", simple: "Simple", mega: "Mega", currency: "DA", supplements: "Supplements", salads: "Salads", tortillas: "Tortillas", souffle: "Soufflé", drinks: "Drinks", desserts: "Desserts", crepes: "Crêpes", categories: { incontournables: "Classics", suprems: "Supremes", extras: "Extras", signatures: "Signatures" } },
    ambiance: { title: "Ambiance", caption: "A cozy place for friends, families, and late-night cravings." },
    testimonials: { title: "Testimonials", items: [{ name: "Nadia", text: "Crispy crust and rich toppings. The Buffalo pizza is a must!" }, { name: "Yacine", text: "Friendly staff, fast service, and great prices. I come every week." }, { name: "Sofia", text: "Loved the salads and the creamy pepperoni. Cozy vibe too!" }] },
    visit: { title: "Where to find us", hours: "Opening Hours", today: "Open today", addressLabel: "Address", mapCta: "Open on Maps" },
    contact: { title: "Contact us", subtitle: "Questions, group bookings, or feedback? Send us a message or call us.", name: "Your name", message: "Message", send: "Send", alt: "Or send us an email" },
  },
  fr: {
    brand: "Metro Pizza",
    nav: { about: "Qui sommes-nous", menu: "Menu", ambiance: "Ambiance", testimonials: "Témoignages", visit: "Où nous trouver", contact: "Contactez-nous" },
    hero: { title: "Goût authentique, vibes metro.", subtitle: "Pâte fraîche, garnitures généreuses et service chaleureux au cœur d'Alger.", cta: "Voir le menu" },
  about: { title: "Qui sommes-nous", body: "Chez Metro Pizza, nous marions la tradition italienne à la générosité algérienne pour offrir une expérience unique. Notre équipe passionnée met à profit des années de savoir-faire culinaire pour que chaque pizza soit une fête de saveurs et d’hospitalité. Nous sélectionnons les meilleurs ingrédients : pâte fraîche chaque jour, sauces mijotées longuement, et chaque pizza cuite à la commande. Que vous soyez un habitué ou un nouveau venu, vous trouverez chez nous une ambiance chaleureuse et familiale. Venez partager un moment de bonheur, préparé avec soin et servi avec le sourire.", badges: ["Pâte fraîche chaque jour", "100% Mozzarella", "Famille bienvenue", "Équipe passionnée", "Recettes authentiques"] },
    menu: { title: "Menu", pizzaSize: "Taille", simple: "Simple", mega: "Méga", currency: "DA", supplements: "Suppléments", salads: "Salades", tortillas: "Tortillas", souffle: "Soufflé", drinks: "Boissons", desserts: "Desserts", crepes: "Crêpes", categories: { incontournables: "Les incontournables", suprems: "Les suprêmes", extras: "Les extras", signatures: "Les signatures" } },
    ambiance: { title: "Ambiance", caption: "Un lieu chaleureux pour les amis, les familles et les envies tardives." },
    testimonials: { title: "Témoignages", items: [{ name: "Nadia", text: "Pâte croustillante et garnitures riches. La Buffalo est un must !" }, { name: "Yacine", text: "Equipe sympa, service rapide et bons prix. J'y vais chaque semaine." }, { name: "Sofia", text: "J'ai adoré les salades et la Creamy Pepperoni. Super ambiance !" }] },
    visit: { title: "Où nous trouver", hours: "Horaires", today: "Ouvert aujourd'hui", addressLabel: "Adresse", mapCta: "Ouvrir dans Maps" },
    contact: { title: "Contactez-nous", subtitle: "Questions, réservations de groupe ou avis ? Écrivez-nous ou appelez-nous.", name: "Votre nom", message: "Message", send: "Envoyer", alt: "Ou envoyez-nous un email" },
  },
  ar: {
    brand: "مترو بيتزا",
    nav: { about: "من نحن", menu: "القائمة", ambiance: "الأجواء", testimonials: "آراء الزبائن", visit: "أين تجدوننا", contact: "اتصلوا بنا" },
    hero: { title: "طعم أصيل وأجواء مميزة", subtitle: "عجين طازج، إضافات سخية وخدمة دافئة في قلب الجزائر.", cta: "عرض القائمة" },
  about: { title: "من نحن", body: "في مترو بيتزا نمزج التقاليد الإيطالية بكرم الضيافة الجزائري لنمنحكم تجربة فريدة. فريقنا الشغوف يمتلك خبرة سنوات في فنون الطهي ليضمن أن كل بيتزا هي احتفال بالنكهات والضيافة. نستخدم أجود المكونات: نعجن العجين يوميًا، وتطهى الصلصات ببطء، وتُخبز كل بيتزا عند الطلب. سواء كنتم من الزبائن الدائمين أو تزوروننا لأول مرة، ستشعرون بدفء الأجواء العائلية. شاركونا لحظات السعادة، بيتزا محضرة بعناية وتُقدم بابتسامة.", badges: ["عجين طازج يوميًا", "100% موزاريلا", "مناسب للعائلات", "فريق شغوف", "وصفات أصلية"] },
    menu: { title: "القائمة", pizzaSize: "الحجم", simple: "صغير", mega: "كبير", currency: "دج", supplements: "إضافات", salads: "سلطات", tortillas: "تورتيلا", souffle: "سوفليه", drinks: "مشروبات", desserts: "حلويات", crepes: "كريب", categories: { incontournables: "الكلاسيكيات", suprems: "السوبريم", extras: "إكسترا", signatures: "التواقيع" } },
    ambiance: { title: "الأجواء", caption: "مكان دافئ للأصدقاء والعائلات ومحبي السهر." },
    testimonials: { title: "آراء الزبائن", items: [{ name: "نادية", text: "عجينة مقرمشة وحشوات غنية. أنصح ببيتزا بوفالو!" }, { name: "ياسين", text: "خدمة سريعة وطاقم ودود وأسعار ممتازة." }, { name: "صفية", text: "أحببت السلطات وكريمي بيبروني. مكان مريح!" }] },
    visit: { title: "أين تجدوننا", hours: "ساعات العمل", today: "مفتوح اليوم", addressLabel: "العنوان", mapCta: "افتح الخريطة" },
    contact: { title: "اتصلوا بنا", subtitle: "أسئلة أو حجز جماعي؟ راسلونا أو اتصلوا بنا.", name: "اسمك", message: "رسالتك", send: "إرسال", alt: "أو أرسل بريدًا إلكترونيًا" },
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Menu data
// ──────────────────────────────────────────────────────────────────────────────
const MENU: {
  pizzas: {
    incontournables: PizzaItem[];
    suprems: PizzaItem[];
    extras: PizzaItem[];
    signatures: PizzaItem[];
    supplements: Supplement[];
  };
  salads: SimplePriced[];
  tortillas: SimplePriced[];
  souffle: SimplePriced[];
  drinks: SimplePriced[];
  desserts: SimplePriced[];
  crepes: SimplePriced[];
} = {
  pizzas: {
    incontournables: [
      { name: "Pizza Napolitaine", simple: 800, mega: 2400, desc: "Sauce tomate, fromage, anchois, câpres, origan" },
      { name: "Pizza Végétarienne", simple: 800, mega: 2400, desc: "Tomate, fromage, courgette, aubergine, poivrons, oignon, persillade, origan" },
      { name: "Pizza Tonno", simple: 900, mega: 2600, desc: "Tomate, fromage, thon, oignon, persillade" },
      { name: "Pizza Merguez", simple: 900, mega: 2600, desc: "Tomate, fromage, merguez, oeufs, origan" },
    ],
    suprems: [
      { name: "Pizza La Reine", simple: 900, mega: 2700, desc: "Tomate, fromage, poulet, olives" },
      { name: "Pizza La Forestière", simple: 950, mega: 2800, desc: "Tomate, fromage, viande hachée, oignon" },
      { name: "Pizza 03 Fromages", simple: 950, mega: 2800, desc: "Tomate ou crème, mozzarella, cheddar, camembert" },
      { name: "Pizza 04 Fromages", simple: 1250, mega: 3600, desc: "Tomate ou crème, mozzarella, cheddar, camembert, roquefort" },
      { name: "Pizza Pepperoni", simple: 1000, mega: 3000, desc: "Tomate, pepperoni, origan" },
      { name: "Pizza Fumato Poulet", simple: 1000, mega: 2800, desc: "Tomate, fromage, poulet fumé" },
      { name: "Pizza Fruits de Mer", simple: 1200, mega: 3600, desc: "Tomate, fruit de mer, origan" },
      { name: "Pizza Cannibale", simple: 1000, mega: 3000, desc: "Tomate, sauce barbecue, viande hachée, poulet, poivron" },
      { name: "Pizza Roquefort", simple: 1000, mega: 3000, desc: "Tomate, roquefort, champignon, origan" },
    ],
    extras: [
      { name: "Pizza Popeye", simple: 850, mega: 2500, desc: "Crème, fromage, épinards, olives, origan" },
      { name: "Pizza La Chef", simple: 950, mega: 2800, desc: "Crème, fromage, poivron, viande hachée, poulet, origan" },
      { name: "Pizza Indienne", simple: 950, mega: 2800, desc: "Crème, fromage, poulet curry, origan" },
      { name: "Pizza Buffalo", simple: 1000, mega: 3000, desc: "Crème, fromage, viande hachée, poulet, curry" },
      { name: "Pizza Pêcheur", simple: 1200, mega: 3500, desc: "Crème, fromage, crevettes, origan" },
      { name: "Pizza Saumon", simple: 1200, mega: 3500, desc: "Crème, fromage, saumon fumé, origan" },
      { name: "Pizza La Carnivore", simple: 1100, mega: 3300, desc: "Crème, fromage, viande hachée, poulet, origan" },
      { name: "Creamy Fumato Poulet", simple: 1000, mega: 3000, desc: "Crème, fromage, poulet fumé, oignon" },
      { name: "Creamy Pepperoni", simple: 1100, mega: 3200, desc: "Crème, pepperoni, origan" },
    ],
    signatures: [
      { name: "Pizza Chèvre Miel", simple: 950, mega: 2800, desc: "Crème fraîche, fromage de chèvre, miel" },
      { name: "Pizza L'Hawienne", simple: 950, mega: 2800, desc: "Tomate, mozzarella, ananas, mais" },
      { name: "Pizza Paysanne", simple: 1100, mega: 3200, desc: "Crème, fromage, poulet fumé, champignons" },
      { name: "Pizza Banana Dessert", simple: 900, mega: null, desc: "Crème, Nutella, banane, amandes" },
    ],
    supplements: [
      { name: "Fromage", simple: 300, mega: 900 },
      { name: "Viande", simple: 300, mega: 900 },
      { name: "Saumon", simple: 500, mega: 1500 },
      { name: "Fruits de mer / Crevettes", simple: 500, mega: 1500 },
      { name: "Ananas", simple: 200, mega: 200 },
      { name: "Légumes", simple: 100, mega: 200 },
      { name: "Miel", simple: 200, mega: 300 },
      { name: "Oeuf", simple: 50, mega: 150 },
      { name: "Roquefort", simple: 300, mega: 900 },
      { name: "Champignons", simple: 300, mega: 900 },
    ],
  },
  salads: [
    { name: "Green Salad", price: 450, desc: "Laitue, concombre, brocoli, mozzarella, oignon, sauce" },
    { name: "Fresh Salad", price: 600, desc: "Laitue, ananas, maïs, concombre, fruits de saison, sauce" },
    { name: "Pasta Salad", price: 500, desc: "Pâtes, mozzarella, olives noires, oeuf dur, tomate, sauce" },
    { name: "Mozza Salad", price: 500, desc: "Laitue, mozzarella, tomate, maïs, cornichons, sauce" },
    { name: "Tuna Salad", price: 600, desc: "Riz, maïs, olives noires, poivrons, thon, sauce" },
    { name: "César Salad", price: 600, desc: "Laitue, concombre, poulet cuit, mozzarella, oignon, croûtons, sauce" },
    { name: "Saumon Salad", price: 800, desc: "Laitue, concombre, maïs, tomates, pâtes, saumon, sauce" },
  ],
  tortillas: [ { name: "Fajitas (poulet)", price: 500 }, { name: "Fajitas gratiné cheddar", price: 650 } ],
  souffle: [ { name: "Soufflé Merguez + BBQ", price: 800 }, { name: "Soufflé Poulet Curry", price: 800 }, { name: "Soufflé Viande Algérienne", price: 800 } ],
  drinks: [
    { name: "Jus d'orange nature", price: 300 },
    { name: "Jus de citron nature", price: 300 },
    { name: "Cocktail nature", price: 300 },
    { name: "Bouteille soda 0.5L", price: 150 },
    { name: "Bouteille soda 1L", price: 250 },
    { name: "Schweppes 1L", price: 400 },
    { name: "Eau PM 50 DA / Eau GM", price: 50 },
    { name: "Café Caps Must", price: 150 },
  ],
  desserts: [ { name: "Mousse au chocolat", price: 300 }, { name: "Tiramisu", price: 300 } ],
  crepes: [ { name: "Crêpe Nutella", price: 400 }, { name: "Crêpe Nutella Banane", price: 500 }, { name: "Crêpe Nutella Trois Fruits", price: 700 } ],
};

const LANGS: { code: LangCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

// ──────────────────────────────────────────────────────────────────────────────
// UI building blocks
// ──────────────────────────────────────────────────────────────────────────────
interface SectionProps { id: string; title: string; children?: React.ReactNode }
const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-24 py-12 sm:py-16 relative z-10"
    style={{ scrollBehavior: 'smooth' }}
  >
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black mb-8 text-white drop-shadow-lg tracking-tight flex items-center gap-3"
      >
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-700 rounded-full mr-2" />
        {title}
      </motion.h2>
      {children}
    </div>
  </section>
);

const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-lg p-5 sm:p-6 border border-white/20">
    {children}
  </motion.div>
);

const Price: React.FC<{ value: number | null | undefined; t: Dictionary }> = ({ value, t }) => {
  if (value == null) return <span className="opacity-60">—</span>;
  return <span className="font-semibold">{value.toLocaleString()} {t.menu.currency}</span>;
};

const LanguageSwitcher: React.FC<{ lang: LangCode; setLang: React.Dispatch<React.SetStateAction<LangCode>> }> = ({ lang, setLang }) => (
  <div className="flex items-center gap-2">
    <Languages className="h-5 w-5 text-white" />
    <select value={lang} onChange={(e) => setLang(e.target.value as LangCode)} className="bg-white/90 text-black border border-black/20 rounded-xl px-3 py-2 text-sm font-medium shadow">
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  </div>
);

// ──────────────────────────────────────────────────────────────────────────────
// App
// ──────────────────────────────────────────────────────────────────────────────
export default function App(): JSX.Element {
  // Add smooth scroll behavior globally
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = 'html { scroll-behavior: smooth !important; }';
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  const [lang, setLang] = useState<LangCode>("fr");
  const [openNav, setOpenNav] = useState<boolean>(false); // mobile nav
  const t = DICTIONARY[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.style.fontFamily = isRTL ? 'Cairo, Poppins, Inter, system-ui, -apple-system, Segoe UI' : 'Poppins, Inter, system-ui, -apple-system, Segoe UI';
  }, [isRTL]);


  // Business hours schedule
  const SCHEDULE: { [key: number]: { open: string; close: string } } = {
    0: { open: "11:30", close: "00:00" }, // Sunday
    1: { open: "11:30", close: "00:00" }, // Monday
    2: { open: "11:30", close: "00:00" }, // Tuesday
    3: { open: "11:30", close: "00:00" }, // Wednesday
    4: { open: "11:30", close: "00:00" }, // Thursday
    5: { open: "18:00", close: "00:00" }, // Friday
    6: { open: "11:30", close: "00:00" }, // Saturday
  };

  // Helper to parse HH:mm to Date (today)
  function getTodayTime(hm: string): Date {
    const [h, m] = hm.split(":").map(Number);
    const now = new Date();
    now.setHours(h, m, 0, 0);
    return now;
  }

  // Compute open/close status and time info
  const now = new Date();
  const day = now.getDay();
  const { open: openHour, close: closeHour } = SCHEDULE[day];
  const openTime = getTodayTime(openHour);
  const closeTime = getTodayTime(closeHour);
  // If close is 00:00, treat as next day midnight
  if (closeHour === "00:00") {
    closeTime.setDate(closeTime.getDate() + 1);
  }
  const isOpen = now >= openTime && now < closeTime;
  // Time until close or open
  function pad(n: number) { return n < 10 ? `0${n}` : n; }
  let statusMsg = "";
  let untilMsg = "";
  if (isOpen) {
    // Time until close
    const diffMs = closeTime.getTime() - now.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffM = Math.floor((diffMs % 3600000) / 60000);
    untilMsg = diffH > 0 ? `${diffH}h${pad(diffM)}` : `${diffM}min`;
    statusMsg = lang === "fr" ? `Ouvert maintenant` : lang === "en" ? "Open now" : "مفتوح الآن";
  } else {
    // Time until open
    let nextOpen = openTime;
    if (now > closeTime) {
      // Next open is tomorrow
      const nextDay = (day + 1) % 7;
      const { open: nOpen } = SCHEDULE[nextDay];
      nextOpen = new Date(now);
      nextOpen.setDate(now.getDate() + 1);
      const [h, m] = nOpen.split(":").map(Number);
      nextOpen.setHours(h, m, 0, 0);
    }
    const diffMs = nextOpen.getTime() - now.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffM = Math.floor((diffMs % 3600000) / 60000);
    untilMsg = diffH > 0 ? `${diffH}h${pad(diffM)}` : `${diffM}min`;
    statusMsg = lang === "fr" ? `Fermé` : lang === "en" ? "Closed" : "مغلق";
  }

  const todayInterval = `${openHour}–${closeHour === "00:00" ? "00:00" : closeHour}`;
  const address = "13 Rue Pasteur, Alger";
  const phone1 = "+213 697 57 41 00";
  const phone2 = "+213 66 06 23 41";
  const mapsUrl = "https://maps.google.com/?q=13+Rue+Pasteur+Alger";

  return (
    <div className="min-h-screen relative text-white">
      {/* Wallpaper */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${WALLPAPER})` }} />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Metro Pizza Logo" className="w-12 h-12 rounded-2xl object-cover shadow border-2 border-orange-600 bg-white" />
            <span className="font-extrabold tracking-tight text-lg sm:text-xl">{t.brand}</span>
          </div>
          <button className="md:hidden px-3 py-2 rounded-xl border border-white/30" onClick={() => setOpenNav((v) => !v)}>☰</button>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-orange-400">{t.nav.about}</a>
            <a href="#menu" className="hover:text-orange-400">{t.nav.menu}</a>
            <a href="#ambiance" className="hover:text-orange-400">{t.nav.ambiance}</a>
            <a href="#testimonials" className="hover:text-orange-400">{t.nav.testimonials}</a>
            <a href="#visit" className="hover:text-orange-400">{t.nav.visit}</a>
            <a href="#contact" className="hover:text-orange-400">{t.nav.contact}</a>
          </nav>
          <div className="hidden md:block"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
        </div>
        {openNav && (
          <div className="md:hidden border-t border-white/20 bg-black/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
              <a onClick={()=>setOpenNav(false)} href="#about">{t.nav.about}</a>
              <a onClick={()=>setOpenNav(false)} href="#menu">{t.nav.menu}</a>
              <a onClick={()=>setOpenNav(false)} href="#ambiance">{t.nav.ambiance}</a>
              <a onClick={()=>setOpenNav(false)} href="#testimonials">{t.nav.testimonials}</a>
              <a onClick={()=>setOpenNav(false)} href="#visit">{t.nav.visit}</a>
              <a onClick={()=>setOpenNav(false)} href="#contact">{t.nav.contact}</a>
              <LanguageSwitcher lang={lang} setLang={setLang} />
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-20 lg:py-28 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-xl">
          {t.hero.title}
        </motion.h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl opacity-95 max-w-3xl mx-auto">{t.hero.subtitle}</p>
        <a href="#menu" className="mt-8 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full shadow-lg text-base sm:text-lg font-semibold">
          {t.hero.cta} <ChevronRight className="h-5 w-5" />
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm opacity-90">
          <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl"><Phone className="h-4 w-4" />{phone1}</span>
          <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl"><Phone className="h-4 w-4" />{phone2}</span>
        </div>
      </section>

      {/* About */}
      <Section id="about" title={t.about.title}>
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 bg-gradient-to-br from-white/90 to-orange-50 dark:from-zinc-900/80 dark:to-zinc-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-7 border border-orange-200 dark:border-orange-900/40 flex flex-col justify-center"
          >
            <p className="opacity-95 leading-relaxed text-zinc-800 dark:text-zinc-100 text-lg md:text-xl font-medium">
              {t.about.body}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: 'spring', bounce: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {t.about.badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, type: 'spring', bounce: 0.3 }}
                  viewport={{ once: true }}
                  className="min-w-[160px] md:min-w-0 bg-gradient-to-br from-orange-100 to-orange-300 dark:from-orange-900/80 dark:to-orange-700/60 text-orange-900 dark:text-orange-100 rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3 border border-orange-200 dark:border-orange-800/40"
                >
                  <span className="inline-block w-6 h-6 bg-orange-500/80 rounded-full mr-2 shadow-inner" />
                  <span className="font-bold text-base md:text-lg">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Menu */}
      <Section id="menu" title={t.menu.title}>
        <div className="space-y-10">
          <MenuCategory title={t.menu.categories.incontournables} items={MENU.pizzas.incontournables} t={t} />
          <MenuCategory title={t.menu.categories.suprems} items={MENU.pizzas.suprems} t={t} />
          <MenuCategory title={t.menu.categories.extras} items={MENU.pizzas.extras} t={t} />
          <MenuCategory title={t.menu.categories.signatures} items={MENU.pizzas.signatures} t={t} />

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.supplements}</h3>
              <ul className="divide-y divide-black/5">
                {MENU.pizzas.supplements.map((s, idx) => (
                  <li key={idx} className="py-2 flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="tabular-nums"><Price value={s.simple} t={t} /><span className="mx-2">/</span><Price value={s.mega} t={t} /></span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.salads}</h3>
              <SimpleList items={MENU.salads} t={t} />
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card><h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.tortillas}</h3><SimpleList items={MENU.tortillas} t={t} /></Card>
            <Card><h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.souffle}</h3><SimpleList items={MENU.souffle} t={t} /></Card>
            <Card><h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.drinks}</h3><SimpleList items={MENU.drinks} t={t} /></Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card><h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.desserts}</h3><SimpleList items={MENU.desserts} t={t} /></Card>
            <Card><h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">{t.menu.crepes}</h3><SimpleList items={MENU.crepes} t={t} /></Card>
          </div>
        </div>
      </Section>

      {/* Ambiance */}
      <Section id="ambiance" title={t.ambiance.title}>
        <p className="mb-6 opacity-90">{t.ambiance.caption}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=800"
          ].map((src: string, i: number) => (
            <Card key={i}><div className="aspect-[4/3] overflow-hidden rounded-xl"><img src={src} alt="Ambiance" className="w-full h-full object-cover" /></div></Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" title={t.testimonials.title}>
        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, idx) => (
            <Card key={idx}><p className="italic mb-3 text-zinc-700 dark:text-zinc-200">“{item.text}”</p><p className="font-semibold">— {item.name}</p></Card>
          ))}
        </div>
      </Section>

      {/* Where to find us */}
      <Section id="visit" title={t.visit.title}>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <Card>
            <div className="flex flex-col gap-4 text-zinc-900 dark:text-white">
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /><span className="font-medium">{t.visit.addressLabel}:</span> {address}</div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{t.visit.hours}:</span>
                <span className={isOpen ? "text-green-600 font-bold" : "text-red-500 font-bold"}>{statusMsg}</span>
                <span className="mx-1">{todayInterval}</span>
                <span className="opacity-80 text-xs">{isOpen
                  ? (lang === "fr" ? `· ferme dans ${untilMsg}` : lang === "en" ? `· closes in ${untilMsg}` : `· يغلق بعد ${untilMsg}`)
                  : (lang === "fr" ? `· ouvre dans ${untilMsg}` : lang === "en" ? `· opens in ${untilMsg}` : `· يفتح بعد ${untilMsg}`)
                }</span>
              </div>
              <div className="flex items-center gap-3"><Phone className="h-5 w-5" />{phone1}</div>
              <div className="flex items-center gap-3"><Phone className="h-5 w-5" />{phone2}</div>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-zinc-800"><Globe className="h-4 w-4" /> {t.visit.mapCta}</a>
            </div>
          </Card>
          <Card>
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <iframe title="map" className="w-full h-full" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} />
            </div>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title={t.contact.title}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Social Media Section */}
          <Card>
            <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
              <span>Réseaux sociaux</span>
            </h3>
            <div className="flex flex-col gap-4">
              <a href="https://www.tiktok.com/@metropizza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/80 hover:bg-black/90 text-white font-semibold text-lg transition">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.25 2c.41 0 .75.34.75.75v13.5a3.75 3.75 0 1 1-3.75-3.75c.41 0 .75.34.75.75s-.34.75-.75.75a2.25 2.25 0 1 0 2.25 2.25V2.75c0-.41.34-.75.75-.75z"/><path d="M17.5 2c.41 0 .75.34.75.75v.5a3.25 3.25 0 0 0 3.25 3.25h.5a.75.75 0 0 1 0 1.5h-.5A4.75 4.75 0 0 1 17 3.25v-.5c0-.41.34-.75.75-.75z"/></svg>
                TikTok
              </a>
              <a href="https://www.instagram.com/metropizza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-semibold text-lg transition">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 2.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"/></svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/metropizza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.525 2.273A4.75 4.75 0 0 1 22.25 7.025v9.95a4.75 4.75 0 0 1-4.75 4.75h-3.2v-6.5h2.2a.75.75 0 0 0 0-1.5h-2.2v-1.5c0-.414.336-.75.75-.75h1.45a.75.75 0 0 0 0-1.5h-1.45a2.25 2.25 0 0 0-2.25 2.25v1.5h-1.2a.75.75 0 0 0 0 1.5h1.2v6.5h-3.2a4.75 4.75 0 0 1-4.75-4.75v-9.95a4.75 4.75 0 0 1 4.75-4.75h9.05z"/></svg>
                Facebook
              </a>
            </div>
          </Card>
          {/* Phone Section */}
          <Card>
            <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
              <span>Appelez-nous</span>
            </h3>
            <div className="flex flex-col gap-4">
              <a href="tel:+213697574100" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg transition">
                <Phone className="h-5 w-5" /> +213 697 57 41 00
              </a>
              <a href="tel:+21366062341" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg transition">
                <Phone className="h-5 w-5" /> +213 66 06 23 41
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3 opacity-80">
          <div>© {new Date().getFullYear()} Metro Pizza — Algiers</div>
          <div className="flex items-center gap-4">
            <a href="#about">{t.nav.about}</a>
            <a href="#menu">{t.nav.menu}</a>
            <a href="#visit">{t.nav.visit}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Menu widgets
// ──────────────────────────────────────────────────────────────────────────────
const MenuCategory: React.FC<{ title: string; items: PizzaItem[]; t: Dictionary }> = ({ title, items, t }) => (
  <Card>
    <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-white">{title}</h3>
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((it, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">{it.name}</span>
            <span className="tabular-nums text-sm"><Price value={it.simple} t={t} /><span className="mx-2">/</span><Price value={it.mega} t={t} /></span>
          </div>
          {it.desc && <p className="text-sm opacity-70">{it.desc}</p>}
        </div>
      ))}
    </div>
  </Card>
);

const SimpleList: React.FC<{ items: SimplePriced[]; t: Dictionary }> = ({ items, t }) => (
  <ul className="divide-y divide-black/5">
    {items.map((x, i) => (
      <li key={i} className="py-2 flex items-center justify-between text-sm"><span>{x.name}</span><Price value={x.price} t={t} /></li>
    ))}
  </ul>
);
