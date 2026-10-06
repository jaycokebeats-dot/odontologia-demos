import React from 'react';
import { Metadata } from 'next';
import { DentiSaludHomePage } from '@/components/dentisalud/HomePage';

export const metadata: Metadata = {
  title: 'Dentistas en Belgrano, CABA | DentiSalud Group • Dra. Nathaly Martínez',
  description: 'Implantes, diseño de sonrisa, ortodoncia, arreglo de caries y urgencias. Lun a sáb de 9 a 19:30. Reservá por WhatsApp.',
  keywords: [
    'odontología Belgrano',
    'dentista Belgrano',
    'consultorio odontológico Belgrano',
    'Dra Nathaly Martinez',
    'DentiSalud Group',
    'implantes dentales Belgrano',
    'diseño de sonrisa Belgrano',
  ],
  openGraph: {
    title: 'Dentistas en Belgrano, CABA | DentiSalud Group',
    description: 'Implantes, diseño de sonrisa, ortodoncia, arreglo de caries y urgencias.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'DentiSalud Group',
  },
};

export default function RootPage() {
  return <DentiSaludHomePage basePath="" />;
}
