'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteLogo } from './site-logo';

const navItems = [
  ['Products', '/products'],
  ['EPC Projects', '/projects'],
  ['Calculator', '/calculator'],
  ['Gallery', '/gallery'],
  ['About', '/about'],
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!onHome);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(!onHome || window.scrollY > 24);
      setCompact(onHome ? window.scrollY > window.innerHeight * 0.78 : window.scrollY > 180);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [onHome]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`island-wrap ${scrolled ? 'scrolled' : ''} ${compact ? 'compact' : ''} ${onHome ? 'over-hero' : 'on-page'}`}>
      <div className="island-nav">
        <SiteLogo inverse={onHome && !scrolled} />
        <nav className="island-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href} className={pathname.startsWith(href) ? 'active' : ''} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <Link href="/contact" className="island-cta">Start a project <ArrowUpRight size={15} /></Link>
        <button className="island-menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="island-mobile" aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}<Link href="/contact">Start a project</Link></nav>}
    </header>
  );
}
