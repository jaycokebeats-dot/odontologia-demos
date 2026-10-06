'use client';

import React, { useState, useRef } from 'react';
import { BeforeAfterCase } from '@/data/dentisalud-photos';
import { MoveHorizontal, Eye, SlidersHorizontal } from 'lucide-react';

interface BeforeAfterCardProps {
  caseData: BeforeAfterCase;
}

export function BeforeAfterCard({ caseData }: BeforeAfterCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition duration-300 overflow-hidden flex flex-col group">
      {/* Card Header with View Mode Selector */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
          {caseData.treatmentName}
        </span>
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-full text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
              viewMode === 'slider'
                ? 'bg-white text-[#0A2540] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('sideBySide')}
            className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
              viewMode === 'sideBySide'
                ? 'bg-white text-[#0A2540] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Lado a Lado</span>
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          className="relative aspect-[4/3] w-full select-none cursor-ew-resize overflow-hidden bg-slate-100"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* AFTER Image (Full Layer 0) */}
          <img
            src={caseData.after}
            alt={`Después - ${caseData.title}`}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* BEFORE Image (Clipped Layer 1 using CSS clip-path inset) */}
          <img
            src={caseData.before}
            alt={`Antes - ${caseData.title}`}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          />

          {/* Badges */}
          <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
            Antes
          </span>
          <span className="absolute top-3 right-3 bg-teal-800/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
            Después
          </span>

          {/* Slider Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#0A2540] shadow-xl flex items-center justify-center border border-slate-200">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>
      ) : (
        /* Side-by-Side Dual View */
        <div className="p-3 bg-slate-100/60 aspect-[4/3] w-full grid grid-cols-2 gap-2">
          <div className="relative h-full rounded-2xl overflow-hidden shadow-xs border border-slate-200">
            <img
              src={caseData.before}
              alt={`Antes - ${caseData.title}`}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
              Antes
            </span>
          </div>
          <div className="relative h-full rounded-2xl overflow-hidden shadow-xs border border-slate-200">
            <img
              src={caseData.after}
              alt={`Después - ${caseData.title}`}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute top-2 right-2 bg-teal-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
              Después
            </span>
          </div>
        </div>
      )}

      {/* Card Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#0A2540] group-hover:text-teal-800 transition">
            {caseData.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
            {caseData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
