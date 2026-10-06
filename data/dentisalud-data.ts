export interface TreatmentDetail {
  slug: string;
  numberStr: string;
  title: string;
  category: 'estetica' | 'prevencion' | 'rehabilitacion' | 'especialidades';
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroH1: string;
  heroBajada: string;
  trustPoints: string[];
  ctaText: string;
  ctaLink: string;
  priceNote?: string;
  whoIsItForTitle?: string;
  whoIsItForItems?: { title: string; desc: string }[];
  featuresTitle?: string;
  features?: { title: string; desc: string }[];
  processTitle?: string;
  processSteps?: { step: number; title: string; desc: string }[];
  benefitsTitle?: string;
  benefits?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  keyword: string;
  excerpt: string;
}

export interface PatientReview {
  name: string;
  treatment: string;
  stars: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const DENTISALUD_INFO = {
  name: 'DentiSalud Group',
  director: 'Dra. Nathaly Martínez',
  tagline: 'BY NATHALY MARTÍNEZ',
  address: 'Ciudad de la Paz 1965, Belgrano, CABA',
  city: 'Belgrano, CABA',
  hours: 'Lunes a Sábado de 9:00 a 19:30 hs',
  phone: '+54 9 11 2877-9912',
  whatsappGeneral: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20reservar%20una%20consulta',
  rating: 5.0,
  reviewsCount: 77,
  googleMapsUrl: 'https://www.google.com/maps/place/Dra.Nathaly+Martinez+%7C+DentiSalud+Group/data=!4m7!3m6!1s0x95bcb59a121939bd:0x579a94e99325d5ca!8m2!3d-34.5638503!4d-58.4565009!16s%2Fg%2F11zhbdgjj5!19sChIJvTkZEpq1vJURytUlk-mUmlc',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.453297072551!2d-58.45907582348574!3d-34.56384585557761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59a121939bd%3A0x579a94e99325d5ca!2sDra.Nathaly%20Martinez%20%7C%20DentiSalud%20Group!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar',
  transports: {
    buses: '29, 41, 44, 57, 59, 60, 63, 65, 67, 68, 80, 113, 114, 151, 152, 161, 168, 184, 194',
    subways: 'José Hernández (Línea D), Juramento (Línea D)',
  }
};

export const TREATMENTS: TreatmentDetail[] = [

  {
    slug: 'consulta-integral',
    numberStr: '01',
    title: 'Consulta integral',
    category: 'prevencion',
    shortDescription: 'Diagnóstico completo y un plan a tu medida con evaluación por cámara intraoral.',
    metaTitle: 'Consulta odontológica en Belgrano | DentiSalud Group',
    metaDescription: 'Consulta integral: evaluación completa, plan claro y presupuesto. Costo: $40.000. Agendá hoy tu turno.',
    heroBadge: 'SALUD BUCAL & PREVENCIÓN',
    heroH1: 'Consulta odontológica integral en Belgrano: empezá con una hoja de ruta clara',
    heroBajada: 'En DentiSalud Group te dedicamos el tiempo que merecés. En tu primera visita revisamos tu salud bucal completa, escuchamos qué necesitás y te explicamos las alternativas disponibles para tu caso. Te vas con un plan claro y a medida.',
    trustPoints: ['Evaluación clínica completa', 'Cámara intraoral en vivo', 'Plan claro por etapas', 'Amplio horario de atención'],
    priceNote: 'Precio: Consulta integral $40.000',
    ctaText: 'Agendar mi consulta integral',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20agendar%20mi%20consulta%20integral',
    featuresTitle: 'Qué incluye tu consulta integral',
    features: [
      { title: 'Valoración clínica completa', desc: 'Revisión minuciosa de cada pieza dental, encías, mordida y articulación.' },
      { title: 'Evaluación con cámara intraoral', desc: 'Podés ver en tiempo real en la pantalla el estado exacto de tu boca junto a la doctora.' },
      { title: 'Diagnóstico preciso', desc: 'Identificación de requerimientos de salud, prevención o estética.' },
      { title: 'Plan de tratamiento personalizado', desc: 'Explicación detallada por etapas sin apuros ni imprevistos.' },
      { title: 'Cotización formal', desc: 'Presupuesto formal y transparente ajustado a tus posibilidades.' }
    ],
    faqs: [
      { question: '¿Cuánto dura la consulta?', answer: 'Dedicamos el tiempo necesario para poder evaluar exhaustivamente y responder todas tus dudas.' },
      { question: '¿El valor de la consulta se descuenta del tratamiento?', answer: 'Algunos tratamientos cuentan con reintegro del costo de la consulta. Podés consultar con nuestro equipo de Atención al Paciente.' },
      { question: '¿Cómo reservo mi turno?', answer: 'Escribinos por WhatsApp y coordinamos un día y horario según tu disponibilidad.' },
      { question: '¿Cuánto cuesta la consulta integral?', answer: 'Actualmente tiene un valor de ARS $40.000.' }
    ]
  },
  {
    slug: 'limpieza-dental',
    numberStr: '02',
    title: 'Limpieza dental',
    category: 'prevencion',
    shortDescription: 'Higiene profesional y prevención profunda para cuidar la salud de tus dientes y encías.',
    metaTitle: 'Limpieza dental en Belgrano | DentiSalud Group',
    metaDescription: 'Limpieza dental profesional en Belgrano. Elimina sarro y manchas superficiales. Cuidado para tus dientes y encías.',
    heroBadge: 'PREVENCIÓN & HIGIENE DENTAL',
    heroH1: 'Limpieza dental en Belgrano: el primer paso para cuidar tu sonrisa',
    heroBajada: 'Una limpieza profesional elimina la placa y sarro que el cepillo no alcanza a retirar, previene problemas mayores a futuro y es el mejor punto de partida si hace un tiempo no venís al dentista.',
    trustPoints: ['Prevención y cuidado bucal', 'Atención sin apuros ni dolor', 'Lunes a sábado de 9 a 19:30 hs'],
    ctaText: 'Consultar por limpieza dental',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20una%20limpieza%20dental',
    processTitle: 'Cómo es tu sesión de limpieza',
    processSteps: [
      { step: 1, title: 'Revisión inicial', desc: 'Evaluamos el estado de tus dientes y tejido gingival.' },
      { step: 2, title: 'Limpieza profesional', desc: 'Eliminamos placa bacteriana y sarro con ultrasónidos de alta tecnología sin agredir el esmalte.' },
      { step: 3, title: 'Pulido y recomendaciones', desc: 'Removemos manchas superficiales y te brindamos pautas de cuidado diario personalizadas.' }
    ],
    faqs: [
      { question: '¿Cada cuánto conviene hacerse una limpieza?', answer: 'Recomendamos realizar tu limpieza profesional cada 3 a 6 meses, según tu caso específico.' },
      { question: '¿Duele la limpieza dental?', answer: 'No debería doler. Si tenés alta sensibilidad o presencia de cálculo denso, adaptamos el instrumental para mayor confort.' },
      { question: '¿La limpieza incluye blanqueamiento?', answer: 'No. La limpieza es un procedimiento de salud para eliminar sarro y placa. El blanqueamiento es un tratamiento estético para cambiar la tonalidad.' }
    ]
  },
  {
    slug: 'diseno-de-sonrisa',
    numberStr: '03',
    title: 'Diseño de sonrisa',
    category: 'estetica',
    shortDescription: 'Armonía, forma y color pensados para tus facciones y tus expectativas estéticas.',
    metaTitle: 'Diseño de sonrisa en Belgrano | DentiSalud Group',
    metaDescription: 'Diseño de sonrisa natural en Belgrano. Carillas, gingivoplastia y micro diseño. Especialistas en estética dental.',
    heroBadge: 'ESTÉTICA DENTAL DE VANGUARDIA',
    heroH1: 'Diseño de sonrisa en Belgrano: natural y a tu medida',
    heroBajada: 'No se trata de una sonrisa estándar o igual a la de otra persona, sino de la tuya en su mejor versión. Planificamos cada detalle en armonía con tus facciones y expectativas. Las carillas son una excelente opción, pero no la única.',
    trustPoints: ['Especialistas en estética dental', 'Plan visual antes de empezar', 'Materiales importados de alta gama'],
    priceNote: 'Empezás con la consulta integral: $40.000',
    ctaText: 'Consultar por diseño de sonrisa',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20diseno%20de%20sonrisa',
    featuresTitle: 'Por qué elegirnos para tu diseño de sonrisa',
    features: [
      { title: 'Respeto por tu esmalte', desc: 'Resultados estéticos protegiendo la estructura dentaria sin desgastes innecesarios.' },
      { title: 'Diseño digital 3D', desc: 'Para carillas de disilicato de litio planificamos digitalmente para que veas la simulación antes de avanzar.' },
      { title: 'Diversidad de materiales', desc: 'Carillas de composite (resina de alta densidad) o disilicato de litio según tus requerimientos.' }
    ],
    faqs: [
      { question: '¿Cuánto cuesta un diseño de sonrisa?', answer: 'Cada diseño combina distintas técnicas según tu caso. El presupuesto formal se define tras la evaluación en la consulta integral.' },
      { question: '¿Puedo ver cómo va a quedar antes de empezar?', answer: 'Sí, en tratamientos con carillas de disilicato realizamos una planificación digital previa.' }
    ]
  },
  {
    slug: 'blanqueamiento-dental',
    numberStr: '04',
    title: 'Blanqueamiento dental',
    category: 'estetica',
    shortDescription: 'Una sonrisa más luminosa con protocolos seguros que cuidan tus dientes y encías.',
    metaTitle: 'Blanqueamiento dental en Belgrano | DentiSalud Group',
    metaDescription: 'Aclaramiento dental en Belgrano cuidando tus dientes y encías. Recuperá la luminosidad de tu sonrisa.',
    heroBadge: 'ESTÉTICA & LUMINOSIDAD',
    heroH1: 'Blanqueamiento dental en Belgrano: más luminosidad, con cuidado',
    heroBajada: 'Tu sonrisa más blanca sin perder la apariencia natural. Evaluamos minuciosamente tu esmalte antes de indicar la técnica adecuada que minimice la sensibilidad.',
    trustPoints: ['Evaluación previa obligatoria', 'Técnica segura para el esmalte', 'Resultados visibles desde la 1ª sesión'],
    ctaText: 'Consultar por blanqueamiento',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20blanqueamiento%20dental',
    featuresTitle: 'Blanqueamiento enfocado en tu salud',
    features: [
      { title: 'Evaluación de aptitud', desc: 'Revisamos si sos apto/a para garantizar un tratamiento 100% seguro.' },
      { title: 'Protección de encías', desc: 'Protocolos de aislamiento gel que previenen molestias y sensibilidad.' },
      { title: 'Resultado natural', desc: 'Buscamos luminosidad armónica, evitando tonos blancos tiza artificiales.' }
    ],
    faqs: [
      { question: '¿Blanqueamiento en consultorio o ambulatorio?', answer: 'Ofrecemos ambas opciones (LED en consultorio o férulas para casa). Lo definimos según tu comodidad.' },
      { question: '¿Cuánto dura el efecto?', answer: 'Depende de tus hábitos (café, mate, vino) y cuidados diarios. Te entregamos pautas para prolongarlo.' }
    ]
  },
  {
    slug: 'implantes-dentales',
    numberStr: '05',
    title: 'Implantes dentales',
    category: 'rehabilitacion',
    shortDescription: 'Recuperá piezas dentales ausentes con soluciones pensadas para perdurar en el tiempo.',
    metaTitle: 'Implantes dentales en Belgrano | DentiSalud Group',
    metaDescription: 'Implantes dentales con especialistas en rehabilitación oral. Soluciones duraderas para recuperar tu sonrisa.',
    heroBadge: 'REHABILITACIÓN ORAL',
    heroH1: 'Implantes dentales en Belgrano: recuperá tu sonrisa con soluciones duraderas',
    heroBajada: 'Los implantes dentales son la mejor solución para reemplazar dientes ausentes con firmeza, estética y funcionalidad natural. Evaluamos tu hueso y diseñamos un plan preciso.',
    trustPoints: ['Cirugía guiada & segura', 'Titanio y zirconio de alta calidad', 'Rehabilitación estética completa'],
    ctaText: 'Consultar por implantes dentales',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20implantes%20dentales',
    whoIsItForTitle: '¿Para quién son los implantes?',
    whoIsItForItems: [
      { title: 'Si te falta una sola pieza', desc: 'Reemplazo sin alterar los dientes adyacentes.' },
      { title: 'Si te faltan varias piezas', desc: 'Puentes sobre implantes o rehabilitaciones parciales fijas.' },
      { title: 'Si buscás máxima estabilidad', desc: 'Elimina las prótesis removibles inestables y recuperá la fuerza al masticar.' }
    ],
    processTitle: 'Cómo es el proceso de colocación',
    processSteps: [
      { step: 1, title: 'Consulta integral & Tomografía', desc: 'Evaluación clínica y estudio 3D del hueso maxilar.' },
      { step: 2, title: 'Planificación digital', desc: 'Diseño de la ubicación exacta del implante.' },
      { step: 3, title: 'Colocación del implante', desc: 'Procedimiento ambulatorio con anestesia local.' },
      { step: 4, title: 'Integración & Corona final', desc: 'Colocación de la pieza de porcelana o zirconio idéntica a tu diente natural.' }
    ],
    faqs: [
      { question: '¿Cuánto tiempo lleva un tratamiento con implantes?', answer: 'La cicatrización ósea suele requerir entre 3 y 6 meses, pero en casos seleccionados es posible colocar dientes provisionales inmediatos.' },
      { question: '¿Duele la colocación de un implante?', answer: 'No. Se realiza con anestesia local idéntica a la de un arreglo de caries, y el postoperatorio es altamente llevadero con analgesia habitual.' }
    ]
  },
  {
    slug: 'ortodoncia',
    numberStr: '06',
    title: 'Ortodoncia',
    category: 'estetica',
    shortDescription: 'Alineá tu sonrisa y mejorá tu mordida con brackets o alineadores invisibles.',
    metaTitle: 'Ortodoncia en Belgrano | DentiSalud Group',
    metaDescription: 'Ortodoncia estéticos y alineadores invisibles en Belgrano. Mejorá tu mordida y alineación dental a cualquier edad.',
    heroBadge: 'ALINEACIÓN & MORDIDA',
    heroH1: 'Ortodoncia en Belgrano: alineación, estética y salud para tu mordida',
    heroBajada: 'Alinear tus dientes mejora la estética pero principalmente cuida la articulación temporomandibular y evita el desgaste prematuro de las piezas. Diagnóstico completo para niños y adultos.',
    trustPoints: ['Brackets estéticos & metálicos', 'Alineadores invisibles de última generación', 'Planes de cuotas accesibles'],
    ctaText: 'Consultar por ortodoncia',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20ortodoncia',
    featuresTitle: 'Opciones de ortodoncia a tu medida',
    features: [
      { title: 'Alineadores invisibles', desc: 'Placas transparentes removibles prácticamente imperceptibles.' },
      { title: 'Brackets cerámicos y de zafiro', desc: 'Estética discreta durante todo el tratamiento.' },
      { title: 'Brackets metálicos convencionales', desc: 'Efectividad probada para casos complejos.' }
    ],
    faqs: [
      { question: '¿A qué edad se puede hacer ortodoncia?', answer: 'A cualquier edad. Evaluamos tanto niños en etapa de crecimiento como adultos de todas las edades.' }
    ]
  },
  {
    slug: 'endodoncia',
    numberStr: '07',
    title: 'Endodoncia',
    category: 'especialidades',
    shortDescription: 'Tratamiento de conducto para conservar tu pieza natural y aliviar el dolor.',
    metaTitle: 'Endodoncia en Belgrano | DentiSalud Group',
    metaDescription: 'Tratamiento de conducto en Belgrano. Salvá tu diente natural y aliviá el dolor con especialistas en endodoncia.',
    heroBadge: 'SALVAMENTO DENTAL',
    heroH1: 'Endodoncia en Belgrano: aliviá el dolor y conservá tu diente',
    heroBajada: 'Si una pieza dental tiene la pulpa o el nervio comprometido, el tratamiento de conducto permite eliminar la infección, aliviar el dolor de forma inmediata y salvar el diente natural.',
    trustPoints: ['Anestesia efectiva sin dolor', 'Localizadores de ápice digitales', 'Especialistas capacitados'],
    ctaText: 'Consultar por endodoncia',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20endodoncia',
    faqs: [
      { question: '¿Duele un tratamiento de conducto?', answer: 'No. Aplicamos técnicas anestésicas eficientes antes de iniciar para que el procedimiento sea totalmente indoloro.' }
    ]
  },
  {
    slug: 'protesis-dentales',
    numberStr: '08',
    title: 'Prótesis fijas y removibles',
    category: 'rehabilitacion',
    shortDescription: 'Reemplazá piezas ausentes con soluciones adaptadas a tu caso y anatomía.',
    metaTitle: 'Prótesis dentales en Belgrano | DentiSalud Group',
    metaDescription: 'Prótesis dentales fijas y removibles en Belgrano. Rehabilitación oral funcional y estética a tu medida.',
    heroBadge: 'REHABILITACIÓN ORAL',
    heroH1: 'Prótesis dentales en Belgrano: comodidad y función para tu boca',
    heroBajada: 'Diseñamos prótesis fijas (coronas, puentes sobre dientes) o removibles (flexibles, esqueléticas) enfocadas en recuperar la masticación cómoda y la estética facial.',
    trustPoints: ['Laboratorios dentales de precisión', 'Prótesis flexibles e invisibles', 'Ajuste personalizado'],
    ctaText: 'Consultar por prótesis dentales',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20protesis%20dentales',
    faqs: [
      { question: '¿Cuál es la diferencia entre fija y removible?', answer: 'Las fijas van cementadas de forma permanente sobre dientes o implantes; las removibles se pueden retirar para su higiene.' }
    ]
  },
  {
    slug: 'atm',
    numberStr: '09',
    title: 'ATM & Bruxismo',
    category: 'especialidades',
    shortDescription: 'Solución para chasquidos, dolor articular, desgaste dental o tensión muscular al masticar.',
    metaTitle: 'Tratamiento de ATM y Bruxismo en Belgrano | DentiSalud Group',
    metaDescription: 'Tratamiento de disfunción de ATM, bruxismo y placas miorrelajantes en Belgrano. Aliviá la tensión y cuida tus dientes.',
    heroBadge: 'SALUD ARTICULAR & NERVIO',
    heroH1: 'Tratamiento de ATM y Bruxismo en Belgrano',
    heroBajada: '¿Te levantás con dolor mandibular, dolor de cabeza o desgaste en tus dientes? Evaluamos la articulación temporomandibular y confeccionamos placas rígidas miorrelajantes.',
    trustPoints: ['Placas de descanso de acrílico rígido', 'Alivio del dolor neuromuscular', 'Protección del esmalte'],
    ctaText: 'Consultar por ATM',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20un%20tratamiento%20de%20ATM',
    faqs: [
      { question: '¿Cómo sé si tengo bruxismo?', answer: 'Los síntomas típicos son desgaste en bordes dentales, tensión en cuello/mandíbula al despertar y dolor o chasquido en la articulación.' }
    ]
  },
  {
    slug: 'cirugia-maxilofacial',
    numberStr: '10',
    title: 'Cirugía maxilofacial',
    category: 'especialidades',
    shortDescription: 'Extracciones complejas, muelas de juicio e intervenciones quirúrgicas con máxima seguridad.',
    metaTitle: 'Cirugía Maxilofacial en Belgrano | DentiSalud Group',
    metaDescription: 'Cirugía maxilofacial y extracción de muelas de juicio en Belgrano. Profesionales expertos y acompañamiento posquirúrgico.',
    heroBadge: 'CIRUGÍA ESPECIALIZADA',
    heroH1: 'Cirugía maxilofacial en Belgrano: procedimiento seguro y recuperación acompañada',
    heroBajada: 'Extracción de terceros molares (muelas de juicio retenidas), piezas complejas e injertos óseos en un ambiente seguro con cirujanos capacitados.',
    trustPoints: ['Cirujanos especialistas UBA', 'Protocolos analgésicos posoperatorios', 'Monitoreo continuo'],
    ctaText: 'Consultar por cirugía maxilofacial',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20cirugia%20maxilofacial',
    faqs: [
      { question: '¿Es obligatorio sacar las muelas de juicio?', answer: 'No siempre. Se evalúa con una radiografía panorámica si están impactadas, causando dolor o desplazando dientes.' }
    ]
  },
  {
    slug: 'odontopediatria',
    numberStr: '11',
    title: 'Odontopediatría',
    category: 'especialidades',
    shortDescription: 'Cuidado amoroso y preventivo de la salud bucal de bebés, niños y adolescentes.',
    metaTitle: 'Odontopediatría en Belgrano | DentiSalud Group',
    metaDescription: 'Odontopediatría en Belgrano. Atención odontológica para niños en un ambiente cálido y sin miedos.',
    heroBadge: 'ODONTOLOGÍA INFANTIL',
    heroH1: 'Odontopediatría en Belgrano: sonrisas sanas desde los primeros años',
    heroBajada: 'Acompañamos el crecimiento dental de los más chicos en un clima cálido, lúdico y sin traumas para que ir al dentista sea una linda experiencia.',
    trustPoints: ['Ambiente adaptado para niños', 'Técnicas de manejo de ansiedad', 'Selladores & fluoración preventiva'],
    ctaText: 'Consultar por odontopediatría',
    ctaLink: 'https://wa.me/5491128779912?text=Hola%2C%20quiero%20consultar%20por%20odontopediatria%20para%20mi%20hijo%2Fa',
    faqs: [
      { question: '¿Cuándo llevar al bebé al dentista por primera vez?', answer: 'Recomendamos la primera visita durante el primer año de vida o cuando sale el primer diente temporal.' }
    ]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'implante-vs-puente-dental',
    category: 'Alternativas',
    title: 'Implante vs. puente dental: ¿cuál te conviene?',
    keyword: 'implante vs puente',
    excerpt: 'Comparamos durabilidad, estética y preservación de dientes vecinos para que elijas con información clara.'
  },
  {
    slug: 'alineadores-vs-brackets',
    category: 'Alternativas',
    title: 'Alineadores vs. brackets: cómo elegir',
    keyword: 'alineadores vs brackets',
    excerpt: 'Ventajas de la ortodoncia invisible y tradicional según tu estilo de vida y tipo de mordida.'
  },
  {
    slug: 'carillas-vs-lentes-de-contacto-dental',
    category: 'Alternativas',
    title: 'Carillas vs. lentes de contacto dental',
    keyword: 'carillas vs lentes de contacto',
    excerpt: 'Conocé las diferencias de espesor, desgaste del esmalte y resultados estéticos.'
  },
  {
    slug: 'costo-implante-dental',
    category: 'Costos',
    title: '¿De qué depende el costo de un implante dental?',
    keyword: 'costo implante dental',
    excerpt: 'Factores que influyen en el valor: tipo de titanio, necesidad de injerto óseo y marca de la corona.'
  },
  {
    slug: 'presupuesto-odontologico-variaciones',
    category: 'Costos',
    title: 'Por qué un presupuesto odontológico varía de una persona a otra',
    keyword: 'presupuesto dental',
    excerpt: 'Cada boca es única: explicamos qué se analiza en una consulta diagnóstica personalizada.'
  },
  {
    slug: 'como-vencer-el-miedo-al-dentista',
    category: 'Primera visita',
    title: 'Cómo vencer el miedo al dentista',
    keyword: 'miedo al dentista',
    excerpt: 'Técnicas de manejo de ansiedad, anestesia moderna y cómo trabajamos en DentiSalud Group.'
  },
  {
    slug: 'que-pasa-en-tu-primera-consulta',
    category: 'Primera visita',
    title: 'Qué pasa en tu primera consulta odontológica',
    keyword: 'primera consulta dentista',
    excerpt: 'Desde la cámara intraoral hasta el plan de tratamiento por escrito. Sin sorpresas.'
  },
  {
    slug: 'cada-cuanto-hacerse-limpieza-dental',
    category: 'Prevención',
    title: 'Cada cuánto hacerse una limpieza dental',
    keyword: 'limpieza dental frecuencia',
    excerpt: 'Descubrí el intervalo ideal según tu acumulación de placa y salud gingival.'
  },
  {
    slug: 'consecuencias-diente-faltante',
    category: 'Prevención',
    title: 'Qué pasa si no reemplazás un diente que te falta',
    keyword: 'diente faltante consecuencias',
    excerpt: 'Desplazamiento dental, pérdida ósea y problemas de masticación que podés evitar a tiempo.'
  }
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    name: 'Esteban Perazzo',
    treatment: 'Consulta & Limpieza',
    stars: 5,
    comment: 'No tengo palabras para describir la felicidad que sentís cuando salís del consultorio de Nathaly. Una excelente profesional en todo, la tranquilidad, empatía y el trato humano de ella y su equipo es único.',
    date: 'Hace 1 semana',
    verified: true
  },
  {
    name: 'Eloradana Villalobos',
    treatment: 'Estética & Ortodoncia',
    stars: 5,
    comment: 'La mejor en lo que hace, tengo aprox 4 años siendo su paciente y sin duda alguna la recomiendo con ojos cerrados! Excelente trabajo y tiene el mejor equipo de trabajo.',
    date: 'Hace 1 mes',
    verified: true
  },
  {
    name: 'Mariana Silva',
    treatment: 'Diseño de Sonrisa',
    stars: 5,
    comment: 'Súper recomendable Nathaly y todo el equipo. Tenía mucho temor al dentista y desde la primera consulta con la cámara intraoral me dio una paz y seguridad enorme. Los resultados del diseño de sonrisa superaron mis expectativas.',
    date: 'Hace 2 semanas',
    verified: true
  },
  {
    name: 'Lucas González',
    treatment: 'Implantes Dentales',
    stars: 5,
    comment: 'Me hice un implante y la verdad fue impecable. Muy cuidados los detalles de higiene, cero dolor y el postoperatorio súper tranquilo. Te entregan todo el plan claro por escrito.',
    date: 'Hace 3 semanas',
    verified: true
  },
  {
    name: 'Valeria Rossi',
    treatment: 'Limpieza & Prevención',
    stars: 5,
    comment: 'Atención de 10 estrellas. Te atienden puntual a la hora del turno, el consultorio en Belgrano es hermoso e impecable y la calidez humana de Nathaly marca la diferencia.',
    date: 'Hace 1 mes',
    verified: true
  },
  {
    name: 'Gabriel Fernández',
    treatment: 'Urgencia Dental',
    stars: 5,
    comment: 'Fui por una urgencia un sábado con un dolor insoportable y me atendieron al instante con una calidez y empatía increíbles. Me fui sin dolor y súper tranquilo.',
    date: 'Hace 2 semanas',
    verified: true
  }
];
