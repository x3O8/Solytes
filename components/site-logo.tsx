import Image from 'next/image';
import Link from 'next/link';

export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`site-logo ${inverse ? 'inverse' : ''}`}
      aria-label="Solytes home"
    >
      <span className="site-logo-mark" aria-hidden="true">
        <Image
          src="/solytes-old-logo.svg"
          alt=""
          width={40}
          height={36}
          unoptimized
        />
      </span>
      <span className="site-logo-word">solytes</span>
    </Link>
  );
}
