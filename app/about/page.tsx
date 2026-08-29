import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us', description: 'Learn how Solytes connects solar products, thoughtful design and accountable project execution.' };

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="about-hero shell"><div><span className="kicker">About Solytes</span><h1>Solar should be easier to understand—and better to live with.</h1></div><p>We approach solar as a complete experience: the right product, the right system size, the right installation detail and a clear path from decision to delivery.</p></section>
      <section className="about-image"><Image src="/solytes-hero-night.png" alt="Solar-powered home after dark" fill priority sizes="100vw" /></section>
      <section className="section shell about-story"><div><span className="kicker">What guides us</span><h2>Clarity before complexity.</h2></div><div><p>Solar projects often become crowded with specifications before the real requirement is understood. Solytes starts with the space, the energy use and the outcome the customer needs.</p><p>That approach carries from an architectural garden light to a rooftop EPC project: practical recommendations, disciplined design and straightforward communication.</p></div></section>
      <section className="soft-section section"><div className="shell values-grid"><article><span>01</span><h3>Useful by design</h3><p>Every product and system should solve a real site requirement—not simply add another specification.</p></article><article><span>02</span><h3>Clear in scope</h3><p>Assumptions, inclusions and next steps should be understandable before work begins.</p></article><article><span>03</span><h3>Accountable in delivery</h3><p>One joined-up view of product, engineering and execution reduces avoidable handoff gaps.</p></article></div></section>
      <section className="section shell about-services"><div><span className="kicker">What we bring together</span><h2>Products, planning and projects.</h2></div><ul className="check-list"><li><Check />Solar lighting for home and landscape</li><li><Check />Street and infrastructure lighting</li><li><Check />Rooftop solar planning</li><li><Check />EPC project coordination</li></ul><Link href="/contact" className="button button-dark">Work with Solytes <ArrowRight size={17} /></Link></section>
    </main>
  );
}
