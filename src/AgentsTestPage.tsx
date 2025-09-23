import React from "react";
import { AgentsSection } from "./components/AgentsSection";
import { i18n } from "./data/i18n";
import { BRAND } from "./utils/brand";

const lang = "fr";
const t = i18n[lang];

const AgentsTestPage: React.FC = () => (
  <div style={{ background: BRAND.light, minHeight: "100vh", padding: 32 }}>
    <AgentsSection lang={lang} t={t} />
  </div>
);

export default AgentsTestPage;
