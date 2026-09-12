import dentistsData from './dentists.json';

export interface Especialidad {
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface AntesDespuesCase {
  titulo: string;
  tratamiento: string;
  antes_url: string;
  despues_url: string;
}

export interface Review {
  nombre: string;
  estrellas: number;
  comentario: string;
  fecha: string;
}

export interface Dentist {
  slug: string;
  nombre: string;
  subtitulo: string;
  telefono: string;
  whatsapp: string;
  instagram?: string | null;
  direccion: string;
  ciudad: string;
  rating: number;
  reviews_count: number;
  horarios: string;
  especialidades: Especialidad[];
  fotos: string[];
  antes_despues: AntesDespuesCase[];
  reviews: Review[];
  maps_url: string;
}

export const DENTISTS: Dentist[] = dentistsData as Dentist[];
