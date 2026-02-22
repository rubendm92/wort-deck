export type Article = 'der' | 'die' | 'das';

export interface Noun {
  singular: string;
  article: Article;
  plural: string;
  tags: string[];
}

export interface GetNounsOptions {
  count?: number;
  tags?: string[];
  shuffle?: boolean;
}

export interface NounChange {
  original: string; // original singular, used as identifier
  noun: Noun;
}
