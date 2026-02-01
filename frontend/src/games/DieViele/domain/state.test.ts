import { describe, it, expect } from 'vitest';
import {
  createInitialState,
  getCurrentWord,
  updateAnswer,
  type GameState,
} from './state';
import type { Word } from '../../DerDieDas/domain/words';

const testWords: Word[] = [
  { word: 'Apfel', article: 'der', plural: 'Äpfel', tags: [] },
  { word: 'Banane', article: 'die', plural: 'Bananen', tags: [] },
  { word: 'Brot', article: 'das', plural: 'Brote', tags: [] },
];

describe('createInitialState', () => {
  it('creates state with words at index 0 and empty answer', () => {
    const state = createInitialState(testWords);

    expect(state.words).toBe(testWords);
    expect(state.currentIndex).toBe(0);
    expect(state.answer).toBe('');
  });
});

describe('getCurrentWord', () => {
  it('returns undefined for null state', () => {
    expect(getCurrentWord(null)).toBeUndefined();
  });

  it('returns the word at current index', () => {
    const state = createInitialState(testWords);

    expect(getCurrentWord(state)).toEqual({
      word: 'Apfel',
      article: 'der',
      plural: 'Äpfel',
      tags: [],
    });
  });

  it('returns the word at updated index', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 1,
      answer: '',
    };

    expect(getCurrentWord(state)).toEqual({
      word: 'Banane',
      article: 'die',
      plural: 'Bananen',
      tags: [],
    });
  });
});

describe('updateAnswer', () => {
  it('returns null for null state', () => {
    const result = updateAnswer('die Äpfel')(null);

    expect(result).toBeNull();
  });

  it('updates the answer', () => {
    const state = createInitialState(testWords);
    const result = updateAnswer('die Äpfel')(state);

    expect(result?.answer).toBe('die Äpfel');
  });

  it('preserves other state properties', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 1,
      answer: 'old',
    };
    const result = updateAnswer('new')(state);

    expect(result?.words).toBe(testWords);
    expect(result?.currentIndex).toBe(1);
  });
});