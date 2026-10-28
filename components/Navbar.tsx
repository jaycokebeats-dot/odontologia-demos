import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface NavbarProps {
  dentist: Dentist;
}

export const Navbar: React.FC<NavbarProps> = ({ dentist }) => {
  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Vi su consultorio en la web y me gustaría consultar por un turno.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Logo & Name - Rule 10 anti-collision */}
          <a href="#inicio" className="flex items-center gap-3 min-w-0 flex-1 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0 group-hover:scale-105 transition duration-200">
              <Sparkles className="w-6 h-6 text-teal-300" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-lg sm:text-xl font-black text-slate-900 truncate tracking-tight">
                {dentist.nombre}
              </span>
              <span className="block text-xs font-semibold text-teal-700 truncate">
                {dentist.subtitulo}
              </span>
            </div>
          </a>

          {/* Navigation links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-600">
            <a href="#inicio" className="hover:text-teal-700 transition">
              Inicio
            </a>
            <a href="#especialidades" className="hover:text-teal-700 transition">
              Tratamientos
            </a>
            <a href="#antes-despues" className="hover:text-teal-700 transition flex items-center gap-1.5 text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-full border border-teal-100">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Antes y Después</span>
            </a>
            <a href="#resenas" className="hover:text-teal-700 transition">
              Opiniones ({dentist.rating}★)
            </a>
            <a href="#ubicacion" className="hover:text-teal-700 transition">
              Ubicación
            </a>
          </div>

          {/* CTA WhatsApp Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span className="hidden sm:inline">Solicitar Turno</span>
            <span className="sm:hidden">Turnos</span>
          </a>

        </div>
      </div>
    </nav>
  );
};
