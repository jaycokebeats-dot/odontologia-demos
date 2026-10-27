import React from 'react';
import { Metadata } from 'next';
import { AdminBlogManager } from '@/components/admin/AdminBlogManager';

export const metadata: Metadata = {
  title: 'Gestor del Blog | DentiSalud Group',
  description: 'Panel de administración de artículos del blog.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminBlogPage() {
  return <AdminBlogManager />;
}
