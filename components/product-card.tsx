import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/products';

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <Link href={`/products/${product.slug}`} className={`product-card ${featured ? 'featured' : ''}`}>
      <div className="product-image-wrap"><Image src={product.image} alt={product.name} fill sizes={featured ? '(max-width: 800px) 100vw, 55vw' : '(max-width: 800px) 100vw, 33vw'} className="product-image" /></div>
      <div className="product-card-copy"><span>{product.category}</span><h3>{product.name}</h3><p>{product.summary}</p><span className="product-card-link">View details <ArrowUpRight size={15} /></span></div>
    </Link>
  );
}
