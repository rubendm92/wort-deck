import type { Noun } from './noun.js';

export interface NounsRepository {
  findAll(): Promise<Noun[]>;
  upsert(nouns: Noun[]): Promise<void>;
}
