import { type Noun } from '../domain/nouns.ts';

export async function upsertNouns(nouns: Noun[]): Promise<void> {
  const response = await fetch('/api/nouns', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nouns }),
  });

  if (!response.ok) {
    throw new Error('Failed to save nouns');
  }
}
