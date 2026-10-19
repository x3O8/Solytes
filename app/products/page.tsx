import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/lib/products';
import styles from './products.module.css';

export const metadata: Metadata = {
  title: 'Shop Solar Lighting',
  description:
    'Shop Solytes solar street, wall, garden and landscape lights. Compare applications, choose quantities and request a tailored quote.',
};

export default function ProductsPage() {
  return (
    <main className={`page-main ${styles.page}`}>
      <ProductCatalog products={products} />
      <section
        className={`shell ${styles.support}`}
        aria-labelledby="shop-support-title"
      >
        <div className={styles.supportIcon}>
          <Lightbulb size={26} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div>
          <h2 id="shop-support-title">A little guidance goes a long way.</h2>
          <p>
            Tell us about your space. We’ll help you choose the right light.
          </p>
        </div>
        <Link href="/contact" className="button button-dark">
          Get a recommendation <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
