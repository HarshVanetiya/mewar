'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PlaceMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
        .from('.p-hero .pic', { yPercent: 14, autoAlpha: 0, duration: 1.4 })
        .from('.p-hero .pic img', { scale: 1.3, duration: 1.8 }, '<')
        .from('.p-hero .hi, .p-hero h1, .p-hero .promise', { y: 50, autoAlpha: 0, stagger: 0.08 }, '-=1.1');

      gsap.from('.facts > div', { y: 40, autoAlpha: 0, stagger: 0.07, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.facts', start: 'top 85%', once: true } });

      gsap.utils.toArray<HTMLElement>('.frame').forEach((f) => {
        gsap.fromTo(f.querySelector('img'), { scale: 1.15, yPercent: -6 }, { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from(f, { y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 88%', once: true } });
      });

      gsap.from('.more details', { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.more', start: 'top 80%', once: true } });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
