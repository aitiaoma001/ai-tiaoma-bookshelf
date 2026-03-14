import AppDetailClient from './AppDetailClient';
import { defaultApps } from '@/types/app';

export function generateStaticParams() {
  return defaultApps.map(app => ({
    id: app.id
  }));
}

export default function AppDetailPage({ params }: { params: { id: string } }) {
  return <AppDetailClient />;
}
