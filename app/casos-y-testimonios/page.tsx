import React from 'react';
import { Metadata } from 'next';
import { DentiSaludCasosPage } from '@/components/dentisalud/CasosPage';

export const metadata: Metadata = {
  title: 'Resultados Reales y Testimonios | DentiSalud Group • Dra. Nathaly Martínez',
  description: 'Casos clínicos de implantes, diseño de sonrisa, blanqueamiento y reseñas verificadas de pacientes en Belgrano.',
};

export default function RootCasosPage() {
  return <DentiSaludCasosPage basePath="" />;
}
