import React from 'react';
import { Metadata } from 'next';
import { DentiSaludBlogPage } from '@/components/dentisalud/BlogPage';

export const metadata: Metadata = {
  title: 'Blog de Salud Bucal | DentiSalud Group • Dra. Nathaly Martínez',
  description: 'Guías claras sobre tratamientos, cuidados y alternativas odontológicas. El blog de DentiSalud Group, tu dentista de confianza en Belgrano.',
};

export default function RootBlogPage() {
  return <DentiSaludBlogPage basePath="" />;
}
