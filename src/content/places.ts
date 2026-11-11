// Content lives here, separate from design, so it can move to Sanity later
// without touching components.

export type Fact = {
  label: string;
  value: string;
  /** false until checked in person, by phone, or on an official page */
  verified: boolean;
  source?: string;
  verifiedOn?: string; // YYYY-MM-DD
};

export type Photo = { src: string; alt: string; position?: string; credit: string };

export type Place = {
  slug: string;
  name: string;
  nameHi: string;
  mood: 'water' | 'devotion' | 'stone' | 'story';
  line: string; // one feeling line, 8 words max
  promise: string; // hero line on the place page, 12 words max
  hero: Photo;
  frames: Photo[]; // up to 5 best photos
  facts: Fact[];
  details: { title: string; body: string }[];
  next: string[]; // slugs of logical next stops
};

const C = {
  pichola: 'UnpetitproleX, CC BY-SA 4.0, Wikimedia Commons',
  palace: 'Jakub Hałun, CC BY-SA 4.0, Wikimedia Commons',
  palace2: 'tommy, CC BY-SA 2.0, Wikimedia Commons',
  kumbhal: 'Suman Rao, CC BY-SA 4.0, Wikimedia Commons',
  ranakpur: 'Banerjeedebasis, CC BY-SA 4.0, Wikimedia Commons',
  vijay: 'Deepank Ranka, CC BY-SA 4.0, Wikimedia Commons',
  chetak: 'Ashwinushenoy, CC BY-SA 3.0, Wikimedia Commons',
  pichwai: 'Unknown Rajasthani artist, public domain, Wikimedia Commons',
};

const p = (file: keyof typeof C, alt: string, position?: string): Photo => ({
  src: `/img/${file}.jpg`,
  alt,
  position,
  credit: C[file],
});

// Placeholder detail copy. Each tells the writer what belongs there.
const details = (extra?: string) => [
  { title: 'Getting there', body: 'Three short lines: taxi or self-drive, road condition, realistic travel time.' },
  { title: 'Tickets and timings', body: 'Fee, hours and any show times, each with "Last verified" date and source.' },
  { title: 'The story, in 60 seconds', body: extra ?? 'Who built it and why it matters, told as a story. Maximum 80 words.' },
  { title: 'With parents or kids?', body: 'Honest note on walking, steps, shade, toilets and where to rest.' },
  { title: 'Skip it if…', body: 'One honest line. It builds more trust than any praise.' },
];

const todo = (label: string, value = 'To verify'): Fact => ({ label, value, verified: false });

export const places: Place[] = [
  {
    slug: 'udaipur',
    name: 'Udaipur',
    nameHi: 'उदयपुर',
    mood: 'water',
    line: 'A palace that starts at the water.',
    promise: 'Evenings on the lake you will keep describing at home.',
    hero: p('pichola', 'Sunset over Lake Pichola with the Lake Palace'),
    frames: [
      p('palace', 'City Palace rising above Lake Pichola'),
      p('pichola', 'Boats on Lake Pichola at sunset', '30% 60%'),
      p('palace2', 'City Palace seen across the lake'),
    ],
    facts: [todo('best time'), todo('days you will want'), todo('best moment'), todo('from the airport')],
    details: details(),
    next: ['nathdwara', 'kumbhalgarh'],
  },
  {
    slug: 'nathdwara',
    name: 'Nathdwara',
    nameHi: 'नाथद्वारा',
    mood: 'devotion',
    line: 'Darshan, and art made for Shrinathji.',
    promise: 'A town that wakes, eats and sings around one temple.',
    // Your own photos of Nathdwara go here first. The painting stands in.
    hero: p('pichwai', 'Traditional pichwai painting from Rajasthan', '50% 12%'),
    frames: [p('pichwai', 'Detail of a pichwai painting', '50% 70%')],
    facts: [
      { label: 'from Udaipur', value: '43–52 km', verified: false, source: 'Third-party travel sites, conflicting' },
      todo('darshan sessions'),
      todo('best time'),
      todo('phones inside'),
    ],
    details: [
      { title: 'Darshan, first time', body: 'Sessions, what to expect inside, lockers for phones and shoes. Checked in person, with date.' },
      ...details(),
    ],
    next: ['haldighati', 'udaipur'],
  },
  {
    slug: 'haldighati',
    name: 'Haldighati',
    nameHi: 'हल्दीघाटी',
    mood: 'story',
    line: 'Where a legend lies at rest.',
    promise: 'Stand in the pass where Mewar’s most told story happened.',
    hero: p('chetak', 'Chetak Samadhi at Haldighati'),
    frames: [p('chetak', 'Memorial pavilion at Chetak Samadhi', '70% 50%')],
    facts: [todo('from Nathdwara'), todo('hours you will want'), todo('museum fee'), todo('best time')],
    details: details('What is documented and what is legend, with sources named.'),
    next: ['nathdwara', 'kumbhalgarh'],
  },
  {
    slug: 'kumbhalgarh',
    name: 'Kumbhalgarh',
    nameHi: 'कुम्भलगढ़',
    mood: 'stone',
    line: 'Walls that keep going over the hills.',
    promise: 'Walk a wall that disappears over the hills.',
    hero: p('kumbhal', 'Domed bastion on the walls of Kumbhalgarh Fort'),
    frames: [
      p('kumbhal', 'Fort wall and dome', '80% 75%'),
      p('kumbhal', 'Distant ramparts', '5% 65%'),
      p('kumbhal', 'Storm sky over the fort', '50% 15%'),
    ],
    facts: [
      { label: 'from Udaipur', value: '85–90 km', verified: false, source: 'Third-party travel sites' },
      todo('hours you will want'),
      todo('best time'),
      { label: 'best moment', value: 'Dusk', verified: false },
    ],
    details: details(),
    next: ['ranakpur', 'udaipur'],
  },
  {
    slug: 'ranakpur',
    name: 'Ranakpur',
    nameHi: 'रणकपुर',
    mood: 'devotion',
    line: 'Marble, carved until it looks like lace.',
    promise: 'A forest of marble pillars, every one different.',
    hero: p('ranakpur', 'Carved marble pillars at Ranakpur'),
    frames: [p('ranakpur', 'Pillar carving detail', '50% 30%')],
    facts: [todo('visiting hours'), todo('from Kumbhalgarh'), todo('entry fee'), todo('dress code')],
    details: details(),
    next: ['kumbhalgarh', 'chittorgarh'],
  },
  {
    slug: 'chittorgarh',
    name: 'Chittorgarh',
    nameHi: 'चित्तौड़गढ़',
    mood: 'stone',
    line: 'A tower of victory above the plain.',
    promise: 'The old capital, where every stone has a story.',
    hero: p('vijay', 'Vijay Stambh at Chittorgarh Fort'),
    frames: [p('vijay', 'Carving on the Vijay Stambh', '50% 30%')],
    facts: [
      { label: 'from Udaipur', value: '110–125 km', verified: false, source: 'Third-party travel sites' },
      todo('hours you will want'),
      todo('entry fee'),
      todo('best time'),
    ],
    details: details(),
    next: ['udaipur', 'kumbhalgarh'],
  },
];

export const getPlace = (slug: string) => places.find((x) => x.slug === slug);

export const moods = [
  { key: 'water', word: 'Still water', where: 'Udaipur', img: '/img/pichola.jpg', href: '/places/udaipur/' },
  { key: 'devotion', word: 'Devotion', where: 'Nathdwara, Eklingji', img: '/img/pichwai.jpg', href: '/places/nathdwara/' },
  { key: 'stone', word: 'Stone and sky', where: 'Kumbhalgarh, Chittorgarh', img: '/img/kumbhal.jpg', href: '/places/kumbhalgarh/' },
  { key: 'story', word: 'Old stories', where: 'Haldighati', img: '/img/chetak.jpg', href: '/places/haldighati/' },
] as const;
