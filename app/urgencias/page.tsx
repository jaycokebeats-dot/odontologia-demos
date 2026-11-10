import React from 'react';
import { Metadata } from 'next';
import { DentiSaludUrgenciasPage } from '@/components/dentisalud/UrgenciasPage';

export const metadata: Metadata = {
  title: 'Urgencias Odontológicas en Belgrano | DentiSalud Group • Dra. Nathaly Martínez',
  description: 'Atención de urgencias dentales en Belgrano, CABA. Dolor agudo, fracturas, inflamación o traumatismos. Escribinos por WhatsApp para atención inmediata.',
  alternates: {
    canonical: '/urgencias',
  },
};

export default function RootUrgenciasPage() {
  return <DentiSaludUrgenciasPage basePath="" />;
}
