'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, UserCheck, GraduationCap, Award } from 'lucide-react';
import { DENTISALUD_TEAM, TeamMember } from '@/data/dentisalud-data';

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMember: TeamMember = DENTISALUD_TEAM[currentIndex];

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? DENTISALUD_TEAM.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p + 1) % DENTISALUD_TEAM.length);
  };

  return (
    <div className="space-y-8">
      {/* Tabs for quick doctor selection */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {DENTISALUD_TEAM.map((doctor, idx) => (
          <button
            key={doctor.name}
            onClick={() => setCurrentIndex(idx)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              idx === currentIndex
                ? 'bg-[#0A2540] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-[#EAF6F6] border border-slate-200'
            }`}
          >
            {doctor.name}
          </button>
        ))}
      </div>

      {/* Main Doctor Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 items-center">
          {/* Doctor Portrait / Graphic Frame */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-100 to-[#EAF6F6] p-6 sm:p-8 flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white group">
              <img
                src={currentMember.photo || '/images/dentisalud/29_doctora_en_escritorio.jpg'}
                alt={currentMember.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold tracking-wider uppercase text-teal-300 drop-shadow-xs">
                  DentiSalud Group
                </span>
                <div className="text-base font-serif font-bold drop-shadow-sm">
                  {currentMember.name}
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Bio and Credentials */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span>Especialista DentiSalud Group</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A2540]">
                {currentMember.name}
              </h3>
              <p className="text-sm font-semibold text-teal-800 leading-snug">
                {currentMember.role}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {currentMember.bio}
            </div>

            {currentMember.tags && (
              <div className="flex flex-wrap gap-2 pt-1">
                {currentMember.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#EAF6F6] text-[#0A2540] text-xs font-semibold border border-[#D5E8E8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Especialista {currentIndex + 1} de {DENTISALUD_TEAM.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 transition"
                  aria-label="Especialista anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 transition"
                  aria-label="Siguiente especialista"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
