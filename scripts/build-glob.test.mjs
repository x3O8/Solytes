import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { parse } from 'acorn';
import { globFiles } from 'vite-plugin-dynamic-import';
import { createServer } from 'vite';

// Exercise the dependency resolved by the actual consumer, not a direct helper import.
const consumerRequire = createRequire(
  import.meta.resolve('vite-plugin-dynamic-import'),
);
const glob = consumerRequire('fast-glob');

await test('build globbing rejects deeply nested braces and parentheses before parsing', () => {
  for (const [open, close] of [
    ['{', '}'],
    ['(', ')'],
  ]) {
    const pattern = open.repeat(4000) + 'a,b' + close.repeat(4000);
    assert.throws(() => glob.sync(pattern), {
      code: 'ERR_BUILD_GLOB_COMPLEXITY',
    });
  }
  assert.throws(() => glob.sync('a'.repeat(4097)), {
    code: 'ERR_BUILD_GLOB_COMPLEXITY',
  });
  for (const pattern of [
    '{'.repeat(256) + 'x,y' + '}'.repeat(256),
    '{)'.repeat(256) + 'x,y' + '}'.repeat(256),
    '!'.repeat(10) + '('.repeat(256) + 'x' + ')'.repeat(256),
  ]) {
    assert.throws(() => glob.sync(pattern), {
      code: 'ERR_BUILD_GLOB_COMPLEXITY',
    });
  }
  assert.throws(() => glob.sync(Array(257).fill('*.js')), {
    code: 'ERR_BUILD_GLOB_COMPLEXITY',
  });
});

await test('unexpected upstream API changes fail explicitly', () => {
  assert.throws(
    () => glob.sync('*.js', { absolute: true }),
    /Unsupported build glob option/,
  );
});

await test('Vite watcher treats brace patterns as literal paths without calling its embedded parser', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solytes-watch-'));
  let server;
  try {
    server = await createServer({
      configFile: false,
      root: directory,
      publicDir: false,
      server: { middlewareMode: true, hmr: false },
      logLevel: 'silent',
    });
    assert.equal(server.watcher.options.disableGlobbing, true);
    const pattern = '{'.repeat(4000) + 'a,b' + '}'.repeat(4000);
    const helpers = server.watcher._getWatchHelpers(pattern);
    assert.equal(helpers.hasGlob, false);
    assert.deepEqual(helpers.dirParts, []);
  } finally {
    await server?.close();
    await rm(directory, { recursive: true, force: true });
  }
});

await test('dynamic import discovery preserves extensions, nested paths, exclusions and file-only matching', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solytes-glob-'));
  try {
    await mkdir(path.join(directory, 'modules', 'nested'), { recursive: true });
    await mkdir(path.join(directory, 'modules', 'directory.js'));
    for (const file of [
      'modules/one.js',
      'modules/two.ts',
      'modules/nested/three.js',
      'modules/.hidden.js',
    ]) {
      await writeFile(path.join(directory, file), 'export default 1;');
    }
    assert.deepEqual(
      glob
        .sync(['modules/**/*.{js,ts}', '!modules/two.ts'], { cwd: directory })
        .sort(),
      ['modules/nested/three.js', 'modules/one.js'],
    );
    const expression = 'import(`./modules/${name}`)';
    const node = parse(expression, { ecmaVersion: 'latest' }).body[0]
      .expression;
    const result = await globFiles({
      importeeNode: node.source,
      importExpression: expression,
      importer: path.join(directory, 'entry.js'),
      resolve: { tryResolve: async () => undefined },
      extensions: ['.js', '.ts'],
    });
    assert.deepEqual(result.files.sort(), [
      './modules/nested/three.js',
      './modules/one.js',
      './modules/two.ts',
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
