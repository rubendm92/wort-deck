import { describe, it, expect } from 'vitest';
import {
  createInitialState,
  getCurrentWord,
  isLastWord,
  hasAnswered,
  submitAnswer,
  nextWord,
  finishGame,
  getScore,
  getButtonState,
  isAnswerCorrect,
  isAnswerIncorrect,
  type GameState,
} from './state';
import type { Noun } from '../../domain/words.ts';

const testWords: Noun[] = [
  { singular: 'Apfel', article: 'der', plural: 'Äpfel', tags: [] },
  { singular: 'Banane', article: 'die', plural: 'Bananen', tags: [] },
  { singular: 'Brot', article: 'das', plural: 'Brote', tags: [] },
];

describe('createInitialState', () => {
  it('creates state with words at index 0 and no answer', () => {
    const state = createInitialState(testWords);

    expect(state.words).toBe(testWords);
    expect(state.currentIndex).toBe(0);
    expect(state.selectedAnswer).toBeNull();
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
    const state: GameState = {
      words: testWords,
      currentIndex: 1,
      selectedAnswer: null,
      correctCount: 0,
      isFinished: false,
    };

    expect(getCurrentWord(state)).toEqual({
      word: 'Banane',
      article: 'die',
      plural: 'Bananen',
      tags: [],
    });
  });
});

describe('isLastWord', () => {
  it('returns false for null state', () => {
    expect(isLastWord(null)).toBe(false);
  });

  it('returns false when not on last word', () => {
    const state = createInitialState(testWords);

    expect(isLastWord(state)).toBe(false);
  });

  it('returns true when on last word', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 2,
      selectedAnswer: null,
      correctCount: 0,
      isFinished: false,
    };

    expect(isLastWord(state)).toBe(true);
  });
});

describe('hasAnswered', () => {
  it('returns false for null state', () => {
    expect(hasAnswered(null)).toBe(false);
  });

  it('returns false when no answer selected', () => {
    const state = createInitialState(testWords);

    expect(hasAnswered(state)).toBe(false);
  });

  it('returns true when answer is selected', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };

    expect(hasAnswered(state)).toBe(true);
  });
});

describe('submitAnswer', () => {
  it('returns null for null state', () => {
    const result = submitAnswer('der')(null);

    expect(result).toBeNull();
  });

  it('sets the selected answer', () => {
    const state = createInitialState(testWords);
    const result = submitAnswer('die')(state);

    expect(result?.selectedAnswer).toBe('die');
  });

  it('does not change answer if already answered', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };
    const result = submitAnswer('die')(state);

    expect(result?.selectedAnswer).toBe('der');
  });

  it('preserves other state properties', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 1,
      selectedAnswer: null,
      correctCount: 0,
      isFinished: false,
    };
    const result = submitAnswer('das')(state);

    expect(result?.words).toBe(testWords);
    expect(result?.currentIndex).toBe(1);
  });
});

describe('nextWord', () => {
  it('returns null for null state', () => {
    expect(nextWord(null)).toBeNull();
  });

  it('increments current index', () => {
    const state = createInitialState(testWords);
    const result = nextWord(state);

    expect(result?.currentIndex).toBe(1);
  });

  it('clears the selected answer', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };
    const result = nextWord(state);

    expect(result?.selectedAnswer).toBeNull();
  });
});

describe('getButtonState', () => {
  it('returns default for null state', () => {
    expect(getButtonState(null, 'der')).toBe('default');
  });

  it('returns default when no answer selected', () => {
    const state = createInitialState(testWords);

    expect(getButtonState(state, 'der')).toBe('default');
    expect(getButtonState(state, 'die')).toBe('default');
    expect(getButtonState(state, 'das')).toBe('default');
  });

  it('returns correct for the right answer', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };

    expect(getButtonState(state, 'der')).toBe('correct');
  });

  it('returns incorrect for wrong selected answer', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(getButtonState(state, 'die')).toBe('incorrect');
  });

  it('returns dimmed for non-selected wrong answers', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(getButtonState(state, 'das')).toBe('dimmed');
  });

  it('returns correct even when wrong answer was selected', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(getButtonState(state, 'der')).toBe('correct');
  });
});

describe('isAnswerCorrect', () => {
  it('returns false for null state', () => {
    expect(isAnswerCorrect(null, 'der')).toBe(false);
  });

  it('returns false when no answer selected', () => {
    const state = createInitialState(testWords);

    expect(isAnswerCorrect(state, 'der')).toBe(false);
  });

  it('returns true for the correct article', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };

    expect(isAnswerCorrect(state, 'der')).toBe(true);
  });

  it('returns true for correct article even when wrong answer selected', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(isAnswerCorrect(state, 'der')).toBe(true);
  });

  it('returns false for wrong articles', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };

    expect(isAnswerCorrect(state, 'die')).toBe(false);
    expect(isAnswerCorrect(state, 'das')).toBe(false);
  });
});

describe('isAnswerIncorrect', () => {
  it('returns false for null state', () => {
    expect(isAnswerIncorrect(null, 'der')).toBe(false);
  });

  it('returns false when no answer selected', () => {
    const state = createInitialState(testWords);

    expect(isAnswerIncorrect(state, 'die')).toBe(false);
  });

  it('returns true for the selected wrong answer', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(isAnswerIncorrect(state, 'die')).toBe(true);
  });

  it('returns false for the correct answer', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'der',
      correctCount: 1,
      isFinished: false,
    };

    expect(isAnswerIncorrect(state, 'der')).toBe(false);
  });

  it('returns false for non-selected wrong answers', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 0,
      selectedAnswer: 'die',
      correctCount: 0,
      isFinished: false,
    };

    expect(isAnswerIncorrect(state, 'das')).toBe(false);
  });
});

describe('submitAnswer correctCount', () => {
  it('increments correctCount when answer is correct', () => {
    const state = createInitialState(testWords);
    const result = submitAnswer('der')(state);

    expect(result?.correctCount).toBe(1);
  });

  it('does not increment correctCount when answer is wrong', () => {
    const state = createInitialState(testWords);
    const result = submitAnswer('die')(state);

    expect(result?.correctCount).toBe(0);
  });
});

describe('finishGame', () => {
  it('returns null for null state', () => {
    expect(finishGame(null)).toBeNull();
  });

  it('sets isFinished to true', () => {
    const state = createInitialState(testWords);
    const result = finishGame(state);

    expect(result?.isFinished).toBe(true);
  });

  it('preserves other state properties', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 2,
      selectedAnswer: 'das',
      correctCount: 2,
      isFinished: false,
    };
    const result = finishGame(state);

    expect(result?.currentIndex).toBe(2);
    expect(result?.correctCount).toBe(2);
  });
});

describe('getScore', () => {
  it('returns zeros for null state', () => {
    expect(getScore(null)).toEqual({ correct: 0, total: 0 });
  });

  it('returns correct count and total words', () => {
    const state: GameState = {
      words: testWords,
      currentIndex: 2,
      selectedAnswer: 'das',
      correctCount: 2,
      isFinished: true,
    };

    expect(getScore(state)).toEqual({ correct: 2, total: 3 });
  });
});
