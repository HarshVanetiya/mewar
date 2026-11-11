/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TripMotion from '@/components/TripMotion';
import Note from '@/components/Note';
import { trips, getTrip } from '@/content/trips';
import { site } from '@/content/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTrip((await params).slug);
  if (!t) return {};
  const d = `${t.days} day${t.days > 1 ? 's' : ''}`;
  const canonicalUrl = `${site.url}/trips/${t.slug}/`;
  return {
    title: `${t.title}: ${d} Mewar itinerary (tested routes)`,
    description: `${t.line} A ${d} route from ${t.base}, in an order that works, with honest notes.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${t.title} (${d}) | ${site.name}`,
      description: `${t.line} Tested timings and verified routes starting from ${t.base}.`,
      url: canonicalUrl,
      type: 'article',
      images: [{ url: t.img, alt: t.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} (${d} Mewar Itinerary)`,
      description: t.line,
      images: [t.img],
    },
  };
}

export default async function TripPage({ params }: Props) {
  const t = getTrip((await params).slug);
  if (!t) notFound();
  const share = `https://wa.me/?text=${encodeURIComponent(`${t.title} (${t.days} days in Mewar): ${site.url}/trips/${t.slug}/`)}`;
  const others = trips.filter((x) => x.slug !== t.slug);

  // JSON-LD for TouristTrip
  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: t.title,
    description: t.line,
    touristType: ['Family', 'Heritage', 'Pilgrims'],
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: t.plan.reduce((acc, day) => acc + day.stops.length, 0),
      itemListElement: t.plan.flatMap((day, dayIndex) =>
        day.stops.map((stop, stopIndex) => ({
          '@type': 'ListItem',
          position: dayIndex * 10 + stopIndex + 1,
          name: `${day.title} - ${stop.name} (${stop.when})`,
          description: stop.why,
        }))
      ),
    },
  };

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
        name: 'Trips',
        item: `${site.url}/#trips`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t.title,
        item: `${site.url}/trips/${t.slug}/`,
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TripMotion />
      <section className="t-hero">
        <div>
          <p className="num serif">{t.days}<small>{t.days > 1 ? 'days' : 'day'}</small></p>
          <h1 className="serif">{t.title}</h1>
          <p className="lead">{t.line}</p>
          <a className="pill" href={share} target="_blank" rel="noopener">Send to the family group <i aria-hidden="true">↗</i></a>
          <Note>Answers &quot;can we do this?&quot; in one glance. Scroll shows the route; detail lives on each place&apos;s page.</Note>
        </div>
        <div className="pic jh"><img src={t.img} alt={t.alt} /></div>
      </section>
      <div className="band" aria-hidden="true" />

      <section className="route">
        <div className="route-line" aria-hidden="true"><div className="route-fill" /></div>
        {t.plan.map((day, di) => (
          <div className="day" key={di}>
            <h2 className="dhead serif"><span>Day {di + 1}</span>{day.title}</h2>
            {day.stops.map((s, si) => (
              <article className="stop" key={si}>
                <span className="dot" aria-hidden="true" />
                <div className="stx">
                  <span className="when-badge">{s.when}</span>
                  <h3 className="serif">{s.place ? <Link href={`/places/${s.place}/`}>{s.name}</Link> : s.name}</h3>
                  <p>{s.why}</p>
                </div>
                <div className="sp"><img src={s.img} alt={s.alt} style={{ objectPosition: s.position }} loading="lazy" /></div>
              </article>
            ))}
          </div>
        ))}
        <Note>Every timing word (&quot;morning&quot;, &quot;evening&quot;) gets checked against real opening hours before launch. Lines marked &quot;Verify&quot; are reported, not confirmed.</Note>
      </section>

      <section className="next">
        {others.map((o) => (
          <Link key={o.slug} href={`/trips/${o.slug}/`}>
            <img src={o.img} alt={o.alt} loading="lazy" />
            <div className="shade"><p className="serif">{o.days} {o.days > 1 ? 'days' : 'day'}: {o.title} →</p></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
