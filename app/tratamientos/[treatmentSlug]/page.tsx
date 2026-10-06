import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TREATMENTS } from '@/data/dentisalud-data';
import { DentiSaludTratamientoDetailPage } from '@/components/dentisalud/TratamientoDetailPage';

interface PageProps {
  params: Promise<{
    treatmentSlug: string;
  }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({ treatmentSlug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { treatmentSlug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === treatmentSlug);

  if (!treatment) {
    return { title: 'Tratamiento No Encontrado' };
  }

  return {
    title: treatment.metaTitle,
    description: treatment.metaDescription,
  };
}

export default async function RootTreatmentDetailPage({ params }: PageProps) {
  const { treatmentSlug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === treatmentSlug);

  if (!treatment) {
    notFound();
  }

  return <DentiSaludTratamientoDetailPage treatment={treatment} basePath="" />;
}
