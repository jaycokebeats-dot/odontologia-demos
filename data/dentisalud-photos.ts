export const DENTISALUD_PHOTOS = {
  // Main Hero / Doctor Photos
  heroDoctora: '/images/dentisalud/35_recepci_n_doctora.jpg', // Dra. Nathaly en recepción con logo
  doctoraChair: '/images/dentisalud/30_doctora_en_silla.jpg', // Dra. Nathaly en el sillón odontológico
  doctoraDesk: '/images/dentisalud/29_doctora_en_escritorio.jpg', // Dra. Nathaly en escritorio
  doctoraReceta: '/images/dentisalud/26_doctora_entrega_receta.jpg', // Entrega de indicación / receta
  doctoraAccion: '/images/dentisalud/18_dentista_en_acci_n.jpg', // Odontología en acción

  // Clinic & Facilities Photos
  recepcion: '/images/dentisalud/22_recepci_n.jpg', // Recepción principal DentiSalud
  recepcionista: '/images/dentisalud/25_recepcionista_turno.jpg', // Atención y turnos
  salaEspera: '/images/dentisalud/19_sala_de_espera.jpg', // Sala de espera moderna
  salaEspera2: '/images/dentisalud/20_sala_de_espera.jpg', // Ángulo 2 sala de espera
  consultorio: '/images/dentisalud/21_consultorio_principal.jpg', // Consultorio equipado
  scanner3d: '/images/dentisalud/27_scanner_shinning_3d_tecnolog_a.jpg', // Scanner Shining 3D
  escaneando: '/images/dentisalud/28_escaneando.jpg', // Proceso de escaneo digital 3D
  guantes: '/images/dentisalud/23_guantes.jpg', // Bioseguridad e higiene
  cartelLampara: '/images/dentisalud/24_cartel_y_lampara.jpg', // Sillón y lámpara
  abrazoCalido: '/images/dentisalud/17_abrazo_c_lido_en_la_cl_nica.jpg', // Calidez humana con paciente
  pacientesConversando: '/images/dentisalud/33_pacientes_conversando.jpg', // Experiencia del paciente
  tecnicaCepillado: '/images/dentisalud/29_tecnica_de_cepillado_y_prevenci_n.jpg', // Cepillado y prevención
  modeloDientes: '/images/dentisalud/34_modelo_dientes.jpg', // Modelo de explicación
  odontopediatria: '/images/dentisalud/11_odontopediatr_a.jpg', // Atención a niños
};

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: 'estetica' | 'protesis' | 'caries' | 'blanqueamiento' | 'carillas';
  treatmentSlug: string;
  treatmentName: string;
  description: string;
  before: string;
  after: string;
  during?: string;
}

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-gingivoplastia',
    title: 'Gingivoplastia & Armonización de Encías',
    category: 'estetica',
    treatmentSlug: 'diseno-de-sonrisa',
    treatmentName: 'Diseño de Sonrisa',
    description: 'Recorte estético de encías para alargar la corona clínica y nivelar el margen gingival.',
    before: '/images/dentisalud/1_gingivoplastia_antes.jpg',
    after: '/images/dentisalud/1_gingivoplastia_despu_s.jpg',
  },
  {
    id: 'case-carillas-disilicato',
    title: 'Cambio de Carillas Defectuosas por Disilicato de Litio',
    category: 'carillas',
    treatmentSlug: 'carillas-dentales',
    treatmentName: 'Carillas Dentales',
    description: 'Retiro de carillas de resina filtradas y reemplazo por carillas cerámicas de Disilicato de Litio.',
    before: '/images/dentisalud/14_carillas_de_resina_defectuosas_antes.jpg',
    during: '/images/dentisalud/14_carillas_de_resina_defectuosas_retiradas_durante.jpg',
    after: '/images/dentisalud/14_carillas_de_disilicato_de_litio_despu_s.jpg',
  },
  {
    id: 'case-blanqueamiento-1',
    title: 'Blanqueamiento Dental LED en Consultorio',
    category: 'blanqueamiento',
    treatmentSlug: 'blanqueamiento-dental',
    treatmentName: 'Blanqueamiento Dental',
    description: 'Aclaramiento de 3 a 4 tonos mediante gel activado por luz LED sin provocar sensibilidad.',
    before: '/images/dentisalud/31_blanqueamiento_antes.jpg',
    after: '/images/dentisalud/31_blanqueamiento_despu_s.jpg',
  },
  {
    id: 'case-blanqueamiento-2',
    title: 'Aclaramiento Estético Dental',
    category: 'blanqueamiento',
    treatmentSlug: 'blanqueamiento-dental',
    treatmentName: 'Blanqueamiento Dental',
    description: 'Tratamiento combinado de blanqueamiento para recuperar el brillo y tono natural de los dientes.',
    before: '/images/dentisalud/32_blanqueamiento_2_antes.jpg',
    after: '/images/dentisalud/32_blanqueamiento_2_despu_s.jpg',
  },
  {
    id: 'case-micro-diseno',
    title: 'Micro Diseño de Sonrisa en Resina',
    category: 'estetica',
    treatmentSlug: 'diseno-de-sonrisa',
    treatmentName: 'Diseño de Sonrisa',
    description: 'Cierre de diastemas y remodelado estético del borde incisal con resina directa de alta estética.',
    before: '/images/dentisalud/7_micro_dise_o_de_sonrisa_antes.jpg',
    after: '/images/dentisalud/7_micro_dise_o_de_sonrisa_despu_s.jpg',
  },
  {
    id: 'case-fractura-carilla',
    title: 'Restauración de Fractura en Central Superior',
    category: 'carillas',
    treatmentSlug: 'carillas-dentales',
    treatmentName: 'Carillas Dentales',
    description: 'Reconstrucción anatómica de incisivo central fracturado con estratificación de resina.',
    before: '/images/dentisalud/10_est_tica_carilla_central_antes_fractura.jpg',
    after: '/images/dentisalud/10_est_tica_carilla_central_despu_s.jpg',
  },
  {
    id: 'case-protesis-1',
    title: 'Rehabilitación Oral con Prótesis Fija',
    category: 'protesis',
    treatmentSlug: 'protesis-dentales',
    treatmentName: 'Prótesis Dentales',
    description: 'Restauración de función masticatoria y estética mediante prótesis fija de alta resistencia.',
    before: '/images/dentisalud/2_pr_tesis_antes_caso_1.jpg',
    after: '/images/dentisalud/2_pr_tesis_despu_s_caso_1.jpg',
  },
  {
    id: 'case-corona-1',
    title: 'Corona de Alta Cerámica Disilicato',
    category: 'protesis',
    treatmentSlug: 'coronas-de-zirconio',
    treatmentName: 'Coronas Estéticas',
    description: 'Recuperación de estructura dental perdida mediante corona cerámica individual perfectamente mimetizada.',
    before: '/images/dentisalud/3_corona_antes_caso_1.jpg',
    after: '/images/dentisalud/3_cornona_despu_s_caso_1.jpg',
  },
  {
    id: 'case-caries-1',
    title: 'Tratamiento y Restauración de Caries',
    category: 'caries',
    treatmentSlug: 'arreglo-de-caries',
    treatmentName: 'Arreglo de Caries',
    description: 'Remoción de tejido cariado y reconstrucción estética con fotocurado.',
    before: '/images/dentisalud/9_arreglo_de_caries_antes_caso_2.jpg',
    after: '/images/dentisalud/9_arreglo_de_caries_despu_s_caso_2.jpg',
  },
  {
    id: 'case-caries-2',
    title: 'Limpieza de Caries e Incrustación Estética',
    category: 'caries',
    treatmentSlug: 'arreglo-de-caries',
    treatmentName: 'Arreglo de Caries',
    description: 'Saneamiento de lesión cariosa en pieza posterior y sellado marginal hermético.',
    before: '/images/dentisalud/15_caries_y_restauraci_n.jpg',
    after: '/images/dentisalud/15_caries_y_restauraci_n_despu_s.jpg',
  },
  {
    id: 'case-carillas-alta-def',
    title: 'Carillas de Resina Alta Definición',
    category: 'carillas',
    treatmentSlug: 'carillas-dentales',
    treatmentName: 'Carillas Dentales',
    description: 'Armonización de forma y tono en el sector anterior sin desgastar el esmalte sano.',
    before: '/images/dentisalud/12_est_tica_antes.jpg',
    after: '/images/dentisalud/12_est_tica_despu_s.jpg',
  },
  {
    id: 'case-transformacion-sonrisa',
    title: 'Transformación Estética de Sonrisa',
    category: 'estetica',
    treatmentSlug: 'diseno-de-sonrisa',
    treatmentName: 'Diseño de Sonrisa',
    description: 'Rediseño integral del frente estético para alinear y rejuvenecer la sonrisa.',
    before: '/images/dentisalud/13_est_tica_antes.jpg',
    after: '/images/dentisalud/13_est_tica_despu_s.jpg',
  },
  {
    id: 'case-corona-2',
    title: 'Corona Estética Posterior',
    category: 'protesis',
    treatmentSlug: 'coronas-de-zirconio',
    treatmentName: 'Coronas Estéticas',
    description: 'Reconstrucción con corona biocompatible para devolver fuerza oclusal.',
    before: '/images/dentisalud/6_corona_antes_caso_2.jpg',
    after: '/images/dentisalud/6_corona_despu_s_caso_2.jpg',
  },
  {
    id: 'case-protesis-2',
    title: 'Rehabilitación Superior Completa',
    category: 'protesis',
    treatmentSlug: 'protesis-dentales',
    treatmentName: 'Prótesis Dentales',
    description: 'Sustitución de piezas ausentes devolviendo tono muscular y sonrisa natural.',
    before: '/images/dentisalud/4_pr_tesis_antes_caso_2.jpg',
    after: '/images/dentisalud/4_pr_tesis_despu_s_caso_2.jpg',
  },
  {
    id: 'case-protesis-3',
    title: 'Prótesis Estética de Alta Adaptabilidad',
    category: 'protesis',
    treatmentSlug: 'protesis-dentales',
    treatmentName: 'Prótesis Dentales',
    description: 'Rehabilitación removible/fija diseñada a la medida del paciente.',
    before: '/images/dentisalud/5_pr_tesis_antes_caso_3.jpg',
    after: '/images/dentisalud/5_pr_tesis_despu_s_caso_3.jpg',
  },
  {
    id: 'case-carillas-sector-anterior',
    title: 'Rehabilitación Estética con Carillas',
    category: 'carillas',
    treatmentSlug: 'carillas-dentales',
    treatmentName: 'Carillas Dentales',
    description: 'Diseño anatómico personalizado para lograr simetría dental y luminosidad.',
    before: '/images/dentisalud/16_carillas_antes.jpg',
    after: '/images/dentisalud/16_carillas_despu_s.jpg',
  }
];

export const TREATMENT_FEATURED_PHOTOS: Record<string, string> = {
  'consulta-integral': '/images/dentisalud/26_doctora_entrega_receta.jpg',
  'limpieza-dental': '/images/dentisalud/29_tecnica_de_cepillado_y_prevenci_n.jpg',
  'diseno-de-sonrisa': '/images/dentisalud/7_micro_dise_o_de_sonrisa_despu_s.jpg',
  'carillas-dentales': '/images/dentisalud/14_carillas_de_disilicato_de_litio_despu_s.jpg',
  'blanqueamiento-dental': '/images/dentisalud/31_blanqueamiento_despu_s.jpg',
  'implantes-dentales': '/images/dentisalud/27_scanner_shinning_3d_tecnolog_a.jpg',
  'protesis-dentales': '/images/dentisalud/2_pr_tesis_despu_s_caso_1.jpg',
  'coronas-de-zirconio': '/images/dentisalud/3_cornona_despu_s_caso_1.jpg',
  'arreglo-de-caries': '/images/dentisalud/9_arreglo_de_caries_despu_s_caso_2.jpg',
  'endodoncia': '/images/dentisalud/18_dentista_en_acci_n.jpg',
  'odontopediatria': '/images/dentisalud/11_odontopediatr_a.jpg',
};
