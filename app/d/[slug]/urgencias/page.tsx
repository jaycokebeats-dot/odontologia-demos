import React from 'react';
import { Metadata } from 'next';
import { DentiSaludUrgenciasPage } from '@/components/dentisalud/UrgenciasPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Urgencias Odontológicas en Belgrano | DentiSalud Group',
    description: 'Atención de urgencias dentales en Belgrano, CABA. Dolor de muela, dientes fracturados, hinchazón. Escribinos por WhatsApp.',
  };
}

export default async function UrgenciasRoutePage({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludUrgenciasPage basePath={`/d/${slug}`} />;
}
