import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface LocationMapProps {
  dentist: Dentist;
}

export const LocationMap: React.FC<LocationMapProps> = ({ dentist }) => {
  return (
    <section id="ubicacion" className="py-24 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 border border-teal-200/60 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Ubicación & Contacto
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Vení a Conocernos
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Consultorio de fácil acceso en {dentist.ciudad}. Zona segura con estacionamiento cercano y múltiples medios de transporte para tu comodidad.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dirección</h4>
                  <p className="text-slate-900 font-black text-lg mt-0.5">{dentist.direccion}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{dentist.ciudad}, Argentina</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Horarios de Atención</h4>
                  <p className="text-slate-900 font-bold text-base mt-0.5">{dentist.horarios}</p>
                  <p className="text-xs text-teal-700 font-semibold mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Atención exclusiva con turno previo
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teléfono / WhatsApp</h4>
                  <p className="text-slate-900 font-black text-lg mt-0.5">{dentist.telefono}</p>
                </div>
              </div>
            </div>

            {/* Google Maps External Button */}
            <div className="pt-2">
              <a
                href={dentist.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl shadow-lg transition"
              >
                <Navigation className="w-4 h-4 text-teal-400" />
                <span>Cómo Llegar en Google Maps</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Interactive Live Google Maps Iframe */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-5">
                <div>
                  <h3 className="text-xl font-black text-white">{dentist.nombre}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{dentist.direccion} • {dentist.ciudad}</p>
                </div>
                <div className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps En Vivo</span>
                </div>
              </div>

              {/* Live Interactive Google Maps iframe */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] border border-slate-800 shadow-inner">
                <iframe
                  title={`Mapa de ${dentist.nombre}`}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(dentist.direccion + ', ' + dentist.ciudad)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
