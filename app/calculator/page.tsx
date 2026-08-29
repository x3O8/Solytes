import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { SolarCalculator } from '@/components/solar-calculator';

export const metadata: Metadata = { title: 'Solar System Calculator', description: 'Estimate the solar kilowatt capacity your home, business or project may require based on electricity bill, units, sunlight and shading.' };

export default function CalculatorPage() {
  return (
    <main className="page-main calculator-page">
      <section className="page-hero shell"><span className="kicker"><Calculator size={14} /> Solar capacity calculator</span><h1>Size the system around<br />how you use power.</h1><p>Use your electricity bill or monthly units, then refine the estimate with tariff, effective sunlight, shading and expected future demand.</p></section>
      <section className="shell"><SolarCalculator /></section>
      <section className="shell calculator-explain"><article><span>01</span><h3>Consumption first</h3><p>The calculator converts your bill or monthly units into a daily energy requirement.</p></article><article><span>02</span><h3>Site factors next</h3><p>Effective sunlight and shading adjust how much useful energy each installed kilowatt can produce.</p></article><article><span>03</span><h3>Survey confirms</h3><p>Roof geometry, structure, export policy and equipment choice still need site-specific engineering.</p></article></section>
    </main>
  );
}
