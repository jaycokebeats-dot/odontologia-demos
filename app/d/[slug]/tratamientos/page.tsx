import React from 'react';
import { Metadata } from 'next';
import { DentiSaludTratamientosPage } from '@/components/dentisalud/TratamientosPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: 'Tratamientos Odontológicos en Belgrano | DentiSalud Group',
    description: 'Implantes, diseño de sonrisa, blanqueamiento, ortodoncia, urgencias y más. Tratamientos odontológicos en Belgrano con atención personalizada.',
  };
}

export default async function TratamientosRoutePage({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludTratamientosPage basePath={`/d/${slug}`} />;
}
