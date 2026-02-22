import type { Noun } from './noun.js';

export interface NounsRepository {
  findAll(): Promise<Noun[]>;
  save(nouns: Noun[]): Promise<void>;
}
