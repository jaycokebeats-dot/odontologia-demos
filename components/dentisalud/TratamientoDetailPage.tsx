'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { TreatmentDetail, DENTISALUD_INFO } from '@/data/dentisalud-data';
import { TREATMENT_FEATURED_PHOTOS } from '@/data/dentisalud-photos';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { PlaceholderFrame } from './PlaceholderFrame';

interface TratamientoDetailPageProps {
  treatment: TreatmentDetail;
  basePath?: string;
}

export function DentiSaludTratamientoDetailPage({ treatment, basePath = '/d/dra-nathaly-martinez' }: TratamientoDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const featuredPhoto = TREATMENT_FEATURED_PHOTOS[treatment.slug] || '/images/dentisalud/21_consultorio_principal.jpg';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* BREADCRUMB & HERO */}
        <section className="pt-10 pb-16 md:pt-16 md:pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href={`${basePath}/tratamientos`} className="hover:text-[#0A2540] transition flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tratamientos</span>
              </Link>
              <span>/</span>
              <span className="text-[#0A2540]">{treatment.title}</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full inline-block">
                  {treatment.heroBadge}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] leading-[1.15] tracking-tight">
                  {treatment.heroH1}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  {treatment.heroBajada}
                </p>

                {treatment.priceNote && (
                  <div className="p-4 rounded-2xl bg-[#EAF6F6] border border-[#D5E8E8] text-sm font-bold text-[#0A2540] max-w-md">
                    💡 {treatment.priceNote}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={treatment.ctaLink || DENTISALUD_INFO.whatsappGeneral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#0A2540]" />
                    <span>{treatment.ctaText}</span>
                  </a>
                </div>

                {/* Trust Points */}
                {treatment.trustPoints && (
                  <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                    {treatment.trustPoints.map((tp, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{tp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Real Treatment Photo */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                  <img
                    src={featuredPhoto}
                    alt={`Tratamiento de ${treatment.title}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold drop-shadow-md">
                    {treatment.title} · Procedimiento en DentiSalud Group
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR / ITEMS */}
        {treatment.whoIsItForItems && (
          <section className="py-16 bg-[#EAF6F6] border-y border-[#D5E8E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                {treatment.whoIsItForTitle || '¿Para quién está recomendado?'}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {treatment.whoIsItForItems.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3">
                    <h3 className="text-lg font-serif font-bold text-[#0A2540]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURES / POR QUÉ ELEGIRNOS */}
        {treatment.features && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                {treatment.featuresTitle || '¿Por qué elegirnos?'}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {treatment.features.map((f, idx) => (
                  <div key={idx} className="bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-2">
                    <h3 className="text-lg font-bold text-[#0A2540]">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROCESS STEPS */}
        {treatment.processSteps && (
          <section className="py-16 bg-[#EAF6F6] border-b border-[#D5E8E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                {treatment.processTitle || 'Cómo es el proceso paso a paso'}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {treatment.processSteps.map((s) => (
                  <div key={s.step} className="bg-white rounded-2xl p-6 border border-[#E1ECEC] shadow-2xs space-y-3">
                    <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-serif font-bold text-sm">
                      {s.step}
                    </div>
                    <h3 className="text-sm font-bold text-[#0A2540]">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DARK NAVY BANNER */}
        <section className="py-14 bg-[#0A2540] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold">
                  Tu comodidad, en cada etapa
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Sin apuros en ninguna consulta. Aplicamos técnicas avanzadas para que no sientas dolor y tengas una experiencia placentera.
                </p>
              </div>
              <a
                href={treatment.ctaLink || DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white hover:bg-slate-100 text-[#0A2540] font-extrabold text-sm px-7 py-4 rounded-full shadow-lg transition"
              >
                Reservar consulta por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* CASE BEFORE-AFTER PLACEHOLDERS */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                Caso clínico real
              </h2>
              <Link href={`${basePath}/casos-y-testimonios`} className="text-xs font-bold text-[#0A2540] hover:underline">
                Ver más casos →
              </Link>
            </div>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              <PlaceholderFrame label="Antes" sublabel={`Caso inicial de ${treatment.title}`} type="case" aspectRatio="aspect-[4/3]" />
              <PlaceholderFrame label="Después" sublabel={`Resultado final logrado`} type="case" aspectRatio="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* FAQS ACCORDION */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <section className="py-16 bg-[#EAF6F6] border-b border-[#D5E8E8]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540] text-center">
                Preguntas frecuentes sobre {treatment.title}
              </h2>

              <div className="space-y-4">
                {treatment.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-[#D5E8E8] rounded-2xl bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#0A2540] text-sm sm:text-base hover:bg-slate-50 transition"
                    >
                      <span>{faq.question}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-teal-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
              Reservá tu consulta con la Dra. Nathaly Martínez
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Escribinos por WhatsApp y coordinamos tu primera visita en el horario que más te convenga.
            </p>
            <div>
              <a
                href={treatment.ctaLink || DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#0A2540]" />
                <span>{treatment.ctaText}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <DentiSaludFooter basePath={basePath} />
      <DentiSaludFloatingWhatsApp />
    </div>
  );
}
