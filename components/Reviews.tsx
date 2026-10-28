import React from 'react';
import { Star, ShieldCheck, Quote, ExternalLink } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface ReviewsProps {
  dentist: Dentist;
}

export const Reviews: React.FC<ReviewsProps> = ({ dentist }) => {
  const ratingDisplay = dentist.slug === 'dlt-odontologia' ? '5.0' : `${dentist.rating}`;

  return (
    <section id="resenas" className="py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Google Maps Verified
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Opiniones de Pacientes
          </h2>

          {/* 5 Estrellas */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="text-4xl font-black text-white">{ratingDisplay}</div>
            <div className="text-left">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Basado en <strong className="text-white">{dentist.reviews_count} opiniones en Google</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards - Compact */}
        <div className="grid md:grid-cols-3 gap-6">
          {dentist.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-teal-500/40 transition duration-300 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-700" />
                </div>

                <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                  "{rev.comentario}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">{rev.nombre}</div>
                  <div className="text-3xs text-slate-500">{rev.fecha}</div>
                </div>
                <div className="flex items-center gap-1 text-3xs text-teal-400 font-semibold bg-teal-950/80 border border-teal-800/60 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={dentist.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
          >
            <span>Ver ficha en Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
