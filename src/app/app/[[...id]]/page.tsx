import AppDetailClient from './AppDetailClient';
import { defaultApps } from '@/types/app';

// 预渲染默认应用
export function generateStaticParams() {
  return defaultApps.map(app => ({
    id: [app.id]
  }));
}

export default function AppDetailPage() {
  return <AppDetailClient />;
}
