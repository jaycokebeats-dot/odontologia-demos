'use client';

import React from 'react';
import { MessageCircle, CheckCircle2, Award, GraduationCap, Heart, ShieldCheck } from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';
import { DENTISALUD_PHOTOS } from '@/data/dentisalud-photos';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { PlaceholderFrame } from './PlaceholderFrame';

interface NosotrosPageProps {
  basePath?: string;
}

export function DentiSaludNosotrosPage({ basePath = '/d/dra-nathaly-martinez' }: NosotrosPageProps) {
  const specialtiesBadges = [
    'Implantología',
    'Cirugía Maxilofacial',
    'Ortodoncia',
    'Endodoncia',
    'ATM & Bruxismo',
    'Estética Dental',
    'Odontopediatría',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  NOSOTROS · DENTISALUD GROUP
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] leading-[1.1] tracking-tight">
                  Cuidamos tu salud dental con tiempo y dedicación
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  En DentiSalud Group, la Dra. Nathaly Martínez y su equipo brindan odontología integral en el corazón de Belgrano. Combinamos tecnología de última generación, diagnósticos certeros, materiales de alta calidad y atención personalizada para que cada visita sea cómoda y confiable. ¡Tu salud bucal en manos expertas!
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3 py-1.5 rounded-full border border-[#D5E8E8]">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>Habilitación MinSalud & GCBA</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3 py-1.5 rounded-full border border-[#D5E8E8]">
                    <Award className="w-4 h-4 text-teal-700" />
                    <span>+10 años de experiencia</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF6F6] text-[#0A2540] px-3 py-1.5 rounded-full border border-[#D5E8E8]">
                    <Heart className="w-4 h-4 text-teal-700" />
                    <span>+5.000 sonrisas transformadas</span>
                  </div>
                </div>
              </div>

              {/* Right Real Doctor Photo */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#D5E8E8] bg-slate-100 group">
                  <img
                    src={DENTISALUD_PHOTOS.doctoraChair}
                    alt="Dra. Nathaly Martínez en su consultorio DentiSalud"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="text-lg font-serif font-bold drop-shadow-md">
                      Dra. Nathaly Martínez
                    </div>
                    <div className="text-xs text-teal-200 font-medium drop-shadow-md">
                      Directora Médica de DentiSalud Group
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NUESTRA FORMA DE TRABAJAR (Mint Ice Background) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Nuestra forma de trabajar
              </h2>
              <p className="text-slate-600 text-sm">
                Así entendemos la odontología moderna e integral.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3">
                <h3 className="text-lg font-bold text-[#0A2540]">Tecnología de última generación</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Trabajamos con equipamiento actual y cámara intraoral para diagnósticos más precisos y tratamientos predecibles.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3">
                <h3 className="text-lg font-bold text-[#0A2540]">Materiales de alta calidad</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Elegimos insumos importados de primera línea pensados para que el resultado sea duradero y estético.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3">
                <h3 className="text-lg font-bold text-[#0A2540]">Atención personalizada</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No sos un turno más: te escuchamos atentamente y adaptamos el plan de tratamiento a tus tiempos y expectativas.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3">
                <h3 className="text-lg font-bold text-[#0A2540]">Espacio confortable</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cuidamos cada detalle de nuestro consultorio en Belgrano para que tu visita sea tranquila y sin dolores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DIRECCIÓN CLÍNICA — DRA. NATHALY MARTÍNEZ */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Doctor Photo */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                  <img
                    src={DENTISALUD_PHOTOS.doctoraDesk}
                    alt="Dra. Nathaly Martínez en escritorio de consultorio"
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold drop-shadow-md">
                    Dra. Nathaly Martínez · Atención personalizada
                  </div>
                </div>
              </div>

              {/* Bio & Quote */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  DIRECCIÓN CLÍNICA
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                  Dra. Nathaly Martínez
                </h2>
                <p className="text-sm font-semibold text-teal-700">
                  Odontóloga especialista en implantología, rehabilitación oral y estética dental, con más de 10 años de experiencia.
                </p>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <GraduationCap className="w-5 h-5 text-[#0A2540] shrink-0 mt-0.5" />
                  <p>
                    Egresada de la Universidad Nacional de La Plata (UNLP), en Argentina, con estudios de posgrado en la Universidad Católica Argentina (UCA) y formaciones continuas de especialización en Brasil, Colombia y Venezuela.
                  </p>
                </div>

                <blockquote className="p-6 rounded-3xl bg-[#0A2540] text-white space-y-3 shadow-md">
                  <p className="text-sm sm:text-base font-serif italic leading-relaxed text-slate-200">
                    "Para mí, cada consulta empieza escuchando qué necesitás, no solo mirando tu boca. Elegí la odontología porque me permite devolverle a alguien la confianza de sonreír, y esa parte del trabajo la sigo disfrutando igual que el primer día."
                  </p>
                  <cite className="block text-xs font-bold text-teal-300 not-italic">
                    — Dra. Nathaly Martínez
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EL EQUIPO DE ESPECIALIDADES */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                Un equipo con distintas especialidades
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Trabajamos junto a profesionales de distintas áreas de la odontología, coordinados para que tu tratamiento avance sin que tengas que ir de un lugar a otro.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {specialtiesBadges.map((spec) => (
                <span
                  key={spec}
                  className="px-5 py-2.5 rounded-full bg-[#EAF6F6] text-[#0A2540] font-bold text-xs border border-[#D5E8E8] shadow-2xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: EL ESPACIO */}
        <section className="py-20 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Conocé nuestro consultorio
              </h2>
              <p className="text-slate-600 text-sm">
                Un espacio diseñado para tu comodidad y tranquilidad.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group">
                <img
                  src={DENTISALUD_PHOTOS.recepcion}
                  alt="Recepción DentiSalud Group"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                  Recepción de DentiSalud Group
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group">
                <img
                  src={DENTISALUD_PHOTOS.consultorio}
                  alt="Consultorio principal DentiSalud"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                  Consultorio Odontológico Principal
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group">
                <img
                  src={DENTISALUD_PHOTOS.scanner3d}
                  alt="Tecnología 3D DentiSalud"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                  Scanner Shining 3D Digital
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
              Conocenos en tu primera consulta
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
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
