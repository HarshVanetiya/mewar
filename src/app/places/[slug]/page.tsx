/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PlaceMotion from '@/components/PlaceMotion';
import Note from '@/components/Note';
import { places, getPlace } from '@/content/places';
import { site } from '@/content/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

const geoCoordinates: Record<string, { lat: number; lng: number }> = {
  udaipur: { lat: 24.5854, lng: 73.7125 },
  nathdwara: { lat: 24.9312, lng: 73.8211 },
  haldighati: { lat: 24.8872, lng: 73.6844 },
  kumbhalgarh: { lat: 25.1477, lng: 73.5873 },
  chittorgarh: { lat: 24.8887, lng: 74.6269 },
  ranakpur: { lat: 25.1154, lng: 73.4754 },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPlace((await params).slug);
  if (!p) return {};
  const canonicalUrl = `${site.url}/places/${p.slug}/`;
  return {
    title: `${p.name} travel guide: verified timings & tips`,
    description: `${p.promise} Photos, how to get there, timings and honest tips for ${p.name}, Mewar.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${p.name} | ${site.name}`,
      description: p.promise,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: p.hero.src,
          alt: p.hero.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} travel guide`,
      description: p.promise,
      images: [p.hero.src],
    },
  };
}

export default async function PlacePage({ params }: Props) {
  const p = getPlace((await params).slug);
  if (!p) notFound();
  const next = p.next.map(getPlace).filter((x) => x !== undefined);
  const geo = geoCoordinates[p.slug] || { lat: 24.5854, lng: 73.7125 };

  // JSON-LD for TouristAttraction / TouristDestination
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: p.name,
    alternateName: p.nameHi,
    description: `${p.line} ${p.promise}`,
    url: `${site.url}/places/${p.slug}/`,
    image: [p.hero.src, ...p.frames.map((f) => f.src)],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Mewar, Rajasthan',
      addressCountry: 'IN',
    },
    isAccessibleForFree: false,
    touristType: ['Cultural', 'Heritage', 'Pilgrimage'],
  };

  // FAQ Schema for collapsible details section
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.details.map((d) => ({
      '@type': 'Question',
      name: `${d.title} for ${p.name}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: d.body,
      },
    })),
  };

  // Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${site.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Places',
        item: `${site.url}/#places`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.name,
        item: `${site.url}/places/${p.slug}/`,
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PlaceMotion />
      <section className="p-hero">
        <div>
          <p className="hi deva" lang="hi">{p.nameHi}</p>
          <h1 className="serif">{p.name}</h1>
          <p className="promise">{p.promise}</p>
          <Note>The emotional promise, 12 words at most. Not a definition like &quot;{p.name} is a town in Rajasthan&quot;.</Note>
        </div>
        <div className="pic jh"><img src={p.hero.src} alt={p.hero.alt} style={{ objectPosition: p.hero.position }} /></div>
      </section>
      <div className="band" aria-hidden="true" />

      <section className="facts" aria-label="Quick facts">
        {p.facts.map((f) => (
          <div key={f.label}>
            <b>{f.value}</b>
            <span>{f.label}</span>
            {!f.verified && <><br /><em>Not yet verified</em></>}
          </div>
        ))}
      </section>

      <section className="frames">
        <h2 className="h2 serif">In {p.frames.length > 1 ? 'a few' : 'one'} frame{p.frames.length > 1 ? 's' : ''}</h2>
        {p.frames.map((f, i) => (
          <figure className="frame" key={i}>
            <img src={f.src} alt={f.alt} style={{ objectPosition: f.position }} loading="lazy" />
          </figure>
        ))}
        <div style={{ gridColumn: '1 / -1' }}>
          <Note>The real pitch: up to 5 of the best traveller or own photos. Repeated photos mark where they go.</Note>
        </div>
      </section>

      <section className="more">
        <h2 className="h2 serif" style={{ marginBottom: 28 }}>Sold? Good.</h2>
        <Note>All detail hides here, closed by default. Visual readers skip it; planners and Google still get full answers.</Note>
        {p.details.map((d) => (
          <details key={d.title}>
            <summary>
              <span>{d.title}</span>
              <span className="sum-toggle" aria-hidden="true">+</span>
            </summary>
            <p>{d.body}</p>
          </details>
        ))}
      </section>

      <section className="next" aria-label="Next stops">
        {next.map((n) => (
          <Link key={n.slug} href={`/places/${n.slug}/`}>
            <img src={n.hero.src} alt={n.hero.alt} style={{ objectPosition: n.hero.position }} loading="lazy" />
            <div className="shade"><p className="serif">{n.name} →</p></div>
          </Link>
        ))}
      </section>

      <p style={{ padding: '0 5vw 40px', fontSize: 14, color: 'var(--muted)' }}>
        Photos: {[...new Set([p.hero, ...p.frames].map((x) => x.credit))].join('; ')}
      </p>
    </main>
  );
}
