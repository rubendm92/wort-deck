export type Article = 'der' | 'die' | 'das'

export interface Word {
  word: string
  article: Article
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
]

export async function getWords(): Promise<Word[]> {
  return words
}
