'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { PATIENT_REVIEWS, DENTISALUD_INFO } from '@/data/dentisalud-data';

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PATIENT_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? PATIENT_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % PATIENT_REVIEWS.length);
  };

  return (
    <div className="bg-[#0A2540] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#133C63] min-h-[280px]">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-teal-300">
          <Quote className="w-4 h-4" />
          <span>Google Reviews ({DENTISALUD_INFO.reviewsCount})</span>
        </div>
      </div>

      {/* Review Text */}
      <div className="my-6 z-10 transition-all duration-300">
        <p className="text-sm sm:text-base italic leading-relaxed text-slate-100 font-normal">
          "{PATIENT_REVIEWS[currentIndex].comment}"
        </p>
      </div>

      {/* Author & Controls */}
      <div className="pt-4 border-t border-[#133C63] flex items-center justify-between z-10">
        <div>
          <div className="font-bold text-sm text-white">
            {PATIENT_REVIEWS[currentIndex].name}
          </div>
          <div className="text-xs text-teal-300">
            {PATIENT_REVIEWS[currentIndex].treatment} · {PATIENT_REVIEWS[currentIndex].date}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevReview}
            className="w-8 h-8 rounded-full bg-[#133C63] hover:bg-[#1C4E7D] text-white flex items-center justify-center transition"
            aria-label="Opinión anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextReview}
            className="w-8 h-8 rounded-full bg-[#133C63] hover:bg-[#1C4E7D] text-white flex items-center justify-center transition"
            aria-label="Siguiente opinión"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
