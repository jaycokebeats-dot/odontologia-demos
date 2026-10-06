'use client';

import React from 'react';
import { MessageCircle, AlertTriangle, PhoneCall, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';

interface UrgenciasPageProps {
  basePath?: string;
}

export function DentiSaludUrgenciasPage({ basePath = '/d/dra-nathaly-martinez' }: UrgenciasPageProps) {
  const emergencyTypes = [
    {
      title: 'Dolor intenso',
      desc: 'Dolor de muela pulsátil o agudo que no cede o que empeora con las horas.',
    },
    {
      title: 'Diente roto o fracturado',
      desc: 'Piezas fracturadas, astilladas o dientes que se movieron por un impacto.',
    },
    {
      title: 'Hinchazón o flemón',
      desc: 'Inflamación visible en encías, mejilla o cara, con o sin presencia de dolor.',
    },
    {
      title: 'Golpe o trauma dental',
      desc: 'Un golpe en la boca, avulsión (diente fuera del alvéolo) o traumatismo accidental.',
    },
  ];

  const steps = [
    {
      num: '1',
      title: 'Mantené la calma y escribinos',
      desc: 'Un mensaje por WhatsApp es la forma más rápida de coordinar tu atención inmediata.',
    },
    {
      num: '2',
      title: 'Contanos qué pasó',
      desc: 'Decinos qué sentís y desde cuándo, para orientarte y preparar el consultorio antes de que llegues.',
    },
    {
      num: '3',
      title: 'Seguí nuestras indicaciones',
      desc: 'Te damos recomendaciones de primeros auxilios (frío local, analgesia sugerida) mientras venís en camino.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-[#FFF8F6] border-b border-[#F7E2DB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C45535] bg-[#FCEBE6] border border-[#F7C6B8] px-3 py-1 rounded-full inline-block">
                  URGENCIAS ODONTOLÓGICAS · BELGRANO
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] leading-[1.1] tracking-tight">
                  ¿Dolor o una urgencia dental? Escribinos ahora.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  Coordinamos tu atención lo antes posible, con calma y con técnicas efectivas para aliviar el dolor de forma inmediata.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={DENTISALUD_INFO.whatsappUrgencias}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#C45535] hover:bg-[#B84A2A] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#C45535]" />
                    <span>Escribir por WhatsApp ahora</span>
                  </a>
                </div>
              </div>

              {/* Right Dark Navy Info Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#0A2540] text-white rounded-3xl p-8 shadow-2xl space-y-6 border border-[#133C63]">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-teal-300 uppercase tracking-widest block">
                      HORARIOS DE URGENCIAS
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      Lunes a Sábado de 9:00 a 19:30 hs
                    </p>
                    <p className="text-xs text-slate-400">
                      Atención médica de guardia fuera de horario mediante WhatsApp.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#133C63] space-y-1">
                    <span className="text-[11px] font-bold text-teal-300 uppercase tracking-widest block">
                      DÓNDE ESTAMOS
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {DENTISALUD_INFO.address}
                    </p>
                    <p className="text-xs text-slate-400">
                      En el corazón de Belgrano, CABA (Cerca de Subte D).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ¿QUÉ SE CONSIDERA UNA URGENCIA? */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                ¿Qué se considera una urgencia?
              </h2>
              <p className="text-slate-600 text-sm">
                Si experimentás alguno de estos síntomas, no esperes para consultar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyTypes.map((e, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF8F6] rounded-3xl p-7 border border-[#F7E2DB] shadow-2xs space-y-3"
                >
                  <AlertTriangle className="w-6 h-6 text-[#C45535]" />
                  <h3 className="text-lg font-bold text-[#0A2540]">{e.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: QUÉ HACER MIENTRAS LLEGÁS */}
        <section className="py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Qué hacer mientras llegás
              </h2>
              <p className="text-slate-600 text-sm">
                Pasos simples para manejar la situación antes de entrar al consultorio.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.num} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#C45535] text-white flex items-center justify-center font-serif font-bold text-base">
                    {s.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540]">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL BANNER (Mint Ice Background) */}
        <section className="py-20 bg-[#EAF6F6] text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
              No esperes a que el dolor empeore
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Escribinos y te ayudamos a coordinar tu atención médica de inmediato.
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappUrgencias}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#C45535] hover:bg-[#B84A2A] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#C45535]" />
                <span>Escribir por WhatsApp ahora</span>
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
