import type { Word } from '../../DerDieDas/domain/words.ts';

export interface GameState {
  words: Word[];
  currentIndex: number;
  answer: string;
}

export function createInitialState(words: Word[]): GameState {
  return {
    words,
    currentIndex: 0,
    answer: '',
  };
}

export function getCurrentWord(state: GameState | null): Word | undefined {
  return state?.words[state.currentIndex];
}

export function updateAnswer(
  answer: string
): (state: GameState | null) => GameState | null {
  return (state) => {
    if (!state) return null;
    return {
      ...state,
      answer,
    };
  };
}