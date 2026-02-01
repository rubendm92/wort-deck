export type Article = 'der' | 'die' | 'das';

export interface Word {
  word: string;
  article: Article;
}

const words: Word[] = [
  { word: 'Apfel', article: 'der' },
  { word: 'Banane', article: 'die' },
  { word: 'Brot', article: 'das' },
  { word: 'Kaffee', article: 'der' },
  { word: 'Milch', article: 'die' },
  { word: 'Wasser', article: 'das' },
  { word: 'Tisch', article: 'der' },
  { word: 'Lampe', article: 'die' },
  { word: 'Buch', article: 'das' },
  { word: 'Stuhl', article: 'der' },
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getWords(): Promise<Word[]> {
  return shuffle(words);
}
