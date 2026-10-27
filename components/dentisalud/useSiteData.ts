'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  SiteData,
  getDefaultSiteData,
  getSiteData,
  saveSiteData,
  resetSiteData as resetSiteDataFn,
} from '@/lib/supabase';

let memoryCache: SiteData | null = null;

export function useSiteData() {
  const [data, setData] = useState<SiteData>(() => memoryCache || getDefaultSiteData());
  const [loading, setLoading] = useState<boolean>(!memoryCache);

  const refreshData = useCallback(async () => {
    try {
      const current = await getSiteData();
      memoryCache = current;
      setData(current);
    } catch (e) {
      console.warn('Error refreshing site data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener('dentisalud_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('dentisalud_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshData]);

  const updateData = useCallback(async (partial: Partial<SiteData>) => {
    const res = await saveSiteData(partial);
    if (res.success) {
      await refreshData();
    }
    return res;
  }, [refreshData]);

  const resetData = useCallback(async () => {
    const res = await resetSiteDataFn();
    if (res.success) {
      await refreshData();
    }
    return res;
  }, [refreshData]);

  return {
    siteData: data,
    info: data.info,
    treatments: data.treatments,
    featuredPhotos: data.featuredPhotos,
    cases: data.cases,
    reviews: data.reviews,
    team: data.team || getDefaultSiteData().team,
    nosotrosInfo: data.nosotrosInfo || getDefaultSiteData().nosotrosInfo,
    loading,
    updateData,
    resetData,
    refreshData,
  };
}
