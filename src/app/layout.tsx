import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskBloom — Global Human Engagement Infrastructure',
  description:
    'Promote websites, apps, videos, and businesses through 10,000+ active users across 120+ countries using real human engagement.',
  keywords: [
    'microtask platform', 'global engagement', 'human traffic', 'promote website',
    'youtube promotion', 'app installs', 'social engagement', 'UK advertisers',
  ],
  openGraph: {
    title: 'TaskBloom — Global Human Engagement Infrastructure',
    description:
      'Reach real audiences worldwide through organic human-powered engagement.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0a0a0f] text-[#f8fafc] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
