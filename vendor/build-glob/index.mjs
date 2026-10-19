import { globSync } from 'tinyglobby';

function validate(pattern) {
  if (typeof pattern !== 'string')
    throw new TypeError('Build glob must be a string');
  const stack = [];
  let inClass = false;
  if (pattern.length > 4096) throw complexityError();
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === '\\') {
      i++;
      continue;
    }
    if (char === '[') inClass = true;
    if (char === ']') inClass = false;
    if (inClass) continue;
    if (char === '{' || char === '(') {
      stack.push(char);
      if (stack.length > 128) throw complexityError();
    } else if (char === '}' || char === ')') {
      if (
        (char === '}' && stack.at(-1) === '{') ||
        (char === ')' && stack.at(-1) === '(')
      )
        stack.pop();
    }
  }
}

function complexityError() {
  const error = new Error(
    'Build glob exceeds the supported length or nesting limit',
  );
  error.code = 'ERR_BUILD_GLOB_COMPLEXITY';
  return error;
}

/** @param {string | string[]} patterns @param {{ cwd?: string }} options */
export function sync(patterns, options = {}) {
  // This is intentionally scoped to the sole upstream call: sync(patterns, { cwd }).
  // Fail closed if a future plugin release needs more of the fast-glob API.
  for (const key of Object.keys(options)) {
    if (key !== 'cwd')
      throw new TypeError(`Unsupported build glob option: ${key}`);
  }
  const list = typeof patterns === 'string' ? [patterns] : patterns;
  if (!Array.isArray(list))
    throw new TypeError('Build glob expects a string or array');
  if (list.length > 256) throw complexityError();
  for (const pattern of list) validate(pattern);
  return globSync(list, { cwd: options.cwd, expandDirectories: false });
}

export default Object.freeze({ sync });
