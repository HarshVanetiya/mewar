'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/content/site';

export default function Nav() {
  const [notes, setNotes] = useState(false);
  const [showNotesBtn, setShowNotesBtn] = useState(false);

  useEffect(() => {
    // Only surface editor content notes in development mode or with ?notes=1 in URL
    const isDev = process.env.NODE_ENV === 'development';
    const hasParam = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('notes');
    if (isDev || hasParam) {
      setShowNotesBtn(true);
    }
  }, []);

  const toggle = () => {
    const on = !notes;
    setNotes(on);
    document.body.classList.toggle('notes', on);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <nav className="nav" aria-label="Main navigation">
      <Link className="brand" href="/">{site.name}</Link>
      <Link className="hide" href="/#places">Places</Link>
      <Link className="hide" href="/#trips">Trips</Link>
      {showNotesBtn && (
        <button
          type="button"
          aria-pressed={notes}
          onClick={toggle}
          className={notes ? 'on' : ''}
          title="Toggle editor annotations"
        >
          Editor notes
        </button>
      )}
    </nav>
  );
}
