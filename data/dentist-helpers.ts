import { DENTISTS, Dentist } from './dentists';

export function getDentistBySlug(slug: string): Dentist | undefined {
  return DENTISTS.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllDentistSlugs(): string[] {
  return DENTISTS.map((d) => d.slug);
}
