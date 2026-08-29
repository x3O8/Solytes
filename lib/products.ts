export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  applications: string[];
  highlights: string[];
  specifications: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: 'garden-path-light',
    name: 'Arc Garden Path Light',
    category: 'Garden lighting',
    summary: 'A restrained solar bollard that brings warm, wire-free light to paths and landscapes.',
    description: 'Designed for homes, hospitality landscapes and pedestrian paths, the Arc combines an integrated solar surface with controlled downward illumination. Its low-profile form keeps the fixture quiet by day and useful after dark.',
    image: '/product-garden-light.png',
    applications: ['Garden pathways', 'Villa landscapes', 'Resort grounds', 'Courtyards'],
    highlights: ['Automatic dusk-to-dawn operation', 'Warm downward light distribution', 'Weather-ready aluminium body', 'Wire-free placement'],
    specifications: [
      { label: 'Light character', value: 'Warm white, downward' },
      { label: 'Operation', value: 'Automatic dusk to dawn' },
      { label: 'Charging', value: 'Integrated solar surface' },
      { label: 'Finish', value: 'Graphite powder coat' },
    ],
  },
  {
    slug: 'solar-brick-light',
    name: 'Luma Solar Brick Light',
    category: 'Architectural lighting',
    summary: 'Flush-mounted guidance lighting for steps, boundary walls and architectural edges.',
    description: 'Luma creates a soft horizontal wash without visible wiring. Its compact form is suited to new landscapes and thoughtful retrofit projects where glare control and clean detailing matter.',
    image: '/product-brick-light.png',
    applications: ['Boundary walls', 'Outdoor steps', 'Driveway edges', 'Wayfinding'],
    highlights: ['Low-glare horizontal beam', 'Compact flush profile', 'Self-contained solar charging', 'Automatic night operation'],
    specifications: [
      { label: 'Light character', value: 'Warm linear wash' },
      { label: 'Mounting', value: 'Surface or recessed wall' },
      { label: 'Operation', value: 'Automatic photocell' },
      { label: 'Finish', value: 'Charcoal aluminium' },
    ],
  },
  {
    slug: 'integrated-street-light',
    name: 'Aero Integrated Street Light',
    category: 'Street lighting',
    summary: 'An all-in-one solar street-lighting system for campuses, roads and public spaces.',
    description: 'Aero brings the panel, battery, controls and high-efficiency LED engine into a streamlined system. It is intended for project-specific photometric planning rather than one-size-fits-all placement.',
    image: '/product-street-light.png',
    applications: ['Campus roads', 'Internal streets', 'Parking areas', 'Public pathways'],
    highlights: ['Integrated solar architecture', 'Project-specific light planning', 'Programmable operating profiles', 'Reduced trenching and cabling'],
    specifications: [
      { label: 'System format', value: 'All-in-one solar luminaire' },
      { label: 'Planning', value: 'Site and lux-level specific' },
      { label: 'Controls', value: 'Programmable night profile' },
      { label: 'Mounting', value: 'Pole mounted' },
    ],
  },
  {
    slug: 'solar-wall-light',
    name: 'Halo Solar Wall Light',
    category: 'Security lighting',
    summary: 'A sensor-ready solar wall light for entrances, service areas and perimeter zones.',
    description: 'Halo pairs a compact luminaire with a separately aimable solar panel for flexible charging. Its broad downward beam supports entrances and perimeter areas without flooding the façade with uncontrolled glare.',
    image: '/product-wall-light.png',
    applications: ['Home entrances', 'Service passages', 'Compound walls', 'Utility areas'],
    highlights: ['Wide controlled beam', 'Motion-sensor operation', 'Aimable solar panel', 'Flexible wall placement'],
    specifications: [
      { label: 'Light character', value: 'Broad neutral-warm beam' },
      { label: 'Sensor', value: 'Motion and ambient light' },
      { label: 'Charging', value: 'Separate aimable panel' },
      { label: 'Finish', value: 'Matte black' },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
