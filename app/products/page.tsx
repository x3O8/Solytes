import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MoveDown } from 'lucide-react';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Solar Lighting Products',
  description:
    'Explore Solytes solar street lights, garden lights, wall lights, landscape spotlights and architectural brick lights for homes and projects.',
};

export default function ProductsPage() {
  return (
    <main className="page-main">
      <section className="products-hero shell">
        <div>
          <span className="kicker">Solar lighting collection</span>
          <h1>
            Good light.
            <br />
            No grid required.
          </h1>
        </div>
        <div>
          <p>
            Explore solar lighting for homes, landscapes, campuses and public
            infrastructure. Each product is selected around the space it needs
            to serve.
          </p>
          <a href="#collection" className="collection-jump">
            View the collection <MoveDown size={16} />
          </a>
        </div>
      </section>
      <nav className="collection-nav" aria-label="Product collection">
        <div className="shell">
          <span>Collection</span>
          {products.map((product, index) => (
            <a href={`#${product.slug}`} key={product.slug}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              {product.category}
            </a>
          ))}
        </div>
      </nav>
      <section className="catalogue" id="collection">
        {products.map((product, index) => (
          <article
            className="catalog-product"
            id={product.slug}
            key={product.slug}
          >
            <div className="catalog-visual">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className="catalog-image"
              />
            </div>
            <div className="catalog-copy">
              <div className="catalog-index">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{product.category}</span>
              </div>
              <h2>{product.name}</h2>
              <p className="catalog-lead">{product.summary}</p>
              <ul>
                {product.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>
                    <Check size={16} />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="catalog-actions">
                <Link
                  href={`/products/${product.slug}`}
                  className="button button-dark"
                >
                  View product <ArrowUpRight size={16} />
                </Link>
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="catalog-enquire"
                >
                  Enquire now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="product-guidance shell">
        <div>
          <span>Not sure which configuration fits?</span>
          <h2>
            Specify the space first.
            <br />
            We’ll help select the light.
          </h2>
        </div>
        <p>
          Share the application, mounting condition, approximate quantity and
          expected operating hours. Solytes can recommend a suitable product
          direction before the detailed proposal.
        </p>
      </section>
      <section className="conversion-strip">
        <div className="shell">
          <div>
            <span className="kicker light">
              Need help specifying a product?
            </span>
            <h2>Tell us where the light needs to work.</h2>
          </div>
          <Link href="/contact" className="button button-light">
            Ask for a recommendation <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
