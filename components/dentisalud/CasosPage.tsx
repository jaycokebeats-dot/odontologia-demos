'use client';

import React, { useState } from 'react';
import { MessageCircle, Star, Sparkles } from 'lucide-react';
import { DENTISALUD_INFO, PATIENT_REVIEWS } from '@/data/dentisalud-data';
import { BEFORE_AFTER_CASES } from '@/data/dentisalud-photos';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { BeforeAfterCard } from './BeforeAfterCard';
import { ReviewsCarousel } from './ReviewsCarousel';

interface CasosPageProps {
  basePath?: string;
}

export function DentiSaludCasosPage({ basePath = '' }: CasosPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: `Todos los casos (${BEFORE_AFTER_CASES.length})` },
    { id: 'estetica', label: 'Diseño de sonrisa' },
    { id: 'carillas', label: 'Carillas' },
    { id: 'blanqueamiento', label: 'Blanqueamiento' },
    { id: 'protesis', label: 'Prótesis & Coronas' },
    { id: 'caries', label: 'Arreglo de Caries' },
  ];

  const filteredCases =
    activeCategory === 'todos'
      ? BEFORE_AFTER_CASES
      : BEFORE_AFTER_CASES.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION (Mint Ice Background) */}
        <section className="py-16 md:py-24 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
              CASOS REALES Y TESTIMONIOS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] tracking-tight">
              Resultados reales de nuestros pacientes
            </h1>
            <p className="text-base sm:text-lg text-slate-700 font-normal max-w-2xl leading-relaxed">
              Desliza sobre las fotos para comparar el estado inicial (Antes) con el resultado final (Después) logrado por la Dra. Nathaly Martínez y su equipo.
            </p>
          </div>
        </section>

        {/* FILTERABLE CASES GRID */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                    activeCategory === cat.id
                      ? 'bg-[#0A2540] text-white shadow-md'
                      : 'bg-[#EAF6F6] text-slate-700 hover:bg-[#D5E8E8] border border-[#D5E8E8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Cases Interactive Grid (Centered Flex Grid) */}
            <div className="flex flex-wrap justify-center gap-8">
              {filteredCases.map((c) => (
                <div key={c.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col">
                  <BeforeAfterCard caseData={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (Mint Ice Background) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Lo que cuentan nuestros pacientes
              </h2>
              <p className="text-slate-700 text-sm">
                ⭐ 5,0 en Google · 77 reseñas verificadas en Google Maps.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10">
              <ReviewsCarousel />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PATIENT_REVIEWS.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="font-bold text-xs text-[#0A2540]">{rev.name}</div>
                    <div className="text-[11px] text-slate-500">{rev.treatment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
              Tu sonrisa puede ser la próxima
            </h2>
            <p className="text-slate-700 text-sm sm:text-base">
              Escribinos por WhatsApp y coordinamos tu consulta integral.
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#0A2540]" />
                <span>Reservar por WhatsApp</span>
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
