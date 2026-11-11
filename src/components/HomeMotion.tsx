'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** All homepage scroll choreography. Content renders without it (no-JS and reduced motion). */
export default function HomeMotion() {
  useEffect(() => {
    // Avoid mobile jumpiness when browser address bar expands/contracts
    ScrollTrigger.config({ ignoreMobileResize: true });

    const loader = document.querySelector('.loader');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loader?.classList.add('done');
      return;
    }
    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 769px)', mob: '(max-width: 768px)' }, (ctx) => {
      const desk = !!ctx.conditions?.desk;

      // Intro
      gsap.set('.arch', { scale: desk ? 0.44 : 0.58, force3D: true });
      gsap.timeline()
        .from('.loader span', { yPercent: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out' })
        .to('.loader', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '+=.2')
        .add(() => loader?.classList.add('done'))
        .from('.arch', { yPercent: 16, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, '-=.5')
        .from('.hero-kicker, .hero-title', { y: 35, autoAlpha: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out' }, '<.1')
        .from('.hero .shade', { y: 30, autoAlpha: 0, duration: 0.9, ease: 'expo.out' }, '<.2');

      // Hero: smooth bidirectional portal zoom on scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          pin: true,
          start: 'top top',
          end: '+=160%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .fromTo('.hero-center',
          { yPercent: 0, autoAlpha: 1 },
          { yPercent: -80, autoAlpha: 0, ease: 'power2.inOut', duration: 0.55, immediateRender: false },
          0
        )
        .fromTo('.arch',
          { scale: desk ? 0.44 : 0.58 },
          { scale: desk ? 1.85 : 2.1, ease: 'power2.inOut', duration: 1, immediateRender: false },
          0
        )
        .fromTo('.arch img',
          { scale: 1.2 },
          { scale: 1, ease: 'none', duration: 1, immediateRender: false },
          0
        )
        .fromTo('.hero .shade',
          { autoAlpha: 1, yPercent: 0 },
          { autoAlpha: 0, yPercent: 40, ease: 'power2.in', duration: 0.45, immediateRender: false },
          0
        );

      // Statement lights up word by word
      gsap.fromTo('.wd', { opacity: 0.22 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.say', start: 'top 65%', end: 'bottom 75%', scrub: true },
      });

      // Horizontal gallery (desktop); phones get native swipe
      if (desk) {
        const track = document.querySelector<HTMLElement>('.h-track');
        if (track) {
          const dist = () => track.scrollWidth - innerWidth;
          const tween = gsap.to(track, {
            x: () => -dist(), ease: 'none',
            scrollTrigger: { trigger: '.h-wrap', pin: true, start: 'top top', end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true },
          });
          gsap.utils.toArray<HTMLElement>('.panel .pic img').forEach((img) => {
            gsap.fromTo(img, { scale: 1.22, xPercent: -7 }, {
              xPercent: 7, ease: 'none',
              scrollTrigger: { trigger: img.closest('.panel'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            });
          });
        }
      }

      // Photo follows the cursor over the mood words
      const cleanups: (() => void)[] = [];
      const f = document.querySelector<HTMLElement>('.float');
      if (desk && f && matchMedia('(hover: hover)').matches) {
        const imgs = f.querySelectorAll('img');
        const fx = gsap.quickTo(f, 'x', { duration: 0.6, ease: 'power3' });
        const fy = gsap.quickTo(f, 'y', { duration: 0.6, ease: 'power3' });
        gsap.set(f, { scale: 0.92, autoAlpha: 0 });
        document.querySelectorAll<HTMLElement>('.moods a').forEach((a) => {
          const enter = () => {
            imgs.forEach((m, i) => m.classList.toggle('on', String(i) === a.dataset.i));
            gsap.to(f, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
          };
          const leave = () => gsap.to(f, { autoAlpha: 0, scale: 0.92, duration: 0.25, overwrite: 'auto' });
          const move = (e: MouseEvent) => { fx(e.clientX + 36); fy(e.clientY - 210); };
          a.addEventListener('mouseenter', enter);
          a.addEventListener('mouseleave', leave);
          a.addEventListener('mousemove', move);
          cleanups.push(() => {
            a.removeEventListener('mouseenter', enter);
            a.removeEventListener('mouseleave', leave);
            a.removeEventListener('mousemove', move);
          });
        });
      }
      gsap.from('.moods li', { y: 60, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.moods ul', start: 'top 80%', once: true } });

      // Zoom: the collage parts and one photo takes the screen
      gsap.set('.zoom .shade', { autoAlpha: 0 });
      gsap.timeline({ scrollTrigger: { trigger: '.zoom', pin: true, start: 'top top', end: '+=130%', scrub: 1 } })
        .fromTo('.z0', { scale: desk ? 0.34 : 0.6 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
        .to('.z1', { xPercent: -130, yPercent: -40, ease: 'power1.in', duration: 0.8 }, 0)
        .to('.z2', { xPercent: 130, yPercent: -40, ease: 'power1.in', duration: 0.8 }, 0)
        .to('.z3', { xPercent: -130, yPercent: 40, ease: 'power1.in', duration: 0.8 }, 0)
        .to('.z4', { xPercent: 130, yPercent: 40, ease: 'power1.in', duration: 0.8 }, 0)
        .to('.zoom .shade', { autoAlpha: 1, duration: 0.2 }, 0.85);

      // Each trip card settles back as the next covers it
      const cards = gsap.utils.toArray<HTMLElement>('.card');
      cards.forEach((c, i) => {
        if (i < cards.length - 1) gsap.to(c, { scale: 0.93, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 12%', scrub: true } });
      });

      // Voices drift, faster while you scroll
      const drift = gsap.to('.vtrack', { xPercent: -50, ease: 'none', duration: 46, repeat: -1, paused: true });
      ScrollTrigger.create({
        trigger: '.voices', start: 'top bottom', end: 'bottom top',
        onToggle: (s) => (s.isActive ? drift.play() : drift.pause()),
        onUpdate: (s) => {
          const v = gsap.utils.clamp(1, 6, 1 + Math.abs(s.getVelocity()) / 500);
          gsap.to(drift, { timeScale: v, duration: 0.2, overwrite: true });
          gsap.to(drift, { timeScale: 1, duration: 1, delay: 0.2 });
        },
      });

      gsap.from('.cta .line > span', { yPercent: 105, stagger: 0.1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.cta', start: 'top 72%', once: true } });

      return () => cleanups.forEach((fn) => fn());
    });
    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);
    return () => {
      removeEventListener('load', refresh);
      mm.revert();
    };
  }, []);
  return null;
}
