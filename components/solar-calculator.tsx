'use client';

import Link from 'next/link';
import { ArrowRight, Info, SunMedium } from 'lucide-react';
import { useMemo, useState } from 'react';

export function SolarCalculator() {
  const [mode, setMode] = useState<'bill' | 'units'>('bill');
  const [bill, setBill] = useState(6500);
  const [units, setUnits] = useState(780);
  const [tariff, setTariff] = useState(7.5);
  const [sunHours, setSunHours] = useState(5);
  const [shade, setShade] = useState(10);
  const [growth, setGrowth] = useState(10);

  const result = useMemo(() => {
    const monthlyUnits = mode === 'bill' ? bill / Math.max(tariff, 1) : units;
    const usableSun = sunHours * 0.78 * (1 - shade / 100);
    const baseKw = monthlyUnits / 30 / Math.max(usableSun, 1);
    const recommended = Math.ceil(baseKw * (1 + growth / 100) * 2) / 2;
    const annualGeneration = Math.round(
      recommended * sunHours * 365 * 0.78 * (1 - shade / 100),
    );
    const offset = Math.min(
      100,
      Math.round((annualGeneration / Math.max(monthlyUnits * 12, 1)) * 100),
    );
    return {
      monthlyUnits: Math.round(monthlyUnits),
      recommended,
      annualGeneration,
      offset,
      roofArea: Math.round(recommended * 90),
    };
  }, [mode, bill, units, tariff, sunHours, shade, growth]);

  return (
    <div className="calculator-workspace">
      <div className="calculator-controls">
        <fieldset className="mode-tabs">
          <legend className="sr-only">Calculation method</legend>
          <button
            type="button"
            className={mode === 'bill' ? 'active' : ''}
            onClick={() => setMode('bill')}
          >
            Use electricity bill
          </button>
          <button
            type="button"
            className={mode === 'units' ? 'active' : ''}
            onClick={() => setMode('units')}
          >
            Use monthly units
          </button>
        </fieldset>
        {mode === 'bill' ? (
          <div className="calc-field">
            <div>
              <label htmlFor="bill">Average monthly bill</label>
              <output htmlFor="bill">₹{bill.toLocaleString('en-IN')}</output>
            </div>
            <input
              id="bill"
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={bill}
              onChange={(event) => setBill(Number(event.target.value))}
            />
          </div>
        ) : (
          <div className="calc-field">
            <div>
              <label htmlFor="units">Average monthly consumption</label>
              <output htmlFor="units">
                {units.toLocaleString('en-IN')} units
              </output>
            </div>
            <input
              id="units"
              type="range"
              min="100"
              max="12000"
              step="50"
              value={units}
              onChange={(event) => setUnits(Number(event.target.value))}
            />
          </div>
        )}
        <div className="calc-field">
          <div>
            <label htmlFor="tariff">Average electricity tariff</label>
            <output htmlFor="tariff">₹{tariff.toFixed(1)} / unit</output>
          </div>
          <input
            id="tariff"
            type="range"
            min="3"
            max="15"
            step=".5"
            value={tariff}
            onChange={(event) => setTariff(Number(event.target.value))}
          />
        </div>
        <div className="calc-two">
          <div>
            <label htmlFor="sun">Effective sun hours</label>
            <select
              id="sun"
              value={sunHours}
              onChange={(event) => setSunHours(Number(event.target.value))}
            >
              <option value="4">4 hours</option>
              <option value="4.5">4.5 hours</option>
              <option value="5">5 hours</option>
              <option value="5.5">5.5 hours</option>
              <option value="6">6 hours</option>
            </select>
          </div>
          <div>
            <label htmlFor="shade">Roof shading</label>
            <select
              id="shade"
              value={shade}
              onChange={(event) => setShade(Number(event.target.value))}
            >
              <option value="0">Minimal</option>
              <option value="10">Some shade</option>
              <option value="20">Moderate shade</option>
              <option value="30">Heavy shade</option>
            </select>
          </div>
        </div>
        <div className="calc-field">
          <div>
            <label htmlFor="growth">Future-use buffer</label>
            <output htmlFor="growth">{growth}%</output>
          </div>
          <input
            id="growth"
            type="range"
            min="0"
            max="30"
            step="5"
            value={growth}
            onChange={(event) => setGrowth(Number(event.target.value))}
          />
        </div>
      </div>
      <aside className="calculator-result">
        <span className="result-icon">
          <SunMedium />
        </span>
        <span className="kicker light">Planning estimate</span>
        <p>Recommended system</p>
        <strong>
          {result.recommended} <small>kW</small>
        </strong>
        <div className="result-metrics">
          <div>
            <span>Estimated annual generation</span>
            <b>{result.annualGeneration.toLocaleString('en-IN')} kWh</b>
          </div>
          <div>
            <span>Approximate roof area</span>
            <b>{result.roofArea.toLocaleString('en-IN')} sq ft</b>
          </div>
          <div>
            <span>Consumption offset</span>
            <b>Up to {result.offset}%</b>
          </div>
          <div>
            <span>Calculated consumption</span>
            <b>{result.monthlyUnits.toLocaleString('en-IN')} units / month</b>
          </div>
        </div>
        <Link
          href={`/contact?service=solar&capacity=${result.recommended}`}
          className="button button-light"
        >
          Request a site assessment <ArrowRight size={17} />
        </Link>
        <p className="result-note">
          <Info size={14} /> This is an early planning estimate, not a final
          engineering or financial proposal.
        </p>
      </aside>
    </div>
  );
}
