'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TripMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.t-hero .num', { yPercent: 40, autoAlpha: 0, duration: 1.4 })
        .from('.t-hero h1, .t-hero .lead, .t-hero .pill', { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, '-=1.1')
        .from('.t-hero .pic', { yPercent: 12, autoAlpha: 0, duration: 1.4 }, '<');

      // The route line draws itself as you scroll
      gsap.fromTo('.route-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.route', start: 'top 60%', end: 'bottom 60%', scrub: true } });

      gsap.utils.toArray<HTMLElement>('.stop').forEach((s) => {
        gsap.from(s.querySelector('.dot'), { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: s, start: 'top 62%', once: true } });
        gsap.from(s.querySelectorAll('.stx > *'), { y: 40, autoAlpha: 0, stagger: 0.06, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 80%', once: true } });
        const img = s.querySelector('.sp img');
        if (img) gsap.fromTo(img, { scale: 1.18, yPercent: -6 }, { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
