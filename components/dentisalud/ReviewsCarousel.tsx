'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { PATIENT_REVIEWS, PatientReview, DENTISALUD_INFO } from '@/data/dentisalud-data';

interface ReviewsCarouselProps {
  reviews?: PatientReview[];
  titleBadge?: string;
}

export function ReviewsCarousel({ reviews = PATIENT_REVIEWS, titleBadge }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeReviews = reviews && reviews.length > 0 ? reviews : PATIENT_REVIEWS;

  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeReviews.length]);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
  };

  const currentItem = activeReviews[currentIndex] || activeReviews[0];

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
          <span>{titleBadge || `Google Reviews (${DENTISALUD_INFO.reviewsCount})`}</span>
        </div>
      </div>

      {/* Review Text */}
      <div className="my-6 z-10 transition-all duration-300">
        <p className="text-sm sm:text-base italic leading-relaxed text-slate-100 font-normal">
          "{currentItem.comment}"
        </p>
      </div>

      {/* Author & Controls */}
      <div className="pt-4 border-t border-[#133C63] flex items-center justify-between z-10">
        <div>
          <div className="font-bold text-sm text-white">
            {currentItem.name}
          </div>
          <div className="text-xs text-teal-300">
            {currentItem.treatment} · {currentItem.date}
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
