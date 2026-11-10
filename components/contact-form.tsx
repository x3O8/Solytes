'use client';
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { type SyntheticEvent, useRef, useState } from 'react';
import { products } from '@/lib/products';
export function ContactForm({ landing = false }: { landing?: boolean }) {
  const query = useSearchParams();
  const product = products.find((item) => item.slug === query.get('product'));
  const initialInterest =
    product?.name ??
    (query.get('service') === 'epc'
      ? 'EPC solar project'
      : query.get('service') === 'solar'
        ? query.get('capacity')
          ? `Rooftop solar - ${query.get('capacity')} kW estimate`
          : 'Rooftop solar'
        : 'General enquiry');
  const [interest, setInterest] = useState(initialInterest);
  const [error, setError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const pending = useRef<{ payload: string; id: string } | null>(null);
  const submitting = useRef(false);
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    setSuccess('');
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
      const missing = !name
        ? 'name'
        : !phone
          ? 'phone'
          : !email
            ? 'email'
            : 'message';
      setInvalidField(missing);
      setError('Complete every field before submitting the enquiry.');
      (event.currentTarget.elements.namedItem(missing) as HTMLElement)?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setInvalidField('email');
      setError('Enter a valid email address.');
      (event.currentTarget.elements.namedItem('email') as HTMLElement)?.focus();
      return;
    }
    setError('');
    setInvalidField('');
    const payload = {
      name,
      phone,
      email,
      interest,
      message,
      source: window.location.pathname,
    };
    const serialized = JSON.stringify(payload);
    if (pending.current?.payload !== serialized)
      pending.current = { payload: serialized, id: crypto.randomUUID() };
    submitting.current = true;
    setSending(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: pending.current.id }),
        signal: AbortSignal.timeout(25000),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || result.ok !== true)
        throw new Error(
          result.error || 'Your enquiry could not be saved. Please try again.',
        );
      form.reset();
      setInterest(initialInterest);
      pending.current = null;
      setSuccess(
        'Thank you. Your enquiry has been saved. The SOLYTES team will contact you.',
      );
    } catch (failure) {
      setError(
        failure instanceof Error &&
          failure.name !== 'TimeoutError' &&
          failure.name !== 'TypeError'
          ? failure.message
          : 'We could not confirm your enquiry was saved. Your details are still here; please try again.',
      );
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }
  return (
    <form
      className={`contact-form ${landing ? 'contact-form-landing' : ''}`}
      onSubmit={submit}
      aria-busy={sending}
      noValidate
      aria-describedby="contact-form-note contact-form-error"
    >
      <h3 className="contact-form-title">Contact us</h3>
      <div className="form-row">
        <label>
          Name
          <input
            disabled={sending}
            name="name"
            maxLength={120}
            aria-invalid={invalidField === 'name' || undefined}
            aria-describedby={
              invalidField === 'name' ? 'contact-form-error' : undefined
            }
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label>
          Phone
          <input
            disabled={sending}
            name="phone"
            maxLength={40}
            type="tel"
            aria-invalid={invalidField === 'phone' || undefined}
            aria-describedby={
              invalidField === 'phone' ? 'contact-form-error' : undefined
            }
            required
            autoComplete="tel"
            placeholder="Phone number"
          />
        </label>
      </div>
      <label>
        Email
        <input
          disabled={sending}
          name="email"
          maxLength={254}
          aria-invalid={invalidField === 'email' || undefined}
          aria-describedby={
            invalidField === 'email' ? 'contact-form-error' : undefined
          }
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
        />
      </label>
      <label>
        What can we help with?
        <select
          disabled={sending}
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
        >
          {initialInterest.startsWith('Rooftop solar -') ? (
            <option>{initialInterest}</option>
          ) : null}
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
          disabled={sending}
          name="message"
          maxLength={5000}
          aria-invalid={invalidField === 'message' || undefined}
          aria-describedby={
            invalidField === 'message' ? 'contact-form-error' : undefined
          }
          rows={5}
          required
          placeholder="Location, application, approximate quantity or monthly consumption."
        />
      </label>
      <button className="button button-dark" type="submit" disabled={sending}>
        {sending ? 'Saving enquiry...' : 'Submit enquiry'}{' '}
        <ArrowRight size={17} />
      </button>
      <p id="contact-form-note">
        Your submitted details are stored by SOLYTES to respond to your enquiry.
      </p>
      <output aria-live="polite">{success}</output>
      <output aria-live="polite" id="contact-form-error" className="form-error">
        {error}
      </output>
    </form>
  );
}
