import React from 'react';
import { Metadata } from 'next';
import { DentiSaludNosotrosPage } from '@/components/dentisalud/NosotrosPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Clínica Odontológica en Belgrano | DentiSalud Group • Dra. Nathaly Martínez',
    description: 'DentiSalud Group: odontología integral en Belgrano, liderada por la Dra. Nathaly Martínez. Tecnología, atención personalizada y tiempo para vos.',
  };
}

export default async function NosotrosRoutePage({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludNosotrosPage basePath={`/d/${slug}`} />;
}
