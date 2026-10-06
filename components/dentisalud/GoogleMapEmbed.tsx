'use client';

import React from 'react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

interface GoogleMapEmbedProps {
  className?: string;
  height?: string;
}

export function GoogleMapEmbed({ className = '', height = '100%' }: GoogleMapEmbedProps) {
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 ${className}`}>
      <iframe
        title="Dra. Nathaly Martínez | DentiSalud Group en Google Maps"
        src={DENTISALUD_INFO.mapsEmbedUrl}
        width="100%"
        height={height}
        style={{ border: 0, minHeight: '320px' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-3xl"
      />
    </div>
  );
}
