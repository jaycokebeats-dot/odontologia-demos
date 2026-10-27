import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

export const revalidate = 3600;

const configPath = path.join(process.cwd(), 'data', 'dentisalud-reviews-config.json');

function getStoredConfig(): { rating?: number; reviewsCount?: number; apiKey?: string } | null {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
  } catch (e) {}
  return null;
}

let memoryConfig: { rating?: number; reviewsCount?: number; apiKey?: string } | null = null;

export async function GET() {
  if (!memoryConfig) {
    memoryConfig = getStoredConfig();
  }

  const apiKey =
    memoryConfig?.apiKey ||
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const placeId = 'ChIJvTkZEpq1vJURytUlk-mUmlc';

  const envCount = process.env.GOOGLE_REVIEWS_COUNT ? parseInt(process.env.GOOGLE_REVIEWS_COUNT, 10) : undefined;
  const currentCount = memoryConfig?.reviewsCount ?? envCount ?? DENTISALUD_INFO.reviewsCount ?? 93;
  const currentRating = memoryConfig?.rating ?? DENTISALUD_INFO.rating ?? 5.0;

  if (!apiKey) {
    return NextResponse.json(
      {
        rating: currentRating,
        reviewsCount: currentCount,
        placeId,
        source: 'fallback_default',
        message: 'Para sincronización automática en tiempo real con Google Maps, ingresá tu GOOGLE_PLACES_API_KEY en Vercel o en el panel de administración.',
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
      const rating = typeof data.result.rating === 'number' ? data.result.rating : (memoryConfig?.rating ?? DENTISALUD_INFO.rating);
      const reviewsCount =
        typeof data.result.user_ratings_total === 'number'
          ? data.result.user_ratings_total
          : (memoryConfig?.reviewsCount ?? DENTISALUD_INFO.reviewsCount);

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
          rating: currentRating,
          reviewsCount: currentCount,
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
        rating: currentRating,
        reviewsCount: currentCount,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reviewsCount, rating, apiKey } = body;

    const newConfig = {
      reviewsCount: typeof reviewsCount === 'number' ? reviewsCount : parseInt(reviewsCount, 10) || 93,
      rating: typeof rating === 'number' ? rating : parseFloat(rating) || 5.0,
      apiKey: typeof apiKey === 'string' && apiKey.trim() ? apiKey.trim() : undefined,
    };

    memoryConfig = newConfig;

    try {
      fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write config to disk (serverless environment)');
    }

    return NextResponse.json({ success: true, config: newConfig });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
