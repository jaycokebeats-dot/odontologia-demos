import React from 'react';
import { MapPin, Phone, Star, ShieldCheck } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface TopBarProps {
  dentist: Dentist;
}

export const TopBar: React.FC<TopBarProps> = ({ dentist }) => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-2.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong>{dentist.direccion}</strong>, {dentist.ciudad}
          </span>
          <span className="hidden md:inline-block text-slate-500">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-cyan-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Atención Personalizada
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-slate-800/90 text-amber-300 px-2.5 py-1 rounded-full border border-slate-700/80">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{dentist.rating}</span>
            <span className="text-slate-400 font-normal">({dentist.reviews_count} opiniones)</span>
          </div>

          <a
            href={`tel:${dentist.telefono.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dentist.telefono}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
