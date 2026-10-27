import { createClient } from '@supabase/supabase-js';
import {
  DENTISALUD_INFO,
  TREATMENTS,
  PATIENT_REVIEWS,
  TreatmentDetail,
  PatientReview,
} from '@/data/dentisalud-data';
import {
  BEFORE_AFTER_CASES,
  TREATMENT_FEATURED_PHOTOS,
  BeforeAfterCase,
} from '@/data/dentisalud-photos';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sliqwmfzklqwjrxywndl.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsaXF3bWZ6a2xxd2pyeHl3bmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3OTU3MjMsImV4cCI6MjEwODM3MTcyM30.ZIfSCplqA6s0pDeG1BgDAr2hLz0NkYkkTmyvkkUVmb0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, options = {}) => fetch(url, { ...options, cache: 'no-store' }),
  },
});

export const DENTISALUD_DATA_SLUG = 'dentisalud-site-data';
export const STORAGE_KEY = 'dentisalud_site_data_v2';

export interface SiteData {
  info: typeof DENTISALUD_INFO;
  treatments: TreatmentDetail[];
  featuredPhotos: Record<string, string>;
  cases: BeforeAfterCase[];
  reviews: PatientReview[];
  updatedAt?: string;
}

export function getDefaultSiteData(): SiteData {
  return {
    info: { ...DENTISALUD_INFO, reviewsCount: 93, rating: 5.0 },
    treatments: JSON.parse(JSON.stringify(TREATMENTS)),
    featuredPhotos: { ...TREATMENT_FEATURED_PHOTOS },
    cases: JSON.parse(JSON.stringify(BEFORE_AFTER_CASES)),
    reviews: JSON.parse(JSON.stringify(PATIENT_REVIEWS)),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Obtener datos del sitio (Supabase -> LocalStorage -> Fallback Defaults)
 */
export async function getSiteData(): Promise<SiteData> {
  const defaults = getDefaultSiteData();

  // 1. Intentar desde Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('data')
        .eq('slug', DENTISALUD_DATA_SLUG)
        .maybeSingle();

      if (!error && data?.data && typeof data.data === 'object') {
        const cloudData = data.data as Partial<SiteData>;
        return {
          info: { ...defaults.info, ...(cloudData.info || {}) },
          treatments: cloudData.treatments && cloudData.treatments.length > 0 ? cloudData.treatments : defaults.treatments,
          featuredPhotos: { ...defaults.featuredPhotos, ...(cloudData.featuredPhotos || {}) },
          cases: cloudData.cases && cloudData.cases.length > 0 ? cloudData.cases : defaults.cases,
          reviews: cloudData.reviews && cloudData.reviews.length > 0 ? cloudData.reviews : defaults.reviews,
          updatedAt: cloudData.updatedAt || defaults.updatedAt,
        };
      }
    } catch (e) {
      console.warn('[Supabase] Error al leer datos de DentiSalud:', e);
    }
  }

  // 2. Fallback a localStorage local del navegador
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        return {
          info: { ...defaults.info, ...(parsed.info || {}) },
          treatments: parsed.treatments && parsed.treatments.length > 0 ? parsed.treatments : defaults.treatments,
          featuredPhotos: { ...defaults.featuredPhotos, ...(parsed.featuredPhotos || {}) },
          cases: parsed.cases && parsed.cases.length > 0 ? parsed.cases : defaults.cases,
          reviews: parsed.reviews && parsed.reviews.length > 0 ? parsed.reviews : defaults.reviews,
          updatedAt: parsed.updatedAt || defaults.updatedAt,
        };
      }
    } catch (e) {
      console.warn('[Storage] Error al leer localStorage:', e);
    }
  }

  return defaults;
}

/**
 * Guardar datos del sitio en Supabase y sincronizar con localStorage
 */
export async function saveSiteData(updated: Partial<SiteData>): Promise<{ success: boolean; error?: string }> {
  const current = await getSiteData();
  const merged: SiteData = {
    info: { ...current.info, ...(updated.info || {}) },
    treatments: updated.treatments || current.treatments,
    featuredPhotos: { ...current.featuredPhotos, ...(updated.featuredPhotos || {}) },
    cases: updated.cases || current.cases,
    reviews: updated.reviews || current.reviews,
    updatedAt: new Date().toISOString(),
  };

  // 1. Guardar en localStorage para feedback visual inmediato
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event('dentisalud_data_updated'));
      window.dispatchEvent(new CustomEvent('dentisalud_site_synced', { detail: merged }));
    } catch (e) {
      console.warn('[Storage] Error al escribir localStorage:', e);
    }
  }

  // 2. Guardar en Supabase en la nube
  if (supabase) {
    try {
      const { error } = await supabase.from('businesses').upsert(
        {
          slug: DENTISALUD_DATA_SLUG,
          data: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      );

      if (error) {
        console.error('[Supabase] Error al guardar en Supabase:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error('[Supabase] Excepción al guardar:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

/**
 * Restaurar datos predeterminados
 */
export async function resetSiteData(): Promise<{ success: boolean; error?: string }> {
  const defaults = getDefaultSiteData();
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('dentisalud_data_updated'));
    } catch (e) {}
  }

  if (supabase) {
    try {
      await supabase.from('businesses').delete().eq('slug', DENTISALUD_DATA_SLUG);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}
