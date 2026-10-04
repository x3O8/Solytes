'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { type SyntheticEvent, useRef, useState } from 'react';
import GlassSurface from './GlassSurface';

export function NewsletterPanel({ homepage = false }: { homepage?: boolean }) {
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = form.get('email');
    const email = typeof value === 'string' ? value.trim() : '';
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      emailRef.current?.focus();
      return;
    }
    setError('');
    const subject = encodeURIComponent('Join the Solytes updates list');
    const body = encodeURIComponent(
      `Please add ${email} to the Solytes updates list.`,
    );
    window.location.href = `mailto:info@solytes.com?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id={homepage ? 'community' : undefined}
      className={`newsletter-section ${homepage ? 'newsletter-section-home' : ''}`}
      aria-labelledby="newsletter-title"
    >
      <div className="newsletter-shade" />
      <div className="shell newsletter-inner">
        <GlassSurface
          width={homepage ? '100%' : 'min(740px, 100%)'}
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
            {!homepage ? (
              <span className="newsletter-kicker">
                Field notes from Solytes
              </span>
            ) : null}
            <h2 id="newsletter-title">
              {homepage
                ? 'Subscribe to Our Community'
                : 'Solar ideas, made useful.'}
            </h2>
            <p>
              {homepage
                ? 'Get practical solar insights, product ideas and project guidance delivered to your inbox. Join the Solytes community.'
                : 'Occasional notes on lighting, rooftop systems and better project planning—written for people making real site decisions.'}
            </p>
            <form className="newsletter-form" onSubmit={submit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                ref={emailRef}
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={
                  homepage
                    ? 'Enter your email here'
                    : 'Enter your email address'
                }
                aria-invalid={Boolean(error)}
                aria-describedby="newsletter-note newsletter-error"
              />
              <button type="submit">
                {homepage ? 'Join Now' : 'Join the list'}
                {!homepage ? <ArrowRight size={16} /> : null}
              </button>
            </form>
            {homepage ? (
              <div className="newsletter-topics" aria-label="Topics covered">
                <span aria-hidden="true">
                  <Image
                    src="/product-cutout-1.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
                <span aria-hidden="true">
                  <Image
                    src="/product-cutout-3.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
                <span aria-hidden="true">
                  <Image
                    src="/product-cutout-4.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
                <strong>Lighting · Rooftop · EPC insights</strong>
              </div>
            ) : null}
            <div className="newsletter-meta">
              <span id="newsletter-note">
                Opens your email app so you can review before sending.
              </span>
              <output id="newsletter-error" role="alert">
                {error}
              </output>
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}
