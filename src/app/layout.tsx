import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: '赵的拇指',
  description: '赵的拇指博客',
  keywords: [
    '赵的拇指',
    '博客',
    '代码',
    '前端',
    '前端开发',
    'JavaScript',
    'CSS',
    '摄影',
    '散打',
    '跑步',
    '设计',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div id="content">{children}</div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
