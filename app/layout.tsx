import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solytes-solar.kprasadkodoth.chatgpt.site'),
  title: {
    default: 'Solytes | Solar lighting and EPC projects',
    template: '%s | Solytes',
  },
  description:
    'Browse solar garden, brick, wall and street lights, or plan a rooftop and EPC solar project with Solytes.',
  keywords: [
    'solar lights',
    'solar street lights',
    'solar garden lights',
    'solar EPC',
    'rooftop solar',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Solytes | Solar lighting and EPC projects',
    description:
      'Solar products and project execution shaped around real sites.',
    images: ['/solytes-hero-day.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/solytes-hero-day.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
