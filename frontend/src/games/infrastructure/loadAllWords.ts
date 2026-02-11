export async function loadAllWords() {
  try {
    const response = await fetch('/api/nouns/all');
    if (!response.ok) {
      throw new Error('Failed to fetch words');
    }
    const data = await response.json();
    return data.words;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An error occurred');
  }
}
