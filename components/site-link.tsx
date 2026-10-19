'use client';

import Link, { useLinkStatus } from 'next/link';
import { createPortal } from 'react-dom';
import type { ComponentProps } from 'react';
import { PageLoading } from './page-loading';

function NavigationFeedback() {
  const { pending } = useLinkStatus();
  return pending
    ? createPortal(
        <div className="navigation-loading">
          <PageLoading />
        </div>,
        document.body,
      )
    : null;
}

export default function SiteLink({
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      {children}
      <NavigationFeedback />
    </Link>
  );
}
