'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Dentist, AntesDespuesCase } from '@/data/dentists';

interface BeforeAfterProps {
  dentist: Dentist;
}

const IndividualCard: React.FC<{ item: AntesDespuesCase; index: number; dentist: Dentist }> = ({
  item,
  index,
  dentist,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Vi el caso de "${item.titulo}" en su web y me gustaría hacer una consulta.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-teal-500/50 transition-all duration-300">
      <div>
        {/* Header tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 text-2xs font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-teal-300" />
            Caso #{index + 1}
          </span>
          <span className="text-2xs text-slate-500 font-medium">Deslizá para comparar</span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">{item.titulo}</h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed mb-3">{item.tratamiento}</p>

        {/* Compact Interactive Slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-800 bg-slate-900 shadow-inner"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image */}
          <img
            src={item.despues_url}
            alt={`${item.titulo} - Después`}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          <div className="absolute top-2.5 right-2.5 z-20 bg-emerald-500/90 backdrop-blur-md text-white font-black text-3xs uppercase tracking-wider px-2 py-0.5 rounded shadow">
            DESPUÉS ✨
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img
              src={item.antes_url}
              alt={`${item.titulo} - Antes`}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
            <div className="absolute top-2.5 left-2.5 bg-slate-950/90 backdrop-blur-md text-slate-200 font-black text-3xs uppercase tracking-wider px-2 py-0.5 rounded shadow border border-slate-800">
              ANTES
            </div>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-white to-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.8)] z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-950 text-white shadow-xl flex items-center justify-center border border-teal-400 font-bold">
              <div className="flex items-center text-teal-300">
                <ChevronLeft className="w-3 h-3 -mr-0.5" />
                <ChevronRight className="w-3 h-3 -ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-2xs text-teal-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-teal-400" />
          Resultado Real
        </span>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-2xs font-bold text-white bg-slate-800 hover:bg-teal-600 px-3 py-1.5 rounded-lg transition"
        >
          <span>Consultar</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ dentist }) => {
  const cases: AntesDespuesCase[] =
    dentist.antes_despues && dentist.antes_despues.length > 0
      ? dentist.antes_despues
      : [
          {
            titulo: 'Diseño de Sonrisa & Carillas',
            tratamiento: 'Carillas ultrafinas de porcelana pura y armonización estética',
            antes_url: '/images/cases/carillas-antes.jpg',
            despues_url: '/images/cases/carillas-despues.jpg',
          },
          {
            titulo: 'Blanqueamiento Dental LED',
            tratamiento: 'Aclaramiento intensivo en 1 sesión de 60 min sin sensibilidad',
            antes_url: '/images/cases/blanqueamiento-antes.jpg',
            despues_url: '/images/cases/blanqueamiento-despues.jpg',
          },
          {
            titulo: 'Micro Diseño & Restauración',
            tratamiento: 'Reconstrucción con resina biocompatible y pulido de alto brillo',
            antes_url: '/images/cases/diseno-antes.jpg',
            despues_url: '/images/cases/diseno-despues.jpg',
          },
        ];

  return (
    <section id="antes-despues" className="py-16 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Casos Clínicos Reales
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transformaciones de Sonrisa (Antes y Después)
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Compará el antes y después deslizando la barra central de cada caso clínico.
          </p>
        </div>

        {/* 3 Cases in SIMULTANEOUS 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.slice(0, 3).map((item, idx) => (
            <IndividualCard key={idx} item={item} index={idx} dentist={dentist} />
          ))}
        </div>

      </div>
    </section>
  );
};
