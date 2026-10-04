import type { Metadata } from 'next';
import { Bodoni_Moda, Manrope, Roboto, Space_Grotesk } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

const bodoniModa = Bodoni_Moda({
  variable: '--font-display',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-logo-family',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-hero',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
    icon: '/solytes-y-favicon-v2.png',
    shortcut: '/solytes-y-favicon-v2.png',
    apple: '/solytes-y-favicon-v2.png',
  },
  openGraph: {
    title: 'Solytes | Solar lighting and EPC projects',
    description:
      'Solar products and project execution shaped around real sites.',
    images: ['/solytes-field-home-day-v3.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/solytes-field-home-day-v3.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${bodoniModa.variable} ${spaceGrotesk.variable} ${roboto.variable} antialiased`}
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
