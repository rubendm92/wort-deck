export async function loadAllWords() {
  try {
    const response = await fetch('/api/words');
    if (!response.ok) {
      throw new Error('Failed to fetch words');
    }
    const data = await response.json();
    return data.words;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An error occurred');
  }
}
