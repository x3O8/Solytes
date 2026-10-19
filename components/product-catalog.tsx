'use client';

import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Flower2,
  LayoutGrid,
  Lightbulb,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sun,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { QuoteBasket } from '@/components/quote-basket';
import { useQuoteBasket } from '@/lib/quote-basket-store';
import styles from './product-catalog.module.css';

const collections = [
  'All products',
  'Street lighting',
  'Wall & security',
  'Garden & landscape',
  'Architectural',
] as const;
const categoryIcons = [LayoutGrid, Lightbulb, ShieldCheck, Flower2, Sun];
const installations = [
  'All installations',
  'Pole mounted',
  'Wall mounted',
  'Ground & landscape',
  'Surface integrated',
] as const;
type Collection = (typeof collections)[number];
type Installation = (typeof installations)[number];
type SortOption =
  | 'featured'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc';

function getCollection(product: Product): Collection {
  const text = `${product.name} ${product.category}`.toLowerCase();
  if (text.includes('street')) return 'Street lighting';
  if (text.includes('wall') || text.includes('security'))
    return 'Wall & security';
  if (text.includes('garden') || text.includes('landscape'))
    return 'Garden & landscape';
  return 'Architectural';
}

function getInstallation(product: Product): Installation {
  const value =
    product.specifications
      .find((spec) => spec.label === 'Installation')
      ?.value.toLowerCase() ?? '';
  if (value.includes('pole')) return 'Pole mounted';
  if (value.includes('wall')) return 'Wall mounted';
  if (value.includes('ground') || value === 'landscape mounted')
    return 'Ground & landscape';
  return 'Surface integrated';
}

function hasMotionSensor(product: Product) {
  return product.highlights.some((highlight) =>
    highlight.toLowerCase().includes('motion'),
  );
}

export function ProductCatalog({ products }: { products: Product[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const [localParams, setLocalParams] = useState(searchString);
  const paramsRef = useRef(localParams);
  const searchRef = useRef<HTMLInputElement>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [basket, setBasket] = useQuoteBasket();
  const [basketOpen, setBasketOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const sync = () => {
      paramsRef.current = window.location.search.slice(1);
      setLocalParams(paramsRef.current);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [searchString]);

  const filters = new URLSearchParams(localParams);
  const query = filters.get('q') ?? '';
  const collectionParam = filters.get('collection');
  const installationParam = filters.get('installation');
  const sortParam = filters.get('sort');
  const collection: Collection = collections.includes(
    collectionParam as Collection,
  )
    ? (collectionParam as Collection)
    : 'All products';
  const installation: Installation = installations.includes(
    installationParam as Installation,
  )
    ? (installationParam as Installation)
    : 'All installations';
  const motionOnly = filters.get('motion') === '1';
  const sort: SortOption =
    sortParam === 'name-asc' ||
    sortParam === 'name-desc' ||
    sortParam === 'price-asc' ||
    sortParam === 'price-desc'
      ? sortParam
      : 'featured';
  const hasFilters = Boolean(
    query ||
      collection !== 'All products' ||
      installation !== 'All installations' ||
      motionOnly,
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('en-IN');
    const filtered = products.filter((product) => {
      const text = [
        product.name,
        product.category,
        product.summary,
        ...product.applications,
        ...product.highlights,
      ]
        .join(' ')
        .toLocaleLowerCase('en-IN');
      return (
        (collection === 'All products' ||
          getCollection(product) === collection) &&
        (installation === 'All installations' ||
          getInstallation(product) === installation) &&
        (!motionOnly || hasMotionSensor(product)) &&
        (!normalizedQuery || text.includes(normalizedQuery))
      );
    });
    if (sort === 'name-asc')
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc')
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'price-asc')
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc')
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [collection, installation, motionOnly, products, query, sort]);

  const quoteItems = products
    .filter((product) => basket[product.slug])
    .map((product) => ({ product, quantity: basket[product.slug] }));
  const basketCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);
  const closeBasket = useCallback(() => setBasketOpen(false), []);
  const changeQuantity = useCallback(
    (slug: string, quantity: number) => {
      setBasket((current) => ({
        ...current,
        [slug]: Math.min(999, Math.max(1, Math.round(quantity))),
      }));
    },
    [setBasket],
  );
  const removeItem = useCallback(
    (slug: string) => {
      setBasket((current) => {
        const next = { ...current };
        delete next[slug];
        return next;
      });
    },
    [setBasket],
  );

  function updateParams(changes: Record<string, string | null>) {
    const params = new URLSearchParams(paramsRef.current);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    paramsRef.current = params.toString();
    setLocalParams(paramsRef.current);
    window.history.replaceState(
      window.history.state,
      '',
      params.size ? `${pathname}?${params}` : pathname,
    );
  }

  function clearAll() {
    updateParams({
      q: null,
      collection: null,
      installation: null,
      motion: null,
      sort: null,
    });
    searchRef.current?.focus();
  }

  function addToQuote(product: Product) {
    setBasket((current) => ({
      ...current,
      [product.slug]: Math.min(999, (current[product.slug] ?? 0) + 1),
    }));
    setNotice(`${product.name} added to your quote.`);
  }

  return (
    <section
      className={`shell ${styles.catalog}`}
      aria-labelledby="catalog-title"
    >
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <span aria-current="page">Solar lighting</span>
      </nav>
      <header className={styles.storeHeader}>
        <div className={styles.title}>
          <span className={styles.eyebrow}>The Solytes store</span>
          <h1 id="catalog-title">Shop solar lighting</h1>
        </div>
        <search className={styles.search}>
          <form onSubmit={(event) => event.preventDefault()}>
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="product-search">
              Search products and applications
            </label>
            <input
              id="product-search"
              ref={searchRef}
              type="search"
              value={query}
              placeholder="Search solar lights, gardens, streets…"
              onChange={(event) =>
                updateParams({ q: event.target.value || null })
              }
            />
            {query && (
              <button
                type="button"
                aria-label="Clear product search"
                onClick={() => {
                  updateParams({ q: null });
                  searchRef.current?.focus();
                }}
              >
                <X size={17} />
              </button>
            )}
          </form>
        </search>
        <button
          type="button"
          className={styles.basketButton}
          onClick={() => setBasketOpen(true)}
          aria-label={`Open quote basket, ${basketCount} items`}
        >
          <ShoppingBag size={19} aria-hidden="true" />
          <span>Quote basket</span>
          <b>{basketCount}</b>
        </button>
      </header>

      <nav className={styles.categories} aria-label="Shop by category">
        {collections.map((item, index) => {
          const Icon = categoryIcons[index];
          const count =
            item === 'All products'
              ? products.length
              : products.filter((product) => getCollection(product) === item)
                  .length;
          return (
            <button
              type="button"
              key={item}
              className={
                item === collection ? styles.categoryActive : undefined
              }
              aria-pressed={item === collection}
              onClick={() =>
                updateParams({
                  collection: item === 'All products' ? null : item,
                })
              }
            >
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <span>{item}</span>
              <small>{count}</small>
            </button>
          );
        })}
      </nav>

      <div className={styles.shopNote}>
        <Sun size={17} aria-hidden="true" />
        <p>
          Good light starts with the right fit.{' '}
          <span>Choose your products and quantities for a tailored quote.</span>
        </p>
        <Link href="/contact">
          Need a hand? <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.mobileControls}>
        <button
          type="button"
          onClick={() => setFiltersOpen((current) => !current)}
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />{' '}
          {filtersOpen ? 'Hide filters' : 'Filter products'}
        </button>
      </div>

      <div id="collection" className={styles.workspace}>
        <aside
          id="catalog-filters"
          className={`${styles.sidebar} ${filtersOpen ? styles.filtersOpen : ''}`}
          aria-label="Product filters"
        >
          <div className={styles.filterHeading}>
            <strong>Filters</strong>
            {hasFilters && (
              <button type="button" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
          <fieldset>
            <legend>Category</legend>
            {collections.map((item) => (
              <label className={styles.radioLabel} key={item}>
                <input
                  type="radio"
                  name="product-category"
                  checked={collection === item}
                  onChange={() =>
                    updateParams({
                      collection: item === 'All products' ? null : item,
                    })
                  }
                />
                <span>{item}</span>
                <small>
                  {item === 'All products'
                    ? products.length
                    : products.filter(
                        (product) => getCollection(product) === item,
                      ).length}
                </small>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Installation</legend>
            {installations.map((item) => (
              <label className={styles.radioLabel} key={item}>
                <input
                  type="radio"
                  name="product-installation"
                  checked={installation === item}
                  onChange={() =>
                    updateParams({
                      installation: item === 'All installations' ? null : item,
                    })
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Features</legend>
            <label className={styles.radioLabel}>
              <input
                type="checkbox"
                checked={motionOnly}
                onChange={(event) =>
                  updateParams({ motion: event.target.checked ? '1' : null })
                }
              />
              <span>Motion sensing</span>
            </label>
          </fieldset>
          <div className={styles.helpCard}>
            <Lightbulb size={22} strokeWidth={1.5} aria-hidden="true" />
            <h2>Choosing for a project?</h2>
            <p>We can help with product selection, placement and quantities.</p>
            <Link href="/contact">
              Talk to our team <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <div className={styles.results}>
          <div className={styles.resultsToolbar}>
            <output>
              <strong>{visibleProducts.length}</strong>{' '}
              {visibleProducts.length === 1 ? 'product' : 'products'}
              {collection !== 'All products'
                ? ` in ${collection.toLowerCase()}`
                : ' in the collection'}
            </output>
            <div className={styles.sort}>
              <label htmlFor="product-sort">Sort by</label>
              <select
                id="product-sort"
                value={sort}
                onChange={(event) =>
                  updateParams({
                    sort:
                      event.target.value === 'featured'
                        ? null
                        : event.target.value,
                  })
                }
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="name-asc">Name: A–Z</option>
                <option value="name-desc">Name: Z–A</option>
              </select>
            </div>
          </div>
          {hasFilters && (
            <div className={styles.activeFilters} aria-label="Active filters">
              {query && (
                <button type="button" onClick={() => updateParams({ q: null })}>
                  “{query}” <X size={12} aria-hidden="true" />
                  <span className="sr-only">Remove search filter</span>
                </button>
              )}
              {collection !== 'All products' && (
                <button
                  type="button"
                  onClick={() => updateParams({ collection: null })}
                >
                  {collection} <X size={12} aria-hidden="true" />
                  <span className="sr-only">Remove category filter</span>
                </button>
              )}
              {installation !== 'All installations' && (
                <button
                  type="button"
                  onClick={() => updateParams({ installation: null })}
                >
                  {installation} <X size={12} aria-hidden="true" />
                  <span className="sr-only">Remove installation filter</span>
                </button>
              )}
              {motionOnly && (
                <button
                  type="button"
                  onClick={() => updateParams({ motion: null })}
                >
                  Motion sensing <X size={12} aria-hidden="true" />
                  <span className="sr-only">Remove motion filter</span>
                </button>
              )}
            </div>
          )}
          <output className={styles.notice} aria-live="polite">
            {notice && (
              <>
                <Check size={14} aria-hidden="true" />
                {notice}
                <button type="button" onClick={() => setBasketOpen(true)}>
                  View quote
                </button>
              </>
            )}
          </output>
          {visibleProducts.length ? (
            <div className={styles.grid}>
              {visibleProducts.map((product, index) => (
                <article className={styles.card} key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.image}
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 600px) 50vw, (max-width: 1000px) 45vw, 25vw"
                    />
                    {basket[product.slug] ? (
                      <span className={styles.inQuote}>
                        <Check size={12} aria-hidden="true" />{' '}
                        {basket[product.slug]} in quote
                      </span>
                    ) : null}
                  </Link>
                  <div className={styles.cardBody}>
                    <span className={styles.productCategory}>
                      {product.category}
                    </span>
                    <h2>
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h2>
                    <p className={styles.summary}>{product.summary}</p>
                    <div className={styles.spec}>
                      <span>{getInstallation(product)}</span>
                      {hasMotionSensor(product) && <span>Motion sensing</span>}
                    </div>
                    <p className={styles.price}>{formatPrice(product.price)}</p>
                    <small className={styles.priceNote}>Per light</small>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => addToQuote(product)}
                      disabled={basket[product.slug] >= 999}
                      aria-label={`Add ${product.name} to quote`}
                    >
                      <ShoppingBag size={15} aria-hidden="true" />
                      {basket[product.slug] >= 999
                        ? 'Quantity limit reached'
                        : 'Add to quote'}
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className={styles.detailLink}
                    >
                      View details <ChevronRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search size={32} strokeWidth={1.5} aria-hidden="true" />
              <h2>No products found</h2>
              <p>
                Try a different search or remove a filter to see more lights.
              </p>
              <button type="button" onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          )}
          <p className={styles.catalogFootnote}>
            Pricing and the final configuration are confirmed by our team for
            your requirements.
          </p>
        </div>
      </div>
      <QuoteBasket
        open={basketOpen}
        items={quoteItems}
        onClose={closeBasket}
        onQuantityChange={changeQuantity}
        onRemove={removeItem}
      />
    </section>
  );
}
