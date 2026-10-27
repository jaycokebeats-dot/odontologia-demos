'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, BookOpen, ArrowRight } from 'lucide-react';
import { DENTISALUD_INFO, BLOG_ARTICLES, BlogArticle } from '@/data/dentisalud-data';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';

interface BlogPageProps {
  basePath?: string;
}

export function DentiSaludBlogPage({ basePath = '' }: BlogPageProps) {
  const [articles, setArticles] = useState<BlogArticle[]>(BLOG_ARTICLES);

  useEffect(() => {
    // Check local storage overrides first
    const local = localStorage.getItem('dentisalud_blog_custom');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
          return;
        }
      } catch (e) {}
    }

    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(() => {});
  }, []);

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
            <p className="text-base sm:text-lg text-slate-700 font-normal max-w-2xl leading-relaxed">
              Artículos escritos pensando en ayudarte a solventar tus inquietudes para que tomes decisiones informadas y con tranquilidad. Acá encontrarás alternativas de tratamiento, cuidados en casa, qué esperar de una consulta y respuestas a preguntas frecuentes que recibimos.
            </p>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <article
                  key={art.slug}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <Link
                      href={`${basePath}/blog/${art.slug}`}
                      className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80"
                    >
                      <img
                        src={art.image || '/images/dentisalud/21_consultorio_principal.jpg'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0A2540]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
                        {art.category}
                      </div>
                    </Link>

                    <div>
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest">
                        {art.category}
                      </span>
                      <h2 className="text-xl font-serif font-bold text-[#0A2540] group-hover:text-teal-700 transition mt-1 leading-snug">
                        <Link href={`${basePath}/blog/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`${basePath}/blog/${art.slug}`}
                      className="text-xs font-bold text-[#0A2540] hover:text-teal-700 flex items-center gap-1"
                    >
                      <span>Leer artículo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
                    </Link>

                    <a
                      href={`https://wa.me/5491128779912?text=${encodeURIComponent(
                        `Hola, estaba leyendo en el blog "${art.title}" y quería consultar con ustedes.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-teal-700 hover:underline"
                    >
                      WhatsApp →
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
            <p className="text-slate-700 text-sm sm:text-base">
              Un artículo puede darte una idea general, pero cada caso es único. Contactanos y coordinamos tu visita para una evaluación personalizada.
            </p>
            <div>
              <a
                href={DENTISALUD_INFO.whatsappGeneral}
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
