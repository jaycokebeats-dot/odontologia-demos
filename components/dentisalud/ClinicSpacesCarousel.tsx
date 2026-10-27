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
    {
      title: 'Equipamiento e Iluminación Operativa',
      desc: 'Lámparas de alta precisión y sillón ergonómico de máxima comodidad.',
      url: DENTISALUD_PHOTOS.cartelLampara,
    },
    {
      title: 'Espacio Confortable de Espera',
      desc: 'Ambiente climatizado y tranquilo para tu mayor tranquilidad.',
      url: DENTISALUD_PHOTOS.salaEspera2,
    },
    {
      title: 'Bioseguridad & Esterilización',
      desc: 'Protocolos estrictos de higiene y protección en cada procedimiento.',
      url: DENTISALUD_PHOTOS.guantes,
    },
    {
      title: 'Sentite como en casa',
      desc: 'Atención cálida y cercana',
      url: DENTISALUD_PHOTOS.pacientesConversando,
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
    <div className="relative space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          CONOCÉ EL ESPACIO ({currentIndex + 1} de {spaces.length})
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 shadow-xs flex items-center justify-center transition"
            aria-label="Espacio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 shadow-xs flex items-center justify-center transition"
            aria-label="Siguiente espacio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((offset) => {
          const item = spaces[(currentIndex + offset) % spaces.length];
          return (
            <div
              key={item.title + offset}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 group transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-serif font-bold leading-snug drop-shadow-sm">
                  {item.title}
                </div>
                <div className="text-xs text-slate-200 line-clamp-2 mt-1 font-normal leading-relaxed drop-shadow-xs">
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
