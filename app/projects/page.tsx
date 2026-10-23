import type { Metadata } from 'next';
import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { ArrowRight } from 'lucide-react';
import { InteriorReveal } from '@/components/interior-reveal';
import { ApplicationExplorer } from '@/components/application-explorer';
import styles from '@/components/interior-pages.module.css';

export const metadata: Metadata = {
  title: 'Solar EPC Projects',
  description:
    'Explore residential, commercial and institutional solar planning with Solytes, from site study to commissioning.',
};
const stages = [
  {
    image: '/home-process-read-site.png',
    title: 'Read the site',
    text: 'We start with consumption, roof condition, shade and access. The aim is to understand what the site can support before deciding capacity.',
  },
  {
    image: '/home-process-plan-system.png',
    title: 'Plan the system',
    text: 'Module layout, inverter selection, mounting and electrical design come together in a proposal with clear assumptions and scope.',
  },
  {
    image: '/home-process-deliver.png',
    title: 'Bring it together',
    text: 'Equipment, installation sequencing and site safety are coordinated against an agreed execution plan.',
  },
  {
    image: '/solytes-residence.png',
    title: 'Power on, with clarity',
    text: 'Testing, commissioning and handover bring the work to completion, with operating guidance and project documentation.',
  },
];
export default function ProjectsPage() {
  return (
    <main className="page-main">
      <InteriorReveal>
        <section className={`shell ${styles.intro}`}>
          <h1>From roof to possibility.</h1>
          <p>
            Solar EPC for homes, businesses and campuses. Bring your energy
            needs and your site. We help connect the survey, engineering and
            execution.
          </p>
        </section>
        <figure className={styles.heroMedia}>
          <Image
            src="/solar-application-home.png"
            alt="Illustrative Kerala home with rooftop solar panels"
            fill
            priority
            sizes="100vw"
          />
          <figcaption>Residential solar · Application illustration</figcaption>
        </figure>
        <ApplicationExplorer kind="projects" />
        <section className={styles.journey}>
          <div className={`shell ${styles.journeyGrid}`}>
            <div className={styles.journeyIntro}>
              <h2>A clear path to power.</h2>
              <p>
                Follow the project from the first roof study to an informed
                handover. Final scope is confirmed after the site assessment.
              </p>
              <Link href="/contact?service=epc" className="button button-dark">
                Discuss your project <ArrowRight size={17} />
              </Link>
            </div>
            <div className={styles.journeySteps}>
              {stages.map((stage) => (
                <article key={stage.title} data-reveal>
                  <div className={styles.journeyPicture}>
                    <Image
                      src={stage.image}
                      alt={`${stage.title} application illustration`}
                      fill
                      sizes="160px"
                    />
                  </div>
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`shell ${styles.story}`} data-reveal>
          <h2>A better brief makes a better beginning.</h2>
          <div>
            <p>
              Share a recent electricity bill, the site location and a few roof
              photographs. Tell us how the property is used and whether your
              energy needs are likely to change.
            </p>
            <p>
              We will review usable roof area, connection details, shading and
              equipment requirements before confirming an engineered proposal.
            </p>
            <Link href="/calculator" className="button button-dark">
              Estimate solar capacity <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </InteriorReveal>
    </main>
  );
}
