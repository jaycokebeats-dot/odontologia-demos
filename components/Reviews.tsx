import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface ReviewsProps {
  dentist: Dentist;
}

export const Reviews: React.FC<ReviewsProps> = ({ dentist }) => {
  return (
    <section id="resenas" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-900/30 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Google Maps Verified
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Lo que dicen nuestros pacientes
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg">
            La confianza y tranquilidad de nuestros pacientes es nuestro mayor orgullo.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <div className="text-5xl font-black text-white">{dentist.rating}</div>
            <div className="text-left">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Basado en <strong>{dentist.reviews_count} opiniones reales</strong> en Google
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {dentist.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700/80 flex flex-col justify-between hover:border-cyan-500/50 transition duration-300"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.estrellas)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-600" />
                </div>

                <p className="text-slate-200 text-sm italic leading-relaxed">
                  "{rev.comentario}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{rev.nombre}</div>
                  <div className="text-xs text-slate-400">{rev.fecha}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
