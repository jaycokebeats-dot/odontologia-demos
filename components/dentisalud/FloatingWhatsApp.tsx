import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DENTISALUD_INFO } from '@/data/dentisalud-data';

export function DentiSaludFloatingWhatsApp() {
  return (
    <a
      href={DENTISALUD_INFO.whatsappGeneral}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition transform hover:scale-105 group border border-teal-600/30"
      aria-label="WhatsApp DentiSalud"
      suppressHydrationWarning
    >
      <MessageCircle className="w-5 h-5 fill-white text-[#128C7E]" />
      <span className="text-xs font-bold tracking-wide">
        Agendar por WhatsApp
      </span>
    </a>
  );
}
