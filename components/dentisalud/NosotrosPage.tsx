'use client';

import React from 'react';
import { MessageCircle, ShieldCheck, Users, Heart } from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';
import { DENTISALUD_PHOTOS } from '@/data/dentisalud-photos';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { ClinicSpacesCarousel } from './ClinicSpacesCarousel';
import { TeamCarousel } from './TeamCarousel';

interface NosotrosPageProps {
  basePath?: string;
}

export function DentiSaludNosotrosPage({ basePath = '' }: NosotrosPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  NOSOTROS · DENTISALUD GROUP
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] leading-[1.1] tracking-tight">
                  Cuidamos tu sonrisa con empatía y profesionalismo
                </h1>

                <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-xl">
                  En DentiSalud Group, la Dra. Nathaly Martínez y su equipo brindan odontología integral en el corazón de Belgrano. Combinamos tecnología de última generación, diagnósticos certeros, materiales de alta durabilidad y atención personalizada, para que cada visita sea cómoda y confiable. ¡Tu salud bucal en manos expertas!
                </p>

                <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-700 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3.5 py-2 rounded-full border border-[#D5E8E8]">
                    <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Clínica habilitada por el Ministerio de Salud y el GCBA</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3.5 py-2 rounded-full border border-[#D5E8E8]">
                    <Users className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Equipo interdisciplinario</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3.5 py-2 rounded-full border border-[#D5E8E8]">
                    <Heart className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>+5.000 sonrisas transformadas</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Clinic Space / Team Photo */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#D5E8E8] bg-slate-100 group">
                  <img
                    src={DENTISALUD_PHOTOS.recepcionista}
                    alt="Atención y turnos en DentiSalud Group"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <img
                      src="/images/dentisalud/logo_dentisalud_white.png"
                      alt="DentiSalud Group"
                      className="h-7 w-auto object-contain drop-shadow-md"
                    />
                    <div className="text-xs text-teal-200 font-medium drop-shadow-md">
                      Atención personalizada en Belgrano
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NUESTRO EQUIPO (Team Carousel) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                PROFESIONALES DE LA SALUD BUCAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Nuestro equipo
              </h2>
              <p className="text-slate-700 text-sm">
                Un equipo interdisciplinario coordinado para que recibas la mejor atención en cada área.
              </p>
            </div>

            <TeamCarousel />
          </div>
        </section>

        {/* SECTION 3: CONOCÉ NUESTRO CONSULTORIO */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Conocé nuestro consultorio: un espacio pensado para vos.
              </h2>
              <p className="text-slate-700 text-sm">
                Recorré nuestras instalaciones equipadas con tecnología digital en Belgrano.
              </p>
            </div>

            <ClinicSpacesCarousel />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-[#EAF6F6] text-center border-t border-[#D5E8E8]">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
              Conocenos en tu primera consulta
            </h2>
            <p className="text-slate-700 text-sm sm:text-base">
              Escribinos por WhatsApp y coordinamos tu visita a DentiSalud Group. ¡Te esperamos!
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#0A2540]" />
                <span>Agendar mi turno</span>
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
