export type Article = 'der' | 'die' | 'das';

export interface Noun {
  singular: string;
  article: Article;
  plural: string;
  tags: string[];
}

export const words: Noun[] = [
  {
    singular: 'Aktivität',
    article: 'die',
    plural: 'Aktivitäten',
    tags: ['Aktivität'],
  },
  { singular: 'Übung', article: 'die', plural: 'Übungen', tags: ['Aktivität'] },
  { singular: 'Spiel', article: 'das', plural: 'Spiele', tags: ['Aktivität'] },
  {
    singular: 'Landkarte',
    article: 'die',
    plural: 'Landkarten',
    tags: ['Geografie'],
  },
  {
    singular: 'Kontinent',
    article: 'das',
    plural: 'Kontinente',
    tags: ['Geografie'],
  },
  {
    singular: 'Land',
    article: 'das',
    plural: 'Länder',
    tags: ['Geografie'],
  },
  {
    singular: 'Stadt',
    article: 'die',
    plural: 'Städte',
    tags: ['Geografie', 'Stadt'],
  },
  {
    singular: 'Haus',
    article: 'das',
    plural: 'Häuser',
    tags: ['Haus'],
  },
  { singular: 'Tür', article: 'die', plural: 'Türen', tags: ['Haus'] },
  { singular: 'Tor', article: 'das', plural: 'Tore', tags: ['Stadt'] },
  {
    singular: 'Torte',
    article: 'die',
    plural: 'Torten',
    tags: ['Lebensmittel'],
  },
  { singular: 'Stadion', article: 'das', plural: 'Stadien', tags: ['Stadt'] },
  { singular: 'Nummer', article: 'die', plural: 'Nummern', tags: ['Adresse'] },
  { singular: 'Zahl', article: 'die', plural: 'Zahlen', tags: [] },
  {
    singular: 'Postleitzahl',
    article: 'die',
    plural: 'Postleitzahlen',
    tags: ['Adresse'],
  },
  {
    singular: 'Handynummer',
    article: 'die',
    plural: 'Handynummern',
    tags: ['Adresse'],
  },
  {
    singular: 'Telephon',
    article: 'das',
    plural: 'Telephone',
    tags: ['Adresse'],
  },
  {
    singular: 'Bürgermeister',
    article: 'der',
    plural: 'Bürgermeister',
    tags: ['Stadt'],
  },
  {
    singular: 'Bierfass',
    article: 'das',
    plural: 'Bierfässer',
    tags: ['Lebensmittel'],
  },
  { singular: 'Buchstabe', article: 'der', plural: 'Buchstaben', tags: [] },
  { singular: 'Hausaufgabe', article: 'die', plural: 'Hausaufgaben', tags: [] },
  { singular: 'Name', article: 'der', plural: 'Namen', tags: ['Familie'] },
  {
    singular: 'Vorname',
    article: 'der',
    plural: 'Vornamen',
    tags: ['Familie'],
  },
  {
    singular: 'Familienname',
    article: 'der',
    plural: 'Familienname',
    tags: ['Familie'],
  },
  {
    singular: 'Nachname',
    article: 'der',
    plural: 'Nachnamen',
    tags: ['Familie'],
  },
  {
    singular: 'Familie',
    article: 'die',
    plural: 'Familien',
    tags: ['Familie'],
  },
  {
    singular: 'Apfel',
    article: 'der',
    plural: 'Äpfel',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Banane',
    article: 'die',
    plural: 'Bananen',
    tags: ['Lebensmittel'],
  },
  { singular: 'Brot', article: 'das', plural: 'Brote', tags: ['Lebensmittel'] },
  {
    singular: 'Kaffee',
    article: 'der',
    plural: 'Kaffees',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Milch',
    article: 'die',
    plural: 'Milch',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Wasser',
    article: 'das',
    plural: 'Wasser',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Lebensmittel',
    article: 'das',
    plural: 'Lebensmittel',
    tags: ['Lebensmittel'],
  },
  { singular: 'Tisch', article: 'der', plural: 'Tische', tags: ['Objekt'] },
  { singular: 'Lampe', article: 'die', plural: 'Lampen', tags: ['Objekt'] },
  { singular: 'Buch', article: 'das', plural: 'Bücher', tags: ['Objekt'] },
  { singular: 'Stuhl', article: 'der', plural: 'Stühle', tags: ['Objekt'] },
  { singular: 'Morgen', article: 'der', plural: 'Morgen', tags: ['Zeit'] },
  { singular: 'Tag', article: 'der', plural: 'Tage', tags: ['Zeit'] },
  { singular: 'Abend', article: 'der', plural: 'Abende', tags: ['Zeit'] },
  { singular: 'Nacht', article: 'die', plural: 'Nächte', tags: ['Zeit'] },
  { singular: 'Sprache', article: 'die', plural: 'Sprachen', tags: [] },
  {
    singular: 'Wohnort',
    article: 'der',
    plural: 'Wohnorte',
    tags: ['Adresse'],
  },
  { singular: 'Norden', article: 'der', plural: 'Norden', tags: ['Geografie'] },
  { singular: 'Süden', article: 'der', plural: 'Süden', tags: ['Geografie'] },
  { singular: 'Westen', article: 'der', plural: 'Westen', tags: ['Geografie'] },
  { singular: 'Osten', article: 'der', plural: 'Osten', tags: ['Geografie'] },
  {
    singular: 'Nordosten',
    article: 'der',
    plural: 'Nordosten',
    tags: ['Geografie'],
  },
  {
    singular: 'Südosten',
    article: 'der',
    plural: 'Südosten',
    tags: ['Geografie'],
  },
  {
    singular: 'Nordwesten',
    article: 'der',
    plural: 'Nordwesten',
    tags: ['Geografie'],
  },
  {
    singular: 'Südwesten',
    article: 'der',
    plural: 'Südwesten',
    tags: ['Geografie'],
  },
  {
    singular: 'Zentrum',
    article: 'das',
    plural: 'Zentren',
    tags: ['Geografie'],
  },
  {
    singular: 'Jahr',
    article: 'das',
    plural: 'Jahre',
    tags: ['Kalender', 'Zeit'],
  },
  {
    singular: 'Adresse',
    article: 'die',
    plural: 'Adressen',
    tags: ['Adresse'],
  },
  {
    singular: 'E-Mail-Adresse',
    article: 'die',
    plural: 'Adressen',
    tags: ['Adresse'],
  },
  {
    singular: 'Nachbar',
    article: 'der',
    plural: 'Nachbarn',
    tags: ['Adresse'],
  },
  {
    singular: 'Nachbarin',
    article: 'die',
    plural: 'Nachbarinnen',
    tags: ['Adresse'],
  },
  { singular: 'Beruf', article: 'der', plural: 'Berufe', tags: ['Beruf'] },
  {
    singular: 'Krankenpfleger',
    article: 'der',
    plural: 'Krankenpfleger',
    tags: ['Beruf'],
  },
  {
    singular: 'Krankenschwester',
    article: 'die',
    plural: 'Krankenschwestern',
    tags: ['Beruf'],
  },
  {
    singular: 'Pflegekraft',
    article: 'die',
    plural: 'Pflegekräfte',
    tags: ['Beruf'],
  },
  {
    singular: 'Verkäufer',
    article: 'der',
    plural: 'Verkäufer',
    tags: ['Beruf'],
  },
  {
    singular: 'Verkäuferin',
    article: 'die',
    plural: 'Verkäuferinnen',
    tags: ['Beruf'],
  },

  {
    singular: 'Informatiker',
    article: 'der',
    plural: 'Informatiker',
    tags: ['Beruf'],
  },
  {
    singular: 'Informatikerin',
    article: 'die',
    plural: 'Informatikerinnen',
    tags: ['Beruf'],
  },
  { singular: 'Lehrer', article: 'der', plural: 'Lehrer', tags: ['Beruf'] },
  {
    singular: 'Lehrerin',
    article: 'die',
    plural: 'Lehrerinnen',
    tags: ['Beruf'],
  },
  { singular: 'Friseur', article: 'der', plural: 'Friseure', tags: ['Beruf'] },
  {
    singular: 'Friseurin',
    article: 'die',
    plural: 'Friseurinnen',
    tags: ['Beruf'],
  },
  {
    singular: 'Architekt',
    article: 'der',
    plural: 'Architekten',
    tags: ['Beruf'],
  },
  {
    singular: 'Architektin',
    article: 'die',
    plural: 'Architektinnen',
    tags: ['Beruf'],
  },
  {
    singular: 'Ingenieur',
    article: 'der',
    plural: 'Ingenieure',
    tags: ['Beruf'],
  },
  {
    singular: 'Ingenieurin',
    article: 'die',
    plural: 'Ingenieurinnen',
    tags: ['Beruf'],
  },
  {
    singular: 'Hobby',
    article: 'das',
    plural: 'Hobbys',
    tags: ['Aktivität', 'Hobby'],
  },
  {
    singular: 'Woche',
    article: 'die',
    plural: 'Wochen',
    tags: ['Kalender', 'Zeit'],
  },
  {
    singular: 'Wochenende',
    article: 'das',
    plural: 'Wochenenden',
    tags: ['Kalender', 'Zeit'],
  },
  { singular: 'Ende', article: 'das', plural: 'Enden', tags: [] },
  { singular: 'Moment', article: 'der', plural: 'Momente', tags: ['Zeit'] },
  { singular: 'Montag', article: 'der', plural: 'Montage', tags: ['Kalender'] },
  {
    singular: 'Dienstag',
    article: 'der',
    plural: 'Dienstage',
    tags: ['Kalender'],
  },
  {
    singular: 'Mittwoch',
    article: 'der',
    plural: 'Mittwoche',
    tags: ['Kalender'],
  },
  {
    singular: 'Donnerstag',
    article: 'der',
    plural: 'Donnerstage',
    tags: ['Kalender'],
  },
  {
    singular: 'Freitag',
    article: 'der',
    plural: 'Freitage',
    tags: ['Kalender'],
  },
  {
    singular: 'Samstag',
    article: 'der',
    plural: 'Samstage',
    tags: ['Kalender'],
  },
  {
    singular: 'Sonntag',
    article: 'der',
    plural: 'Sonntage',
    tags: ['Kalender'],
  },
  { singular: 'Januar', article: 'der', plural: 'Januare', tags: ['Kalender'] },
  {
    singular: 'Februar',
    article: 'der',
    plural: 'Februare',
    tags: ['Kalender'],
  },
  { singular: 'März', article: 'der', plural: 'Märze', tags: ['Kalender'] },
  { singular: 'April', article: 'der', plural: 'Aprile', tags: ['Kalender'] },
  { singular: 'Mai', article: 'der', plural: 'Maie', tags: ['Kalender'] },
  { singular: 'Juni', article: 'der', plural: 'Junis', tags: ['Kalender'] },
  { singular: 'Juli', article: 'der', plural: 'Julis', tags: ['Kalender'] },
  { singular: 'August', article: 'der', plural: 'Auguste', tags: ['Kalender'] },
  {
    singular: 'September',
    article: 'der',
    plural: 'September',
    tags: ['Kalender'],
  },
  {
    singular: 'Oktober',
    article: 'der',
    plural: 'Oktobers',
    tags: ['Kalender'],
  },
  {
    singular: 'November',
    article: 'der',
    plural: 'November',
    tags: ['Kalender'],
  },
  {
    singular: 'Dezember',
    article: 'der',
    plural: 'Dezember',
    tags: ['Kalender'],
  },
  {
    singular: 'Frühling',
    article: 'der',
    plural: 'Frühlinge',
    tags: ['Kalender'],
  },
  { singular: 'Sommer', article: 'der', plural: 'Sommer', tags: ['Kalender'] },
  { singular: 'Herbst', article: 'der', plural: 'Herbste', tags: ['Kalender'] },
  { singular: 'Winter', article: 'der', plural: 'Winter', tags: ['Kalender'] },
  {
    singular: 'Kalender',
    article: 'der',
    plural: 'Kalender',
    tags: ['Kalender'],
  },
  {
    singular: 'Handtuch',
    article: 'das',
    plural: 'Handtücher',
    tags: ['Haus'],
  },
  { singular: 'Flasche', article: 'die', plural: 'Flaschen', tags: ['Objekt'] },
  { singular: 'Objekt', article: 'das', plural: 'Objekte', tags: ['Objekt'] },
  {
    singular: 'Koffer',
    article: 'der',
    plural: 'Koffer',
    tags: ['Objekt', 'Reisen'],
  },
  {
    singular: 'Würstchen',
    article: 'das',
    plural: 'Würstchen',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Würstel',
    article: 'das',
    plural: 'Würstel',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Kindergarten',
    article: 'der',
    plural: 'Kindergärten',
    tags: [],
  },
  {
    singular: 'Butterbrot',
    article: 'das',
    plural: 'Butterbrote',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Kranke',
    article: 'der',
    plural: 'Kranken',
    tags: ['Gesundheit'],
  },
  {
    singular: 'Autobahn',
    article: 'die',
    plural: 'Autobahnen',
    tags: ['Stadt'],
  },
  {
    singular: 'Nudel',
    article: 'die',
    plural: 'Nudeln',
    tags: ['Lebensmittel'],
  },
  {
    singular: 'Lernen',
    article: 'das',
    plural: 'Lernen',
    tags: ['Lernen'],
  },
  {
    singular: 'Universität',
    article: 'die',
    plural: 'Universitäten',
    tags: ['Stadt', 'Lernen'],
  },
  {
    singular: 'Universität',
    article: 'die',
    plural: 'Universitäten',
    tags: ['Stadt', 'Lernen'],
  },
  {
    singular: 'Schule',
    article: 'die',
    plural: 'Schulen',
    tags: ['Stadt', 'Lernen'],
  },
  {
    singular: 'Sprachschule',
    article: 'die',
    plural: 'Sprachschulen',
    tags: ['Stadt', 'Lernen'],
  },
  {
    singular: 'Kino',
    article: 'das',
    plural: 'Kinos',
    tags: ['Stadt'],
  },
  {
    singular: 'Disko',
    article: 'die',
    plural: 'Diskos',
    tags: ['Stadt'],
  },
  {
    singular: 'Restaurant',
    article: 'die',
    plural: 'Restaurants',
    tags: ['Stadt'],
  },
  {
    singular: 'Fotografie',
    article: 'die',
    plural: 'Fotografien',
    tags: ['Hobby'],
  },
  {
    singular: 'Sänger',
    article: 'der',
    plural: 'Sänger',
    tags: ['Beruf'],
  },
  {
    singular: 'Sängerin',
    article: 'die',
    plural: 'Sängerinnen',
    tags: ['Beruf'],
  },
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

export async function getWords(options: GetWordsOptions): Promise<Noun[]> {
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
