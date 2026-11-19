import React from 'react';
import { Metadata } from 'next';
import { DentiSaludTratamientosPage } from '@/components/dentisalud/TratamientosPage';

export const metadata: Metadata = {
  title: 'Tratamientos Odontológicos en Belgrano | DentiSalud Group',
  description: 'Implantes, diseño de sonrisa, blanqueamiento, ortodoncia, arreglo de caries, urgencias y más. Tratamientos odontológicos en Belgrano con atención personalizada.',
  alternates: {
    canonical: 'https://dentisaludgroup.com.ar/tratamientos',
  },
};

export default function RootTratamientosPage() {
  return <DentiSaludTratamientosPage basePath="" />;
}
