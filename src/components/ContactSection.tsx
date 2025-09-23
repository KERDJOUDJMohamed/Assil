import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { socials } from "../data/socials";
import { BRAND } from "../utils/brand";
import type { LangCode, I18nEntry } from "../types";

interface ContactSectionProps {
  lang: LangCode;
  t: I18nEntry;
  open: boolean;
  nextChange: string;
  footerRef?: React.RefObject<HTMLDivElement>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, t, open, nextChange }) => (
  <section id="findus" style={{ background: '#f7f7fb' }}>
    <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: BRAND.violet }}>{t.contactTitle || 'Contact Us'}</h2>
        <div className="rounded-2xl shadow-lg p-8 mb-8" style={{ background: '#fff', border: `1.5px solid ${BRAND.violet}22` }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-semibold" style={{ color: BRAND.magenta, fontSize: '1.125rem' }}>{t.hoursLabel}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: open ? BRAND.violet : "#E53935", color: BRAND.light, marginLeft: 8 }}>
              {open ? t.openNow : t.closedNow}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {Array.from({ length: 7 }).map((_, i) => {
              const daysMap: Record<number, { ar: string; fr: string; en: string }> = {
                0: { ar: "الأحد", fr: "Dimanche", en: "Sunday" },
                1: { ar: "الاثنين", fr: "Lundi", en: "Monday" },
                2: { ar: "الثلاثاء", fr: "Mardi", en: "Tuesday" },
                3: { ar: "الأربعاء", fr: "Mercredi", en: "Wednesday" },
                4: { ar: "الخميس", fr: "Jeudi", en: "Thursday" },
                5: { ar: "الجمعة", fr: "Vendredi", en: "Friday" },
                6: { ar: "السبت", fr: "Samedi", en: "Saturday" },
              };
              const today = new Date().getDay();
              const isToday = i === today;
              const dayLabel = daysMap[i][lang] || daysMap[i].fr;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2 rounded-lg"
                  style={{
                    fontWeight: isToday ? 700 : 500,
                    color: isToday ? BRAND.magenta : BRAND.dark,
                    background: isToday ? `${BRAND.magenta}10` : '#f7f7fb',
                    border: isToday ? `1.5px solid ${BRAND.magenta}` : `1.5px solid #eee`,
                    boxShadow: isToday ? '0 2px 8px #0001' : undefined,
                    fontSize: '1rem',
                    letterSpacing: 0.2,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  <span style={{ minWidth: 90 }}>{dayLabel}</span>
                  <span>08:00–21:00</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 items-center mt-8">
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="w-full max-w-xs px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-sm" style={{ background: BRAND.magenta, color: BRAND.light, justifyContent: 'center', fontSize: '1rem' }} aria-label="WhatsApp">
              <FaWhatsapp size={20} style={{ verticalAlign: 'middle' }} />
              WhatsApp
            </a>
            <a href={`tel:${socials.phone1}`} className="w-full max-w-xs px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-sm" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet, background: '#fff', justifyContent: 'center', fontSize: '1rem' }} aria-label="Phone 1">
              <FaPhoneAlt size={18} style={{ marginRight: 4 }} />
              {socials.phone1}
            </a>
            <a href={`tel:${socials.phone2}`} className="w-full max-w-xs px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-sm" style={{ border: `2px solid ${BRAND.violet}`, color: BRAND.violet, background: '#fff', justifyContent: 'center', fontSize: '1rem' }} aria-label="Phone 2">
              <FaPhoneAlt size={18} style={{ marginRight: 4, opacity: 0.7 }} />
              {socials.phone2}
            </a>
          </div>
        </div>
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
);
