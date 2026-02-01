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
  {
    word: 'Landkarte',
    article: 'die',
    plural: 'Landkarten',
    tags: ['Geografie'],
  },
  {
    word: 'Kontinent',
    article: 'das',
    plural: 'Kontinente',
    tags: ['Geografie'],
  },
  {
    word: 'Land',
    article: 'das',
    plural: 'Länder',
    tags: ['Geografie'],
  },
  {
    word: 'Stadt',
    article: 'die',
    plural: 'Städte',
    tags: ['Geografie', 'Stadt'],
  },
  {
    word: 'Haus',
    article: 'das',
    plural: 'Häuser',
    tags: ['Haus'],
  },
  { word: 'Tür', article: 'die', plural: 'Türen', tags: ['Haus'] },
  { word: 'Tor', article: 'das', plural: 'Tore', tags: ['Stadt'] },
  { word: 'Torte', article: 'die', plural: 'Torten', tags: ['Lebensmittel'] },
  { word: 'Stadion', article: 'das', plural: 'Stadien', tags: [] },
  { word: 'Nummer', article: 'die', plural: 'Nummern', tags: [] },
  { word: 'Zahl', article: 'die', plural: 'Zahlen', tags: [] },
  { word: 'Handynummer', article: 'die', plural: 'Handynummern', tags: [] },
  {
    word: 'Bürgermeister',
    article: 'der',
    plural: 'Bürgermeister',
    tags: ['Stadt'],
  },
  {
    word: 'Bierfass',
    article: 'das',
    plural: 'Bierfässer',
    tags: ['Lebensmittel'],
  },
  { word: 'Buchstabe', article: 'der', plural: 'Buchstaben', tags: [] },
  { word: 'Hausaufgabe', article: 'die', plural: 'Hausaufgaben', tags: [] },
  { word: 'Name', article: 'der', plural: 'Namen', tags: ['Familie'] },
  { word: 'Vorname', article: 'der', plural: 'Vornamen', tags: ['Familie'] },
  {
    word: 'Familienname',
    article: 'der',
    plural: 'Familienname',
    tags: ['Familie'],
  },
  { word: 'Nachname', article: 'der', plural: 'Nachnamen', tags: ['Familie'] },
  { word: 'Familie', article: 'die', plural: 'Familien', tags: ['Familie'] },
  { word: 'Apfel', article: 'der', plural: 'Äpfel', tags: ['Lebensmittel'] },
  { word: 'Banane', article: 'die', plural: 'Bananen', tags: ['Lebensmittel'] },
  { word: 'Brot', article: 'das', plural: 'Brote', tags: ['Lebensmittel'] },
  { word: 'Kaffee', article: 'der', plural: 'Kaffees', tags: ['Lebensmittel'] },
  { word: 'Milch', article: 'die', plural: 'Milch', tags: ['Lebensmittel'] },
  { word: 'Wasser', article: 'das', plural: 'Wasser', tags: ['Lebensmittel'] },
  {
    word: 'Lebensmittel',
    article: 'das',
    plural: 'Lebensmittel',
    tags: ['Lebensmittel'],
  },
  { word: 'Tisch', article: 'der', plural: 'Tische', tags: [] },
  { word: 'Lampe', article: 'die', plural: 'Lampen', tags: [] },
  { word: 'Buch', article: 'das', plural: 'Bücher', tags: [] },
  { word: 'Stuhl', article: 'der', plural: 'Stühle', tags: [] },
  { word: 'Morgen', article: 'der', plural: 'Morgen', tags: ['Zeit'] },
  { word: 'Tag', article: 'der', plural: 'Tage', tags: ['Zeit'] },
  { word: 'Abend', article: 'der', plural: 'Abende', tags: ['Zeit'] },
  { word: 'Nacht', article: 'die', plural: 'Nächte', tags: ['Zeit'] },
  { word: 'Sprache', article: 'die', plural: 'Sprachen', tags: [] },
  { word: 'Wohnort', article: 'der', plural: 'Wohnorte', tags: [] },
  { word: 'Norden', article: 'der', plural: 'Norden', tags: ['Geografie'] },
  { word: 'Süden', article: 'der', plural: 'Süden', tags: ['Geografie'] },
  { word: 'Westen', article: 'der', plural: 'Westen', tags: ['Geografie'] },
  { word: 'Osten', article: 'der', plural: 'Osten', tags: ['Geografie'] },
  {
    word: 'Nordosten',
    article: 'der',
    plural: 'Nordosten',
    tags: ['Geografie'],
  },
  { word: 'Südosten', article: 'der', plural: 'Südosten', tags: ['Geografie'] },
  {
    word: 'Nordwesten',
    article: 'der',
    plural: 'Nordwesten',
    tags: ['Geografie'],
  },
  {
    word: 'Südwesten',
    article: 'der',
    plural: 'Südwesten',
    tags: ['Geografie'],
  },
  {
    word: 'Zentrum',
    article: 'das',
    plural: 'Zentren',
    tags: ['Geografie'],
  },
  { word: 'Jahr', article: 'das', plural: 'Jahre', tags: ['Kalender', 'Zeit'] },
  { word: 'Adresse', article: 'die', plural: 'Adressen', tags: [] },
  { word: 'Nachbar', article: 'der', plural: 'Nachbarn', tags: [] },
  { word: 'Nachbarin', article: 'die', plural: 'Nachbarinnen', tags: [] },
  { word: 'Beruf', article: 'der', plural: 'Berufe', tags: ['Beruf'] },
  {
    word: 'Krankenpfleger',
    article: 'der',
    plural: 'Krankenpfleger',
    tags: ['Beruf'],
  },
  {
    word: 'Krankenschwester',
    article: 'die',
    plural: 'Krankenschwestern',
    tags: ['Beruf'],
  },
  {
    word: 'Pflegekraft',
    article: 'die',
    plural: 'Pflegekräfte',
    tags: ['Beruf'],
  },
  { word: 'Verkäufer', article: 'der', plural: 'Verkäufer', tags: ['Beruf'] },
  {
    word: 'Verkäuferin',
    article: 'die',
    plural: 'Verkäuferinnen',
    tags: ['Beruf'],
  },

  {
    word: 'Informatiker',
    article: 'der',
    plural: 'Informatiker',
    tags: ['Beruf'],
  },
  {
    word: 'Informatikerin',
    article: 'die',
    plural: 'Informatikerinnen',
    tags: ['Beruf'],
  },
  { word: 'Lehrer', article: 'der', plural: 'Lehrer', tags: ['Beruf'] },
  { word: 'Lehrerin', article: 'die', plural: 'Lehrerinnen', tags: ['Beruf'] },
  { word: 'Friseur', article: 'der', plural: 'Friseure', tags: ['Beruf'] },
  {
    word: 'Friseurin',
    article: 'die',
    plural: 'Friseurinnen',
    tags: ['Beruf'],
  },
  { word: 'Architekt', article: 'der', plural: 'Architekten', tags: ['Beruf'] },
  {
    word: 'Architektin',
    article: 'die',
    plural: 'Architektinnen',
    tags: ['Beruf'],
  },
  { word: 'Ingenieur', article: 'der', plural: 'Ingenieure', tags: ['Beruf'] },
  {
    word: 'Ingenieurin',
    article: 'die',
    plural: 'Ingenieurinnen',
    tags: ['Beruf'],
  },
  { word: 'Hobby', article: 'das', plural: 'Hobbys', tags: [] },
  {
    word: 'Woche',
    article: 'die',
    plural: 'Wochen',
    tags: ['Kalender', 'Zeit'],
  },
  {
    word: 'Wochenende',
    article: 'das',
    plural: 'Wochenenden',
    tags: ['Kalender', 'Zeit'],
  },
  { word: 'Ende', article: 'das', plural: 'Enden', tags: [] },
  { word: 'Moment', article: 'der', plural: 'Momente', tags: ['Zeit'] },
  { word: 'Montag', article: 'der', plural: 'Montage', tags: ['Kalender'] },
  { word: 'Dienstag', article: 'der', plural: 'Dienstage', tags: ['Kalender'] },
  { word: 'Mittwoch', article: 'der', plural: 'Mittwoche', tags: ['Kalender'] },
  {
    word: 'Donnerstag',
    article: 'der',
    plural: 'Donnerstage',
    tags: ['Kalender'],
  },
  { word: 'Freitag', article: 'der', plural: 'Freitage', tags: ['Kalender'] },
  { word: 'Samstag', article: 'der', plural: 'Samstage', tags: ['Kalender'] },
  { word: 'Sonntag', article: 'der', plural: 'Sonntage', tags: ['Kalender'] },
  { word: 'Januar', article: 'der', plural: 'Januare', tags: ['Kalender'] },
  { word: 'Februar', article: 'der', plural: 'Februare', tags: ['Kalender'] },
  { word: 'März', article: 'der', plural: 'Märze', tags: ['Kalender'] },
  { word: 'April', article: 'der', plural: 'Aprile', tags: ['Kalender'] },
  { word: 'Mai', article: 'der', plural: 'Maie', tags: ['Kalender'] },
  { word: 'Juni', article: 'der', plural: 'Junis', tags: ['Kalender'] },
  { word: 'Juli', article: 'der', plural: 'Julis', tags: ['Kalender'] },
  { word: 'August', article: 'der', plural: 'Auguste', tags: ['Kalender'] },
  {
    word: 'September',
    article: 'der',
    plural: 'September',
    tags: ['Kalender'],
  },
  { word: 'Oktober', article: 'der', plural: 'Oktobers', tags: ['Kalender'] },
  { word: 'November', article: 'der', plural: 'November', tags: ['Kalender'] },
  { word: 'Dezember', article: 'der', plural: 'Dezember', tags: ['Kalender'] },
  { word: 'Frühling', article: 'der', plural: 'Frühlinge', tags: ['Kalender'] },
  { word: 'Sommer', article: 'der', plural: 'Sommer', tags: ['Kalender'] },
  { word: 'Herbst', article: 'der', plural: 'Herbste', tags: ['Kalender'] },
  { word: 'Winter', article: 'der', plural: 'Winter', tags: ['Kalender'] },
  { word: 'Kalender', article: 'der', plural: 'Kalender', tags: ['Kalender'] },
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTags(): string[] {
  const tagSet = new Set<string>();
  for (const word of words) {
    for (const tag of word.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export interface GetWordsOptions {
  count: number;
  tags?: string[];
}

export async function getWords(options: GetWordsOptions): Promise<Word[]> {
  const { count, tags } = options;
  let filtered = words;

  if (tags && tags.length > 0) {
    filtered = words.filter(
      (word) =>
        word.tags.length === 0 || word.tags.some((tag) => tags.includes(tag))
    );
  }

  return shuffle(filtered).slice(0, count);
}
