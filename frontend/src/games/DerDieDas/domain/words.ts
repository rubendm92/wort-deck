export type Article = 'der' | 'die' | 'das';

export interface Word {
  word: string;
  article: Article;
  plural: string;
  tags: string[];
}

const words: Word[] = [
  { word: 'Übung', article: 'die', plural: 'Übungen', tags: [] },
  { word: 'Spiel', article: 'das', plural: 'Spiele', tags: [] },
  { word: 'Landkarte', article: 'die', plural: 'Landkarten', tags: [] },
  { word: 'Tür', article: 'die', plural: 'Türen', tags: [] },
  { word: 'Tor', article: 'das', plural: 'Tore', tags: [] },
  { word: 'Torte', article: 'die', plural: 'Torten', tags: [] },
  { word: 'Stadion', article: 'das', plural: 'Stadien', tags: [] },
  { word: 'Nummer', article: 'die', plural: 'Nummern', tags: [] },
  { word: 'Zahl', article: 'die', plural: 'Zahlen', tags: [] },
  { word: 'Handynummer', article: 'die', plural: 'Handynummern', tags: [] },
  { word: 'Bürgermeister', article: 'der', plural: 'Bürgermeister', tags: [] },
  { word: 'Bierfass', article: 'das', plural: 'Bierfässer', tags: [] },
  { word: 'Buchstabe', article: 'der', plural: 'Buchstaben', tags: [] },
  { word: 'Hausaufgabe', article: 'die', plural: 'Hausaufgaben', tags: [] },
  { word: 'Name', article: 'der', plural: 'Namen', tags: [] },
  { word: 'Vorname', article: 'der', plural: 'Vornamen', tags: [] },
  { word: 'Familienname', article: 'der', plural: 'Familienname', tags: [] },
  { word: 'Nachname', article: 'der', plural: 'Nachnamen', tags: [] },
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
  { word: 'Morgen', article: 'der', plural: 'Morgen', tags: [] },
  { word: 'Tag', article: 'der', plural: 'Tage', tags: [] },
  { word: 'Abend', article: 'der', plural: 'Abende', tags: [] },
  { word: 'Nacht', article: 'die', plural: 'Nächte', tags: [] },
  { word: 'Sprache', article: 'die', plural: 'Sprachen', tags: [] },
  { word: 'Wohnort', article: 'der', plural: 'Wohnorte', tags: [] },
  { word: 'Norden', article: 'der', plural: 'Norden', tags: [] },
  { word: 'Süden', article: 'der', plural: 'Süden', tags: [] },
  { word: 'Westen', article: 'der', plural: 'Westen', tags: [] },
  { word: 'Osten', article: 'der', plural: 'Osten', tags: [] },
  { word: 'Nordosten', article: 'der', plural: 'Nordosten', tags: [] },
  { word: 'Südosten', article: 'der', plural: 'Südosten', tags: [] },
  { word: 'Nordwesten', article: 'der', plural: 'Nordwesten', tags: [] },
  { word: 'Südwesten', article: 'der', plural: 'Südwesten', tags: [] },
  { word: 'Jahr', article: 'das', plural: 'Jahre', tags: [] },
  { word: 'Adresse', article: 'die', plural: 'Adressen', tags: [] },
  { word: 'Nachbar', article: 'der', plural: 'Nachbarn', tags: [] },
  { word: 'Nachbarin', article: 'die', plural: 'Nachbarinnen', tags: [] },
  { word: 'Beruf', article: 'der', plural: 'Berufe', tags: ['beruf'] },
  {
    word: 'Krankenpfleger',
    article: 'der',
    plural: 'Krankenpfleger',
    tags: ['beruf'],
  },
  {
    word: 'Krankenschwester',
    article: 'die',
    plural: 'Krankenschwestern',
    tags: ['beruf'],
  },
  {
    word: 'Pflegekraft',
    article: 'die',
    plural: 'Pflegekräfte',
    tags: ['beruf'],
  },
  { word: 'Verkäufer', article: 'der', plural: 'Verkäufer', tags: ['beruf'] },
  {
    word: 'Verkäuferin',
    article: 'die',
    plural: 'Verkäuferinnen',
    tags: ['beruf'],
  },

  {
    word: 'Informatiker',
    article: 'der',
    plural: 'Informatiker',
    tags: ['beruf'],
  },
  {
    word: 'Informatikerin',
    article: 'die',
    plural: 'Informatikerinnen',
    tags: ['beruf'],
  },
  { word: 'Lehrer', article: 'der', plural: 'Lehrer', tags: ['beruf'] },
  { word: 'Lehrerin', article: 'die', plural: 'Lehrerinnen', tags: ['beruf'] },
  { word: 'Friseur', article: 'der', plural: 'Friseure', tags: ['beruf'] },
  {
    word: 'Friseurin',
    article: 'die',
    plural: 'Friseurinnen',
    tags: ['beruf'],
  },
  { word: 'Architekt', article: 'der', plural: 'Architekten', tags: ['beruf'] },
  {
    word: 'Architektin',
    article: 'die',
    plural: 'Architektinnen',
    tags: ['beruf'],
  },
  { word: 'Ingenieur', article: 'der', plural: 'Ingenieure', tags: ['beruf'] },
  {
    word: 'Ingenieurin',
    article: 'die',
    plural: 'Ingenieurinnen',
    tags: ['beruf'],
  },
  { word: 'Hobby', article: 'das', plural: 'Hobbys', tags: [] },
  { word: 'Woche', article: 'die', plural: 'Wochen', tags: [] },
  { word: 'Wochenende', article: 'das', plural: 'Wochenenden', tags: [] },
  { word: 'Ende', article: 'das', plural: 'Enden', tags: [] },
  { word: 'Moment', article: 'der', plural: 'Momente', tags: [] },
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getWords(count: number): Promise<Word[]> {
  return shuffle(words).slice(0, count);
}
