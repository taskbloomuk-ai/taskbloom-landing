import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://taskbloom.co.uk';

export const metadata: Metadata = {
  title: 'TaskBloom — Global Human Engagement Infrastructure',
  description:
    'Promote websites, apps, videos, and businesses through 10,000+ active users across 120+ countries using real human engagement. Launch your first campaign in minutes.',
  keywords: [
    'microtask platform', 'global engagement', 'human traffic', 'promote website',
    'youtube promotion', 'app installs', 'social engagement', 'UK advertisers',
    'organic traffic', 'human promotion', 'crowd marketing', 'task marketplace',
  ],
  authors: [{ name: 'TaskBloom' }],
  creator: 'TaskBloom',
  publisher: 'TaskBloom',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'TaskBloom — Global Human Engagement Infrastructure',
    description:
      'Reach real audiences worldwide through organic human-powered engagement. 10K+ users, 120+ countries.',
    url: siteUrl,
    siteName: 'TaskBloom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskBloom — Global Human Engagement Infrastructure',
    description:
      'Reach real audiences worldwide through organic human-powered engagement.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
};

import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230a0a0f'/><rect width='32' height='32' rx='8' fill='url(%23g)'/><defs><linearGradient id='g' x1='0' y1='0' x2='32' y2='32' gradientUnits='userSpaceOnUse'><stop stop-color='%236366f1'/><stop offset='1' stop-color='%237c3aed'/></linearGradient></defs><text x='16' y='23' text-anchor='middle' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' fill='white'>T</text></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%230a0a0f'/><defs><linearGradient id='g' x1='0' y1='0' x2='64' y2='64'><stop stop-color='%236366f1'/><stop offset='1' stop-color='%237c3aed'/></linearGradient></defs><rect width='64' height='64' rx='14' fill='url(%23g)'/><text x='32' y='46' text-anchor='middle' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='40' fill='white'>T</text></svg>" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'TaskBloom',
              url: siteUrl,
              description: 'Global human engagement infrastructure for advertisers.',
              applicationCategory: 'MarketingApplication',
              operatingSystem: 'Web',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-[#f8fafc] font-sans antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
