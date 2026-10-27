import React from 'react';
import { Metadata } from 'next';
import { AdminGeneralDashboard } from '@/components/admin/AdminGeneralDashboard';

export const metadata: Metadata = {
  title: 'Panel de Control General | DentiSalud Group',
  description: 'Panel de control de tratamientos, casos clínicos, testimonios, blog y configuración general para DentiSalud Group.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminGeneralDashboard />;
}
