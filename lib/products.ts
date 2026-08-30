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
    slug: 'nova-integrated-street-light',
    name: 'Nova Integrated Street Light',
    category: 'Street lighting',
    summary:
      'A compact, all-in-one solar luminaire for roads, compounds and shared outdoor spaces.',
    description:
      'Nova combines the lighting engine, battery controls and solar-ready architecture in a self-contained pole-mounted format. Final selection is matched to the road width, mounting height and required operating profile.',
    image: '/catalog-product-1.jpeg',
    applications: [
      'Internal roads',
      'Residential compounds',
      'Campus paths',
      'Parking areas',
    ],
    highlights: [
      'Integrated luminaire format',
      'Automatic night operation',
      'Motion-sensing control',
      'Pole-mounted installation',
    ],
    specifications: [
      { label: 'Product type', value: 'Integrated solar street light' },
      { label: 'Control', value: 'Ambient light and motion sensing' },
      { label: 'Installation', value: 'Pole mounted' },
      { label: 'Selection', value: 'Site and lighting-plan specific' },
    ],
  },
  {
    slug: 'tribeam-integrated-street-light',
    name: 'TriBeam Integrated Street Light',
    category: 'High-output street lighting',
    summary:
      'A three-module solar street light for wider roads and larger open areas.',
    description:
      'TriBeam uses three independent reflector modules to distribute light across demanding outdoor applications. Solytes specifies the system around mounting height, spacing, road geometry and nightly usage.',
    image: '/catalog-product-2.jpeg',
    applications: [
      'Wide internal roads',
      'Industrial yards',
      'Large campuses',
      'Public approaches',
    ],
    highlights: [
      'Three-module light engine',
      'Integrated control enclosure',
      'Motion-sensing operation',
      'Project-led configuration',
    ],
    specifications: [
      { label: 'Product type', value: 'Multi-module solar street light' },
      { label: 'Light engine', value: 'Three reflector modules' },
      { label: 'Installation', value: 'Pole mounted' },
      { label: 'Selection', value: 'Lux plan and site specific' },
    ],
  },
  {
    slug: 'duobeam-integrated-street-light',
    name: 'DuoBeam Integrated Street Light',
    category: 'Street lighting',
    summary:
      'A balanced two-module luminaire for streets, campuses and perimeter routes.',
    description:
      'DuoBeam pairs a compact integrated body with two reflector modules for broader outdoor coverage. Mounting and operating profiles are planned around the actual site instead of a one-size-fits-all layout.',
    image: '/catalog-product-3.jpeg',
    applications: [
      'Campus roads',
      'Perimeter routes',
      'Parking lanes',
      'Industrial access roads',
    ],
    highlights: [
      'Dual light modules',
      'Integrated solar architecture',
      'Automatic dusk operation',
      'Motion-sensing control',
    ],
    specifications: [
      { label: 'Product type', value: 'Dual-module solar street light' },
      { label: 'Control', value: 'Ambient light and motion sensing' },
      { label: 'Installation', value: 'Pole mounted' },
      { label: 'Planning', value: 'Mounting and spacing specific' },
    ],
  },
  {
    slug: 'shield-motion-wall-light',
    name: 'Shield Motion Wall Light',
    category: 'Security lighting',
    summary:
      'A solar wall light with a broad diffuser and integrated motion sensor.',
    description:
      'Shield is designed for entrances, side passages and utility zones where dependable automatic illumination matters. Its self-contained format keeps installation straightforward and wire-free.',
    image: '/catalog-product-4.jpeg',
    applications: [
      'Entrances',
      'Side passages',
      'Compound walls',
      'Utility areas',
    ],
    highlights: [
      'Integrated motion sensor',
      'Broad diffused light',
      'Wall-mounted format',
      'Wire-free placement',
    ],
    specifications: [
      { label: 'Product type', value: 'Solar motion wall light' },
      { label: 'Control', value: 'Motion and ambient light sensing' },
      { label: 'Installation', value: 'Wall mounted' },
      { label: 'Light character', value: 'Broad diffused output' },
    ],
  },
  {
    slug: 'halo-garden-light',
    name: 'Halo Garden Light',
    category: 'Garden lighting',
    summary:
      'A contemporary solar garden fixture for paths, lawns and landscape edges.',
    description:
      'Halo delivers comfortable area light from a sculpted, low-profile form. It is suited to residential and hospitality landscapes where fixtures should look considered in daylight as well as after dark.',
    image: '/catalog-product-5.jpeg',
    applications: ['Garden paths', 'Lawns', 'Resort landscapes', 'Courtyards'],
    highlights: [
      'Wide circular light distribution',
      'Integrated motion sensing',
      'Contemporary landscape form',
      'Automatic night operation',
    ],
    specifications: [
      { label: 'Product type', value: 'Solar garden light' },
      { label: 'Control', value: 'Ambient light and motion sensing' },
      { label: 'Installation', value: 'Landscape mounted' },
      { label: 'Light character', value: 'Soft area illumination' },
    ],
  },
  {
    slug: 'solytes-solar-brick-light',
    name: 'Solytes Solar Brick Light',
    category: 'Architectural lighting',
    summary:
      'A luminous solar paver for pathways, edges and distinctive landscape details.',
    description:
      'This branded solar brick creates an unmistakable point of light within landscape and wayfinding schemes. It can be used as a repeated marker or as a focused identity detail at entrances and public spaces.',
    image: '/catalog-product-6.png',
    applications: [
      'Pathway markers',
      'Entrance features',
      'Landscape edges',
      'Wayfinding',
    ],
    highlights: [
      'Integrated solar surface',
      'High-visibility luminous face',
      'Architectural paver format',
      'Automatic night illumination',
    ],
    specifications: [
      { label: 'Product type', value: 'Solar brick light' },
      { label: 'Light character', value: 'Green illuminated marker' },
      { label: 'Installation', value: 'Surface or landscape integrated' },
      { label: 'Operation', value: 'Automatic night illumination' },
    ],
  },
  {
    slug: 'focus-landscape-spotlight',
    name: 'Focus Landscape Spotlight',
    category: 'Landscape lighting',
    summary:
      'An adjustable solar spotlight for trees, facades and garden features.',
    description:
      'Focus separates the solar panel from the aimable light head so charging and illumination can each be directed where needed. It is a flexible choice for accent lighting without underground cabling.',
    image: '/catalog-product-7.jpg',
    applications: [
      'Trees and planting',
      'Feature walls',
      'Signage',
      'Garden sculpture',
    ],
    highlights: [
      'Aimable spotlight head',
      'Adjustable solar panel',
      'Ground-spike installation',
      'Cable-free accent lighting',
    ],
    specifications: [
      { label: 'Product type', value: 'Solar landscape spotlight' },
      { label: 'Adjustment', value: 'Aimable head and panel' },
      { label: 'Installation', value: 'Ground spike' },
      { label: 'Light character', value: 'Focused accent beam' },
    ],
  },
  {
    slug: 'arc-solar-wall-light',
    name: 'Arc Solar Wall Light',
    category: 'Architectural lighting',
    summary:
      'A clean, curved wall fixture for entrances, balconies and exterior circulation.',
    description:
      'Arc brings solar charging into a compact architectural housing with a soft downward diffuser. Its restrained finish suits contemporary homes and commercial facades.',
    image: '/catalog-product-8.png',
    applications: [
      'Home entrances',
      'Balconies',
      'Exterior corridors',
      'Hospitality facades',
    ],
    highlights: [
      'Integrated solar top surface',
      'Soft downward illumination',
      'Compact wall-mounted profile',
      'Contemporary white finish',
    ],
    specifications: [
      { label: 'Product type', value: 'Solar wall light' },
      { label: 'Light character', value: 'Soft downward glow' },
      { label: 'Installation', value: 'Wall mounted' },
      { label: 'Finish', value: 'White architectural housing' },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
