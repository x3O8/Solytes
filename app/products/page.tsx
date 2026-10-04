import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MoveDown } from 'lucide-react';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/lib/products';
import styles from './products.module.css';

export const metadata: Metadata = {
  title: 'Solar Lighting Products',
  description:
    'Explore Solytes solar street lights, garden lights, wall lights, landscape spotlights and architectural brick lights for homes and projects.',
};

export default function ProductsPage() {
  const featuredProduct = products[0];

  return (
    <main className={`page-main ${styles.page}`}>
      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="kicker">Solar lighting collection</span>
          <h1>Lighting that belongs to the place.</h1>
          <p>
            Explore solar lights for streets, walls, gardens and architectural
            landscapes—selected around the site, the atmosphere and the hours
            they need to work.
          </p>
          <div className={styles.heroActions}>
            <a href="#collection" className="button button-dark">
              Browse the collection <MoveDown size={16} />
            </a>
            <Link href="/contact" className={styles.textLink}>
              Ask for a recommendation <ArrowRight size={16} />
            </Link>
          </div>
          <ul className={styles.heroPoints} aria-label="Collection benefits">
            <li>
              <Check size={15} aria-hidden="true" /> Automatic night operation
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Cable-free placement
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Site-led selection
            </li>
          </ul>
        </div>

        <Link
          href={`/products/${featuredProduct.slug}`}
          className={styles.heroVisual}
          aria-label={`View featured product: ${featuredProduct.name}`}
        >
          <Image
            src="/home-product-nova-v2.png"
            alt="Nova solar street light illuminating a residential road"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 54vw"
          />
          <div className={styles.featuredCard}>
            <span>Featured street lighting</span>
            <strong>{featuredProduct.name}</strong>
            <small>
              View product <ArrowRight size={14} />
            </small>
          </div>
        </Link>
      </section>

      <div id="collection" className={styles.collectionAnchor} />
      <ProductCatalog products={products} />

      <section className={`shell ${styles.guidance}`}>
        <div className={styles.guidanceCopy}>
          <span className="kicker light">A useful starting point</span>
          <h2>Begin with the space, then choose the light.</h2>
          <p>
            Share a few details about the site and we’ll help narrow the range
            before a detailed recommendation.
          </p>
          <Link href="/contact" className="button button-light">
            Get a recommendation <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.guidanceList}>
          <span>What helps us recommend well</span>
          {[
            'Where the light will be installed',
            'Approximate coverage or road width',
            'Mounting height and available sunlight',
            'Expected hours of operation',
          ].map((item) => (
            <div key={item}>
              <Check size={16} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
