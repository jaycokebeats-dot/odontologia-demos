import React from 'react';
import Link from 'next/link';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

interface FooterProps {
  basePath?: string;
}

export function DentiSaludFooter({ basePath = '/d/dra-nathaly-martinez' }: FooterProps) {
  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-12 border-t border-[#0F355A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#133C63]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={basePath || '/'} className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full bg-white text-[#0A2540] flex items-center justify-center font-bold shadow-md">
                <span className="text-2xl font-serif font-black">D</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-black text-white leading-none tracking-tight">
                  DentiSalud
                </span>
                <span className="block text-[11px] font-extrabold text-teal-300 uppercase tracking-[0.18em] mt-1">
                  BY NATHALY MARTÍNEZ
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm font-light leading-relaxed">
              Odontología integral en el corazón de Belgrano, CABA. Atención personalizada, materiales de alta durabilidad y tecnología de última generación.
            </p>
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

          {/* Column 3: Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Contacto
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-light">
              <p className="font-normal text-white">{DENTISALUD_INFO.address}</p>
              <p>{DENTISALUD_INFO.hours}</p>
              <p className="pt-1">
                <a
                  href={DENTISALUD_INFO.whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-teal-300 font-medium hover:underline"
                >
                  WhatsApp: {DENTISALUD_INFO.phone}
                </a>
              </p>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
