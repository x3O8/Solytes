'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CircleCheck,
  Moon,
  SunMedium,
} from 'lucide-react';
import { useState } from 'react';
import { LogoLoop } from '@/components/logo-loop';
import { products } from '@/lib/products';

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  return (
    <main>
      <section className={`hero ${isNight ? 'is-night' : 'is-day'}`}>
        <Image
          src="/solytes-hero-day.png"
          alt="Contemporary solar-powered home in daylight"
          fill
          priority
          className="hero-image hero-image-day"
          sizes="100vw"
        />
        <Image
          src="/solytes-hero-night.png"
          alt="The same solar-powered home illuminated at night"
          fill
          priority
          className="hero-image hero-image-night"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <span className="kicker light">
            Solar lighting · Rooftop systems · EPC
          </span>
          <h1>
            Designed for daylight.
            <br />
            Engineered for after dark.
          </h1>
          <p>
            Solytes brings solar products and project execution into one
            considered experience—from a single garden light to a complete power
            plant.
          </p>
        </div>
        <fieldset className="time-switch">
          <legend className="sr-only">Choose time of day</legend>
          <button
            type="button"
            className={!isNight ? 'active' : ''}
            aria-pressed={!isNight}
            onClick={() => setIsNight(false)}
          >
            <SunMedium size={16} />
            <span>
              <strong>Morning</strong>
              <small>Solar generating</small>
            </span>
          </button>
          <button
            type="button"
            className={isNight ? 'active' : ''}
            aria-pressed={isNight}
            onClick={() => setIsNight(true)}
          >
            <Moon size={15} />
            <span>
              <strong>Night</strong>
              <small>Home illuminated</small>
            </span>
          </button>
        </fieldset>
        <div className="hero-proof shell">
          <div>
            <CircleCheck />
            <span>Solar products</span>
          </div>
          <div>
            <CircleCheck />
            <span>Project engineering</span>
          </div>
          <div>
            <CircleCheck />
            <span>Installation support</span>
          </div>
        </div>
      </section>

      <section className="home-intro section shell">
        <div>
          <span className="kicker">One solar partner</span>
          <h2>
            Products for a pathway.
            <br />
            Power for a property.
          </h2>
        </div>
        <div>
          <p>
            Browse practical solar lighting or bring us a complete rooftop and
            EPC requirement. We connect product selection, site planning and
            execution so every decision works together.
          </p>
          <Link href="/about" className="arrow-link">
            Meet Solytes <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <LogoLoop />

      <section className="home-products section soft-section">
        <div className="shell section-top">
          <div>
            <span className="kicker">Selected products</span>
            <h2>
              Lighting that earns
              <br />
              its place.
            </h2>
          </div>
          <Link href="/products" className="arrow-link">
            View the full range <ArrowRight size={16} />
          </Link>
        </div>
        <div className="shell home-product-display">
          <Link
            href={`/products/${products[0].slug}`}
            className="home-product-feature"
          >
            <Image
              src={products[0].image}
              alt={products[0].name}
              fill
              sizes="(max-width: 900px) 100vw, 68vw"
            />
            <div>
              <span>{products[0].category}</span>
              <h3>{products[0].name}</h3>
              <p>{products[0].summary}</p>
              <b>
                View product <ArrowUpRight size={15} />
              </b>
            </div>
          </Link>
          <div className="home-product-directory">
            {products.slice(1).map((product, index) => (
              <Link href={`/products/${product.slug}`} key={product.slug}>
                <span>{String(index + 2).padStart(2, '0')}</span>
                <div>
                  <small>{product.category}</small>
                  <strong>{product.name}</strong>
                </div>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="epc-home">
        <Image
          src="/solytes-residence.png"
          alt="Rooftop solar installation on a contemporary residence"
          fill
          className="epc-home-image"
          sizes="100vw"
        />
        <div className="epc-home-shade" />
        <div className="shell epc-home-inner">
          <span className="kicker light">EPC solar projects</span>
          <h2>
            From feasibility
            <br />
            to first generation.
          </h2>
          <p>
            Site assessment, system design, procurement, construction and
            commissioning—managed as one accountable project.
          </p>
          <Link href="/projects" className="button button-light">
            Explore EPC services <Building2 size={17} />
          </Link>
        </div>
      </section>

      <section className="calculator-callout section shell">
        <div>
          <span className="kicker">Plan before you build</span>
          <h2>What size solar system do you actually need?</h2>
        </div>
        <div className="calculator-mini">
          <span>Start with your bill or monthly units</span>
          <strong>Get a planning estimate in under a minute.</strong>
          <Link href="/calculator" className="button button-dark">
            Open solar calculator <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
