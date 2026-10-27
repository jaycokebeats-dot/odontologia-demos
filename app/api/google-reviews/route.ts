import { NextResponse } from 'next/server';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

// Cache route for 1 hour on Vercel CDN, revalidate in background
export const revalidate = 3600;

export async function GET() {
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const placeId = 'ChIJvTkZEpq1vJURytUlk-mUmlc';

  if (!apiKey) {
    return NextResponse.json(
      {
        rating: DENTISALUD_INFO.rating || 5.0,
        reviewsCount: DENTISALUD_INFO.reviewsCount || 77,
        placeId,
        source: 'fallback_default',
        message: 'Para activar la actualización en vivo, agrega GOOGLE_PLACES_API_KEY en las variables de entorno de Vercel.',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,name&key=${apiKey}&language=es`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Google Places API returned status ${res.status}`);
    }

    const data = await res.json();

    if (data.status === 'OK' && data.result) {
      const rating = typeof data.result.rating === 'number' ? data.result.rating : DENTISALUD_INFO.rating;
      const reviewsCount =
        typeof data.result.user_ratings_total === 'number'
          ? data.result.user_ratings_total
          : DENTISALUD_INFO.reviewsCount;

      return NextResponse.json(
        {
          rating,
          reviewsCount,
          placeId,
          placeName: data.result.name,
          source: 'google_places_api',
          updatedAt: new Date().toISOString(),
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    } else {
      console.warn('Google Places API response status not OK:', data.status, data.error_message);
      return NextResponse.json(
        {
          rating: DENTISALUD_INFO.rating || 5.0,
          reviewsCount: DENTISALUD_INFO.reviewsCount || 77,
          placeId,
          source: 'fallback_api_warning',
          apiStatus: data.status,
          apiError: data.error_message,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          },
        }
      );
    }
  } catch (error: any) {
    console.error('Error fetching Google Places reviews:', error);
    return NextResponse.json(
      {
        rating: DENTISALUD_INFO.rating || 5.0,
        reviewsCount: DENTISALUD_INFO.reviewsCount || 77,
        placeId,
        source: 'fallback_error',
        error: error.message,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  }
}
