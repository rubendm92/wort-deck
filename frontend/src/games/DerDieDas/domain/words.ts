export type Article = 'der' | 'die' | 'das';

export interface Word {
  word: string;
  article: Article;
  plural: string;
  tags: string[];
}

const words: Word[] = [
  { word: 'Apfel', article: 'der', plural: 'Äpfel', tags: [] },
  { word: 'Banane', article: 'die', plural: 'Bananen', tags: [] },
  { word: 'Brot', article: 'das', plural: 'Brote', tags: [] },
  { word: 'Kaffee', article: 'der', plural: 'Kaffees', tags: [] },
  { word: 'Milch', article: 'die', plural: 'Milch', tags: [] },
  { word: 'Wasser', article: 'das', plural: 'Wasser', tags: [] },
  { word: 'Tisch', article: 'der', plural: 'Tische', tags: [] },
  { word: 'Lampe', article: 'die', plural: 'Lampen', tags: [] },
  { word: 'Buch', article: 'das', plural: 'Bücher', tags: [] },
  { word: 'Stuhl', article: 'der', plural: 'Stühle', tags: [] },
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
