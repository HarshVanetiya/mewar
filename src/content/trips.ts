// Ready-made trips. Stop order follows each site's reported opening pattern,
// but every timing note stays "verify" until checked on the ground.

export type Stop = {
  name: string;
  place?: string; // slug in places.ts, links to its page
  when: 'Early morning' | 'Morning' | 'Midday' | 'Afternoon' | 'Evening' | 'Night';
  why: string; // one line: why here, why now
  img: string;
  alt: string;
  position?: string;
};

export type Day = { title: string; stops: Stop[] };

export type Trip = {
  slug: string;
  days: number;
  title: string;
  line: string;
  base: string;
  img: string;
  alt: string;
  plan: Day[];
};

export const trips: Trip[] = [
  {
    slug: 'udaipur-in-one-day',
    days: 1,
    title: 'One day, one city',
    line: 'Udaipur at an easy pace, ending on the lake.',
    base: 'Udaipur',
    img: '/img/palace.jpg',
    alt: 'City Palace above Lake Pichola',
    plan: [
      {
        title: 'The old city and the lake',
        stops: [
          { name: 'City Palace', place: 'udaipur', when: 'Morning', why: 'Go early, before the heat and the crowds.', img: '/img/palace2.jpg', alt: 'City Palace across the lake' },
          { name: 'Old city lanes', place: 'udaipur', when: 'Midday', why: 'Lunch, shops and the ghats on foot.', img: '/img/palace.jpg', alt: 'Ghats below the City Palace', position: '20% 70%' },
          { name: 'Lake Pichola at sunset', place: 'udaipur', when: 'Evening', why: 'The reason people fall for Udaipur.', img: '/img/pichola.jpg', alt: 'Sunset over Lake Pichola' },
        ],
      },
    ],
  },
  {
    slug: 'lakes-faith-legend-3-days',
    days: 3,
    title: 'Lakes, faith, legend',
    line: 'Udaipur, Eklingji, Haldighati and Nathdwara, in an order that works.',
    base: 'Udaipur',
    img: '/img/chetak.jpg',
    alt: 'Chetak Samadhi, Haldighati',
    plan: [
      {
        title: 'Udaipur',
        stops: [
          { name: 'City Palace', place: 'udaipur', when: 'Morning', why: 'Start where Mewar’s rulers lived.', img: '/img/palace2.jpg', alt: 'City Palace' },
          { name: 'Lake Pichola', place: 'udaipur', when: 'Evening', why: 'Sunset from the water or the ghats.', img: '/img/pichola.jpg', alt: 'Lake Pichola at sunset' },
        ],
      },
      {
        title: 'The Haldighati road',
        stops: [
          { name: 'Eklingji', when: 'Early morning', why: 'Morning darshan before the drive. Verify session times.', img: '/img/pichwai.jpg', alt: 'Placeholder: your Eklingji photo', position: '50% 20%' },
          { name: 'Haldighati', place: 'haldighati', when: 'Midday', why: 'The pass, the memorial and the museum.', img: '/img/chetak.jpg', alt: 'Chetak Samadhi' },
          { name: 'Nathdwara', place: 'nathdwara', when: 'Evening', why: 'Evening darshan, then stay the night. Verify session times.', img: '/img/pichwai.jpg', alt: 'Placeholder: your Nathdwara photo', position: '50% 60%' },
        ],
      },
      {
        title: 'Nathdwara and back',
        stops: [
          { name: 'Shrinathji darshan', place: 'nathdwara', when: 'Early morning', why: 'The first darshan of the day. Verify timing.', img: '/img/pichwai.jpg', alt: 'Placeholder: your Shrinathji temple-street photo', position: '50% 10%' },
          { name: 'Back to Udaipur', place: 'udaipur', when: 'Afternoon', why: 'Short drive back, evening free.', img: '/img/pichola.jpg', alt: 'Lake Pichola', position: '80% 50%' },
        ],
      },
    ],
  },
  {
    slug: 'all-of-mewar-5-days',
    days: 5,
    title: 'All of Mewar',
    line: 'The lakes, the temples, the great forts and the marble.',
    base: 'Udaipur',
    img: '/img/kumbhal.jpg',
    alt: 'Kumbhalgarh Fort',
    plan: [
      {
        title: 'Udaipur',
        stops: [
          { name: 'City Palace and the old city', place: 'udaipur', when: 'Morning', why: 'Ease in on foot.', img: '/img/palace2.jpg', alt: 'City Palace' },
          { name: 'Lake Pichola', place: 'udaipur', when: 'Evening', why: 'Sunset on the water.', img: '/img/pichola.jpg', alt: 'Lake Pichola at sunset' },
        ],
      },
      {
        title: 'Faith and legend',
        stops: [
          { name: 'Eklingji', when: 'Early morning', why: 'Verify darshan times before leaving.', img: '/img/pichwai.jpg', alt: 'Placeholder: your Eklingji photo', position: '50% 20%' },
          { name: 'Haldighati', place: 'haldighati', when: 'Midday', why: 'The memorial and the museum.', img: '/img/chetak.jpg', alt: 'Chetak Samadhi' },
          { name: 'Nathdwara', place: 'nathdwara', when: 'Evening', why: 'Evening darshan and an overnight stay.', img: '/img/pichwai.jpg', alt: 'Placeholder: your Nathdwara photo', position: '50% 60%' },
        ],
      },
      {
        title: 'Up to Kumbhalgarh',
        stops: [
          { name: 'Kumbhalgarh Fort', place: 'kumbhalgarh', when: 'Afternoon', why: 'Walk the walls as the light softens.', img: '/img/kumbhal.jpg', alt: 'Kumbhalgarh walls' },
          { name: 'Light and sound show', place: 'kumbhalgarh', when: 'Night', why: 'Reported at dusk. Verify the time and language.', img: '/img/kumbhal.jpg', alt: 'Kumbhalgarh at dusk', position: '50% 15%' },
        ],
      },
      {
        title: 'Ranakpur, then home',
        stops: [
          { name: 'Ranakpur temple', place: 'ranakpur', when: 'Midday', why: 'Visitors are reportedly let in from about noon. Verify.', img: '/img/ranakpur.jpg', alt: 'Ranakpur marble pillars' },
          { name: 'Back to Udaipur', place: 'udaipur', when: 'Evening', why: 'A long but beautiful drive.', img: '/img/pichola.jpg', alt: 'Lake Pichola', position: '80% 50%' },
        ],
      },
      {
        title: 'Chittorgarh day trip',
        stops: [
          { name: 'Chittorgarh Fort', place: 'chittorgarh', when: 'Morning', why: 'Leave early; the fort is large.', img: '/img/vijay.jpg', alt: 'Vijay Stambh' },
          { name: 'Back to Udaipur', place: 'udaipur', when: 'Evening', why: 'Last dinner by the lake.', img: '/img/pichola.jpg', alt: 'Lake Pichola' },
        ],
      },
    ],
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);
