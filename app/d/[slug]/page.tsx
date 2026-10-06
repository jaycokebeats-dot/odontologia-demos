import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDentistBySlug, getAllDentistSlugs } from '@/data/dentist-helpers';
import { DentiSaludHomePage } from '@/components/dentisalud/HomePage';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Specialties } from '@/components/Specialties';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Reviews } from '@/components/Reviews';
import { BlogPreview } from '@/components/BlogPreview';
import { LocationMap } from '@/components/LocationMap';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllDentistSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'dra-nathaly-martinez') {
    return {
      title: 'Dentistas en Belgrano, CABA | DentiSalud Group • Dra. Nathaly Martínez',
      description: 'Implantes, diseño de sonrisa, ortodoncia, arreglo de caries y urgencias. Lun a sáb de 9 a 19:30. Reservá por WhatsApp.',
      keywords: [
        'odontología Belgrano',
        'dentista Belgrano',
        'consultorio odontológico Belgrano',
        'Dra Nathaly Martinez',
        'DentiSalud Group',
        'implantes dentales Belgrano',
        'diseño de sonrisa Belgrano',
      ],
      openGraph: {
        title: 'Dentistas en Belgrano, CABA | DentiSalud Group',
        description: 'Implantes, diseño de sonrisa, ortodoncia, arreglo de caries y urgencias.',
        type: 'website',
        locale: 'es_AR',
        siteName: 'DentiSalud Group',
      },
    };
  }

  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    return {
      title: 'Consultorio Odontológico No Encontrado',
    };
  }

  const title = `${dentist.nombre} | Odontología en ${dentist.ciudad} • ${dentist.rating}★`;
  const description = `${dentist.subtitulo}. Ubicación: ${dentist.direccion}, ${dentist.ciudad}. Calificación: ${dentist.rating}⭐ en Google Maps (${dentist.reviews_count} opiniones). Reserva tu turno fácil por WhatsApp.`;

  return {
    title,
    description,
  };
}

export default async function DentistPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === 'dra-nathaly-martinez') {
    return <DentiSaludHomePage basePath={`/d/${slug}`} />;
  }

  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <TopBar dentist={dentist} />
      <Navbar dentist={dentist} />
      <Hero dentist={dentist} />
      <Specialties dentist={dentist} />
      <BeforeAfter dentist={dentist} />
      <Reviews dentist={dentist} />
      <BlogPreview dentist={dentist} />
      <LocationMap dentist={dentist} />
      <Footer dentist={dentist} />
      <FloatingWhatsApp dentist={dentist} />
    </main>
  );
}
