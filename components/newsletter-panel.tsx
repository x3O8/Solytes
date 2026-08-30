'use client';

import { ArrowRight } from 'lucide-react';
import { type SyntheticEvent, useState } from 'react';
import GlassSurface from './GlassSurface';

export function NewsletterPanel() {
  const [error, setError] = useState('');

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = form.get('email');
    const email = typeof value === 'string' ? value.trim() : '';
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    const subject = encodeURIComponent('Join the Solytes updates list');
    const body = encodeURIComponent(
      `Please add ${email} to the Solytes updates list.`,
    );
    window.location.href = `mailto:hello@solytes.in?subject=${subject}&body=${body}`;
  }

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="newsletter-shade" />
      <div className="shell newsletter-inner">
        <GlassSurface
          width="min(740px, 100%)"
          height="auto"
          borderRadius={28}
          borderWidth={0.09}
          brightness={82}
          opacity={0.76}
          blur={16}
          displace={0.5}
          backgroundOpacity={0.28}
          saturation={1.35}
          distortionScale={-150}
          redOffset={0}
          greenOffset={8}
          blueOffset={16}
          mixBlendMode="screen"
          className="newsletter-glass"
        >
          <div className="newsletter-card">
            <span className="newsletter-kicker">Field notes from Solytes</span>
            <h2 id="newsletter-title">Solar ideas, made useful.</h2>
            <p>
              Occasional notes on lighting, rooftop systems and better project
              planning—written for people making real site decisions.
            </p>
            <form className="newsletter-form" onSubmit={submit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                aria-invalid={Boolean(error)}
                aria-describedby="newsletter-note newsletter-error"
              />
              <button type="submit">
                Join the list <ArrowRight size={16} />
              </button>
            </form>
            <div className="newsletter-meta">
              <span id="newsletter-note">
                Opens your email app so you can review before sending.
              </span>
              <output id="newsletter-error">{error}</output>
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}
