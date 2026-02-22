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

  async upsert(nouns: Noun[]): Promise<void> {
    await db.batch(
      nouns.map((noun) => ({
        sql: `INSERT INTO nouns (singular, article, plural, tags)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(singular) DO UPDATE SET
                article = excluded.article,
                plural = excluded.plural,
                tags = excluded.tags,
                updated_at = CURRENT_TIMESTAMP`,
        args: [noun.singular, noun.article, noun.plural, JSON.stringify(noun.tags)],
      })),
    );
  }
}
