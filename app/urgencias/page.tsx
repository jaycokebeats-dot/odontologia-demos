import React from 'react';
import { Metadata } from 'next';
import { DentiSaludUrgenciasPage } from '@/components/dentisalud/UrgenciasPage';

export const metadata: Metadata = {
  title: 'Urgencias Odontológicas en Belgrano | DentiSalud Group',
  description: 'Atención de urgencias dentales en Belgrano, CABA. Dolor de muela, dientes fracturados, hinchazón. Escribinos por WhatsApp.',
};

export default function RootUrgenciasPage() {
  return <DentiSaludUrgenciasPage basePath="" />;
}
