'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  ['Products', '/products'],
  ['Projects', '/projects'],
  ['Gallery', '/gallery'],
  ['About', '/about'],
];
const menuGroups = [
  { title: 'Explore', links: [
    ['Solar lighting', '/products'],
    ['EPC projects', '/projects'],
    ['Solar calculator', '/calculator'],
    ['Applications gallery', '/gallery'],
  ] },
  { title: 'Company', links: [
    ['About Solytes', '/about'],
    ['Get in touch', '/contact'],
  ] },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      const closeOnBackdrop = (event: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false);
      };
      dialog.addEventListener('pointerdown', closeOnBackdrop);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        dialog.removeEventListener('pointerdown', closeOnBackdrop);
        document.body.style.overflow = previousOverflow;
        dialog.close();
      };
    }
    dialog.close();
  }, [open]);

  return (
    <>
      <header className={`cinematic-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="cinematic-header-inner">
          <nav className="cinematic-links" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="cinematic-brand" aria-label="Solytes home">
            <Image src="/solytes-official-wordmark-v3.png" alt="" width={763} height={374} priority />
          </Link>
          <div className="cinematic-actions">
            <Link href="/contact" className="cinematic-enquire">Enquire</Link>
            <Link href="/products" className="cinematic-cta">Shop Now</Link>
            <button type="button" className="cinematic-menu-button" aria-label="Open navigation" aria-expanded={open} aria-controls="site-navigation-menu" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                {[5, 12, 19].flatMap((cx) => [5, 12, 19].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />))}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <dialog ref={dialogRef} id="site-navigation-menu" className="site-navigation-menu" aria-labelledby="site-menu-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="site-menu-top">
          <h2 id="site-menu-title">Menu</h2>
          <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={22} /></button>
        </div>
        <Link href="/contact" className="button button-dark site-menu-cta" onClick={() => setOpen(false)}>Plan your solar project <ArrowUpRight size={18} /></Link>
        <nav aria-label="All navigation">
          {menuGroups.map((group) => (
            <div className="site-menu-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => (
                <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></Link>
              ))}
            </div>
          ))}
        </nav>
        <a href="mailto:info@solytes.com" className="site-menu-email">info@solytes.com</a>
      </dialog>
    </>
  );
}
