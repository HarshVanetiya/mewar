import type { Metadata, Viewport } from 'next';
import { Fraunces, Outfit, Tiro_Devanagari_Hindi } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import { site } from '@/content/site';
import './globals.css';

const serif = Fraunces({ subsets: ['latin'], weight: ['500', '600'], variable: '--f-serif', display: 'swap' });
const sans = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-sans', display: 'swap' });
const deva = Tiro_Devanagari_Hindi({ subsets: ['devanagari'], weight: '400', variable: '--f-deva', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Discover Mewar`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: site.name,
    title: `${site.name}: Discover Mewar`,
    description: site.description,
    url: site.url,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/img/pichola.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunset over Lake Pichola, Udaipur, with the Lake Palace on the water',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}: Discover Mewar`,
    description: site.description,
    images: ['/img/pichola.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#2B0B12' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: ['en', 'hi'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${site.url}/places/{search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${deva.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <SmoothScroll />
        <Nav />
        {children}
        <footer className="foot">
          {site.reportUrl && <p>Spotted something wrong or out of date? <a href={site.reportUrl}>Tell us</a>; we check and fix it.</p>}
          <p>{site.name} is a placeholder name. An independent travel guide, not affiliated with any temple trust, palace or government body.</p>
          <p>Mockup photos from Wikimedia Commons: UnpetitproleX, Jakub Hałun, tommy, Suman Rao, Banerjeedebasis, Deepank Ranka, Ashwinushenoy (CC BY-SA); pichwai by an unknown Rajasthani artist (public domain).</p>
        </footer>
      </body>
    </html>
  );
}
