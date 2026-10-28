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
      openGraph: {
        title: 'Dentistas en Belgrano, CABA | DentiSalud Group',
        description: 'Implantes, diseño de sonrisa, ortodoncia, arreglo de caries y urgencias.',
        type: 'website',
        locale: 'es_AR',
        url: 'https://odontologia-demos.vercel.app/d/dra-nathaly-martinez',
        siteName: 'DentiSalud Group',
        images: [
          {
            url: 'https://odontologia-demos.vercel.app/images/dentisalud/35_recepci_n_doctora.jpg',
            width: 1200,
            height: 630,
            alt: 'DentiSalud Group',
          },
        ],
      },
    };
  }

  const dentist = getDentistBySlug(slug);

  if (!dentist) {
    return {
      title: 'Consultorio Odontológico No Encontrado',
    };
  }

  const ratingStr = dentist.slug === 'dlt-odontologia' ? '5.0' : `${dentist.rating}`;
  const title = `${dentist.nombre} | Consultorio Odontológico en ${dentist.ciudad} • ${ratingStr}★`;
  const description = `${dentist.subtitulo}. Ubicación: ${dentist.direccion}, ${dentist.ciudad}. Calificación: ${ratingStr}⭐ en Google Maps (${dentist.reviews_count} opiniones). Reserva tu turno fácil por WhatsApp.`;

  // Determine primary photo for social preview (WhatsApp, Twitter, Facebook)
  let rawPhoto = dentist.fotos && dentist.fotos.length > 0 ? dentist.fotos[0] : '/images/dlt-hero-consultorio.png';
  if (dentist.slug === 'dlt-odontologia') {
    rawPhoto = '/images/dlt-hero-consultorio.png';
  }

  const ogImageUrl = rawPhoto.startsWith('http')
    ? rawPhoto
    : `https://odontologia-demos.vercel.app${rawPhoto.startsWith('/') ? '' : '/'}${rawPhoto}`;

  const canonicalUrl = `https://odontologia-demos.vercel.app/d/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: canonicalUrl,
      siteName: dentist.nombre,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${dentist.nombre} - ${dentist.direccion}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
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

  let rawPhoto = dentist.fotos && dentist.fotos.length > 0 ? dentist.fotos[0] : '/images/dlt-hero-consultorio.png';
  if (dentist.slug === 'dlt-odontologia') {
    rawPhoto = '/images/dlt-hero-consultorio.png';
  }
  const photoUrl = rawPhoto.startsWith('http')
    ? rawPhoto
    : `https://odontologia-demos.vercel.app${rawPhoto.startsWith('/') ? '' : '/'}${rawPhoto}`;

  const ratingStr = dentist.slug === 'dlt-odontologia' ? '5.0' : `${dentist.rating}`;

  const dentistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: dentist.nombre,
    image: photoUrl,
    description: dentist.subtitulo,
    telephone: dentist.telefono,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dentist.direccion,
      addressLocality: dentist.ciudad,
      addressCountry: 'AR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingStr,
      reviewCount: `${dentist.reviews_count}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
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
    </>
  );
}
