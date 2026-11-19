'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Microscope,
} from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';
import { useSiteData } from './useSiteData';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';

interface TratamientosPageProps {
  basePath?: string;
}

const TRATAMIENTOS_FAQS = [
  {
    question: '¿Cómo se define el plan de tratamiento adecuado para mi caso?',
    answer:
      'Comenzamos siempre con una consulta integral y diagnóstica. Mediante examen clínico y cámara intraoral en tiempo real, evaluamos cada pieza, encías y mordida. A partir de allí, te explicamos con claridad las alternativas disponibles, los tiempos y te entregamos un presupuesto formal detallado por etapas, para que avances con total tranquilidad y sin imprevistos.',
  },
  {
    question: '¿Es posible coordinar varios tratamientos en una misma etapa?',
    answer:
      'Sí, absolutamente. Como contamos con un equipo interdisciplinario coordinado en la misma clínica (implantología, estética, prótesis, ortodoncia, endodoncia y odontopediatría), planificamos un cronograma eficiente para resolver distintas necesidades optimizando tus tiempos y sesiones.',
  },
  {
    question: '¿Qué tecnologías utilizan para garantizar la precisión y comodidad?',
    answer:
      'Disponemos de escáner intraoral 3D Shining para impresiones digitales sin pastas molestas, radiología digital de baja radiación, ultrasonido para higienes indoloras, instrumental rotatorio silencioso y protocolos rigurosos de anestesia local para que tu experiencia en el consultorio sea placentera y sin dolor.',
  },
  {
    question: '¿Qué medios de pago y facilidades tienen disponibles?',
    answer:
      'Aceptamos efectivo, transferencias bancarias, tarjetas de débito y crédito. Para tratamientos integrales, diseñamos planes de pago por etapas acordes al avance clínico de tu tratamiento.',
  },
  {
    question: '¿Atienden urgencias odontológicas o turnos en el día?',
    answer:
      'Sí, contamos con atención para urgencias odontológicas (dolor agudo, fracturas dentales, pérdidas de coronas o inflamación). Podés escribirnos directamente por WhatsApp de lunes a sábados de 9 a 19:30 hs para coordinar tu atención prioritaria.',
  },
];

export function DentiSaludTratamientosPage({ basePath = '' }: TratamientosPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { treatments } = useSiteData();
  const prevencion = treatments.filter((t) => t.category === 'prevencion');
  const rehabilitacion = treatments.filter((t) => t.category === 'rehabilitacion');
  const estetica = treatments.filter((t) => t.category === 'estetica');
  const especialidades = treatments.filter((t) => t.category === 'especialidades');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://dentisaludgroup.com.ar/tratamientos/#webpage',
        url: 'https://dentisaludgroup.com.ar/tratamientos',
        name: 'Tratamientos Odontológicos en Belgrano | DentiSalud Group',
        description:
          'Catálogo completo de tratamientos odontológicos en Belgrano, CABA: prevención, implantes dentales, diseño de sonrisa, ortodoncia, prótesis, endodoncia y más.',
        isPartOf: {
          '@id': 'https://dentisaludgroup.com.ar/#organization',
        },
        about: treatments.map((t) => ({
          '@type': 'MedicalProcedure',
          name: t.title,
          url: `https://dentisaludgroup.com.ar/tratamientos/${t.slug}`,
          description: t.shortDescription,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: TRATAMIENTOS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>DentiSalud Group · Belgrano, CABA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] tracking-tight leading-[1.15] max-w-4xl">
              Tratamientos odontológicos de alta precisión en Belgrano
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-normal max-w-3xl leading-relaxed">
              En DentiSalud Group concebimos cada tratamiento como parte de una visión integral de tu salud bucal. Desde la prevención y el cuidado diario hasta las rehabilitaciones con implantes y el diseño estético de vanguardia, combinamos especialistas universitarios de primer nivel, tecnología digital y atención personalizada en cada consulta.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Especialistas por área</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Escáner 3D y tecnología digital</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Planes claros por etapas</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Atención sin apuros ni dolor</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: SALUD Y PREVENCIÓN */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">ÁREA CLÍNICA 01</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Salud y prevención
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                El pilar fundamental de una boca sana y duradera. Diagnósticos tempranos con cámara intraoral, limpiezas profundas con ultrasonido y eliminación precisa de caries preservando la mayor estructura dental sana.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prevencion.map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-teal-600 transition">
                      {t.numberStr}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0A2540]">
                    <span>Ver detalle del tratamiento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: REHABILITACIÓN ORAL */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">ÁREA CLÍNICA 02</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Rehabilitación oral
              </h2>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                Recuperá la fuerza y comodidad para masticar sin molestias, cuidando la estética y la estructura facial. Tratamientos con implantes dentales de titanio y zirconio, y prótesis fijas o removibles personalizadas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
              {rehabilitacion.map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-8 border border-[#E1ECEC] hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-teal-600 transition">
                      {t.numberStr}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0A2540]">
                    <span>Ver detalle del tratamiento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ESTÉTICA DENTAL */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">ÁREA CLÍNICA 03</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Estética dental
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Sonrisas armónicas, luminosas y naturales pensadas en función de tus facciones. Planificación digital para carillas, aclaramiento seguro sin sensibilidad y ortodoncia con alineadores invisibles o brackets estéticos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {estetica.map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-teal-600 transition">
                      {t.numberStr}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0A2540]">
                    <span>Ver detalle del tratamiento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: OTRAS ESPECIALIDADES */}
        <section className="py-20 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">ÁREA CLÍNICA 04</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Otras especialidades
              </h2>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                Atención odontológica avanzada para complejidades anatómicas, alivio del dolor agudo, cuidado de la articulación temporomandibular y prevención temprana para los más chicos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {especialidades.map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-8 border border-[#E1ECEC] hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-teal-600 transition">
                      {t.numberStr}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0A2540]">
                    <span>Ver detalle del tratamiento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: METODOLOGÍA CLÍNICA DENTISALUD GROUP */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                CALIDAD Y CONFIANZA
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Cómo trabajamos cada tratamiento
              </h2>
              <p className="text-base text-slate-700 font-normal leading-relaxed">
                Nuestra filosofía se basa en un enfoque conservador y predecible: cuidar tus piezas naturales y brindarte soluciones pensadas para durar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540]">Diagnóstico con cámara intraoral</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Podés ver en la pantalla junto al profesional el estado exacto de tu boca antes de tomar cualquier decisión.
                </p>
              </div>

              <div className="bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540]">Tecnología y escaneo digital</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Impresiones ópticas 3D, radiología digital y materiales importados de primera línea para máxima precisión.
                </p>
              </div>

              <div className="bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540]">Confort y manejo del dolor</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Técnicas anestésicas eficaces y atención a tu propio ritmo para que tu visita sea relajada y agradable.
                </p>
              </div>

              <div className="bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540]">Planes claros y transparentes</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Te explicamos los pasos, tiempos y costos con presupuestos formales cerrados sin gastos ocultos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: PREGUNTAS FRECUENTES SOBRE TRATAMIENTOS */}
        <section className="py-20 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                RESOLVEMOS TUS DUDAS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
                Preguntas frecuentes sobre los tratamientos
              </h2>
              <p className="text-sm text-slate-700 font-normal">
                Respuestas claras para que planifiques tu visita odontológica con total tranquilidad.
              </p>
            </div>

            <div className="space-y-4">
              {TRATAMIENTOS_FAQS.map((faq, idx) => (
                <div key={idx} className="border border-[#D5E8E8] rounded-2xl bg-white overflow-hidden shadow-2xs">
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
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: CTA FINAL */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#0A2540] to-[#0D3054] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                  CONSULTA INTEGRAL EN BELGRANO
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
                  La transformación de tu sonrisa inicia aquí
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  Agendá tu consulta con la Dra. Nathaly Martínez y su equipo para evaluar tu caso con cámara intraoral y definir el tratamiento ideal para vos.
                </p>
              </div>

              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2.5 bg-teal-400 hover:bg-teal-300 text-[#0A2540] font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-[#0A2540] text-teal-400" />
                <span>Agendar mi turno</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Schema.org MedicalWebPage + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DentiSaludFooter basePath={basePath} />
      <DentiSaludFloatingWhatsApp />
    </div>
  );
}
