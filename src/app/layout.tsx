import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { AppProvider } from '@/store/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 跳马 - 精选应用展示',
    template: '%s | AI 跳马',
  },
  description: '发现优质应用，探索无限可能。AI 跳马为您精选各类优质应用。',
  keywords: [
    'AI跳马',
    '应用展示',
    'APP推荐',
    '应用下载',
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
