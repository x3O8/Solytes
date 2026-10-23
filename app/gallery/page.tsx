import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { ArrowRight } from 'lucide-react';
import { ApplicationGallery } from '@/components/application-gallery';
import { InteriorReveal } from '@/components/interior-reveal';
import styles from '@/components/interior-pages.module.css';
export const metadata: Metadata = {
  title: 'Applications Gallery',
  description:
    'Explore solar application illustrations for rooftops, landscapes, entrances and campus spaces.',
};
export default function GalleryPage() {
  return (
    <main className="page-main">
      <InteriorReveal>
        <section className={`shell ${styles.intro}`}>
          <h1>See solar in context.</h1>
          <p>
            A visual library of rooftops, gardens and outdoor spaces. Browse
            application illustrations for inspiration; these scenes are not a
            record of completed customer installations.
          </p>
        </section>
        <ApplicationGallery />
        <section className={`shell ${styles.closeSection}`} data-reveal>
          <div>
            <h2>Imagine it at your place.</h2>
            <p>
              Share your space and we will help translate the inspiration into a
              practical product or project brief.
            </p>
          </div>
          <Link href="/contact" className="button button-dark">
            Plan your space <ArrowRight size={17} />
          </Link>
        </section>
      </InteriorReveal>
    </main>
  );
}
