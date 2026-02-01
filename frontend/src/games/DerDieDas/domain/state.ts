import type { Word, Article } from './words.ts';

export interface GameState {
  words: Word[];
  currentIndex: number;
  selectedAnswer: Article | null;
}

export type ButtonState = 'default' | 'correct' | 'incorrect' | 'dimmed';

export function createInitialState(words: Word[]): GameState {
  return {
    words,
    currentIndex: 0,
    selectedAnswer: null,
  };
}

export function getCurrentWord(state: GameState | null): Word | undefined {
  return state?.words[state.currentIndex];
}

export function isLastWord(state: GameState | null): boolean {
  if (!state) return false;
  return state.currentIndex === state.words.length - 1;
}

export function hasAnswered(state: GameState | null): boolean {
  return state?.selectedAnswer !== null && state?.selectedAnswer !== undefined;
}

export function submitAnswer(
  article: Article
): (state: GameState | null) => GameState | null {
  return (state) => {
    if (!state || state.selectedAnswer !== null) {
      return state;
    }
    return {
      ...state,
      selectedAnswer: article,
    };
  };
}

export function nextWord(state: GameState | null): GameState | null {
  if (!state) return null;
  return {
    ...state,
    selectedAnswer: null,
    currentIndex: state.currentIndex + 1,
  };
}

export function getButtonState(
  state: GameState | null,
  article: Article
): ButtonState {
  if (!state?.selectedAnswer) {
    return 'default';
  }
  if (isAnswerCorrect(state, article)) {
    return 'correct';
  }
  if (isAnswerIncorrect(state, article)) {
    return 'incorrect';
  }
  return 'dimmed';
}

export function isAnswerCorrect(
  state: GameState | null,
  article: Article
): boolean {
  if (!state?.selectedAnswer) return false;
  const currentWord = getCurrentWord(state);
  return article === currentWord?.article;
}

export function isAnswerIncorrect(
  state: GameState | null,
  article: Article
): boolean {
  if (!state?.selectedAnswer) return false;
  const currentWord = getCurrentWord(state);
  return article === state.selectedAnswer && article !== currentWord?.article;
}
