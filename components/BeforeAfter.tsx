'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dentist, AntesDespuesCase } from '@/data/dentists';

interface BeforeAfterProps {
  dentist: Dentist;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ dentist }) => {
  const cases: AntesDespuesCase[] = dentist.antes_despues || [];
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  if (cases.length === 0) return null;

  const currentCase = cases[activeCaseIndex];

  return (
    <section id="antes-despues" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Resultados Reales
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transformaciones de Sonrisa (Antes y Después)
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Deslizá el cursor para comparar el estado inicial y el resultado final alcanzado con nuestros tratamientos.
          </p>
        </div>

        {/* Case selector tabs */}
        {cases.length > 1 && (
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {cases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.titulo}
              </button>
            ))}
          </div>
        )}

        {/* Interactive Comparison Slider */}
        <div className="mt-10 max-w-4xl mx-auto bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800">
          
          <div className="text-center space-y-1 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{currentCase.titulo}</h3>
            <p className="text-sm text-cyan-400 font-medium">{currentCase.tratamiento}</p>
          </div>

          {/* Interactive Image Container */}
          <div
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-700"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              setSliderPosition(percentage);
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              const x = touch.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              setSliderPosition(percentage);
            }}
          >
            {/* After Image (Background) */}
            <img
              src={currentCase.despues_url}
              alt="Después"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md backdrop-blur-xs">
              DESPUÉS
            </div>

            {/* Before Image (Clipped Overlay with clipPath - Pixel Perfect) */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={currentCase.antes_url}
                alt="Antes"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md backdrop-blur-xs">
                ANTES
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-cyan-600 font-bold">
                <div className="flex items-center text-xs">
                  <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
                  <ChevronRight className="w-3.5 h-3.5 -ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 text-xs text-slate-400 font-medium">
            💡 Deslizá o mové el mouse de izquierda a derecha sobre la imagen para comparar el cambio.
          </div>

        </div>

      </div>
    </section>
  );
};
