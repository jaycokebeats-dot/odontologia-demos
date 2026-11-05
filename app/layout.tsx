import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { TrackingScripts } from "@/components/dentisalud/TrackingScripts";
import { StructuredData } from "@/components/dentisalud/StructuredData";

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
  metadataBase: new URL("https://dentisaludgroup.com.ar"),
  title: {
    default: "DentiSalud Group | Odontología de Alta Precisión en Belgrano",
    template: "%s | DentiSalud Group",
  },
  description: "Atención odontológica integral, estética dental, implantes y ortodoncia con tecnología de vanguardia en Belgrano, CABA.",
  verification: {
    google: 'SlqfCqV7g-Q2vxzaK58sCpoouQSamP45sJXsz6a7PSg',
  },
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
  alternates: {
    canonical: "https://dentisaludgroup.com.ar",
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${lora.variable} font-sans antialiased bg-slate-50 text-slate-800`}
      >
        <TrackingScripts />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
