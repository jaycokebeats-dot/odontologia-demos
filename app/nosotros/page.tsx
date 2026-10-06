import React from 'react';
import { Metadata } from 'next';
import { DentiSaludNosotrosPage } from '@/components/dentisalud/NosotrosPage';

export const metadata: Metadata = {
  title: 'Clínica Odontológica en Belgrano | DentiSalud Group • Dra. Nathaly Martínez',
  description: 'DentiSalud Group: odontología integral en Belgrano, liderada por la Dra. Nathaly Martínez. Tecnología, atención personalizada y tiempo para vos.',
};

export default function RootNosotrosPage() {
  return <DentiSaludNosotrosPage basePath="" />;
}
