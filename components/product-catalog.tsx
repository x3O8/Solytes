'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useRef } from 'react';
import type { Product } from '@/lib/products';
import styles from './product-catalog.module.css';

const collections = [
  'All products',
  'Street lighting',
  'Wall & security',
  'Garden & landscape',
  'Architectural',
] as const;

const productScenes: Record<string, string> = {
  'nova-integrated-street-light': '/home-product-nova-v2.png',
  'shield-motion-wall-light': '/home-product-shield.png',
  'halo-garden-light': '/home-product-halo.png',
  'solytes-solar-brick-light': '/home-product-brick.png',
  'focus-landscape-spotlight': '/home-product-focus-v3.png',
  'arc-solar-wall-light': '/home-product-arc.png',
};

type Collection = (typeof collections)[number];
type SortOption = 'featured' | 'name-asc' | 'name-desc';

function getCollection(product: Product): Collection {
  const text = `${product.name} ${product.category}`.toLowerCase();
  if (text.includes('street')) return 'Street lighting';
  if (text.includes('wall') || text.includes('security'))
    return 'Wall & security';
  if (text.includes('garden') || text.includes('landscape'))
    return 'Garden & landscape';
  return 'Architectural';
}

export function ProductCatalog({ products }: { products: Product[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('q') ?? '';
  const collectionParam = searchParams.get('collection');
  const sortParam = searchParams.get('sort');
  const collection: Collection = collections.includes(
    collectionParam as Collection,
  )
    ? (collectionParam as Collection)
    : 'All products';
  const sort: SortOption =
    sortParam === 'name-asc' || sortParam === 'name-desc'
      ? sortParam
      : 'featured';

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('en-IN');
    const filtered = products.filter((product) => {
      const matchesCollection =
        collection === 'All products' || getCollection(product) === collection;
      const searchableText = [
        product.name,
        product.category,
        product.summary,
        ...product.applications,
      ]
        .join(' ')
        .toLocaleLowerCase('en-IN');
      return (
        matchesCollection &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    if (sort === 'name-asc')
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc')
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    return filtered;
  }, [collection, products, query, sort]);

  function updateParams(changes: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(params.size ? `${pathname}?${params}` : pathname, {
      scroll: false,
    });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  return (
    <section
      className={`shell ${styles.catalog}`}
      aria-labelledby="catalog-title"
    >
      <header className={styles.heading}>
        <div>
          <span className="kicker">The collection</span>
          <h2 id="catalog-title">Find the right light for the setting.</h2>
        </div>
        <p aria-live="polite">
          <strong>{visibleProducts.length}</strong> of {products.length}{' '}
          products
        </p>
      </header>

      <div className={styles.controls} aria-label="Browse products">
        <div className={styles.search}>
          <Search aria-hidden="true" size={18} />
          <label className="sr-only" htmlFor="product-search">
            Search products and applications
          </label>
          <input
            id="product-search"
            ref={searchRef}
            type="search"
            value={query}
            placeholder="Search by product or application"
            onChange={(event) =>
              updateParams({ q: event.target.value || null })
            }
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                updateParams({ q: null });
                searchRef.current?.focus();
              }}
              aria-label="Clear product search"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        <div className={styles.sort}>
          <SlidersHorizontal aria-hidden="true" size={16} />
          <label htmlFor="product-sort">Sort</label>
          <select
            id="product-sort"
            value={sort}
            onChange={(event) => {
              const value = event.target.value as SortOption;
              updateParams({ sort: value === 'featured' ? null : value });
            }}
          >
            <option value="featured">Featured</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </div>

        <div className={styles.collections} aria-label="Product categories">
          {collections.map((item) => (
            <button
              type="button"
              key={item}
              className={item === collection ? styles.active : undefined}
              aria-pressed={item === collection}
              onClick={() =>
                updateParams({
                  collection: item === 'All products' ? null : item,
                })
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visibleProducts.length ? (
        <div className={styles.grid}>
          {visibleProducts.map((product) => {
            const scene = productScenes[product.slug];
            return (
              <article className={styles.card} key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className={`${styles.image} ${scene ? styles.scene : styles.cutout}`}
                  aria-label={`View ${product.name}`}
                >
                  <Image
                    src={scene ?? product.image}
                    alt={
                      scene
                        ? `${product.name} shown in an outdoor setting`
                        : product.name
                    }
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                  />
                  <span>{getCollection(product)}</span>
                </Link>
                <div className={styles.body}>
                  <h3>
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p>{product.summary}</p>
                  <div
                    className={styles.applications}
                    aria-label="Applications"
                  >
                    {product.applications.slice(0, 3).map((application) => (
                      <span key={application}>{application}</span>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <Link href={`/products/${product.slug}`}>
                      View product <ArrowRight size={15} />
                    </Link>
                    <Link href={`/contact?product=${product.slug}`}>
                      Enquire
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <span>No matches</span>
          <h3>No lights match those filters.</h3>
          <p>Try another term or return to the full collection.</p>
          <button type="button" onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
