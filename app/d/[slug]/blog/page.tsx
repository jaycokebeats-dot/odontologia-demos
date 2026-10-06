import React from 'react';
import { Metadata } from 'next';
import { DentiSaludBlogPage } from '@/components/dentisalud/BlogPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Blog de Salud Bucal | DentiSalud Group • Dra. Nathaly Martínez',
    description: 'Guías claras sobre tratamientos, cuidados y alternativas odontológicas. El blog de DentiSalud Group, tu dentista de confianza en Belgrano.',
  };
}

export default async function BlogRoutePage({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludBlogPage basePath={`/d/${slug}`} />;
}
