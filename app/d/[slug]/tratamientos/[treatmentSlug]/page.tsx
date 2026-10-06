import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TREATMENTS } from '@/data/dentisalud-data';
import { DentiSaludTratamientoDetailPage } from '@/components/dentisalud/TratamientoDetailPage';

interface PageProps {
  params: Promise<{
    slug: string;
    treatmentSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string; treatmentSlug: string }[] = [];
  const dentistSlugs = ['dra-nathaly-martinez'];

  for (const slug of dentistSlugs) {
    for (const t of TREATMENTS) {
      params.push({ slug, treatmentSlug: t.slug });
    }
  }

  return params;
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

export default async function TreatmentDetailRoutePage({ params }: PageProps) {
  const { slug, treatmentSlug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === treatmentSlug);

  if (!treatment) {
    notFound();
  }

  return <DentiSaludTratamientoDetailPage treatment={treatment} basePath={`/d/${slug}`} />;
}
