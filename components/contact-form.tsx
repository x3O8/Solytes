'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { products } from '@/lib/products';

export function ContactForm() {
  const [interest, setInterest] = useState('General enquiry');
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const product = products.find((item) => item.slug === query.get('product'));
    if (product) setInterest(product.name);
    else if (query.get('service') === 'epc') setInterest('EPC solar project');
    else if (query.get('service') === 'solar') setInterest(`Rooftop solar${query.get('capacity') ? ` — ${query.get('capacity')} kW estimate` : ''}`);
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Solytes enquiry — ${interest}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nInterest: ${interest}\n\nProject details:\n${data.get('message')}`);
    window.location.href = `mailto:hello@solytes.in?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label><label>Phone<input name="phone" required autoComplete="tel" placeholder="Phone number" /></label></div>
      <label>Email<input name="email" type="email" required autoComplete="email" placeholder="Email address" /></label>
      <label>What can we help with?<select value={interest} onChange={(event) => setInterest(event.target.value)}><option>General enquiry</option><option>Rooftop solar</option><option>EPC solar project</option><option>Garden lighting</option><option>Street lighting</option>{products.map((product) => <option key={product.slug}>{product.name}</option>)}</select></label>
      <label>Tell us about the site<textarea name="message" rows={5} required placeholder="Location, application, approximate quantity or monthly consumption…" /></label>
      <button className="button button-dark" type="submit">Prepare enquiry email <ArrowRight size={17} /></button>
      <p>Submitting opens your email app with the enquiry prepared for review before sending.</p>
    </form>
  );
}
