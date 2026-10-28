import React from 'react';
import { Sparkles, MapPin, Phone, ShieldCheck, Instagram } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface FooterProps {
  dentist: Dentist;
}

export const Footer: React.FC<FooterProps> = ({ dentist }) => {
  const displayAddress = dentist.direccion.toLowerCase().includes(dentist.ciudad.toLowerCase())
    ? dentist.direccion
    : `${dentist.direccion}, ${dentist.ciudad}`;

  const igHandle = dentist.instagram ? dentist.instagram.replace(/^@/, '') : 'dltodontologia';
  const igUrl = `https://www.instagram.com/${igHandle}/`;

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-900 pb-28 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        {/* Instagram Featured Call-To-Action Box */}
        <div className="max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Seguinos en Instagram</h4>
              <p className="text-xs text-slate-400">@{igHandle} • Casos clínicos y novedades</p>
            </div>
          </div>

          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition transform hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>@{igHandle}</span>
          </a>
        </div>

        {/* Brand header */}
        <div className="flex items-center justify-center gap-2.5 text-white font-extrabold text-lg">
          <div className="w-8 h-8 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>{dentist.nombre}</span>
        </div>

        <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
          {dentist.subtitulo} • {displayAddress}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            {displayAddress}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-teal-500" />
            {dentist.telefono}
          </span>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-semibold transition"
          >
            <Instagram className="w-3.5 h-3.5" />
            @{igHandle}
          </a>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            5.0★ Google Maps
          </span>
        </div>

        <div className="pt-6 border-t border-slate-900 text-slate-600 text-2xs">
          © {new Date().getFullYear()} {dentist.nombre}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
