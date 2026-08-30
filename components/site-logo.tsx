import Link from 'next/link';

export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`site-logo ${inverse ? 'inverse' : ''}`}
      aria-label="Solytes home"
    >
      <span className="site-logo-lockup" aria-hidden="true">
        <span className="site-logo-word">SOLYTES</span>
        <span className="site-logo-tagline">Your energy independence</span>
      </span>
    </Link>
  );
}
