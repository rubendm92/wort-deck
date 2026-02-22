import type { Noun, NounChange } from './noun.js';

export interface NounsRepository {
  findAll(): Promise<Noun[]>;
  saveChanges(changes: NounChange[]): Promise<void>;
}
