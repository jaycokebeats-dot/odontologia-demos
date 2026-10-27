'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Calendar, User, Share2, CheckCircle2 } from 'lucide-react';
import { BlogArticle, DENTISALUD_INFO, BLOG_ARTICLES } from '@/data/dentisalud-data';
import { DentiSaludNavbar } from './Navbar';
import { DentiSaludFooter } from './Footer';
import { DentiSaludFloatingWhatsApp } from './FloatingWhatsApp';

interface BlogDetailPageProps {
  slug: string;
  basePath?: string;
}

export function DentiSaludBlogDetailPage({ slug, basePath = '' }: BlogDetailPageProps) {
  const [article, setArticle] = useState<BlogArticle | null>(() => {
    return BLOG_ARTICLES.find((a) => a.slug === slug) || null;
  });
  const [loading, setLoading] = useState<boolean>(!article);

  useEffect(() => {
    // 1. Check local storage overrides
    const local = localStorage.getItem('dentisalud_blog_custom');
    if (local) {
      try {
        const parsed: BlogArticle[] = JSON.parse(local);
        const match = parsed.find((a) => a.slug === slug);
        if (match) {
          setArticle(match);
          setLoading(false);
          return;
        }
      } catch (e) {}
    }

    // 2. Fetch from API
    fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setArticle(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <DentiSaludNavbar basePath={basePath} />
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Cargando artículo...</p>
          </div>
        </div>
        <DentiSaludFooter basePath={basePath} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <DentiSaludNavbar basePath={basePath} />
        <div className="flex-1 max-w-xl mx-auto px-4 py-24 text-center space-y-4">
          <h1 className="text-2xl font-serif font-bold text-[#0A2540]">Artículo no encontrado</h1>
          <p className="text-sm text-slate-600">
            El artículo que buscás no existe o fue movido.
          </p>
          <div>
            <Link
              href={`${basePath}/blog`}
              className="inline-flex items-center gap-2 bg-[#0A2540] text-white text-xs font-bold px-6 py-3 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al blog</span>
            </Link>
          </div>
        </div>
        <DentiSaludFooter basePath={basePath} />
      </div>
    );
  }

  const paragraphs = (article.content || article.excerpt).split('\n');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <DentiSaludNavbar basePath={basePath} />

      <main className="flex-1">
        {/* ARTICLE HEADER & BREADCRUMB */}
        <section className="pt-10 pb-12 bg-[#EAF6F6] border-b border-[#D5E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href={`${basePath}/`} className="hover:text-[#0A2540] transition">
                Inicio
              </Link>
              <span>/</span>
              <Link href={`${basePath}/blog`} className="hover:text-[#0A2540] transition">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#0A2540] truncate max-w-[200px]">{article.title}</span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-white px-3.5 py-1.5 rounded-full border border-teal-200 inline-block shadow-2xs">
                {article.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0A2540] leading-[1.15] tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-teal-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span className="font-semibold">{article.author || 'DentiSalud Group'}</span>
                </div>
                {article.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.date}</span>
                  </div>
                )}
                <div className="text-slate-400">· Belgrano, CABA</div>
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY & PHOTO */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
            {/* Featured Image */}
            {article.image && (
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt Lead Paragraph */}
            {article.excerpt && (
              <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-teal-600 text-slate-800 text-sm sm:text-base font-medium leading-relaxed shadow-2xs">
                {article.excerpt}
              </div>
            )}

            {/* Article Content Rendered */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {paragraphs.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('### ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-serif font-bold text-[#0A2540] pt-6 pb-1">
                      {trimmed.replace('### ', '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-serif font-bold text-[#0A2540] pt-6 pb-1">
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-5 list-disc text-slate-700 pl-1">
                      {trimmed.replace('- ', '')}
                    </li>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* WhatsApp CTA Callout Box */}
            <div className="mt-12 p-8 rounded-3xl bg-[#0A2540] text-white space-y-4 shadow-xl border border-[#133C63]">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                ¿QUERÉS EVALUAR TU CASO PERSONALMENTE?
              </span>
              <h3 className="text-2xl font-serif font-bold">
                Consultá con nuestro equipo en Belgrano
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Coordinamos un turno para evaluar tu salud bucal con cámara intraoral y un plan a tu medida.
              </p>
              <div>
                <a
                  href={`https://wa.me/5491128779912?text=${encodeURIComponent(
                    `Hola, estuve leyendo el artículo "${article.title}" en el blog y me gustaría agendar una consulta.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0A2540] text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-full shadow-md transition transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 fill-[#0A2540] text-white" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`${basePath}/blog`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A2540] hover:text-teal-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a todos los artículos</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <DentiSaludFooter basePath={basePath} />
      <DentiSaludFloatingWhatsApp />
    </div>
  );
}
