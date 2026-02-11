export async function loadAllTags(): Promise<string[]> {
  try {
    const response = await fetch('/api/nouns/tags');

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    const data = await response.json();
    return data.tags;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An error occurred');
  }
}
