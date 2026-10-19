import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Precompute images: the deployed runtime has no image transformation binding.
const root = process.cwd();
const output = path.join(root, 'public', 'optimized');
await mkdir(output, { recursive: true });
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of await readdir(path.join(root, 'public'))) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const input = await readFile(path.join(root, 'public', file));
  const { width, height } = await sharp(input).metadata();
  if (!width || !height) continue;
  const hash = createHash('sha256').update(input).digest('hex').slice(0, 12);
  const widths = [
    ...new Set(
      [320, 640, 960, 1440, Math.min(width, 1920)].filter((w) => w <= width),
    ),
  ].sort((a, b) => a - b);
  const variants = [];
  for (const size of widths) {
    const name = `${path.parse(file).name}-${hash}-${size}.webp`;
    const destination = path.join(output, name);
    try {
      await stat(destination);
    } catch {
      await sharp(input)
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(destination);
    }
    variants.push({ src: `/optimized/${name}`, width: size });
  }
  manifest[`/${file}`] = { width, height, variants };
  originalBytes += input.length;
  optimizedBytes += (await stat(path.join(root, 'public', variants.at(-1).src)))
    .size;
}
await writeFile(
  path.join(root, 'lib', 'image-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(
  JSON.stringify({
    images: Object.keys(manifest).length,
    originalBytes,
    optimizedBytes,
    reduction: `${(100 * (1 - optimizedBytes / originalBytes)).toFixed(1)}%`,
  }),
);
