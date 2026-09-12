import React from 'react';
import { Star, Shield, Calendar, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface HeroProps {
  dentist: Dentist;
}

export const Hero: React.FC<HeroProps> = ({ dentist }) => {
  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Vi su página web y me gustaría reservar una consulta.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  const heroPhoto =
    dentist.fotos && dentist.fotos.length > 0
      ? dentist.fotos[0]
      : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80';

  return (
    <section id="inicio" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-cyan-50/80 via-slate-50 to-white">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-100/80 text-cyan-900 border border-cyan-200/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>
                {dentist.rating} en Google Maps ({dentist.reviews_count} opiniones verificadas)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Tu sonrisa en manos expertas en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-teal-600 to-emerald-600">
                {dentist.ciudad}
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              En <strong>{dentist.nombre}</strong> brindamos atención odontológica integral con la más avanzada tecnología 3D, máxima higiene y un trato humano orientado a tu tranquilidad y bienestar.
            </p>

            {/* Badges / Benefits list */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Odontología sin dolor & Anestesia digital</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Alineadores invisibles & Estética 3D</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Turnos puntuales y sin esperas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Planes de tratamiento a tu medida</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-base font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Agendar Consulta por WhatsApp</span>
              </a>

              <a
                href="#especialidades"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-base font-bold px-6 py-4 rounded-xl shadow-sm transition"
              >
                <span>Ver Tratamientos</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Micro proof */}
            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-600" />
                <span>Atención con Registro de Salud</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Turnos Inmediatos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5]">
                <img
                  src={heroPhoto}
                  alt={dentist.nombre}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="inline-block bg-cyan-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {dentist.ciudad}
                  </div>
                  <h3 className="text-xl font-bold">{dentist.nombre}</h3>
                  <p className="text-xs text-slate-200">{dentist.direccion}</p>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 animate-bounce-subtle">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-900">{dentist.rating} / 5.0</div>
                  <div className="text-xs text-slate-500 font-medium">Google Maps Verificado</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Sonrisas Saludables</div>
                  <div className="text-xs text-cyan-700 font-medium">Atención de Excelencia</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
