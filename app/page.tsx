'use client';

import Image from 'next/image';
import {
  ArrowRight, BadgeCheck, BatteryCharging, ChevronRight, CircleCheck,
  Gauge, Menu, Moon, ShieldCheck, Sparkles, SunMedium, X, Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const process = [
  { step: '01', title: 'Tell us about your home', text: 'Share your power bill and location. We turn them into a clear, home-specific solar plan.' },
  { step: '02', title: 'Review your custom design', text: 'See your system size, projected savings and roof layout before you decide anything.' },
  { step: '03', title: 'Switch on clean power', text: 'Our team handles engineering, installation and commissioning from start to finish.' },
];
const promises = [['25-year', 'performance warranty'], ['7-day', 'design turnaround'], ['1 team', 'from survey to switch-on']];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className="brand" aria-label="Solytes home"><span className="brand-mark" aria-hidden="true"><SunMedium size={18} strokeWidth={2.4} /></span><span className={inverse ? 'text-white' : ''}>solytes</span></a>;
}

export default function Home() {
  const [monthlyBill, setMonthlyBill] = useState(6500);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const estimate = useMemo(() => {
    const system = Math.max(2, Math.round(monthlyBill / 1200));
    const annual = Math.round(monthlyBill * 12 * 0.82 / 1000) * 1000;
    return { system, annual, lifetime: annual * 25 };
  }, [monthlyBill]);
  const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <main id="top">
      <section className={`hero ${isNight ? 'is-night' : 'is-day'}`}>
        <Image src="/solytes-hero-day.png" alt="Contemporary solar-powered home in daylight" fill priority className="hero-image hero-image-day" sizes="100vw" />
        <Image src="/solytes-hero-night.png" alt="The same solar-powered home illuminated at night" fill priority className="hero-image hero-image-night" sizes="100vw" />
        <div className="hero-shade" />
        <header className="nav shell">
          <Logo inverse />
          <nav className="nav-links" aria-label="Main navigation"><a href="#how">How it works</a><a href="#why">Why Solytes</a><a href="#savings">Savings</a><a href="#stories">Stories</a></nav>
          <a className="nav-cta" href="#savings">Get your solar plan <ArrowRight size={15} /></a>
          <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#why" onClick={() => setMenuOpen(false)}>Why Solytes</a><a href="#savings" onClick={() => setMenuOpen(false)}>Savings</a><a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a></nav>}
        <div className="hero-content shell">
          <div className="eyebrow light"><Sparkles size={14} /> Solar, designed around you</div>
          <h1>Own your power.<br />For the next 25 years.</h1>
          <p>Beautiful rooftop solar, engineered for your home and managed by one expert team—from first sketch to first unit of clean energy.</p>
          <div className="hero-actions"><a href="#savings" className="button button-light">See what you could save <ArrowRight size={17} /></a><a href="#how" className="text-link light-link">Explore the experience <ChevronRight size={16} /></a></div>
        </div>
        <div className="time-switch" role="group" aria-label="Choose time of day">
          <button type="button" className={!isNight ? 'active' : ''} aria-pressed={!isNight} onClick={() => setIsNight(false)}><SunMedium size={16} /><span><strong>Morning</strong><small>Solar generating</small></span></button>
          <button type="button" className={isNight ? 'active' : ''} aria-pressed={isNight} onClick={() => setIsNight(true)}><Moon size={15} /><span><strong>Night</strong><small>Home illuminated</small></span></button>
        </div>
        <span className="sr-only" aria-live="polite">{isNight ? 'Night view selected' : 'Morning view selected'}</span>
        <div className="hero-proof shell"><div><CircleCheck size={17} /><span>Premium tier-1 panels</span></div><div><CircleCheck size={17} /><span>End-to-end installation</span></div><div><CircleCheck size={17} /><span>Live generation tracking</span></div></div>
      </section>

      <section className="trust-strip" aria-label="Solytes service promises"><div className="shell trust-grid"><p>Clean energy should feel effortless.</p>{promises.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section className="section shell" id="how">
        <div className="section-heading"><div><span className="eyebrow"><Zap size={14} /> A simpler switch</span><h2>From power bill to<br />solar-powered home.</h2></div><p>No confusing product catalogue. No chasing multiple contractors. Just a clear plan, thoughtful design and an accountable team.</p></div>
        <div className="process-grid">{process.map((item) => <article className="process-card" key={item.step}><span>{item.step}</span><div className="process-icon" aria-hidden="true">{item.step === '01' ? <Gauge /> : item.step === '02' ? <SunMedium /> : <BadgeCheck />}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="image-story" id="why">
        <Image src="/solytes-residence.png" alt="Refined contemporary home with neatly integrated rooftop solar panels" fill className="story-image" sizes="100vw" />
        <div className="story-panel"><span className="eyebrow light"><ShieldCheck size={14} /> Quietly engineered</span><h2>Solar that belongs on your home.</h2><p>We balance output, roof health and curb appeal—then install with disciplined detailing that protects all three.</p><ul><li><CircleCheck /> Site-specific structural planning</li><li><CircleCheck /> Neat, low-profile panel layout</li><li><CircleCheck /> Safe, weather-ready electrical work</li></ul></div>
      </section>

      <section className="calculator-section" id="savings"><div className="shell calculator-grid">
        <div className="calculator-copy"><span className="eyebrow"><BatteryCharging size={14} /> Your solar potential</span><h2>Turn your power bill into an asset.</h2><p>Move the slider for a quick planning estimate. Your final design will account for roof area, local sunlight and consumption patterns.</p><div className="fine-print"><ShieldCheck size={16} /> Transparent guidance. No hard sell.</div></div>
        <div className="calculator-card"><div className="slider-head"><label htmlFor="bill">Average monthly electricity bill</label><output htmlFor="bill">{money(monthlyBill)}</output></div><input id="bill" type="range" min="2000" max="30000" step="500" value={monthlyBill} onChange={(event) => setMonthlyBill(Number(event.target.value))} /><div className="estimate-grid"><div><span>Suggested system</span><strong>{estimate.system} kW</strong></div><div><span>Estimated annual savings</span><strong>{money(estimate.annual)}</strong></div><div className="estimate-wide"><span>Potential 25-year value</span><strong>{money(estimate.lifetime)}</strong></div></div><a href="#contact" className="button button-dark">Get my detailed solar plan <ArrowRight size={17} /></a><p className="estimate-note">Illustrative estimate, not a financial guarantee. Tariffs and site conditions vary.</p></div>
      </div></section>

      <section className="quote-section shell" id="stories"><div className="quote-mark">“</div><blockquote>The best part was how calm the entire process felt. One plan, one team, and a system that looks like it was always meant to be there.</blockquote><p>— A Solytes homeowner</p></section>
      <section className="closing" id="contact"><div className="shell closing-inner"><div><span className="eyebrow light"><SunMedium size={14} /> Your roof. Your power.</span><h2>Let the sun take care of the bill.</h2></div><a href="mailto:hello@solytes.in" className="button button-light">Start your solar plan <ArrowRight size={17} /></a></div></section>
      <footer><div className="shell footer-grid"><div><Logo /><p>Thoughtful solar for modern homes.</p></div><div><span>Explore</span><a href="#how">How it works</a><a href="#why">Why Solytes</a><a href="#savings">Savings</a></div><div><span>Connect</span><a href="mailto:hello@solytes.in">hello@solytes.in</a><a href="#contact">Request a consultation</a></div></div><div className="shell footer-bottom"><span>© 2026 Solytes</span><span>Made for brighter tomorrows.</span></div></footer>
    </main>
  );
}
