'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Moon,
  SunMedium,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ContactForm } from '@/components/contact-form';

const featuredProducts = [
  {
    name: 'Nova Integrated Street Light',
    category: 'Street lighting',
    description:
      'A compact all-in-one solar luminaire for internal roads, compounds and shared outdoor spaces.',
    image: '/home-product-nova-v2.png',
    href: '/products/nova-integrated-street-light',
  },
  {
    name: 'Halo Garden Light',
    category: 'Garden lighting',
    description:
      'Comfortable area lighting for garden paths, lawns and landscape edges in a considered low-profile form.',
    image: '/home-product-halo.png',
    href: '/products/halo-garden-light',
  },
  {
    name: 'Arc Solar Wall Light',
    category: 'Architectural lighting',
    description:
      'A clean curved wall fixture that gives entrances, balconies and exterior walls a soft downward glow.',
    image: '/home-product-arc.png',
    href: '/products/arc-solar-wall-light',
  },
  {
    name: 'Shield Motion Wall Light',
    category: 'Security lighting',
    description:
      'A wire-free motion light for entrances, side passages and utility areas where dependable illumination matters.',
    image: '/home-product-shield.png',
    href: '/products/shield-motion-wall-light',
  },
  {
    name: 'Solytes Solar Brick Light',
    category: 'Architectural lighting',
    description:
      'A luminous solar paver that creates clear, distinctive markers along pathways, entrances and landscape edges.',
    image: '/home-product-brick.png',
    href: '/products/solytes-solar-brick-light',
  },
  {
    name: 'Focus Landscape Spotlight',
    category: 'Landscape lighting',
    description:
      'An adjustable cable-free spotlight for bringing trees, facades, signage and garden features into focus.',
    image: '/home-product-focus-v3.png',
    href: '/products/focus-landscape-spotlight',
  },
];

const frequentlyAskedQuestions = [
  {
    question: 'Is solar a good fit for my home or site?',
    answer:
      'A useful first check looks at your electricity use, available roof or ground area, shade, access and how you want the system to perform. A site conversation helps turn those details into a practical recommendation.',
  },
  {
    question: 'How do you estimate the right system size?',
    answer:
      'We start with recent electricity bills and typical monthly units, then consider usable area and site conditions. The calculator gives an early range; a site assessment confirms what is realistic.',
  },
  {
    question: 'Can Solytes handle planning and installation?',
    answer:
      'Yes. Solytes brings rooftop planning, product selection and project execution together so the same practical team can carry the work from assessment through delivery.',
  },
  {
    question: 'Will installation disrupt daily use?',
    answer:
      'The amount of disruption depends on the site and system. Access, working hours and any temporary interruptions are discussed before work begins so installation can be planned around the people using the space.',
  },
  {
    question: 'What maintenance does a solar system need?',
    answer:
      'Most systems benefit from periodic cleaning, visual checks and monitoring of output. The exact routine depends on dust, trees, weather exposure and the equipment installed.',
  },
  {
    question: 'Can lighting and rooftop solar be planned together?',
    answer:
      'They can. Looking at energy generation and outdoor lighting as one site plan helps align capacity, placement, daily use and the character of the property.',
  },
];

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [monthlyUnits, setMonthlyUnits] = useState(450);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveProduct((current) => (current + 1) % featuredProducts.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const product = featuredProducts[activeProduct];
  const quickEstimate = Math.ceil((monthlyUnits / 30 / 3.51) * 1.1 * 2) / 2;
  const showPreviousProduct = () =>
    setActiveProduct(
      (current) =>
        (current - 1 + featuredProducts.length) % featuredProducts.length,
    );
  const showNextProduct = () =>
    setActiveProduct((current) => (current + 1) % featuredProducts.length);

  return (
    <main className="home-page">
      <section className={`hero ${isNight ? 'is-night' : 'is-day'}`}>
        <Image
          src="/solytes-field-home-day-v3.png"
          alt="Clean contemporary solar-powered home in daylight"
          fill
          priority
          className="hero-image hero-image-day"
          sizes="100vw"
        />
        <Image
          src="/solytes-field-home-night-v3.png"
          alt="The same solar-powered home illuminated at night"
          fill
          priority
          className="hero-image hero-image-night"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <h1>Power Your Future with Smarter Solar</h1>
          <p>
            Thoughtful solar systems and lighting, planned around the way you
            live.
          </p>
        </div>
        <fieldset className={`time-switch ${isNight ? 'is-night' : 'is-day'}`}>
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
      </section>

      <section className="home-kerala" aria-labelledby="kerala-heading">
        <div className="shell home-kerala-inner">
          <figure
            className="kerala-map"
            aria-label="Kerala map marking Kasaragod, Kannur, Calicut, Thrissur, Kochi, Kottayam and Thiruvananthapuram"
          >
            <Image
              src="/solytes-kerala-dotted-cities-accurate-v2.png"
              alt="Dotted map of Kerala with markers for Kasaragod, Kannur, Calicut, Thrissur, Kochi, Kottayam and Thiruvananthapuram"
              fill
              sizes="(max-width: 780px) calc(100vw - 32px), 54vw"
              className="kerala-map-image"
            />
          </figure>
          <div className="home-kerala-copy">
            <span className="home-kerala-label">Who are we?</span>
            <h2 id="kerala-heading">Solar expertise, rooted across Kerala.</h2>
            <p>
              Established in Calicut in 2018, Solytes Energy Solution is an
              engineering-led team serving major cities across Kerala. We plan
              rooftop systems, solar lighting and EPC projects with close
              attention to the details that matter on site: performance,
              installation quality and long-term value.
            </p>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="home-services"
        aria-labelledby="home-services-title"
      >
        <div className="shell home-services-inner">
          <header>
            <span className="kicker">Services Offered</span>
            <h2 id="home-services-title">Built around real places.</h2>
            <p>
              From rooftops that need more independence to pathways that need a
              softer glow, we design for the space, the people and the outcome.
            </p>
          </header>
          <div className="home-service-grid">
            <Link href="/calculator" className="home-service-card">
              <div className="home-service-image">
                <Image
                  src="/solytes-modern-home-day.png"
                  alt="A contemporary home with a rooftop solar system"
                  fill
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
              </div>
              <div className="home-service-copy">
                <span>Homes and businesses</span>
                <h3>Rooftop solar</h3>
                <p>
                  System sizing and rooftop planning based on real energy use.
                </p>
                <i aria-hidden="true">
                  <ArrowRight size={17} />
                </i>
              </div>
            </Link>
            <Link href="/projects" className="home-service-card">
              <div className="home-service-image">
                <Image
                  src="/home-process-deliver.png"
                  alt="Solar installers completing a rooftop energy project"
                  fill
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
              </div>
              <div className="home-service-copy">
                <span>End-to-end execution</span>
                <h3>EPC project delivery</h3>
                <p>Engineering-led planning, procurement and installation.</p>
                <i aria-hidden="true">
                  <ArrowRight size={17} />
                </i>
              </div>
            </Link>
            <Link href="/products" className="home-service-card">
              <div className="home-service-image">
                <Image
                  src="/home-product-halo.png"
                  alt="Solar garden lighting along a landscaped path"
                  fill
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
              </div>
              <div className="home-service-copy">
                <span>Outdoor applications</span>
                <h3>Solar lighting</h3>
                <p>
                  Street, garden, wall and landscape lighting without cabling.
                </p>
                <i aria-hidden="true">
                  <ArrowRight size={17} />
                </i>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="home-products shell"
        aria-labelledby="home-products-title"
      >
        <header className="home-products-heading">
          <h2 id="home-products-title">Explore Our Products</h2>
        </header>
        <article
          className="home-product-carousel"
          aria-roledescription="carousel"
          aria-label="Products in use"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (startX === null || endX === undefined) return;
            const delta = endX - startX;
            if (Math.abs(delta) < 42) return;
            if (delta < 0) showNextProduct();
            else showPreviousProduct();
          }}
        >
          <div className="home-product-media">
            <Image
              key={product.image}
              src={product.image}
              alt={`${product.name} installed in a real outdoor setting`}
              fill
              sizes="(max-width: 760px) 100vw, 60vw"
              className={`home-product-image ${product.image.includes('brick') ? 'is-brick' : ''}`}
            />
          </div>
          <div className="home-product-copy" aria-live="polite">
            <span className="kicker">{product.category}</span>
            <p className="home-product-index">
              {String(activeProduct + 1).padStart(2, '0')} /{' '}
              {String(featuredProducts.length).padStart(2, '0')}
            </p>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link href={product.href} className="button button-dark">
              View Products <ArrowRight size={17} />
            </Link>
          </div>
          <div className="home-product-controls" aria-label="Carousel controls">
            <button
              type="button"
              onClick={showPreviousProduct}
              aria-label="Show previous product"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="home-product-dots" aria-label="Choose a product">
              {featuredProducts.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  className={index === activeProduct ? 'active' : ''}
                  onClick={() => setActiveProduct(index)}
                  aria-label={`Show ${item.name}`}
                  aria-current={index === activeProduct ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNextProduct}
              aria-label="Show next product"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </article>
      </section>

      <section className="home-planning shell">
        <div className="home-planning-copy">
          <span className="kicker">
            <Calculator size={14} /> Estimate your system size
          </span>
          <h2>Start with a clearer picture of your solar requirement.</h2>
          <p>
            Use your monthly electricity use to get an early capacity range,
            then bring the result into a practical site conversation.
          </p>
        </div>
        <div className="home-planning-visual">
          <Image
            src="/solar-landscape-continuum.png"
            alt="Solar panels across an open green landscape"
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <aside
            className="home-quick-calculator"
            aria-labelledby="quick-calc-title"
          >
            <span className="home-quick-label">Quick solar estimate</span>
            <h3 id="quick-calc-title">Start with your monthly usage.</h3>
            <label htmlFor="home-monthly-units">
              Electricity use <b>{monthlyUnits} units / month</b>
            </label>
            <input
              id="home-monthly-units"
              type="range"
              min="100"
              max="2000"
              step="50"
              value={monthlyUnits}
              onChange={(event) => setMonthlyUnits(Number(event.target.value))}
            />
            <output htmlFor="home-monthly-units" aria-live="polite">
              <span>Early system estimate</span>
              <strong>{quickEstimate} kW</strong>
              <small>Based on typical Kerala sun and light roof shading.</small>
            </output>
            <Link href={`/calculator?units=${monthlyUnits}`} className="button button-dark">
              Open advanced calculator <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="home-faq" aria-labelledby="home-faq-title">
        <div className="shell home-faq-inner">
          <aside className="home-faq-aside">
            <span className="home-faq-label">Frequently asked questions</span>
            <div className="home-faq-card">
              <div className="home-faq-card-image">
                <Image
                  src="/solytes-faq-architecture-v2.png"
                  alt="A modern Kerala home with rooftop solar in soft morning light"
                  fill
                  sizes="(max-width: 780px) 160px, 190px"
                />
              </div>
              <div>
                <h3>Ready to make a start?</h3>
                <p>Tell us what you want to power, light or improve.</p>
                <Link href="/contact" className="home-faq-card-link">
                  Start a project assessment <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <div className="home-faq-content">
            <header>
              <h2 id="home-faq-title">Start with clarity</h2>
              <p>
                A few clear answers can make the next decision feel much easier.
              </p>
            </header>
            <div className="home-faq-list">
              {frequentlyAskedQuestions.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <i aria-hidden="true">
                      <ChevronDown size={16} />
                    </i>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="home-contact shell">
        <div className="home-contact-copy">
          <span className="kicker">Start a conversation</span>
          <h2>Get in touch with our team</h2>
          <p>
            Tell us about the site, the goal and the scale. We’ll help you find
            the right next step—product, capacity estimate or complete EPC
            delivery.
          </p>
          <div className="contact-details">
            <div>
              <Mail />
              <span>
                <small>Email</small>
                <a href="mailto:info@solytes.com">info@solytes.com</a>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <small>Response window</small>
                <strong>Within one working day</strong>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <small>Project coverage</small>
                <strong>Across Kerala</strong>
              </span>
            </div>
          </div>
        </div>
        <ContactForm landing />
      </section>
    </main>
  );
}
