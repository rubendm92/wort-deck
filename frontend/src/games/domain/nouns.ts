export type Article = 'der' | 'die' | 'das';

export interface Noun {
  singular: string;
  article: Article;
  plural: string;
  tags: string[];
}

export interface NounChange {
  original: string; // original singular, used as identifier
  noun: Noun;
}
