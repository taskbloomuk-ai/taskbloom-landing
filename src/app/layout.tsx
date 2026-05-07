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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌸</text></svg>" />
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
      </body>
    </html>
  );
}
