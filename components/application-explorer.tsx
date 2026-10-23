'use client';

import { useState } from 'react';
import Image from '@/components/optimized-image';
import Link from '@/components/site-link';
import { ArrowRight } from 'lucide-react';
import styles from './interior-pages.module.css';

const lighting = [
  {
    name: 'Garden & pathways',
    image: '/solar-application-garden.png',
    title: 'Give the garden its evening.',
    text: 'Guide a path, soften a planting edge or light a place to pause. Start with the atmosphere you want, then choose the light.',
    points: [
      'Keep solar panels clear of dense foliage.',
      'Use lower mounting heights for intimate paths.',
      'Plan spacing around turns, steps and entrances.',
    ],
    href: '/products/halo-garden-light',
    action: 'Explore garden lighting',
  },
  {
    name: 'Walls & entrances',
    image: '/product-wall-light.png',
    title: 'A clearer welcome home.',
    text: 'Bring useful light to doorways, gates and boundary walls. Match the beam and control to the way people move through the space.',
    points: [
      'Review panel exposure at the mounting point.',
      'Consider motion sensing for occasional access.',
      'Aim light away from neighbours and windows.',
    ],
    href: '/products/shield-motion-wall-light',
    action: 'Explore wall lighting',
  },
  {
    name: 'Roads & campuses',
    image: '/solar-application-campus.png',
    title: 'Think beyond a single pole.',
    text: 'A road or campus needs a joined-up lighting plan. Road width, pole spacing and operating hours shape the right selection.',
    points: [
      'Share road width and proposed mounting height.',
      'Identify shaded stretches and critical crossings.',
      'Confirm nightly runtime before choosing output.',
    ],
    href: '/products/nova-integrated-street-light',
    action: 'Explore street lighting',
  },
];
const projects = [
  {
    name: 'Residential',
    image: '/solar-application-home.png',
    title: 'Make the most of your roof.',
    text: 'A home solar plan starts with your electricity use and the roof you have. We bring the layout, equipment and installation scope into one conversation.',
    points: [
      'Recent electricity bills and connection details',
      'Usable roof area, shade and access',
      'Your daytime use and future energy needs',
    ],
    href: '/contact?service=epc',
    action: 'Plan a home system',
  },
  {
    name: 'Commercial',
    image: '/solar-application-campus.png',
    title: 'Built around the working day.',
    text: 'Align solar generation with business demand. Roof conditions, load profile and operating hours guide a practical commercial system.',
    points: [
      'Daytime demand and working-hour profile',
      'Roof structure and installation access',
      'Electrical integration and work sequencing',
    ],
    href: '/contact?service=epc',
    action: 'Discuss a commercial roof',
  },
  {
    name: 'Institutional',
    image: '/solytes-community-dawn.png',
    title: 'A coordinated campus plan.',
    text: 'For campuses and shared facilities, energy planning needs to account for multiple buildings, shared spaces and day-to-day operations.',
    points: [
      'Building-wise consumption and available roofs',
      'Stakeholder requirements and site access',
      'Phased execution and handover documentation',
    ],
    href: '/contact?service=epc',
    action: 'Discuss a campus project',
  },
];

export function ApplicationExplorer({
  kind,
}: {
  kind: 'lighting' | 'projects';
}) {
  const items = kind === 'lighting' ? lighting : projects;
  const [selected, setSelected] = useState(0);
  const item = items[selected];
  const prefix = `application-${kind}`;
  return (
    <section className={`shell ${styles.explorer}`} data-reveal>
      <div className={styles.sectionHeading}>
        <h2>
          {kind === 'lighting'
            ? 'Find your kind of light.'
            : 'Every site has a different story.'}
        </h2>
        <p>
          {kind === 'lighting'
            ? 'Choose a space to see what matters before you choose a product.'
            : 'Explore the starting points for your project. These are application concepts, not a completed-project portfolio.'}
        </p>
      </div>
      <div
        role="tablist"
        aria-label={
          kind === 'lighting' ? 'Lighting applications' : 'Project types'
        }
        className={styles.tabs}
      >
        {items.map((entry, index) => (
          <button
            key={entry.name}
            role="tab"
            id={`${prefix}-tab-${index}`}
            aria-controls={`${prefix}-panel`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % items.length;
              else if (event.key === 'ArrowLeft')
                next = (index + items.length - 1) % items.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = items.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`${prefix}-tab-${next}`)?.focus();
            }}
          >
            {entry.name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${prefix}-panel`}
        aria-labelledby={`${prefix}-tab-${selected}`}
        tabIndex={0}
        className={styles.application}
      >
        <figure className={styles.applicationImage}>
          <Image
            key={item.image}
            src={item.image}
            alt={`${item.name} solar application concept`}
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <figcaption>Application illustration</figcaption>
        </figure>
        <div className={styles.applicationCopy} key={item.name}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link href={item.href} className="button button-dark">
            {item.action}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
