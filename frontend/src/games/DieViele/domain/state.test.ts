import { describe, it, expect } from 'vitest';
import {
  createInitialState,
  getCurrentWord,
  updateAnswer,
  submitAnswer,
  nextWord,
  finishGame,
  isLastWord,
  hasSubmitted,
  isAnswerCorrect,
  getScore,
  type GameState,
} from './state';
import type { Word } from '../../DerDieDas/domain/words';

const testWords: Word[] = [
  { word: 'Apfel', article: 'der', plural: 'Äpfel', tags: [] },
  { word: 'Banane', article: 'die', plural: 'Bananen', tags: [] },
  { word: 'Brot', article: 'das', plural: 'Brote', tags: [] },
];

function createTestState(overrides: Partial<GameState> = {}): GameState {
  return {
    words: testWords,
    currentIndex: 0,
    answer: '',
    submittedAnswer: null,
    correctCount: 0,
    isFinished: false,
    ...overrides,
  };
}

describe('createInitialState', () => {
  it('creates state with words at index 0 and empty answer', () => {
    const state = createInitialState(testWords);

    expect(state.words).toBe(testWords);
    expect(state.currentIndex).toBe(0);
    expect(state.answer).toBe('');
    expect(state.submittedAnswer).toBeNull();
    expect(state.correctCount).toBe(0);
    expect(state.isFinished).toBe(false);
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
    const state = createTestState({ currentIndex: 1 });

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
    const state = createTestState({ currentIndex: 1, answer: 'old' });
    const result = updateAnswer('new')(state);

    expect(result?.words).toBe(testWords);
    expect(result?.currentIndex).toBe(1);
  });
});

describe('submitAnswer', () => {
  it('returns null state as is', () => {
    expect(submitAnswer(null)).toBeNull();
  });

  it('sets submittedAnswer to current answer', () => {
    const state = createTestState({ answer: 'Äpfel' });
    const result = submitAnswer(state);

    expect(result?.submittedAnswer).toBe('Äpfel');
  });

  it('increments correctCount when answer is correct', () => {
    const state = createTestState({ answer: 'Äpfel' });
    const result = submitAnswer(state);

    expect(result?.correctCount).toBe(1);
  });

  it('does not increment correctCount when answer is wrong', () => {
    const state = createTestState({ answer: 'Bananen' });
    const result = submitAnswer(state);

    expect(result?.correctCount).toBe(0);
  });

  it('ignores case when checking answer', () => {
    const state = createTestState({ answer: 'äpfel' });
    const result = submitAnswer(state);

    expect(result?.correctCount).toBe(1);
  });

  it('ignores leading/trailing whitespace', () => {
    const state = createTestState({ answer: '  Äpfel  ' });
    const result = submitAnswer(state);

    expect(result?.correctCount).toBe(1);
  });

  it('does not change state if already submitted', () => {
    const state = createTestState({
      answer: 'new answer',
      submittedAnswer: 'old answer',
      correctCount: 1,
    });
    const result = submitAnswer(state);

    expect(result?.submittedAnswer).toBe('old answer');
    expect(result?.correctCount).toBe(1);
  });
});

describe('nextWord', () => {
  it('returns null for null state', () => {
    expect(nextWord(null)).toBeNull();
  });

  it('increments currentIndex', () => {
    const state = createTestState();
    const result = nextWord(state);

    expect(result?.currentIndex).toBe(1);
  });

  it('clears answer and submittedAnswer', () => {
    const state = createTestState({
      answer: 'some answer',
      submittedAnswer: 'some answer',
    });
    const result = nextWord(state);

    expect(result?.answer).toBe('');
    expect(result?.submittedAnswer).toBeNull();
  });

  it('preserves correctCount', () => {
    const state = createTestState({ correctCount: 2 });
    const result = nextWord(state);

    expect(result?.correctCount).toBe(2);
  });
});

describe('finishGame', () => {
  it('returns null for null state', () => {
    expect(finishGame(null)).toBeNull();
  });

  it('sets isFinished to true', () => {
    const state = createTestState();
    const result = finishGame(state);

    expect(result?.isFinished).toBe(true);
  });

  it('preserves other state properties', () => {
    const state = createTestState({ currentIndex: 2, correctCount: 2 });
    const result = finishGame(state);

    expect(result?.currentIndex).toBe(2);
    expect(result?.correctCount).toBe(2);
  });
});

describe('isLastWord', () => {
  it('returns false for null state', () => {
    expect(isLastWord(null)).toBe(false);
  });

  it('returns false when not on last word', () => {
    const state = createTestState({ currentIndex: 0 });

    expect(isLastWord(state)).toBe(false);
  });

  it('returns true when on last word', () => {
    const state = createTestState({ currentIndex: 2 });

    expect(isLastWord(state)).toBe(true);
  });
});

describe('hasSubmitted', () => {
  it('returns false for null state', () => {
    expect(hasSubmitted(null)).toBe(false);
  });

  it('returns false when submittedAnswer is null', () => {
    const state = createTestState();

    expect(hasSubmitted(state)).toBe(false);
  });

  it('returns true when submittedAnswer is set', () => {
    const state = createTestState({ submittedAnswer: 'answer' });

    expect(hasSubmitted(state)).toBe(true);
  });

  it('returns true even for empty string submission', () => {
    const state = createTestState({ submittedAnswer: '' });

    expect(hasSubmitted(state)).toBe(true);
  });
});

describe('isAnswerCorrect', () => {
  it('returns false for null state', () => {
    expect(isAnswerCorrect(null)).toBe(false);
  });

  it('returns false when not submitted', () => {
    const state = createTestState({ answer: 'Äpfel' });

    expect(isAnswerCorrect(state)).toBe(false);
  });

  it('returns true for correct answer', () => {
    const state = createTestState({ submittedAnswer: 'Äpfel' });

    expect(isAnswerCorrect(state)).toBe(true);
  });

  it('returns false for wrong answer', () => {
    const state = createTestState({ submittedAnswer: 'Bananen' });

    expect(isAnswerCorrect(state)).toBe(false);
  });

  it('ignores case', () => {
    const state = createTestState({ submittedAnswer: 'äpfel' });

    expect(isAnswerCorrect(state)).toBe(true);
  });
});

describe('getScore', () => {
  it('returns zeros for null state', () => {
    expect(getScore(null)).toEqual({ correct: 0, total: 0 });
  });

  it('returns correct count and total words', () => {
    const state = createTestState({ correctCount: 2 });

    expect(getScore(state)).toEqual({ correct: 2, total: 3 });
  });
});