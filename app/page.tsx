import React from 'react';
import Link from 'next/link';
import { DENTISTS } from '@/data/dentists';
import { Sparkles, MapPin, Star, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                Demos Odontología
              </h1>
              <p className="text-xs text-cyan-400 font-medium">
                Catálogo de Landing Pages Premium para Odontólogos
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 flex-1 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-950 text-cyan-300 border border-cyan-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Sistema Dinámico de Prospectos
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Seleccioná una demo para visualizar la landing page
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg">
            Landings ultra-rápidas, optimizadas para conversión en celulares y listas para enviar a clientes por WhatsApp.
          </p>
        </div>

        {/* Dentists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DENTISTS.map((dentist) => (
            <div
              key={dentist.slug}
              className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-cyan-500/60 transition duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-3 py-1 rounded-full border border-cyan-900">
                    {dentist.ciudad}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{dentist.rating}</span>
                    <span className="text-slate-500 font-normal">({dentist.reviews_count})</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition">
                    {dentist.nombre}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {dentist.subtitulo}
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>{dentist.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>{dentist.telefono}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800">
                <Link
                  href={`/d/${dentist.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <span>Ver Landing Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-4 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto">
          Demos Odontología • Potenciado por Next.js & Vercel
        </div>
      </footer>
    </div>
  );
}
