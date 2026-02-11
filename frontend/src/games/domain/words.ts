export type Article = 'der' | 'die' | 'das';

export interface Noun {
  singular: string;
  article: Article;
  plural: string;
  tags: string[];
}
