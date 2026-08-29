import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Gallery', description: 'Explore Solytes solar lighting and rooftop project applications across homes, landscapes and campuses.' };

const gallery = [
  ['/solytes-hero-day.png', 'Rooftop solar', 'Residential energy'],
  ['/product-garden-light.png', 'Garden pathways', 'Landscape lighting'],
  ['/product-street-light.png', 'Campus roads', 'Infrastructure lighting'],
  ['/product-brick-light.png', 'Architectural edges', 'Guidance lighting'],
  ['/solytes-residence.png', 'Integrated rooftops', 'EPC projects'],
  ['/product-wall-light.png', 'Entrances and walls', 'Security lighting'],
];

export default function GalleryPage() {
  return (
    <main className="page-main">
      <section className="page-hero shell"><span className="kicker">Applications gallery</span><h1>Solar in context.</h1><p>Products and systems make more sense where they work. Explore a visual library of residential, landscape and infrastructure applications.</p></section>
      <section className="shell gallery-grid">{gallery.map(([src, title, category], index) => <figure key={src} className={index === 0 || index === 4 ? 'wide' : ''}><div><Image src={src} alt={title} fill sizes={index === 0 || index === 4 ? '(max-width: 800px) 100vw, 66vw' : '(max-width: 800px) 100vw, 33vw'} /></div><figcaption><span>{category}</span><strong>{title}</strong></figcaption></figure>)}</section>
      <section className="gallery-cta shell"><div><span className="kicker">Planning a similar space?</span><h2>Bring us the site, not just a product list.</h2></div><Link href="/contact" className="button button-dark">Start a conversation <ArrowRight size={17} /></Link></section>
    </main>
  );
}
