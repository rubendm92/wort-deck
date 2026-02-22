import { type NounChange } from '../domain/nouns.ts';

export async function saveChanges(changes: NounChange[]): Promise<void> {
  const response = await fetch('/api/nouns', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ changes }),
  });

  if (!response.ok) {
    throw new Error('Failed to save nouns');
  }
}
