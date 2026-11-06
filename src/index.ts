export function joinUrlPath(...segments: string[]): string {
  if (!segments.every((value) => typeof value === 'string'))
    throw new TypeError('Path segments must be strings');
  if (segments.some((value) => /[?#\x00-\x1f\x7f]/.test(value)))
    throw new RangeError('Path-only segments cannot contain query, fragment or control characters');
  const joined = segments.join('/'),
    absolute = joined.startsWith('/'),
    trailing = /\/$/.test(joined),
    parts: string[] = [];
  for (const part of joined.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') {
      if (parts.length) parts.pop();
      else if (!absolute) parts.push('..');
    } else parts.push(part);
  }
  let result = (absolute ? '/' : '') + parts.join('/');
  if (trailing && result && !result.endsWith('/')) result += '/';
  return result || (absolute ? '/' : '.');
}
