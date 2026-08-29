import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';

export const metadata: Metadata = { title: 'Solar Products', description: 'Browse Solytes solar garden lights, brick lights, wall lights and integrated street-lighting systems.' };

export default function ProductsPage() {
  return (
    <main className="page-main">
      <section className="page-hero shell"><span className="kicker">Solar lighting collection</span><h1>Good light.<br />No grid required.</h1><p>Explore solar lighting for homes, landscapes, campuses and public infrastructure. Each product is selected around the space it needs to serve.</p></section>
      <section className="product-list shell">{products.map((product, index) => <ProductCard key={product.slug} product={product} featured={index === 0} />)}</section>
      <section className="conversion-strip"><div className="shell"><div><span className="kicker light">Need help specifying a product?</span><h2>Tell us where the light needs to work.</h2></div><Link href="/contact" className="button button-light">Ask for a recommendation <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
