'use client';

import { useEffect, useRef, useState } from 'react';
import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import styles from './interior-pages.module.css';

const scenes = [
  {
    image: '/solar-application-home.png',
    title: 'A roof with a purpose',
    category: 'Rooftops',
    text: 'A residential rooftop solar concept, shaped around a contemporary Kerala home.',
    href: '/projects',
  },
  {
    image: '/solar-application-garden.png',
    title: 'The garden, after sunset',
    category: 'Landscape',
    text: 'Warm pathway lighting brings definition to planting and garden edges.',
    href: '/products/halo-garden-light',
  },
  {
    image: '/solar-application-campus.png',
    title: 'Power for shared spaces',
    category: 'Rooftops',
    text: 'A commercial campus concept combining rooftop generation and outdoor lighting.',
    href: '/projects',
  },
  {
    image: '/product-wall-light.png',
    title: 'A brighter arrival',
    category: 'Outdoor lighting',
    text: 'Wall-mounted lighting for entrances, boundaries and everyday access.',
    href: '/products/shield-motion-wall-light',
  },
  {
    image: '/product-brick-light.png',
    title: 'Light along the edges',
    category: 'Landscape',
    text: 'Integrated light for architectural edges and landscape guidance.',
    href: '/products/solytes-solar-brick-light',
  },
  {
    image: '/product-street-light.png',
    title: 'Beyond the garden gate',
    category: 'Outdoor lighting',
    text: 'Solar street lighting in a road and infrastructure application.',
    href: '/products/nova-integrated-street-light',
  },
  {
    image: '/solytes-hero-night.png',
    title: 'Home in another light',
    category: 'Rooftops',
    text: 'An evening residential concept showing solar as part of the whole setting.',
    href: '/projects',
  },
  {
    image: '/solytes-community-dawn.png',
    title: 'A more considered campus',
    category: 'Outdoor lighting',
    text: 'A shared-space concept for coordinated solar planning.',
    href: '/contact',
  },
];

export function ApplicationGallery() {
  const [filter, setFilter] = useState('All scenes');
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.setProperty('overflow', 'hidden');
    return () => {
      document.body.style.setProperty('overflow', previous);
    };
  }, [isOpen]);
  const visible = scenes.filter(
    (scene) => filter === 'All scenes' || scene.category === filter,
  );
  const scene = visible[active] ?? visible[0];
  function open(index: number, button: HTMLButtonElement) {
    trigger.current = button;
    setActive(index);
    dialog.current?.showModal();
    setIsOpen(true);
  }
  function close() {
    dialog.current?.close();
  }
  function move(direction: number) {
    setActive((value) => (value + direction + visible.length) % visible.length);
  }
  return (
    <>
      <section
        className={`shell ${styles.gallery}`}
        aria-label="Application image gallery"
        data-reveal
      >
        <div className={styles.filterBar}>
          <fieldset className={styles.tabs} aria-label="Filter scenes">
            {['All scenes', 'Rooftops', 'Landscape', 'Outdoor lighting'].map(
              (name) => (
                <button
                  key={name}
                  aria-pressed={filter === name}
                  onClick={() => {
                    setFilter(name);
                    setActive(0);
                  }}
                >
                  {name}
                </button>
              ),
            )}
          </fieldset>
          <p aria-live="polite">{visible.length} scenes</p>
        </div>
        <div className={styles.galleryGrid}>
          {visible.map((item, index) => (
            <figure key={item.title}>
              <button
                className={styles.galleryImage}
                onClick={(event) => open(index, event.currentTarget)}
                aria-label={`Enlarge ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span>
                  <Expand size={20} />
                </span>
              </button>
              <figcaption>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.category} · Application illustration</p>
                </div>
                <Link href={item.href} aria-label={`Explore ${item.title}`}>
                  <ArrowRight size={22} />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      {/* Native dialog owns modal focus and Escape; backdrop and arrow keys supplement its controls. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label="Expanded application illustration"
        onClose={() => {
          setIsOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') move(-1);
          if (event.key === 'ArrowRight') move(1);
        }}
      >
        <div className={styles.lightboxBody}>
          <button
            autoFocus
            onClick={close}
            className={styles.close}
            aria-label="Close expanded image"
          >
            <X />
          </button>
          <div className={styles.lightboxImage}>
            <Image src={scene.image} alt={scene.title} fill sizes="90vw" />
          </div>
          <div className={styles.lightboxCaption}>
            <div aria-live="polite">
              <h2>{scene.title}</h2>
              <p>{scene.text} Application illustration.</p>
            </div>
            <div className={styles.lightboxControls}>
              <button onClick={() => move(-1)} aria-label="Previous image">
                <ArrowLeft />
              </button>
              <span>
                {active + 1} / {visible.length}
              </span>
              <button onClick={() => move(1)} aria-label="Next image">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
