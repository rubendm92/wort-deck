import { describe, it, expect } from 'vitest';
import { getWords, getTags } from './words';

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

describe('getWords', () => {
  it('returns the requested number of words', async () => {
    const words = await getWords({ count: 5 });

    expect(words).toHaveLength(5);
  });

  it('returns shuffled words', async () => {
    const results = await Promise.all([
      getWords({ count: 10 }),
      getWords({ count: 10 }),
      getWords({ count: 10 }),
    ]);

    const allSame = results.every(
      (words) =>
        JSON.stringify(words.map((w) => w.word)) ===
        JSON.stringify(results[0].map((w) => w.word))
    );

    expect(allSame).toBe(false);
  });

  it('filters by tags when provided', async () => {
    const words = await getWords({ count: 50, tags: ['Beruf'] });

    const allHaveBerufTagOrNoTags = words.every(
      (word) => word.tags.length === 0 || word.tags.includes('Beruf')
    );

    expect(allHaveBerufTagOrNoTags).toBe(true);
  });

  it('includes untagged words when filtering by tags', async () => {
    const words = await getWords({ count: 50, tags: ['Beruf'] });

    const hasUntaggedWords = words.some((word) => word.tags.length === 0);

    expect(hasUntaggedWords).toBe(true);
  });

  it('returns all words when no tags filter is provided', async () => {
    const words = await getWords({ count: 100 });

    const hasBerufWords = words.some((word) => word.tags.includes('Beruf'));
    const hasUntaggedWords = words.some((word) => word.tags.length === 0);

    expect(hasBerufWords).toBe(true);
    expect(hasUntaggedWords).toBe(true);
  });
});
