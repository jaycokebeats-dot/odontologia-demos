'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { DENTISALUD_PHOTOS } from '@/data/dentisalud-photos';

export function HeroCarousel() {
  const slides = [
    {
      url: DENTISALUD_PHOTOS.salaEspera, // Foto 19
      name: 'Sala de Espera',
      role: 'Espacio moderno y confortable en Belgrano',
      alt: 'Sala de espera en DentiSalud Group',
    },
    {
      url: DENTISALUD_PHOTOS.cartelLampara, // Foto 24
      name: 'Equipamiento de Vanguardia',
      role: 'Lámpara operativa y tecnología ergonómica',
      alt: 'Lámpara odontológica y equipamiento en gabinete',
    },
    {
      url: DENTISALUD_PHOTOS.escaneando, // Foto 28
      name: 'Escaneo Digital 3D',
      role: 'Impresiones digitales precisas sin molestias',
      alt: 'Proceso de escaneo digital 3D intraoral',
    },
    {
      url: DENTISALUD_PHOTOS.consultorio, // Foto 21
      name: 'Gabinete Odontológico',
      role: 'Sillón ergonómico e higiene certificada',
      alt: 'Consultorio odontológico en Belgrano',
    },
    {
      url: DENTISALUD_PHOTOS.recepcionista, // Foto 25
      name: 'Atención & Recepción',
      role: 'Coordinación de turnos y atención cálida',
      alt: 'Atención al paciente en recepción DentiSalud Group',
    },
    {
      url: DENTISALUD_PHOTOS.heroDoctora, // Foto 35
      name: 'Dra. Nathaly Martínez',
      role: 'Directora Médica · DentiSalud Group',
      alt: 'Dra. Nathaly Martínez en DentiSalud Group',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#D5E8E8] bg-slate-100 group">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-top"
            />
            
            {/* Top Doctor Name Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl text-white border border-white/15 shadow-xl">
              <div className="text-sm font-serif font-bold leading-tight drop-shadow-xs">
                {slide.name}
              </div>
              <div className="text-[11px] text-teal-300 font-medium leading-tight">
                {slide.role}
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 z-20"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 z-20"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Google Rating Badge (Bottom Left - NO OVERLAP) */}
      <div className="absolute -bottom-5 -left-2 sm:left-4 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 flex items-center gap-3.5 z-30">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        </div>
        <div>
          <div className="text-sm font-extrabold text-[#0A2540]">5.0 ⭐ en Google</div>
          <div className="text-[11px] text-slate-600 font-medium">77 opiniones reales</div>
        </div>
      </div>
    </div>
  );
}
