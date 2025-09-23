
export type BrandPalette = {
  violet: string;
  magenta: string;
  dark: string;
  light: string;
  softViolet: string;
  softMagenta: string;
};
// Shared TypeScript types
export type LangCode = "ar" | "fr" | "en";
export type Localized<T = string> = Record<LangCode, T>;

export interface Socials {
  instagram: string;
  tiktok: string;
  facebook: string;
  mapsShare: string;
  whatsapp: string;
  phone1: string;
  phone2: string;
}

export interface I18nEntry {
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
  partnersTitle: string;
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

export interface Product {
  id: number;
  name: Localized;
  priceDzd: number;
  unit: Localized;
  img: string;
}

export interface AgentProfile {
  id: number;
  name: Localized;
  role: Localized;
  bio: Localized;
  img: string;
}
