import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mail, Phone } from 'lucide-react';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-surface footer-field-card">
        <Image
          className="footer-field-art"
          src="/solytes-footer-solar-field-user.png"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          aria-hidden="true"
        />
        <div className="shell footer-columns">
          <div className="footer-brand">
            <SiteLogo variant="footer" />
            <p>
              Solar lighting, rooftop systems and EPC execution shaped around
              real sites.
            </p>
          </div>
          <nav aria-label="Explore Solytes">
            <span>Explore</span>
            <Link href="/products">Products</Link>
            <Link href="/projects">EPC projects</Link>
            <Link href="/calculator">Solar calculator</Link>
            <Link href="/gallery">Gallery</Link>
          </nav>
          <nav aria-label="Company">
            <span>Company</span>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav aria-label="Connect with Solytes">
            <span>Connect</span>
            <a href="mailto:info@solytes.com">info@solytes.com</a>
            <a href="tel:+917561028248">+91 7561028248</a>
            <a href="tel:+917902977017">+91 7902977017</a>
          </nav>
        </div>
        <div className="footer-meta">
          <span>© 2026 Solytes. All rights reserved.</span>
          <div className="footer-socials" aria-label="Solytes contact links">
            <a
              href="https://instagram.com/solytes"
              target="_blank"
              rel="noreferrer"
              aria-label="Solytes on Instagram"
              title="Instagram"
            >
              <Camera size={15} aria-hidden="true" />
            </a>
            <a
              href="mailto:info@solytes.com"
              aria-label="Email Solytes"
              title="Email Solytes"
            >
              <Mail size={15} aria-hidden="true" />
            </a>
            <a
              href="tel:+917561028248"
              aria-label="Call Solytes"
              title="Call Solytes"
            >
              <Phone size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
