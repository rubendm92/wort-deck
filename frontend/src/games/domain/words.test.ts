import { describe, expect, it } from 'vitest';
import { getTags } from './words.ts';

describe('getTags', () => {
  it('returns an array of unique tags', () => {
    const tags = getTags();

    expect(Array.isArray(tags)).toBe(true);
    expect(tags.length).toBe(new Set(tags).size);
  });

  it('returns tags sorted alphabetically', () => {
    const tags = getTags();
    const sorted = [...tags].sort();

    expect(tags).toEqual(sorted);
  });

  it('includes Beruf tag', () => {
    const tags = getTags();

    expect(tags).toContain('Beruf');
  });
});
