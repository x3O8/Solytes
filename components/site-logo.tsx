import Link from 'next/link';
import { SunMedium } from 'lucide-react';

export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`site-logo ${inverse ? 'inverse' : ''}`} aria-label="Solytes home">
      <span className="site-logo-mark" aria-hidden="true"><SunMedium size={17} strokeWidth={2.4} /></span>
      <span className="site-logo-word">solytes</span>
    </Link>
  );
}
