'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Bus,
  Train,
  CheckCircle2,
} from 'lucide-react';
import { DENTISALUD_INFO, TREATMENTS, PATIENT_REVIEWS } from '@/data/dentisalud-data';
import { DENTISALUD_PHOTOS, BEFORE_AFTER_CASES } from '@/data/dentisalud-photos';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { BeforeAfterCard } from './BeforeAfterCard';
import { GoogleMapEmbed } from './GoogleMapEmbed';
import { PlaceholderFrame } from './PlaceholderFrame';
import { HeroCarousel } from './HeroCarousel';
import { ClinicSpacesCarousel } from './ClinicSpacesCarousel';
import { ReviewsCarousel } from './ReviewsCarousel';

interface HomePageProps {
  basePath?: string;
}

export function DentiSaludHomePage({ basePath = '' }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const firstVisitSteps = [
    {
      num: '1',
      title: 'Escribinos por WhatsApp',
      desc: 'Contanos qué necesitás y coordinamos tu turno de forma rápida y sencilla.',
    },
    {
      num: '2',
      title: 'Consulta integral',
      desc: 'Dedicamos el tiempo necesario a escucharte, examinar con cámara intraoral y evaluar tu caso.',
    },
    {
      num: '3',
      title: 'Tu plan y cotización',
      desc: 'Recibís un plan claro por etapas y una cotización formal y personalizada.',
    },
    {
      num: '4',
      title: 'Tratamiento acompañado',
      desc: 'Te acompañamos en cada etapa, asegurando la durabilidad de tus resultados sin dolor.',
    },
  ];

  const faqs = [
    {
      q: '¿Qué incluye la primera consulta?',
      a: 'Incluye valoración clínica completa, evaluación con cámara intraoral en pantalla en vivo, diagnóstico y un plan de tratamiento personalizado por escrito.',
    },
    {
      q: '¿Cuánto cuesta un tratamiento?',
      a: 'La consulta integral cuesta $40.000. Los tratamientos se cotizan de manera formal después de esa consulta, porque cada caso es único.',
    },
    {
      q: '¿Cómo puedo pagar?',
      a: 'Aceptamos efectivo, transferencia bancaria y tarjeta de crédito.',
    },
    {
      q: '¿Atienden urgencias fuera de horario?',
      a: 'Sí. Atendemos de lunes a sábado de 9 a 19:30 hs y contamos con atención de urgencias fuera de horario escribiéndonos por WhatsApp.',
    },
    {
      q: '¿Y si le tengo miedo al dentista?',
      a: 'Es más común de lo que parece. Te dedicamos el tiempo que haga falta sin apuros, te explicamos cada paso antes de actuar y usamos técnicas avanzadas para manejar el dolor.',
    },
    {
      q: '¿Trabajan con obras sociales o prepagas?',
      a: 'La atención es particular y te acompañamos en el proceso de reintegro con tu prepaga, conforme a las políticas de cada obra social.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-teal-100 selection:text-[#0A2540]">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* BLOQUE 1 — HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src="/images/dentisalud/logo_dentisalud.png"
                    alt="DentiSalud Group"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-0.5">
                    · Dentista en Belgrano, CABA
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0A2540] leading-[1.12] tracking-tight">
                  Tu sonrisa en manos expertas
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
                  Tu salud bucal en manos expertas. Atención personalizada, tecnología de última generación, materiales de alta calidad y durabilidad en DentiSalud Group, un espacio pensado para vos.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={DENTISALUD_INFO.whatsappGeneral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#0A2540]" />
                    <span>Reservar por WhatsApp</span>
                  </a>

                  <Link
                    href={`${basePath}/tratamientos`}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0A2540] border border-slate-300 font-bold text-sm px-7 py-4 rounded-full transition"
                  >
                    <span>Ver tratamientos</span>
                  </Link>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  La cotización formal se entrega después de tu consulta integral.
                </p>

                {/* Badges Bar */}
                <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Egresadas UBA & UNLP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Habilitación MinSalud</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>+10 años de experiencia</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Doctor & Clinic Hero Carousel */}
              <div className="lg:col-span-5">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 2 — ASÍ ES TU PRIMERA CONSULTA (Mint Ice Background) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
                Así es tu primera visita
              </h2>
              <p className="text-slate-700 text-base font-normal">
                Un proceso claro, sin apuros y sin sorpresas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {firstVisitSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-8 shadow-xs border border-[#E1ECEC] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="inline-block text-3xl font-serif font-bold text-[#0A2540]">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold text-[#0A2540] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOQUE 3 — TRATAMIENTOS GRID */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
                  Tratamientos
                </h2>
                <p className="text-slate-700 text-base mt-2 font-normal">
                  Desde una limpieza preventiva hasta una rehabilitación compleja, todo en un mismo lugar.
                </p>
              </div>

              <Link
                href={`${basePath}/tratamientos`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A2540] hover:text-teal-700 transition"
              >
                <span>Ver todos los tratamientos →</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TREATMENTS.slice(0, 7).map((t) => (
                <Link
                  key={t.slug}
                  href={`${basePath}/tratamientos/${t.slug}`}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-[#0A2540]/40 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {t.numberStr}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition">
                      {t.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t.shortDescription}
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-[#0A2540]">
                    <span>Ver detalle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                  </div>
                </Link>
              ))}

              {/* Card 8: Ver todos los tratamientos (Dark Navy Filled) */}
              <Link
                href={`${basePath}/tratamientos`}
                className="bg-[#0A2540] text-white rounded-3xl p-7 shadow-lg hover:bg-[#051E34] transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <Sparkles className="w-8 h-8 text-teal-300" />
                  <h3 className="text-2xl font-serif font-bold leading-tight">
                    Ver todos los tratamientos →
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Endodoncia, prótesis, ATM, cirugía maxilofacial y odontopediatría.
                  </p>
                </div>
                <div className="pt-6 font-bold text-xs text-teal-300 flex items-center gap-2">
                  <span>Explorar catálogo completo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* BLOQUE 5 — UN ESPACIO PENSADO ESPECIALMENTE PARA VOS */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                TU COMODIDAD PRIMERO
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
                Un espacio pensado especialmente para vos
              </h2>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Ir al dentista no tiene por qué ser una experiencia traumática. En DentiSalud Group cuidamos cada detalle.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0A2540]">Tiempo para vos</h3>
                  <p className="text-sm text-slate-700">
                    Dedicamos un tiempo importante a cada paciente, sin apuros.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0A2540]">Manejo del dolor</h3>
                  <p className="text-sm text-slate-700">
                    Aplicamos técnicas para que cada procedimiento sea lo más cómodo posible.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0A2540]">Un ambiente confortable</h3>
                  <p className="text-sm text-slate-700">
                    Un consultorio cálido y tranquilo, pensado para vos.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Real Photos Carousel */}
            <ClinicSpacesCarousel />
          </div>
        </section>

        {/* BLOQUE 6 — RESULTADOS REALES (Mint Ice Background) */}
        <section className="py-20 bg-[#EAF6F6] border-y border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
                  Pacientes que hoy sonríen sin pensarlo dos veces
                </h2>
                <p className="text-slate-700 text-base font-normal mt-1">
                  ⭐ 5,0 en Google · 77 reseñas reales
                </p>
              </div>

              <Link
                href={`${basePath}/casos-y-testimonios`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A2540] hover:text-teal-700 transition"
              >
                <span>Ver todos los 17 casos y testimonios →</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Case 1: Blanqueamiento */}
              <BeforeAfterCard caseData={BEFORE_AFTER_CASES[2]} />

              {/* Case 2: Micro Diseño */}
              <BeforeAfterCard caseData={BEFORE_AFTER_CASES[4]} />

              {/* Interactive Reviews Carousel Card */}
              <ReviewsCarousel />
            </div>
          </div>
        </section>

        {/* BLOQUE 7 — PREGUNTAS FRECUENTES */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
                Preguntas frecuentes
              </h2>
              <p className="text-slate-700 text-sm">
                Respuestas claras a las dudas más comunes antes de agendar tu consulta.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#0A2540] text-base hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-teal-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOQUE 8 — UBICACIÓN & CÓMO LLEGAR */}
        <section className="py-16 bg-[#EAF6F6] border-t border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  UBICACIÓN EN BELGRANO
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#0A2540]">
                  DentiSalud Group: tu dentista en Belgrano, CABA
                </h2>
                <div className="space-y-2 text-sm text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{DENTISALUD_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{DENTISALUD_INFO.hours}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2540]">
                    Cómo llegar en transporte público:
                  </h4>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <Bus className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span><strong>Colectivos:</strong> {DENTISALUD_INFO.transports.buses}</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <Train className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span><strong>Subtes (Línea D):</strong> {DENTISALUD_INFO.transports.subways}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={DENTISALUD_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-[#051E34] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md transition"
                  >
                    <span>Ver en Google Maps</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <GoogleMapEmbed height="380px" />
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 9 — CTA FINAL */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2540]">
              Empezá por una consulta personalizada
            </h2>
            <p className="text-slate-700 text-base">
              Escribinos por WhatsApp y coordinamos tu primera visita a DentiSalud Group.
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#0A2540]" />
                <span>Agendar mi turno por WhatsApp</span>
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
