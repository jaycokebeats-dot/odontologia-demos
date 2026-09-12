import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface LocationMapProps {
  dentist: Dentist;
}

export const LocationMap: React.FC<LocationMapProps> = ({ dentist }) => {
  return (
    <section id="ubicacion" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Ubicación & Horarios
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Vení a visitarnos en {dentist.ciudad}
              </h2>
              <p className="text-slate-600 text-base">
                Ubicación de fácil acceso, zona segura con facilidades de estacionamiento y múltiples medios de transporte.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dirección</h4>
                  <p className="text-slate-900 font-extrabold text-lg mt-0.5">{dentist.direccion}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{dentist.ciudad}, Argentina</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Horarios de Atención</h4>
                  <p className="text-slate-900 font-bold text-base mt-0.5">{dentist.horarios}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">Atención con turno previo</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Teléfono Directo</h4>
                  <p className="text-slate-900 font-extrabold text-lg mt-0.5">{dentist.telefono}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href={dentist.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Cómo Llegar (Google Maps)</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Visual Map / Graphic Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{dentist.nombre}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{dentist.direccion}</p>
                </div>
                <div className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-3 py-1 rounded-full">
                  Google Maps
                </div>
              </div>

              {/* Live Interactive Google Maps iframe */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-800 aspect-[16/10] border border-slate-700 shadow-inner">
                <iframe
                  title={`Mapa de ${dentist.nombre}`}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(dentist.direccion + ', ' + dentist.ciudad)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
