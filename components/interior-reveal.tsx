'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function InteriorReveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { opacity: 0.35, transform: 'translateY(24px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 650, easing: 'cubic-bezier(.2,1,.3,1)' },
            );
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    node
      .querySelectorAll('[data-reveal]')
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
