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
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo & Name - rule 10 anti-collision */}
          <a href="#inicio" className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-lg sm:text-xl font-extrabold text-slate-900 truncate tracking-tight">
                {dentist.nombre}
              </span>
              <span className="block text-xs font-semibold text-cyan-700 truncate">
                {dentist.subtitulo}
              </span>
            </div>
          </a>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#inicio" className="hover:text-cyan-700 transition">
              Inicio
            </a>
            <a href="#especialidades" className="hover:text-cyan-700 transition">
              Especialidades
            </a>
            <a href="#antes-despues" className="hover:text-cyan-700 transition">
              Resultados
            </a>
            <a href="#resenas" className="hover:text-cyan-700 transition">
              Reseñas ({dentist.rating}★)
            </a>
            <a href="#ubicacion" className="hover:text-cyan-700 transition">
              Ubicación
            </a>
          </div>

          {/* CTA WhatsApp Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span className="hidden sm:inline">Solicitar Turno</span>
            <span className="sm:hidden">Turnos</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
