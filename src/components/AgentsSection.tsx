
import React from "react";
import Zoom from "react-medium-image-zoom";
import { agents } from "../data/agents";
import { BRAND } from "../utils/brand";
import type { LangCode, I18nEntry } from "../types";

interface AgentsSectionProps {
  lang: LangCode;
  t: I18nEntry;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ lang, t }) => (
  <section id="agents" className="max-w-6xl mx-auto px-4 py-16" style={{ background: '#f7f7fb' }}>
    <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: BRAND.violet }}>{t.agentsTitle}</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map((a) => (
        <div
          key={a.id}
          className="rounded-2xl border bg-white flex flex-col items-center shadow-md"
          style={{ borderColor: `${BRAND.violet}33`, minHeight: 340, height: '100%', boxSizing: 'border-box', padding: 0 }}
        >
          <div className="flex items-center justify-center w-full flex-grow" style={{ minHeight: 140 }}>
            <div style={{ position: 'relative', width: 110, height: 110, background: '#fff', borderRadius: '50%', border: `4px solid ${BRAND.violet}`, overflow: 'hidden', boxShadow: '0 2px 12px #0002' }}>
              <Zoom>
                <img
                  src={a.img}
                  alt={a.name[lang]}
                  className="object-cover cursor-zoom-in"
                  style={{ position: 'absolute', top: 0, left: 0, width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                />
              </Zoom>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full px-4 pb-4" style={{ flex: 1 }}>
            <div className="font-bold text-lg text-center mb-1" style={{ color: BRAND.violet }}>{a.name[lang]}</div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full mb-2" style={{ background: `${BRAND.softViolet}55`, color: BRAND.magenta }}>
              {t.agentRoleLabel}: {a.role[lang]}
            </div>
            <p className="text-center text-base" style={{ color: BRAND.dark, opacity: 0.92, lineHeight: 1.6 }}>{a.bio[lang]}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
