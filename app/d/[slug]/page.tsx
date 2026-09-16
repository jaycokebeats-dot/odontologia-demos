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
  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    return {
      title: 'Consultorio Odontológico No Encontrado',
    };
  }

  const title = `${dentist.nombre} | Odontología en ${dentist.ciudad} • ${dentist.rating}★`;
  const description = `${dentist.subtitulo}. Ubicación: ${dentist.direccion}, ${dentist.ciudad}. Calificación: ${dentist.rating}⭐ en Google Maps (${dentist.reviews_count} opiniones). Reserva tu turno fácil por WhatsApp.`;
  const heroImage = dentist.fotos && dentist.fotos.length > 0 ? dentist.fotos[0] : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80';

  return {
    title,
    description,
    keywords: [
      `odontología ${dentist.ciudad}`,
      `dentista ${dentist.ciudad}`,
      `consultorio odontológico ${dentist.ciudad}`,
      `ortodoncia ${dentist.ciudad}`,
      `implantes dentales ${dentist.ciudad}`,
      `blanqueamiento dental`,
      `turnos odontólogo ${dentist.ciudad}`,
      dentist.nombre,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_AR',
      siteName: dentist.nombre,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${dentist.nombre} - Consultorio Odontológico en ${dentist.ciudad}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DentistPage({ params }: PageProps) {
  const { slug } = await params;
  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    notFound();
  }

  const heroPhoto =
    dentist.fotos && dentist.fotos.length > 0
      ? dentist.fotos[0]
      : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80';

  // Schema.org JSON-LD structured data for Google Local SEO (Dentist / MedicalBusiness)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: dentist.nombre,
    description: dentist.subtitulo,
    telephone: dentist.telefono,
    image: heroPhoto,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dentist.direccion,
      addressLocality: dentist.ciudad,
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: dentist.rating,
      reviewCount: dentist.reviews_count,
      bestRating: '5',
      worstRating: '1',
    },
    openingHours: dentist.horarios,
    priceRange: '$$',
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Inject JSON-LD Schema.org for Google Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
