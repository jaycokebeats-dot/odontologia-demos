import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDentistBySlug, getAllDentistSlugs } from '@/data/dentist-helpers';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Specialties } from '@/components/Specialties';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Reviews } from '@/components/Reviews';
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
  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    return {
      title: 'Consultorio Odontológico No Encontrado',
    };
  }

  return {
    title: `${dentist.nombre} | Odontología en ${dentist.ciudad} • ${dentist.rating}★`,
    description: `${dentist.subtitulo}. Ubicación: ${dentist.direccion}, ${dentist.ciudad}. Calificación: ${dentist.rating} en Google Maps (${dentist.reviews_count} opiniones). Turnos por WhatsApp.`,
  };
}

export default async function DentistPage({ params }: PageProps) {
  const { slug } = await params;
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
      <LocationMap dentist={dentist} />
      <Footer dentist={dentist} />
      <FloatingWhatsApp dentist={dentist} />
    </main>
  );
}
