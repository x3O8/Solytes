'use client';

import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { type SyntheticEvent, useState } from 'react';
import { products } from '@/lib/products';

export function ContactForm() {
  const query = useSearchParams();
  const product = products.find((item) => item.slug === query.get('product'));
  const initialInterest =
    product?.name ??
    (query.get('service') === 'epc'
      ? 'EPC solar project'
      : query.get('service') === 'solar'
        ? `Rooftop solar${query.get('capacity') ? ` — ${query.get('capacity')} kW estimate` : ''}`
        : 'General enquiry');
  const [interest, setInterest] = useState(initialInterest);
  const [error, setError] = useState('');

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => {
      const value = data.get(name);
      return typeof value === 'string' ? value.trim() : '';
    };
    const name = field('name');
    const phone = field('phone');
    const email = field('email');
    const message = field('message');
    if (!name || !phone || !email || !message) {
      setError('Complete every field before preparing the enquiry.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    const subject = encodeURIComponent(`Solytes enquiry — ${interest}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\n\nProject details:\n${message}`,
    );
    window.location.href = `mailto:hello@solytes.in?subject=${subject}&body=${body}`;
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-describedby="contact-form-note contact-form-error"
    >
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            required
            autoComplete="tel"
            placeholder="Phone number"
          />
        </label>
      </div>
      <label>
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
        />
      </label>
      <label>
        What can we help with?
        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
        >
          <option>General enquiry</option>
          <option>Rooftop solar</option>
          <option>EPC solar project</option>
          <option>Garden lighting</option>
          <option>Street lighting</option>
          {products.map((product) => (
            <option key={product.slug}>{product.name}</option>
          ))}
        </select>
      </label>
      <label>
        Tell us about the site
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Location, application, approximate quantity or monthly consumption…"
        />
      </label>
      <button className="button button-dark" type="submit">
        Prepare enquiry email <ArrowRight size={17} />
      </button>
      <p id="contact-form-note">
        Submitting opens your email app with the enquiry prepared for review
        before sending.
      </p>
      <output id="contact-form-error" className="form-error">
        {error}
      </output>
    </form>
  );
}
