import React from 'react';
import { Metadata } from 'next';
import { DentiSaludCasosPage } from '@/components/dentisalud/CasosPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Resultados Reales y Testimonios | DentiSalud Group • Dra. Nathaly Martínez',
    description: 'Casos clínicos de implantes, diseño de sonrisa, blanqueamiento y reseñas verificadas de pacientes en Belgrano.',
  };
}

export default async function CasosRoutePage({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludCasosPage basePath={`/d/${slug}`} />;
}
