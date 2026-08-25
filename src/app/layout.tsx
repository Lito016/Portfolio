import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/shared/back-to-top';
import { ErrorBoundary } from '@/components/shared/error-boundary';
import { LazyParticles } from '@/components/shared/lazy-particles';
import { siteConfig } from '@/config/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.displayName, url: siteConfig.url }],
  creator: siteConfig.displayName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.displayName,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.displayName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: siteConfig.url },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': siteConfig.url,
        name: 'Manolito Almaden Jr.',
        alternateName: 'Lito_016',
        url: siteConfig.url,
        email: 'mailto:manolitoalmadenjr@gmail.com',
        sameAs: [
          siteConfig.github,
          siteConfig.linkedin,
        ],
        jobTitle: 'AI Solution Developer',
        description: siteConfig.description,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.displayName,
        description: siteConfig.description,
        publisher: { '@id': siteConfig.url },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Providers>
          <LazyParticles />
          <Header />
          <ErrorBoundary>
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </ErrorBoundary>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
