'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DENTISALUD_PHOTOS } from '@/data/dentisalud-photos';

export function ClinicSpacesCarousel() {
  const spaces = [
    {
      title: 'Recepción & Área de Bienvenida',
      desc: 'Atención cálida, recepción personalizada y sala de espera climatizada en Belgrano.',
      url: DENTISALUD_PHOTOS.recepcion,
    },
    {
      title: 'Consultorio Odontológico Principal',
      desc: 'Sillón ergonómico, luz natural y tecnología de alta precisión.',
      url: DENTISALUD_PHOTOS.consultorio,
    },
    {
      title: 'Scanner Shining 3D Digital',
      desc: 'Diagnóstico digitalizado y toma de impresiones sin pastas molestas.',
      url: DENTISALUD_PHOTOS.scanner3d,
    },
    {
      title: 'Sala de Espera Confortable',
      desc: 'Un espacio tranquilo pensado para dejar atrás cualquier temor al dentista.',
      url: DENTISALUD_PHOTOS.salaEspera,
    },
    {
      title: 'Atención Personalizada y Turnos',
      desc: 'Equipo de recepción coordinado para resolver todas tus inquietudes.',
      url: DENTISALUD_PHOTOS.recepcionista,
    },
    {
      title: 'Proceso de Escaneo Intraoral',
      desc: 'Podés ver en tiempo real el estado de tus dientes en pantalla.',
      url: DENTISALUD_PHOTOS.escaneando,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? spaces.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p + 1) % spaces.length);
  };

  return (
    <div className="relative space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          CONOCÉ EL ESPACIO
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            aria-label="Espacio anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            aria-label="Siguiente espacio"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((offset) => {
          const item = spaces[(currentIndex + offset) % spaces.length];
          return (
            <div
              key={item.title + offset}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs font-bold leading-snug drop-shadow-xs">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
