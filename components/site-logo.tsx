import Link from 'next/link';
import Image from 'next/image';

export function SiteLogo({
  inverse = false,
  className = '',
  variant = 'navbar',
}: {
  inverse?: boolean;
  className?: string;
  variant?: 'navbar' | 'footer';
}) {
  const isFooterMark = variant === 'footer';

  return (
    <Link
      href="/"
      className={`site-logo ${isFooterMark ? 'footer-logo' : 'navbar-logo'} ${inverse ? 'inverse' : ''} ${className}`}
      aria-label="Solytes home"
    >
      <Image
        src="/solytes-official-wordmark-v3.png"
        alt=""
        width={763}
        height={327}
        priority
      />
    </Link>
  );
}
