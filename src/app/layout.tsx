import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { AppProvider } from '@/store/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 跳马 - PWA网站导航',
    template: '%s | AI 跳马',
  },
  description: '发现优质PWA网站，体验原生应用般的Web应用。AI 跳马为您精选各类PWA网站。',
  keywords: [
    'AI跳马',
    'PWA',
    '渐进式Web应用',
    '网站导航',
    '离线应用',
  ],
  authors: [{ name: 'AI 跳马', url: 'https://aitiaoma.com' }],
  generator: 'Coze Code',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <AppProvider>
          {isDev && <Inspector />}
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
