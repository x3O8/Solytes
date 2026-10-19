'use client';

import { useEffect, useId, useRef } from 'react';
import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { formatPrice, type Product } from '@/lib/products';
import styles from './quote-basket.module.css';

export type QuoteLine = { product: Product; quantity: number };

type Props = {
  open: boolean;
  items: QuoteLine[];
  onClose: () => void;
  onQuantityChange: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
};

export function QuoteBasket({
  open,
  items,
  onClose,
  onQuantityChange,
  onRemove,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const units = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected)
        trigger.focus({ preventScroll: true });
    };
  }, [open]);

  const quoteHref = (origin: string) => {
    const body = [
      'Hello Solytes,',
      '',
      'I would like a quote for:',
      ...items.map(
        ({ product, quantity }) =>
          `${product.name} — quantity ${quantity}\nUnit price: ${formatPrice(product.price)}\nLine total: ${formatPrice(product.price * quantity)}\n${origin}/products/${product.slug}`,
      ),
      '',
      `Product subtotal: ${formatPrice(subtotal)}`,
      'Shipping and final pricing are confirmed with your quote.',
      '',
      'Site location:',
      'Application / area to light:',
      'Preferred timeline:',
      'Name and phone number:',
    ].join('\n');
    return `mailto:info@solytes.com?subject=${encodeURIComponent('Solar lighting quote request')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Your project, your shortlist</p>
          <h2 id={titleId}>
            Quote basket <span>({items.length})</span>
          </h2>
        </div>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Close quote basket"
          onClick={onClose}
          autoFocus
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <p id={descriptionId} className={styles.description}>
        {items.length
          ? `${units} ${units === 1 ? 'unit' : 'units'} selected. Review your basket and request advice for your site.`
          : 'Save the lights you like and request a quote when you are ready.'}
      </p>

      <div className={styles.content}>
        {items.length ? (
          <ul className={styles.list}>
            {items.map(({ product, quantity }) => (
              <li className={styles.line} key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className={styles.thumbnail}
                  onClick={onClose}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={product.image}
                    alt=""
                    width={80}
                    height={80}
                    sizes="80px"
                  />
                </Link>
                <div className={styles.lineDetails}>
                  <p className={styles.category}>{product.category}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.productName}
                    onClick={onClose}
                  >
                    {product.name}
                  </Link>
                  <p className={styles.unitPrice}>
                    {formatPrice(product.price)} <span>each</span>
                  </p>
                  <div className={styles.lineActions}>
                    <fieldset
                      className={styles.quantity}
                      aria-label={`Quantity for ${product.name}`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        disabled={quantity <= 1}
                        onClick={() =>
                          onQuantityChange(
                            product.slug,
                            Math.max(1, quantity - 1),
                          )
                        }
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <output
                        aria-live="polite"
                        aria-label={`Quantity of ${product.name}`}
                      >
                        {quantity}
                      </output>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        disabled={quantity >= 999}
                        onClick={() =>
                          onQuantityChange(
                            product.slug,
                            Math.min(999, quantity + 1),
                          )
                        }
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </fieldset>
                    <button
                      type="button"
                      className={styles.remove}
                      aria-label={`Remove ${product.name} from quote basket`}
                      onClick={() => onRemove(product.slug)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className={styles.lineTotal}>
                    <span>Line total</span>
                    <strong>{formatPrice(product.price * quantity)}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <ShoppingBag size={28} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <h3>Your next project starts here.</h3>
            <p>
              Add products to compare your options and build a quote basket for
              our team.
            </p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onClose}
            >
              Browse products <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <footer className={styles.footer}>
          <div className={styles.subtotal}>
            <span>Product subtotal</span>
            <strong aria-live="polite">{formatPrice(subtotal)}</strong>
          </div>
          <p>Shipping and final pricing are confirmed with your quote.</p>
          <a
            className={styles.primaryButton}
            href="mailto:info@solytes.com"
            onClick={(event) => {
              event.currentTarget.href = quoteHref(window.location.origin);
            }}
          >
            Request a quote <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <small>
            Opens your email app with this basket for you to review and send.
          </small>
          <button
            type="button"
            className={styles.continueButton}
            onClick={onClose}
          >
            Continue browsing
          </button>
        </footer>
      )}
    </dialog>
  );
}
