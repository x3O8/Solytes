import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-callout">
        <div><span className="kicker">Start with a clearer solar plan</span><h2>Light the space.<br />Power the future.</h2></div>
        <Link href="/contact" className="button button-light">Talk to Solytes <ArrowUpRight size={17} /></Link>
      </div>
      <div className="shell footer-columns">
        <div><SiteLogo /><p>Solar lighting, rooftop systems and EPC execution shaped around real sites.</p></div>
        <div><span>Explore</span><Link href="/products">Products</Link><Link href="/projects">EPC projects</Link><Link href="/calculator">Solar calculator</Link></div>
        <div><span>Company</span><Link href="/about">About us</Link><Link href="/gallery">Gallery</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="shell footer-meta"><span>© 2026 Solytes</span><span>Solar, made practical.</span></div>
    </footer>
  );
}
