import type { AgentProfile } from "../types";

export const agents: AgentProfile[] = [
{
    id: 1,
    name: { ar: "مصعب", fr: "Mousaab", en: "Mousaab" },
    role: { ar: "مسير", fr: "Gérant", en: "Manager" },
    bio: {
      ar: "المدير الناجح هو الذي يحول الرؤية إلى واقع.",
      fr: "Un bon manager est celui qui transforme une vision en réalité.",
      en: "A great manager is the one who turns vision into reality.",
    },
    img: "agents/Mousaab.jpg",
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    name: { ar: "هشام", fr: "Hichem", en: "Hichem" },
    role: { ar: "مستشار مبيعات", fr: "Conseiller de vente", en: "Sales Advisor" },    
    bio: {
      ar: "جودة، أناقة، وثقة… هذا ما يقدمه لك أسيل سيراميكا.",
      fr: "Qualité, élégance et confiance… c’est ce qu’Assil Ceramica vous offre.",
      en: "Quality, elegance, and trust… that’s what Assil Ceramica brings you.",
    },
    img: "agents/Hichem.jpg",
  },

];
