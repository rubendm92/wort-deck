import type { Noun, GetNounsOptions } from './noun.js';

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function all(nouns: Noun[], options: GetNounsOptions = {}): Noun[] {
  const { count, tags } = options;
  let filtered = nouns;

  if (tags && tags.length > 0) {
    filtered = nouns.filter(
      (noun) =>
        noun.tags.length === 0 || noun.tags.some((tag) => tags.includes(tag))
    );
  }
  if (options.shuffle) {
    filtered = shuffle(filtered);
  } else {
    filtered = filtered.sort((a, b) => a.singular.localeCompare(b.singular));
  }
  if (options.count != null) {
    filtered = filtered.slice(0, count);
  }

  return filtered;
}

export function tags(nouns: Noun[]): string[] {
  const allNouns = all(nouns, {});
  const tagSet = new Set<string>();
  for (const noun of allNouns) {
    for (const tag of noun.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
