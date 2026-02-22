import { db } from '../db/client.js';
import type { Noun, Article } from '../domain/noun.js';
import type { NounsRepository } from '../domain/nouns-repository.js';

export class TursoNounsRepository implements NounsRepository {
  async findAll(): Promise<Noun[]> {
    const result = await db.execute('SELECT singular, article, plural, tags FROM nouns');
    return result.rows.map((row) => ({
      singular: row.singular as string,
      article: row.article as Article,
      plural: row.plural as string,
      tags: JSON.parse(row.tags as string) as string[],
    }));
  }
}
