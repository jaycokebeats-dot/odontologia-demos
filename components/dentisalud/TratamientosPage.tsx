'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { DENTISALUD_INFO, TREATMENTS } from '@/data/dentisalud-data';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';

interface TratamientosPageProps {
  basePath?: string;
}

export function DentiSaludTratamientosPage({ basePath = '/d/dra-nathaly-martinez' }: TratamientosPageProps) {
  // Main Salud y rehabilitación list matching client PDF
  const saludYRehabilitacionSlugs = [
    'consulta-integral',
    'limpieza-dental',
    'endodoncia',
    'implantes-dentales',
  ];

  const saludYRehabilitacionList = saludYRehabilitacionSlugs
    .map((slug) => TREATMENTS.find((t) => t.slug === slug))
    .filter(Boolean);

  // Estética list
  const estetica = TREATMENTS.filter((t) => t.category === 'estetica');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              TRATAMIENTOS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] tracking-tight">
              Odontología integral, a tu medida
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
              En DentiSalud Group encontrás soluciones odontológicas de alto nivel en un solo lugar. Desde una consulta preventiva hasta la rehabilitación de tu sonrisa.
            </p>
          </div>
        </section>

        {/* SECTION 1: ESTÉTICA & ARMONÍA DENTAL */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Estética & Armonía Dental
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-normal">
                Carillas, diseño de sonrisa y blanqueamiento profesional.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {estetica.map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0A2540]">
                    <span>Ver información</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: SALUD Y REHABILITACIÓN (Mint Ice Background - Matching PDF) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Salud y rehabilitación
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saludYRehabilitacionList.map((t) => (
                <Link
                  key={t!.slug}
                  href={`${basePath}/tratamientos/${t!.slug}`}
                  className="bg-white rounded-3xl p-8 border border-[#E1ECEC] hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t!.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {t!.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-[#0A2540]">
                    <span>Consultar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: URGENCIAS BANNER (Dark Navy - Matching PDF) */}
        <section className="py-16 bg-[#0A2540] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold">
                  ¿Tenés una urgencia odontológica?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
                  Escribinos y coordinamos tu atención lo antes posible.
                </p>
              </div>

              <a
                href={DENTISALUD_INFO.whatsappUrgencias}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white hover:bg-slate-100 text-[#0A2540] font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 4: CÓMO DEFINIMOS TU PRESUPUESTO (Matching PDF) */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                  ¿Cómo definimos tu presupuesto?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Cada caso es único. Por eso la cotización formal se entrega después de tu consulta integral, junto con un plan claro de tratamiento.
                </p>
              </div>

              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#0A2540]" />
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
