import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Plataforma de Demos Odontológicas | Demos Premium",
  description: "Demos interactivas de alta conversión para consultorios odontológicos y clínicas dentales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${instrumentSerif.variable} font-sans antialiased bg-slate-50 text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
