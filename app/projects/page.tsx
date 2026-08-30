import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  DraftingCompass,
  HardHat,
  Search,
  SunMedium,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solar EPC Projects',
  description:
    'Plan and execute rooftop, commercial and institutional solar EPC projects with Solytes.',
};

const stages = [
  {
    icon: Search,
    number: '01',
    title: 'Survey & feasibility',
    text: 'Consumption, shadow, roof condition, access and interconnection constraints are assessed before sizing.',
  },
  {
    icon: DraftingCompass,
    number: '02',
    title: 'Engineering & proposal',
    text: 'A site-specific design brings together capacity, layout, generation assumptions and project scope.',
  },
  {
    icon: HardHat,
    number: '03',
    title: 'Procurement & construction',
    text: 'Equipment, safety, sequencing and site coordination are managed against one execution plan.',
  },
  {
    icon: SunMedium,
    number: '04',
    title: 'Commissioning & handover',
    text: 'The system is tested, documented and handed over with clear operating guidance.',
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-main">
      <section className="project-hero">
        <Image
          src="/solytes-residence.png"
          alt="Engineered rooftop solar project"
          fill
          priority
          className="project-hero-image"
          sizes="100vw"
        />
        <div className="project-hero-shade" />
        <div className="shell">
          <span className="kicker light">
            Engineering, procurement & construction
          </span>
          <h1>
            One team from roof study
            <br />
            to power-on.
          </h1>
          <p>
            Solytes helps turn an energy requirement into a buildable solar
            project—with engineering clarity, coordinated execution and
            accountable handover.
          </p>
          <Link href="/contact?service=epc" className="button button-light">
            Discuss an EPC project <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section shell project-types">
        <div>
          <span className="kicker">Built around the site</span>
          <h2>Residential, commercial and institutional solar.</h2>
        </div>
        <div className="project-type-grid">
          <article>
            <span>01</span>
            <h3>Rooftop solar</h3>
            <p>
              For homes, apartment common loads, offices and facilities looking
              to offset daytime consumption.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Commercial systems</h3>
            <p>
              For businesses that need a capacity plan aligned with load
              profile, operating hours and roof constraints.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Institutional projects</h3>
            <p>
              For campuses and public-use properties requiring coordinated
              engineering and site execution.
            </p>
          </article>
        </div>
      </section>
      <section className="soft-section section">
        <div className="shell">
          <div className="section-top">
            <div>
              <span className="kicker">The EPC journey</span>
              <h2>Every handoff, handled.</h2>
            </div>
          </div>
          <div className="epc-stages">
            {stages.map(({ icon: Icon, ...stage }) => (
              <article key={stage.number}>
                <span>{stage.number}</span>
                <Icon />
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell epc-scope">
        <div>
          <span className="kicker">Typical scope</span>
          <h2>A practical project envelope.</h2>
        </div>
        <ul className="check-list">
          <li>
            <Check />
            Site survey and shadow review
          </li>
          <li>
            <Check />
            Consumption and capacity analysis
          </li>
          <li>
            <Check />
            Module and inverter architecture
          </li>
          <li>
            <Check />
            Mounting and electrical design
          </li>
          <li>
            <Check />
            Installation and safety coordination
          </li>
          <li>
            <Check />
            Testing, commissioning and documentation
          </li>
        </ul>
      </section>
      <section className="conversion-strip">
        <div className="shell">
          <div>
            <span className="kicker light">Start with the numbers</span>
            <h2>Estimate your capacity before the survey.</h2>
          </div>
          <Link href="/calculator" className="button button-light">
            Use the solar calculator <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
