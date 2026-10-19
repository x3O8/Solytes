import type { ComponentProps } from 'react';
import manifest from '@/lib/image-manifest.json';

type Props = Omit<ComponentProps<'img'>, 'src'> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};
type ImageEntry = {
  width: number;
  height: number;
  variants: { src: string; width: number }[];
};

// Native responsive images avoid a server round trip and client image runtime.
export default function OptimizedImage({
  src,
  alt,
  fill,
  priority,
  unoptimized: _unoptimized,
  sizes,
  style,
  width,
  height,
  loading,
  ...props
}: Props) {
  const image = (manifest as Record<string, ImageEntry>)[src];
  const variants = image?.variants;
  // Files are resized and compressed ahead of time; no runtime optimizer is needed.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={variants?.at(-1)?.src ?? src}
      srcSet={variants?.map((item) => `${item.src} ${item.width}w`).join(', ')}
      sizes={sizes ?? (fill ? '100vw' : `${width ?? image?.width ?? 640}px`)}
      alt={alt}
      width={fill ? undefined : (width ?? image?.width)}
      height={fill ? undefined : (height ?? image?.height)}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      data-nimg={fill ? 'fill' : '1'}
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              ...style,
            }
          : style
      }
    />
  );
}
