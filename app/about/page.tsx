import type { Metadata } from 'next';
import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { ArrowRight } from 'lucide-react';
import { InteriorReveal } from '@/components/interior-reveal';
import styles from '@/components/interior-pages.module.css';
export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the Solytes approach to solar lighting, rooftop planning and coordinated EPC delivery.',
};
const values = [
  [
    'Useful by design',
    'A light should serve its setting. A rooftop system should suit the way a building uses energy. We start with the requirement, then work towards the specification.',
  ],
  [
    'Clear in scope',
    'Equipment choices, assumptions, inclusions and next steps belong in the conversation before installation begins. Clear scope helps everyone make better decisions.',
  ],
  [
    'Connected in delivery',
    'Product selection, engineering and execution work better when considered together. We approach the project as one joined-up process.',
  ],
];
export default function AboutPage() {
  return (
    <main className="page-main">
      <InteriorReveal>
        <section className={`shell ${styles.intro}`}>
          <h1>Solar, thoughtfully connected.</h1>
          <p>
            From a garden path to a working rooftop, Solytes brings products,
            planning and project execution together around the places people
            live and work.
          </p>
        </section>
        <figure className={styles.heroMedia}>
          <Image
            src="/solar-application-garden.png"
            alt="Illustrated tropical garden illuminated by solar pathway lights"
            fill
            priority
            sizes="100vw"
          />
          <figcaption>
            Light for everyday spaces · Application illustration
          </figcaption>
        </figure>
        <section className={`shell ${styles.story}`} data-reveal>
          <h2>Start with the place. Then the possibilities.</h2>
          <div>
            <p>
              A home, a garden and a campus ask different things of solar. We
              begin with the space, how it is used and what the customer wants
              to improve.
            </p>
            <p>
              That carries through from selecting an outdoor light to planning a
              rooftop system: practical recommendations, considered design and
              straightforward communication.
            </p>
            <Link href="/contact" className="button button-dark">
              Talk to Solytes <ArrowRight size={17} />
            </Link>
          </div>
        </section>
        <section className={styles.values}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <h2>What guides the work.</h2>
              <p>
                Simple principles that keep the conversation focused on your
                site and your needs.
              </p>
            </div>
            <div className={styles.valueRows}>
              {values.map(([title, text]) => (
                <article key={title} data-reveal>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`shell ${styles.story}`} data-reveal>
          <div>
            <h2>Small details. A joined-up view.</h2>
            <p style={{ marginTop: 24 }}>
              Solar garden and landscape lighting. Street and infrastructure
              lighting. Rooftop solar planning. EPC project coordination.
            </p>
            <Link href="/products" className="button button-dark">
              Explore our products <ArrowRight size={17} />
            </Link>
          </div>
          <figure
            className={styles.applicationImage}
            style={{ borderRadius: 24, overflow: 'hidden' }}
          >
            <Image
              src="/solar-application-home.png"
              alt="Residential rooftop solar application illustration"
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <figcaption>Application illustration</figcaption>
          </figure>
        </section>
        <section className={`shell ${styles.closeSection}`} data-reveal>
          <div>
            <h2>Bring your idea into the light.</h2>
            <p>
              A photograph, a roof plan or a question is a good place to start.
            </p>
          </div>
          <Link href="/contact" className="button button-dark">
            Start a conversation <ArrowRight size={17} />
          </Link>
        </section>
      </InteriorReveal>
    </main>
  );
}
