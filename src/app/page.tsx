/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import HomeMotion from '@/components/HomeMotion';
import Note from '@/components/Note';
import { places, moods } from '@/content/places';
import { trips } from '@/content/trips';
import { site } from '@/content/site';

const statement = 'Where every stone tells a story, and the dust still carries the drums.';

const voices = [
  { img: '/img/ranakpur.jpg', q: 'Their most vivid sentence goes here.', who: 'First name, city, travelled with family' },
  { img: '/img/pichola.jpg', q: 'What surprised them. A moment, not a rating.', who: 'First name, city, travelled as a couple' },
  { img: '/img/vijay.jpg', q: 'The tip they wish they had been given.', who: 'First name, city, travelled solo' },
  { img: '/img/kumbhal.jpg', q: 'The moment they still talk about.', who: 'First name, city, travelled with parents' },
];


export default function Home() {
  return (
    <main id="main">
      <HomeMotion />
      <div className="loader deva" aria-hidden="true"><span>मेवाड़</span></div>

      <section className="hero" id="top">
        <div className="arch"><img src="/img/pichola.jpg" alt="Sunset over Lake Pichola, Udaipur, with the Lake Palace on the water" /></div>
        <div className="hero-center">
          <p className="hero-kicker deva">पधारो मेवाड़</p>
          <h1 className="hero-title serif">Mewar</h1>
        </div>
        <div className="shade">
          <div className="hero-end">
            <div>
              <p className="serif">{site.tagline}</p>
              <Note>First feeling. Replace with your own line of 12 words at most. Make people picture being here; no facts, no selling.</Note>
            </div>
            <a className="pill" href="#places">See it first <i aria-hidden="true">↗</i></a>
          </div>
        </div>
      </section>

      <section className="say">
        <p className="big serif">
          {statement.split(' ').map((w, i) => <span className="wd" key={i}>{w} </span>)}
        </p>
        <Note>The one idea of the site, lit word by word as you scroll. Keep it under 15 words.</Note>
      </section>

      <section className="h-wrap" id="places">
        <div className="h-head">
          <h2 className="h2 serif">Go on. Look around.</h2>
          <Note>The hook, driven by scroll. One place name and one line of 8 words at most per photo.</Note>
        </div>
        <div className="h-track">
          {places.map((pl) => (
            <Link key={pl.slug} className="panel" href={`/places/${pl.slug}/`}>
              <div className="pic"><img src={pl.hero.src} alt={pl.hero.alt} style={{ objectPosition: pl.hero.position }} loading="lazy" /></div>
              <h3 className="serif">{pl.name}</h3>
              <p>{pl.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="moods">
        <h2 className="h2 serif">What are you craving?</h2>
        <Note>Someone who has never heard of Mewar can still choose by mood. Hover a word on desktop: its photo follows the cursor.</Note>
        <ul>
          {moods.map((m, i) => (
            <li key={m.key}>
              <Link href={m.href} data-i={i}>
                <span className="w serif">{m.word}</span><small>{m.where}</small>
                <div className="thumb" aria-hidden="true"><img src={m.img} alt="" loading="lazy" /></div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="zoom" aria-label="Visual panorama of Mewar">
        <div className="z z1" aria-hidden="true"><img src="/img/ranakpur.jpg" alt="" loading="lazy" /></div>
        <div className="z z2" aria-hidden="true"><img src="/img/vijay.jpg" alt="" loading="lazy" /></div>
        <div className="z z3" aria-hidden="true"><img src="/img/palace2.jpg" alt="" loading="lazy" /></div>
        <div className="z z4" aria-hidden="true"><img src="/img/chetak.jpg" alt="" loading="lazy" /></div>
        <div className="z z0">
          <img src="/img/kumbhal.jpg" alt="Kumbhalgarh Fort under a dramatic sky" loading="lazy" />
          <div className="shade">
            <p className="serif">One true fact, big enough to stop the scroll.</p>
            <Note>The scroll-stopper. Use one verified fact, for example the wall&apos;s length once confirmed with ASI or UNESCO.</Note>
          </div>
        </div>
      </section>

      <section className="trips" id="trips">
        <h2 className="h2 serif">How long do you have?</h2>
        {trips.map((t) => (
          <article className="card" key={t.slug}>
            <div className="tx">
              <div className="n serif">{t.days}</div>
              <div><h3 className="serif"><Link href={`/trips/${t.slug}/`}>{t.title}</Link></h3><p>{t.line}</p></div>
            </div>
            <div><img src={t.img} alt={t.alt} loading="lazy" /></div>
          </article>
        ))}
        <Note>Turn &quot;that looks amazing&quot; into &quot;we could do this&quot;. Each card will open a full itinerary page.</Note>
      </section>

      <section className="voices">
        <h2 className="h2 serif">People who went.</h2>
        <Note>Your collected reviews. These are placeholders: use only real quotes and photos, with permission.</Note>
        <div className="vtrack">
          {[...voices, ...voices].map((v, i) => (
            <div className="v" key={i} aria-hidden={i >= voices.length || undefined}>
              <div className="ph"><img src={v.img} alt={i < voices.length ? `Photo for review by ${v.who}` : ''} loading="lazy" /></div>
              <q>{v.q}</q><span>{v.who}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <p className="xl serif"><span className="line"><span>Who are you</span></span><span className="line"><span>bringing?</span></span></p>
        <a className="pill" href={`https://wa.me/?text=${encodeURIComponent(`Look at this for our trip: ${site.url}`)}`} target="_blank" rel="noopener">
          Send to the family group <i aria-hidden="true">↗</i>
        </a>
        <Note>Trips get decided on WhatsApp, so the last action is sharing, not signing up.</Note>
      </section>

      <div className="float" aria-hidden="true">
        {moods.map((m) => <img key={m.key} src={m.img} alt="" />)}
      </div>
    </main>
  );
}
