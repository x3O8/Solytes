'use client';

import { useCallback, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { QuoteBasket } from '@/components/quote-basket';
import { products, type Product } from '@/lib/products';
import { useQuoteBasket } from '@/lib/quote-basket-store';

export function ProductPurchase({ product }: { product: Product }) {
  const [basket, setBasket] = useQuoteBasket();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const changeQuantity = useCallback(
    (slug: string, quantity: number) => {
      setBasket((current) => ({
        ...current,
        [slug]: Math.min(999, Math.max(1, Math.round(quantity))),
      }));
    },
    [setBasket],
  );
  const remove = useCallback(
    (slug: string) => {
      setBasket((current) => {
        const next = { ...current };
        delete next[slug];
        return next;
      });
    },
    [setBasket],
  );
  const items = products
    .filter((item) => basket[item.slug])
    .map((item) => ({ product: item, quantity: basket[item.slug] }));
  return (
    <>
      <button
        type="button"
        className="button button-dark"
        disabled={basket[product.slug] >= 999}
        onClick={() => {
          setBasket((current) => ({
            ...current,
            [product.slug]: Math.min(999, (current[product.slug] ?? 0) + 1),
          }));
          setOpen(true);
        }}
      >
        <ShoppingBag size={17} aria-hidden="true" />
        {basket[product.slug] >= 999
          ? 'Quantity limit reached'
          : 'Add to quote'}
      </button>
      <QuoteBasket
        open={open}
        items={items}
        onClose={close}
        onQuantityChange={changeQuantity}
        onRemove={remove}
      />
    </>
  );
}
