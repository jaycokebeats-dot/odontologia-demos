import React from 'react';
import { Star, Shield, ArrowRight, CheckCircle2, MessageCircle, Sparkles, MapPin, Clock } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface HeroProps {
  dentist: Dentist;
}

export const Hero: React.FC<HeroProps> = ({ dentist }) => {
  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Vi su sitio web y quisiera reservar una consulta odontológica.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  const heroPhoto =
    dentist.slug === 'dlt-odontologia'
      ? '/images/dlt-hero-consultorio.png'
      : dentist.fotos && dentist.fotos.length > 0
      ? dentist.fotos[0]
      : '/images/dlt-hero-consultorio.png';

  const ratingValue = dentist.slug === 'dlt-odontologia' ? '5.0' : `${dentist.rating}`;

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-18 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white">
      {/* Decorative ambient blur */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r from-teal-200/30 to-cyan-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Rating Pill: 5 Estrellas */}
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-slate-900">{ratingValue} de 5 Estrellas</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">Google Maps ({dentist.reviews_count} opiniones)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Odontología de alta precisión en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-cyan-600 to-emerald-600">
                {dentist.ciudad}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              {dentist.descripcion_custom ? (
                dentist.descripcion_custom
              ) : (
                <>En <strong>{dentist.nombre}</strong> combinamos tecnología digital 3D, máxima higiene y un trato cercano y personalizado en pleno Palermo.</>
              )}
            </p>

            {/* Badges */}
            <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold bg-white/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Odontología sin dolor & Tecnología 3D</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold bg-white/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Carillas estéticas & Alineadores</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold bg-white/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Turnos puntuales sin demoras</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold bg-white/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Planes de tratamiento claros</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition duration-200 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Agendar Consulta por WhatsApp</span>
              </a>

              <a
                href="#antes-despues"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold px-5 py-3.5 rounded-xl shadow-xs transition duration-200"
              >
                <span>Ver Casos de Antes y Después</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Quick Location info */}
            <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {dentist.direccion}, {dentist.ciudad}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Atención con turno previo
              </span>
            </div>
          </div>

          {/* Right Column: Real Office Photo Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[3/4] group">
                <img
                  src={heroPhoto}
                  alt={`Consultorio ${dentist.nombre}`}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Bottom Tag */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <div className="inline-flex items-center gap-1 bg-teal-500 text-slate-950 text-2xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Consultorio Real
                  </div>
                  <h3 className="text-xl font-black">{dentist.nombre}</h3>
                  <p className="text-xs text-slate-200 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-300" />
                    {dentist.direccion} • {dentist.ciudad}
                  </p>
                </div>
              </div>

              {/* Floating 5 Estrellas Card */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 hidden sm:flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 font-bold">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-tight">5.0 / 5.0 ★</div>
                  <div className="text-2xs text-slate-500 font-semibold">{dentist.reviews_count} opiniones verificadas</div>
                </div>
              </div>

              {/* Floating Equipamiento Card */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 leading-tight">Equipamiento Moderno</div>
                  <div className="text-2xs text-teal-700 font-semibold">Atención 100% Personalizada</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
