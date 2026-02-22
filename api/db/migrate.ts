import { db } from './client.js';
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
  console.log('Migration complete!');
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
