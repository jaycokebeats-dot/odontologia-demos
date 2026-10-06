'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, BookOpen, ArrowRight } from 'lucide-react';
import { DENTISALUD_INFO, BLOG_ARTICLES } from '@/data/dentisalud-data';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';
import { PlaceholderFrame } from './PlaceholderFrame';

interface BlogPageProps {
  basePath?: string;
}

export function DentiSaludBlogPage({ basePath = '/d/dra-nathaly-martinez' }: BlogPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* HERO SECTION (Mint Ice Background) */}
        <section className="py-16 md:py-24 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              BLOG · SALUD BUCAL EN BELGRANO
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A2540] tracking-tight">
              Guía de salud bucal
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
              Información clara para que decidas con tranquilidad: alternativas de tratamiento, cuidados y qué esperar de cada consulta. Todo explicado de forma transparente.
            </p>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((art) => (
                <article
                  key={art.slug}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <PlaceholderFrame
                      label={art.title}
                      sublabel={`Categoría: ${art.category}`}
                      type="clinic"
                      aspectRatio="aspect-[16/10]"
                    />
                    <div>
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest">
                        {art.category}
                      </span>
                      <h2 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition mt-1">
                        {art.title}
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={DENTISALUD_INFO.whatsappGeneral}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0A2540] hover:text-teal-700 flex items-center gap-1"
                    >
                      <span>Consultar sobre este tema</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER CTA */}
        <section className="py-16 bg-[#EAF6F6] border-y border-[#D5E8E8] text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A2540]">
              ¿Tenés dudas sobre tu caso puntual?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Un artículo puede darte una idea general, pero cada boca es distinta. Escribinos y lo conversamos en una consulta personalizada.
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
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
