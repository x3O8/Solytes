import type { Metadata } from 'next';
import { Clock3, Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Solytes about solar lighting products, rooftop systems and EPC solar projects.',
};

export default function ContactPage() {
  return (
    <main className="page-main contact-page">
      <section className="shell contact-layout">
        <div className="contact-copy">
          <span className="kicker">Contact Solytes</span>
          <h1>Tell us what needs to be lit—or powered.</h1>
          <p>
            Share the site, application and scale. We will help frame the right
            next step, whether that is a product recommendation, a capacity
            estimate or an EPC conversation.
          </p>
          <div className="contact-details">
            <div>
              <Mail />
              <span>
                <small>Email</small>
                <a href="mailto:hello@solytes.in">hello@solytes.in</a>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <small>Response window</small>
                <strong>Within one working day</strong>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <small>Project coverage</small>
                <strong>Location confirmed during enquiry</strong>
              </span>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
