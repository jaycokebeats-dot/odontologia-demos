import React from 'react';
import { Sparkles, ShieldCheck, Zap, Smile, Activity, Clock, Heart, Award } from 'lucide-react';
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
    `Hola ${dentist.nombre}! Quisiera consultar por turnos para un tratamiento.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <section id="especialidades" className="py-20 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Especialidades Dentales
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tratamientos de vanguardia para tu salud bucal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Utilizamos materiales importados de primera línea y tecnología digital para lograr resultados naturales, funcionales y duraderos.
          </p>
        </div>

        {/* Grid of Specialties */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {dentist.especialidades.map((esp, idx) => {
            const IconComponent = ICON_MAP[esp.icono] || Sparkles;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-cyan-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 group-hover:bg-cyan-600 text-cyan-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition">
                    {esp.titulo}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {esp.descripcion}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-cyan-700 hover:text-cyan-900 uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>Consultar por este tratamiento</span>
                    <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-bold">¿Necesitás una evaluación o consulta de diagnóstico?</h4>
            <p className="text-cyan-200 text-sm max-w-xl">
              Agendá tu turno online directamente por WhatsApp o telefónicamente sin esperas.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            Solicitar Turno Ahora
          </a>
        </div>

      </div>
    </section>
  );
};
