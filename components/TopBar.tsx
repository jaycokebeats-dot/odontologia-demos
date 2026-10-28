import React from 'react';
import { MapPin, Phone, Star, ShieldCheck, Instagram } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface TopBarProps {
  dentist: Dentist;
}

export const TopBar: React.FC<TopBarProps> = ({ dentist }) => {
  const displayLocation = dentist.direccion.toLowerCase().includes(dentist.ciudad.toLowerCase())
    ? dentist.direccion
    : `${dentist.direccion}, ${dentist.ciudad}`;

  const ratingDisplay = dentist.slug === 'dlt-odontologia' ? '5.0' : `${dentist.rating}`;
  const igHandle = dentist.instagram ? dentist.instagram.replace(/^@/, '') : 'dltodontologia';

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>
            <strong>{displayLocation}</strong>
          </span>
          <span className="hidden md:inline-block text-slate-600">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-teal-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            Atención Personalizada
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-full border border-slate-800">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{ratingDisplay}★</span>
            <span className="text-slate-400 font-normal">({dentist.reviews_count} opiniones)</span>
          </div>

          <a
            href={`https://www.instagram.com/${igHandle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 transition"
          >
            <Instagram className="w-3 h-3" />
            <span>@{igHandle}</span>
          </a>

          <a
            href={`tel:${dentist.telefono.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition"
          >
            <Phone className="w-3 h-3 text-teal-400" />
            <span>{dentist.telefono}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
