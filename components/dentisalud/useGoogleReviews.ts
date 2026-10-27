'use client';

import { useState, useEffect } from 'react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

interface GoogleReviewsData {
  rating: number;
  reviewsCount: number;
  loading: boolean;
  source: string;
}

let cachedData: { rating: number; reviewsCount: number; source: string } | null = null;

export function useGoogleReviews(): GoogleReviewsData {
  const [data, setData] = useState<{ rating: number; reviewsCount: number; source: string }>({
    rating: cachedData?.rating ?? DENTISALUD_INFO.rating,
    reviewsCount: cachedData?.reviewsCount ?? DENTISALUD_INFO.reviewsCount,
    source: cachedData?.source ?? 'default',
  });
  const [loading, setLoading] = useState<boolean>(!cachedData);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchReviews() {
      try {
        const res = await fetch('/api/google-reviews');
        if (res.ok) {
          const json = await res.json();
          if (json.reviewsCount && isMounted) {
            cachedData = {
              rating: json.rating || DENTISALUD_INFO.rating,
              reviewsCount: json.reviewsCount || DENTISALUD_INFO.reviewsCount,
              source: json.source || 'api',
            };
            setData(cachedData);
          }
        }
      } catch (err) {
        // Fallback gracefully to default
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    rating: data.rating,
    reviewsCount: data.reviewsCount,
    loading,
    source: data.source,
  };
}
