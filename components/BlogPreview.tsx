import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, Stethoscope, ShieldCheck } from 'lucide-react';
import { Dentist } from '@/data/dentists';

interface BlogPreviewProps {
  dentist: Dentist;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ dentist }) => {
  const articles = [
    {
      titulo: "¿Cada cuánto tiempo se debe realizar una limpieza dental profesional?",
      categoria: "Salud & Prevención",
      icono: Stethoscope,
      tiempoLectura: "3 min de lectura",
      resumen: "La profilaxis con ultrasonido previene el sarro, la gingivitis y las manchas superficiales. Conocé cada cuánto tiempo realizarla según tu salud bucal.",
      fecha: "Septiembre 2026"
    },
    {
      titulo: "Alineadores Invisibles vs. Brackets: ¿Cuál es la mejor opción para tu sonrisa?",
      categoria: "Ortodoncia Estética 3D",
      icono: Sparkles,
      tiempoLectura: "4 min de lectura",
      resumen: "Comparativa clínica completa entre placas alineadoras invisibles y ortodoncia convencional. Ventajas en estética, higiene y tiempos de tratamiento.",
      fecha: "Agosto 2026"
    },
    {
      titulo: "Cuidados esenciales después de un Blanqueamiento Dental LED",
      categoria: "Estética Dental",
      icono: ShieldCheck,
      tiempoLectura: "3 min de lectura",
      resumen: "Guía práctica de la 'dieta blanca', alimentos a evitar las primeras 48 horas y recomendaciones para mantener el tono blanco brillante por más tiempo.",
      fecha: "Julio 2026"
    }
  ];

  const waText = encodeURIComponent(
    `Hola ${dentist.nombre}! Leí sus artículos de salud dental en la web y me gustaría hacer una consulta.`
  );
  const waUrl = `https://wa.me/${dentist.whatsapp}?text=${waText}`;

  return (
    <section id="blog" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Novedades & Consejos Clínicos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artículos & Salud Bucal
            </h2>
            <p className="text-slate-600 text-base">
              Información útil y recomendaciones profesionales para cuidar tu sonrisa día a día.
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 font-bold text-sm bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition"
          >
            <span>Hacer una consulta profesional</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((art, idx) => {
            const IconComp = art.icono;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-cyan-300 transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                      {art.categoria}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.tiempoLectura}</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-cyan-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
                    {art.titulo}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {art.resumen}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{art.fecha}</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-cyan-700 hover:text-cyan-900"
                  >
                    <span>Leer más</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
