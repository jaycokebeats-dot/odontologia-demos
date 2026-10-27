'use client';

import React from 'react';
import Link from 'next/link';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';
import { useSiteData } from './useSiteData';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.34-6.32V9.08a8.2 8.2 0 0 0 4.81 1.55v-3.5a4.83 4.83 0 0 1-.91-.44z"/>
    </svg>
  );
}

interface FooterProps {
  basePath?: string;
}

export function DentiSaludFooter({ basePath = '/d/dra-nathaly-martinez' }: FooterProps) {
  const { info } = useSiteData();
  const instagramUrl = info.socials?.instagram || DENTISALUD_INFO.socials.instagram;
  const tiktokUrl = info.socials?.tiktok || DENTISALUD_INFO.socials.tiktok;
  const phoneText = info.phone || DENTISALUD_INFO.phone;
  const waUrl = info.whatsappGeneral || DENTISALUD_INFO.whatsappGeneral;
  const addressText = info.address || DENTISALUD_INFO.address;

  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-12 border-t border-[#0F355A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#133C63]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={basePath || '/'} className="flex items-center gap-3.5 group">
              <img
                src="/images/dentisalud/logo_dentisalud_white.png"
                alt="DentiSalud Group by Dra. Nathaly Martínez"
                className="h-9 sm:h-11 w-auto object-contain transition group-hover:scale-102"
              />
            </Link>
            <p className="text-sm text-slate-300 max-w-sm font-light leading-relaxed">
              Odontología integral en el corazón de Belgrano, CABA. Atención personalizada, materiales de alta durabilidad y tecnología de última generación.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de DentiSalud Group"
                className="w-10 h-10 rounded-full bg-[#133C63] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110 hover:shadow-lg"
                title="Seguinos en Instagram @dentisaludgroup"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de DentiSalud Group"
                className="w-10 h-10 rounded-full bg-[#133C63] hover:bg-black text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110 hover:shadow-lg hover:border hover:border-slate-700"
                title="Seguinos en TikTok @dentisalud.arg"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Tratamientos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Tratamientos
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-light">
              <li>
                <Link href={`${basePath}/tratamientos/diseno-de-sonrisa`} className="hover:text-white transition">
                  Diseño de sonrisa
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/tratamientos/blanqueamiento-dental`} className="hover:text-white transition">
                  Blanqueamiento
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/tratamientos/implantes-dentales`} className="hover:text-white transition">
                  Implantes dentales
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/tratamientos/ortodoncia`} className="hover:text-white transition">
                  Ortodoncia
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/tratamientos`} className="hover:text-white transition font-medium text-teal-200">
                  Todos los tratamientos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Clínica */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Clínica
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-light">
              <li>
                <Link href={`${basePath}/nosotros`} className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/casos-y-testimonios`} className="hover:text-white transition">
                  Casos y testimonios
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/blog`} className="hover:text-white transition">
                  Blog de Salud Bucal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacto & Redes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Contacto
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-light">
              <p className="font-normal text-white">{addressText}</p>
              <p>{DENTISALUD_INFO.hours}</p>
              <p className="pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-teal-300 font-medium hover:underline"
                >
                  WhatsApp: {phoneText}
                </a>
              </p>
              <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-300">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-300 transition"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>@dentisaludgroup</span>
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-300 transition"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-white" />
                  <span>@dentisalud.arg</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-light">
          <p>© 2026 DentiSalud Group by Dra. Nathaly Martínez. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 transition cursor-pointer">Política de privacidad</span>
            <span>·</span>
            <span className="hover:text-slate-200 transition cursor-pointer">Términos y condiciones</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-teal-300 transition text-[10px] text-slate-500">
              Acceso panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
