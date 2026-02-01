import type { Word } from '../../DerDieDas/domain/words.ts';

export interface GameState {
  words: Word[];
  currentIndex: number;
  answer: string;
  submittedAnswer: string | null;
  correctCount: number;
  isFinished: boolean;
}

export function createInitialState(words: Word[]): GameState {
  return {
    words,
    currentIndex: 0,
    answer: '',
    submittedAnswer: null,
    correctCount: 0,
    isFinished: false,
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

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

export function submitAnswer(state: GameState | null): GameState | null {
  if (!state || state.submittedAnswer !== null) return state;
  const currentWord = getCurrentWord(state);
  const isCorrect =
    normalizeAnswer(state.answer) === normalizeAnswer(currentWord?.plural ?? '');
  return {
    ...state,
    submittedAnswer: state.answer,
    correctCount: state.correctCount + (isCorrect ? 1 : 0),
  };
}

export function nextWord(state: GameState | null): GameState | null {
  if (!state) return null;
  return {
    ...state,
    currentIndex: state.currentIndex + 1,
    answer: '',
    submittedAnswer: null,
  };
}

export function finishGame(state: GameState | null): GameState | null {
  if (!state) return null;
  return {
    ...state,
    isFinished: true,
  };
}

export function isLastWord(state: GameState | null): boolean {
  if (!state) return false;
  return state.currentIndex === state.words.length - 1;
}

export function hasSubmitted(state: GameState | null): boolean {
  return state?.submittedAnswer !== null && state?.submittedAnswer !== undefined;
}

export function isAnswerCorrect(state: GameState | null): boolean {
  if (!state?.submittedAnswer) return false;
  const currentWord = getCurrentWord(state);
  return (
    normalizeAnswer(state.submittedAnswer) ===
    normalizeAnswer(currentWord?.plural ?? '')
  );
}

export function getScore(state: GameState | null): {
  correct: number;
  total: number;
} {
  if (!state) return { correct: 0, total: 0 };
  return { correct: state.correctCount, total: state.words.length };
}