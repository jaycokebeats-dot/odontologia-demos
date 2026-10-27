'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { TreatmentDetail, DENTISALUD_INFO, ENDODONCIA_REVIEWS } from '@/data/dentisalud-data';
import { TREATMENT_FEATURED_PHOTOS, BEFORE_AFTER_CASES } from '@/data/dentisalud-photos';
import { useSiteData } from './useSiteData';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { BeforeAfterCard } from './BeforeAfterCard';
import { ReviewsCarousel } from './ReviewsCarousel';

interface TratamientoDetailPageProps {
  treatment: TreatmentDetail;
  basePath?: string;
}

export function DentiSaludTratamientoDetailPage({ treatment: initialTreatment, basePath = '' }: TratamientoDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { featuredPhotos, treatments, cases, info } = useSiteData();
  const treatment = treatments.find((t) => t.slug === initialTreatment.slug) || initialTreatment;
  const featuredPhoto = featuredPhotos[treatment.slug] || TREATMENT_FEATURED_PHOTOS[treatment.slug] || '/images/dentisalud/21_consultorio_principal.jpg';
  const consultationPrice = info.consultationPrice || '$40.000';

  // Specific case filters per treatment
  const disenoCases = cases.filter((c) =>
    ['case-gingivoplastia', 'case-carillas-disilicato', 'case-carillas-sector-anterior'].includes(c.id) || c.treatmentSlug === 'diseno-de-sonrisa'
  );

  const blanqueamientoCases = cases.filter((c) =>
    ['case-blanqueamiento-1', 'case-blanqueamiento-2'].includes(c.id) || c.treatmentSlug === 'blanqueamiento-dental'
  );

  const ortodonciaCase = cases.find((c) => c.id === 'case-ortodoncia-1' || c.treatmentSlug === 'ortodoncia');

  // Ortodoncia graphic types with realistic images (autoligables removed, photo applied to metallic)
  const ortodonciaTypes = [
    {
      title: 'Brackets metálicos',
      desc: 'La opción más tradicional, resistente y económica.',
      img: '/images/dentisalud/ortodoncia_autoligables.jpg',
    },
    {
      title: 'Brackets de cerámica',
      desc: 'Discretos, mimetizados con el color de tu esmalte.',
      img: '/images/dentisalud/ortodoncia_ceramica.jpg',
    },
    {
      title: 'Brackets de zafiro',
      desc: 'Completamente transparentes, de máxima estética.',
      img: '/images/dentisalud/ortodoncia_zafiro.jpg',
    },
    {
      title: 'Alineadores transparentes',
      desc: 'Removibles, cómodos y prácticamente imperceptibles.',
      img: '/images/dentisalud/46_alineadores.png',
    },
  ];

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

                <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-xl">
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
                    <span>Agendar mi turno</span>
                  </a>
                </div>

                {/* Trust Points */}
                {treatment.trustPoints && (
                  <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    {treatment.trustPoints.map((tp, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{tp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Real Treatment Photo (Balanced Landscape Framing) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                  <img
                    src={featuredPhoto}
                    alt={`Tratamiento de ${treatment.title}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold drop-shadow-md">
                    {treatment.title} · DentiSalud Group
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR / ITEMS (Differentiated styling for Implantes) */}
        {treatment.whoIsItForItems && (
          <section className="py-16 bg-[#EAF6F6] border-y border-[#D5E8E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                {treatment.whoIsItForTitle || '¿Para quién está recomendado?'}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {treatment.whoIsItForItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-7 border-2 border-teal-600/30 shadow-xs space-y-3 relative overflow-hidden"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#0A2540]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ORTODONCIA GRAPHIC OPTIONS CARDS */}
        {treatment.slug === 'ortodoncia' && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                  Opciones de ortodoncia a tu medida
                </h2>
                <p className="text-sm text-slate-700 mt-2">
                  En tu consulta te explicamos las diferencias y te ayudamos a elegir la alternativa indicada para tu caso.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ortodonciaTypes.map((type, idx) => (
                  <div
                    key={idx}
                    className="bg-[#EAF6F6] rounded-2xl overflow-hidden border border-[#D5E8E8] hover:border-[#0A2540]/40 transition flex flex-col justify-between shadow-2xs hover:shadow-md"
                  >
                    <div className="h-44 relative overflow-hidden bg-slate-200">
                      <img
                        src={type.img}
                        alt={type.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#0A2540]">{type.title}</h3>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURES / POR QUÉ ELEGIRNOS (Centered bottom cards when applicable, skipped for Ortodoncia) */}
        {treatment.features && treatment.slug !== 'ortodoncia' && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540] text-center md:text-left">
                {treatment.featuresTitle || '¿Por qué elegirnos?'}
              </h2>

              <div className="flex flex-wrap justify-center gap-6">
                {treatment.features.map((f, idx) => (
                  <div
                    key={idx}
                    className="w-full md:w-[calc(33.333%-16px)] min-w-[280px] bg-[#EAF6F6] rounded-3xl p-7 border border-[#D5E8E8] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-[#0A2540]">{f.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROCESS STEPS (Centered visual layout for Limpieza) */}
        {treatment.processSteps && (
          <section className="py-16 bg-[#EAF6F6] border-b border-[#D5E8E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className={`text-3xl font-serif font-extrabold text-[#0A2540] ${treatment.slug === 'limpieza-dental' ? 'text-center' : ''}`}>
                {treatment.processTitle || 'Cómo es el proceso paso a paso'}
              </h2>

              <div className={`grid gap-6 ${treatment.slug === 'limpieza-dental' ? 'sm:grid-cols-3 max-w-4xl mx-auto text-center' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
                {treatment.processSteps.map((s) => (
                  <div key={s.step} className="bg-white rounded-3xl p-7 border border-[#E1ECEC] shadow-2xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className={`w-9 h-9 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-serif font-bold text-sm ${treatment.slug === 'limpieza-dental' ? 'mx-auto' : ''}`}>
                        {s.step}
                      </div>
                      <h3 className="text-base font-bold text-[#0A2540]">{s.title}</h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONSULTA INTEGRAL: REVIEWS DE GOOGLE (Replaces video placeholder) */}
        {treatment.slug === 'consulta-integral' && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                  Experiencias de nuestros pacientes
                </h2>
                <p className="text-sm text-slate-700">
                  ⭐ 5,0 en Google · Testimonios verificados de quienes ya visitaron DentiSalud Group.
                </p>
              </div>
              <ReviewsCarousel />
            </div>
          </section>
        )}

        {/* ENDODONCIA: OPINIONES REALES DE TRATAMIENTOS DE CONDUCTO */}
        {treatment.slug === 'endodoncia' && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                  Opiniones de pacientes que salvaron su pieza dental
                </h2>
                <p className="text-sm text-slate-700">
                  Alivio inmediato del dolor, anestesia efectiva y trato cálido sin molestias.
                </p>
              </div>
              <ReviewsCarousel reviews={ENDODONCIA_REVIEWS} titleBadge="Google Reviews · Tratamientos de Conducto" />
            </div>
          </section>
        )}

        {/* REAL CASES ACCORDING TO TREATMENT */}
        {treatment.slug === 'diseno-de-sonrisa' && disenoCases.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                  Casos reales de Diseño de Sonrisa
                </h2>
                <Link href={`${basePath}/casos-y-testimonios`} className="text-xs font-bold text-[#0A2540] hover:underline">
                  Ver más casos →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {disenoCases.map((c) => (
                  <BeforeAfterCard key={c.id} caseData={c} />
                ))}
              </div>
            </div>
          </section>
        )}

        {treatment.slug === 'blanqueamiento-dental' && blanqueamientoCases.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
                  Casos reales de Blanqueamiento Dental
                </h2>
                <Link href={`${basePath}/casos-y-testimonios`} className="text-xs font-bold text-[#0A2540] hover:underline">
                  Ver más casos →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {blanqueamientoCases.map((c) => (
                  <BeforeAfterCard key={c.id} caseData={c} />
                ))}
              </div>
            </div>
          </section>
        )}

        {treatment.slug === 'implantes-dentales' && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540] text-center">
                Opiniones reales de pacientes con Implantes
              </h2>
              <ReviewsCarousel />
            </div>
          </section>
        )}

        {/* FAQS ACCORDION */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <section className="py-16 bg-[#EAF6F6] border-b border-[#D5E8E8]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h2 className="text-3xl font-serif font-extrabold text-[#0A2540] text-center">
                Preguntas frecuentes sobre {treatment.title}
              </h2>

              <div className="space-y-4">
                {treatment.faqs.map((faq, idx) => (
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
                        {faq.question.toLowerCase().includes('cuesta la consulta')
                          ? `Actualmente tiene un valor de ${consultationPrice}.`
                          : faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA BANNER */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-serif font-extrabold text-[#0A2540]">
              {treatment.slug === 'consulta-integral'
                ? 'La mejor versión de tu sonrisa inicia aquí'
                : 'Empezá por una consulta personalizada'}
            </h2>
            <p className="text-sm text-slate-700">
              {treatment.slug === 'consulta-integral'
                ? 'Contactanos para coordinar tu primera visita en el horario que más te convenga'
                : 'Escribinos por WhatsApp y coordinamos tu primera visita en el horario que más te convenga.'}
            </p>
            <div>
              <a
                href={treatment.ctaLink || DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
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
