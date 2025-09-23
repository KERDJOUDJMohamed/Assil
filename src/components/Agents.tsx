
import type { AgentProfile, LangCode, BrandPalette, I18nEntry } from "../types";

type AgentsProps = {
  agents: AgentProfile[];
  lang: LangCode;
  BRAND: BrandPalette;
  t: I18nEntry;
};

const Agents: React.FC<AgentsProps> = ({ agents, lang, BRAND, t }) => (
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
);

export default Agents;
