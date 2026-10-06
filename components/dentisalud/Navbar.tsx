'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

interface NavbarProps {
  basePath?: string; // e.g. '' for root or '/d/dra-nathaly-martinez'
}

export function DentiSaludNavbar({ basePath = '/d/dra-nathaly-martinez' }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tratamientos', href: `${basePath}/tratamientos` },
    { label: 'Casos y testimonios', href: `${basePath}/casos-y-testimonios` },
    { label: 'Nosotros', href: `${basePath}/nosotros` },
    { label: 'Blog', href: `${basePath}/blog` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={basePath || '/'} className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition transform border border-teal-500/20">
              <span className="text-2xl font-serif font-black">D</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-black text-[#0A2540] leading-none tracking-tight">
                DentiSalud
              </span>
              <span className="block text-[11px] font-extrabold text-teal-800 uppercase tracking-[0.18em] mt-1">
                BY NATHALY MARTÍNEZ
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-[#0A2540] ${
                    isActive ? 'text-[#0A2540] font-bold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={DENTISALUD_INFO.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-[#051E34] text-white text-xs font-bold px-5 py-3 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#0A2540]" />
              <span>Reservar por WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-semibold transition ${
                pathname === link.href ? 'bg-[#EAF6F6] text-[#0A2540]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href={DENTISALUD_INFO.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0A2540] text-white text-sm font-bold py-3.5 px-6 rounded-full shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#0A2540]" />
              <span>Reservar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
