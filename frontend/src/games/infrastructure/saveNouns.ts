import { type Noun } from '../domain/nouns.ts';

export async function saveNouns(nouns: Noun[]): Promise<void> {
  try {
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
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An error occurred');
  }
}
