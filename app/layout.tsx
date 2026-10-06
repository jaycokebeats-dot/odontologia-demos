import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://odontologia-demos.vercel.app"),
  title: {
    default: "Dentistas en Belgrano, CABA | DentiSalud Group • Dra. Nathaly Martínez",
    template: "%s | DentiSalud Group • Belgrano",
  },
  description: "Clínica dental en Belgrano, CABA. Dra. Nathaly Martínez: implantes dentales, diseño de sonrisa, carillas, blanqueamiento, ortodoncia y urgencias 24/7. Turnos por WhatsApp.",
  keywords: [
    "dentistas en Belgrano",
    "odontología Belgrano CABA",
    "Dra Nathaly Martinez",
    "DentiSalud Group",
    "implantes dentales Belgrano",
    "diseño de sonrisa CABA",
    "carillas dentales Belgrano",
    "blanqueamiento dental Belgrano",
    "urgencias odontologicas Belgrano",
  ],
  authors: [{ name: "Dra. Nathaly Martínez", url: "https://odontologia-demos.vercel.app" }],
  creator: "DentiSalud Group",
  publisher: "DentiSalud Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://odontologia-demos.vercel.app",
    siteName: "DentiSalud Group • Dra. Nathaly Martínez",
    title: "Dentistas en Belgrano, CABA | DentiSalud Group • Dra. Nathaly Martínez",
    description: "Implantes, diseño de sonrisa, carillas, ortodoncia y urgencias dentales en Belgrano. Atención personalizada con la Dra. Nathaly Martínez.",
    images: [
      {
        url: "/images/dentisalud/35_recepci_n_doctora.jpg",
        width: 1200,
        height: 630,
        alt: "Dra. Nathaly Martínez - DentiSalud Group Belgrano",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "DentiSalud Group • Dra. Nathaly Martínez",
  "image": "https://odontologia-demos.vercel.app/images/dentisalud/35_recepci_n_doctora.jpg",
  "@id": "https://odontologia-demos.vercel.app/#dentist",
  "url": "https://odontologia-demos.vercel.app",
  "telephone": "+5491128779912",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ciudad de la Paz 1965",
    "addressLocality": "Belgrano, Buenos Aires",
    "postalCode": "C1428",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -34.5638503,
    "longitude": -58.4565009
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:30"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "68"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${lora.variable} font-sans antialiased bg-slate-50 text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}

