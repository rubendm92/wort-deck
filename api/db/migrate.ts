import { db } from './client.js';
import { nouns } from '../nouns/nouns.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  console.log('Starting migration...');

  // Read and execute schema
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  const statements = schema
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await db.execute(statement);
  }
  console.log('✓ Schema created');

  // Check if nouns already exist
  const result = await db.execute('SELECT COUNT(*) as count FROM nouns');
  const count = result.rows[0].count as number;

  if (count > 0) {
    console.log(`Database already has ${count} nouns. Skipping import.`);
    console.log('Run with --force to reimport');
    return;
  }

  // Import nouns
  console.log(`Importing ${nouns.length} nouns...`);

  for (const noun of nouns) {
    await db.execute({
      sql: 'INSERT INTO nouns (singular, article, plural, tags) VALUES (?, ?, ?, ?)',
      args: [noun.singular, noun.article, noun.plural, JSON.stringify(noun.tags)],
    });
  }

  console.log(`✓ Imported ${nouns.length} nouns`);
  console.log('Migration complete!');
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
