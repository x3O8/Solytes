import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, PackageCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} | Solytes`,
      description: product.summary,
      images: [product.image],
    },
    twitter: { card: 'summary_large_image', images: [product.image] },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://solytes-solar.kprasadkodoth.chatgpt.site${product.image}`,
    description: product.description,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Solytes' },
    url: `https://solytes-solar.kprasadkodoth.chatgpt.site/products/${product.slug}`,
  };
  return (
    <main className="page-main product-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="shell product-breadcrumb">
        <Link href="/products">
          <ArrowLeft size={15} /> All products
        </Link>
        <span>{product.category}</span>
      </div>
      <section className="shell product-detail-hero">
        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
        <div className="product-detail-copy">
          <span className="kicker">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-lead">{product.summary}</p>
          <p>{product.description}</p>
          <div className="product-buy-row">
            <Link
              href={`/contact?product=${product.slug}`}
              className="button button-dark"
            >
              Buy now / enquire <ArrowRight size={17} />
            </Link>
            <span>
              <PackageCheck size={17} /> Project quantities welcome
            </span>
          </div>
        </div>
      </section>
      <section className="shell product-info-grid">
        <div>
          <span className="kicker">Why it works</span>
          <h2>Designed around the application.</h2>
          <ul className="check-list">
            {product.highlights.map((item) => (
              <li key={item}>
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="spec-card">
          <span className="kicker">Planning specification</span>
          {product.specifications.map((spec) => (
            <div key={spec.label}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
          <p>
            Final ratings and configuration are confirmed against the selected
            model and site requirement.
          </p>
        </div>
      </section>
      <section className="shell applications">
        <span className="kicker">Ideal applications</span>
        <div>
          {product.applications.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
