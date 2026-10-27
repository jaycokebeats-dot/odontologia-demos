import React from 'react';
import { Metadata } from 'next';
import { AdminBlogManager } from '@/components/admin/AdminBlogManager';

export const metadata: Metadata = {
  title: 'Panel de Administración | DentiSalud Group',
  description: 'Panel de control de artículos y contenidos para DentiSalud Group.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminBlogManager />;
}
