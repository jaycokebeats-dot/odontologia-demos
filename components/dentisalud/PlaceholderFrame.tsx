import React from 'react';
import { Camera, Sparkles, User, Building2, Stethoscope, Image as ImageIcon } from 'lucide-react';

interface PlaceholderFrameProps {
  label?: string;
  sublabel?: string;
  aspectRatio?: string; // e.g. 'aspect-[4/3]', 'aspect-square', 'aspect-[16/9]'
  className?: string;
  type?: 'doctor' | 'clinic' | 'equipment' | 'case' | 'generic';
}

export function PlaceholderFrame({
  label = 'Foto de la clínica',
  sublabel = 'Próximamente fotos HD del consultorio',
  aspectRatio = 'aspect-[4/3]',
  className = '',
  type = 'generic',
}: PlaceholderFrameProps) {
  const getIcon = () => {
    switch (type) {
      case 'doctor':
        return <User className="w-8 h-8 text-[#0A2540]/60" />;
      case 'clinic':
        return <Building2 className="w-8 h-8 text-[#0A2540]/60" />;
      case 'equipment':
        return <Stethoscope className="w-8 h-8 text-[#0A2540]/60" />;
      case 'case':
        return <Sparkles className="w-8 h-8 text-teal-600/70" />;
      default:
        return <Camera className="w-8 h-8 text-[#0A2540]/60" />;
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAF6F6] via-[#F3FAFA] to-[#E2F2F2] border border-[#D5E8E8] shadow-xs flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:border-[#0A2540]/30 ${aspectRatio} ${className}`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Floating Badge */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-xs shadow-md border border-[#D5E8E8] flex items-center justify-center mb-3 group-hover:scale-105 transition transform">
        {getIcon()}
      </div>

      <div className="relative z-10 space-y-1 max-w-xs">
        <span className="block text-sm font-bold text-[#0A2540] tracking-tight">
          {label}
        </span>
        <span className="block text-xs font-medium text-slate-500">
          {sublabel}
        </span>
      </div>

      <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#0A2540]/70 uppercase bg-white/80 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-2xs">
        <ImageIcon className="w-3 h-3" />
        <span>HD Slot</span>
      </div>
    </div>
  );
}
