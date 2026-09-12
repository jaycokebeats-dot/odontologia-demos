import React from 'react';
import { Sparkles } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface FooterProps {
  dentist: Dentist;
}

export const Footer: React.FC<FooterProps> = ({ dentist }) => {
  const displayAddress = dentist.direccion.toLowerCase().includes(dentist.ciudad.toLowerCase())
    ? dentist.direccion
    : `${dentist.direccion}, ${dentist.ciudad}`;

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-900 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-base">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>{dentist.nombre}</span>
        </div>
        <p className="max-w-md mx-auto text-slate-400">
          {dentist.subtitulo} • {displayAddress}
        </p>
        <p className="text-slate-500">
          © {new Date().getFullYear()} {dentist.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
