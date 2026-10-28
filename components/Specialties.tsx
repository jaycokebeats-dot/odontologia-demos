import React from 'react';
import { Sparkles, ShieldCheck, Zap, Smile, Activity, Clock, Heart, Award, ArrowUpRight } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface SpecialtiesProps {
  dentist: Dentist;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  ShieldCheck,
  Zap,
  Smile,
  Activity,
  Clock,
  Heart,
  Award,
};

export const Specialties: React.FC<SpecialtiesProps> = ({ dentist }) => {
  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Quisiera consultar por un turno para una evaluación odontológica.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <section id="especialidades" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 border border-teal-200/60 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Especialidades Clínicas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tratamientos Odontológicos de Vanguardia
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Utilizamos instrumental de última generación, biomateriales importados y protocolos guiados por escaneo 3D para brindarte una sonrisa saludable y armónica.
          </p>
        </div>

        {/* Grid of Specialties */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {dentist.especialidades.map((esp, idx) => {
            const IconComponent = ICON_MAP[esp.icono] || Sparkles;
            const waSpecialtyText = encodeURIComponent(
              `Hola ${dentist.nombre}! Me interesa consultar por el tratamiento de ${esp.titulo}.`
            );
            const waSpecialtyUrl = `https://wa.me/${dentist.whatsapp}?text=${waSpecialtyText}`;

            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/70 hover:border-teal-400 hover:bg-white transition-all duration-300 shadow-2xs hover:shadow-xl group flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-200/80 group-hover:border-teal-600">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-900 transition">
                    {esp.titulo}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {esp.descripcion}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <a
                    href={waSpecialtyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider inline-flex items-center gap-1 group/btn"
                  >
                    <span>Consultar tratamiento</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              Diagnóstico y Plan Personalizado
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold">¿Querés renovar tu sonrisa con especialistas?</h4>
            <p className="text-slate-300 text-sm max-w-xl">
              Agendá tu primera consulta en {dentist.ciudad}. Evaluación clínica completa y presupuesto transparente sin compromiso.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            Solicitar Evaluación por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
