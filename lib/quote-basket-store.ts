'use client';

import { useSyncExternalStore } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { products } from '@/lib/products';

type Basket = Record<string, number>;
const storageKey = 'solytes.quote.v1';
const emptyBasket: Basket = {};
const validSlugs = new Set(products.map((product) => product.slug));
const listeners = new Set<() => void>();
let current: Basket = emptyBasket;
let initialized = false;

function readStorage(): Basket {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([slug, quantity]) =>
          validSlugs.has(slug) &&
          typeof quantity === 'number' &&
          Number.isInteger(quantity) &&
          quantity >= 1 &&
          quantity <= 999,
      ),
    ) as Basket;
  } catch {
    return current;
  }
}

function getSnapshot() {
  if (!initialized) {
    current = readStorage();
    initialized = true;
  }
  return current;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      current = readStorage();
      onChange();
    }
  };
  window.addEventListener('storage', onStorage);
  // A visitor may return after another tab changed the basket while this view was unmounted.
  const saved = readStorage();
  if (
    Object.keys(saved).length !== Object.keys(current).length ||
    Object.entries(saved).some(([slug, quantity]) => current[slug] !== quantity)
  ) {
    current = saved;
    onChange();
  }
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
  };
}

const setBasket: Dispatch<SetStateAction<Basket>> = (update) => {
  current = typeof update === 'function' ? update(getSnapshot()) : update;
  try {
    localStorage.setItem(storageKey, JSON.stringify(current));
  } catch {
    /* Keep an in-memory basket when storage is unavailable. */
  }
  listeners.forEach((onChange) => onChange());
};

export function useQuoteBasket() {
  const basket = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => emptyBasket,
  );
  return [basket, setBasket] as const;
}
