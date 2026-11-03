import React from 'react';

export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
        '@id': 'https://dentisaludgroup.com.ar/#organization',
        name: 'DentiSalud Group',
        alternateName: [
          'DentiSalud Group by Dra. Nathaly Martinez',
          'DentiSalud Belgrano',
          'DentiSalud Group Belgrano',
          'Dra. Nathaly Martínez Odontología',
        ],
        url: 'https://dentisaludgroup.com.ar',
        logo: 'https://dentisaludgroup.com.ar/images/dentisalud/logo_dentisalud.png',
        image: 'https://dentisaludgroup.com.ar/images/dentisalud/21_consultorio_principal.jpg',
        telephone: '+54 9 11 2877-9912',
        priceRange: '$$',
        currenciesAccepted: 'ARS, USD',
        paymentAccepted: 'Cash, Credit Card, Debit Card, Mercado Pago, Transfer',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ciudad de la Paz 1965',
          addressLocality: 'Belgrano',
          addressRegion: 'Ciudad Autónoma de Buenos Aires',
          postalCode: 'C1428',
          addressCountry: 'AR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -34.5638503,
          longitude: -58.4565009,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:30',
          },
        ],
        founder: {
          '@type': 'Person',
          name: 'Dra. Nathaly Martínez',
          jobTitle: 'Directora Odontológica, Esp. en Implantología y Estética Dental',
          sameAs: ['https://www.instagram.com/od.nathalymartinez/'],
        },
        sameAs: [
          'https://www.instagram.com/dentisaludgroup/',
          'https://www.tiktok.com/@dentisalud.arg',
          'https://www.google.com/maps/place/Dra.Nathaly+Martinez+%7C+DentiSalud+Group/data=!4m7!3m6!1s0x95bcb59a121939bd:0x579a94e99325d5ca!8m2!3d-34.5638503!4d-58.4565009!16s%2Fg%2F11zhbdgjj5!19sChIJvTkZEpq1vJURytUlk-mUmlc',
        ],
        hasMap:
          'https://www.google.com/maps/place/Dra.Nathaly+Martinez+%7C+DentiSalud+Group/data=!4m7!3m6!1s0x95bcb59a121939bd:0x579a94e99325d5ca!8m2!3d-34.5638503!4d-58.4565009!16s%2Fg%2F11zhbdgjj5!19sChIJvTkZEpq1vJURytUlk-mUmlc',
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Belgrano, CABA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Colegiales, CABA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Núñez, CABA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Ciudad Autónoma de Buenos Aires',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '96',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
