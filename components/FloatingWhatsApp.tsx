import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface FloatingWhatsAppProps {
  dentist: Dentist;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ dentist }) => {
  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Vi su consultorio en la web y me gustaría consultar por un turno.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 pointer-events-auto">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between md:justify-start gap-4 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:px-6 sm:py-4 rounded-2xl shadow-2xl hover:shadow-emerald-600/50 transition duration-300 transform hover:-translate-y-1 border border-emerald-400/30"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
            </div>
            {/* Live green dot indicator */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-emerald-700 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-emerald-700 rounded-full" />
          </div>

          <div className="text-left">
            <div className="text-sm font-extrabold leading-tight">
              Solicitar Turno por WhatsApp
            </div>
            <div className="text-xs text-emerald-100 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" />
              <span>Responde rápido • Consulta directa</span>
            </div>
          </div>
        </div>

        <span className="hidden sm:inline-block bg-white text-emerald-800 font-extrabold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg group-hover:bg-emerald-100 transition">
          Consultar
        </span>
      </a>
    </div>
  );
};
