'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { DENTISALUD_TEAM, TeamMember } from '@/data/dentisalud-data';
import { useSiteData } from '@/components/dentisalud/useSiteData';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TeamCarousel() {
  const { team: siteTeam } = useSiteData();
  const activeTeam = (siteTeam && siteTeam.length > 0 ? siteTeam : DENTISALUD_TEAM).filter(
    (m) => m.active !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex = currentIndex >= activeTeam.length ? 0 : currentIndex;
  const currentMember: TeamMember = activeTeam[safeIndex] || DENTISALUD_TEAM[0];

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? activeTeam.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p + 1) % activeTeam.length);
  };

  if (!activeTeam.length) return null;

  return (
    <div className="space-y-8">
      {/* Tabs for quick doctor selection */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {activeTeam.map((doctor, idx) => (
          <button
            key={doctor.id || doctor.name}
            onClick={() => setCurrentIndex(idx)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              idx === safeIndex
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
        <div className="grid md:grid-cols-12 items-stretch min-h-[520px]">
          {/* Doctor Portrait / Graphic Frame */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-100 to-[#EAF6F6] p-6 sm:p-8 flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[300px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white group">
              <img
                src={currentMember.photo || '/images/dentisalud/37_nathaly.png'}
                alt={currentMember.name}
                className="w-full h-full object-cover object-top group-hover:scale-102 transition duration-500"
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
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
                <UserCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Especialista DentiSalud Group</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A2540]">
                {currentMember.name}
              </h3>
              <div className="min-h-[44px] flex items-center">
                <p className="text-sm font-semibold text-teal-800 leading-snug">
                  {currentMember.role}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal min-h-[175px] flex items-center">
              <p>{currentMember.bio}</p>
            </div>

            <div className="space-y-3">
              <div className="min-h-[34px] flex flex-wrap items-center gap-2">
                {currentMember.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#EAF6F6] text-[#0A2540] text-xs font-semibold border border-[#D5E8E8]"
                  >
                    {tag}
                  </span>
                ))}
                {currentMember.instagram && (
                  <a
                    href={currentMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 hover:from-purple-100 hover:to-pink-100 text-[#0A2540] text-xs font-bold border border-pink-200 shadow-2xs hover:shadow-xs transition transform hover:-translate-y-0.5"
                    title={`Instagram de ${currentMember.name}`}
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                    <span>{currentMember.instagramHandle || 'Instagram'}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Especialista {safeIndex + 1} de {activeTeam.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 transition cursor-pointer"
                  aria-label="Especialista anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#EAF6F6] text-[#0A2540] border border-slate-200 transition cursor-pointer"
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
