import { useCallback, useEffect, useState } from 'react';
import { DieVieleIcon } from '../games/DieViele/components/DieVieleIcon.tsx';
import { GameLayout } from '../components/GameLayout.tsx';
import { getWords } from '../games/DerDieDas/domain/words.ts';
import { Loader } from '../components/Loader.tsx';
import {
  type GameState,
  createInitialState,
  getCurrentWord,
  updateAnswer,
} from '../games/DieViele/domain/state.ts';

const WORDS_TO_PLAY = 10;

export function DieViele() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = useCallback(() => {
    getWords(WORDS_TO_PLAY).then((words) =>
      setGameState(createInitialState(words))
    );
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const currentWord = getCurrentWord(gameState);

  if (!gameState || !currentWord) {
    return (
      <GameLayout icon={<DieVieleIcon />} name="Die Viele">
        <Loader />
      </GameLayout>
    );
  }

  const handleAnswerChange = (value: string) =>
    setGameState(updateAnswer(value));

  return (
    <GameLayout icon={<DieVieleIcon />} name="Die Viele">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <div className="w-full relative bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
          <span className="absolute top-3 right-4 sm:top-4 sm:right-5 text-slate-400 text-sm sm:text-base font-medium">
            {gameState.currentIndex + 1} / {gameState.words.length}
          </span>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            {currentWord.article} {currentWord.word}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <label
            htmlFor="plural-input"
            className="text-slate-300 text-lg sm:text-xl"
          >
            Wie ist der Plural?
          </label>
          <input
            id="plural-input"
            type="text"
            value={gameState.answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="die ..."
            className="w-full max-w-xs sm:max-w-sm bg-slate-700 text-white text-xl sm:text-2xl text-center py-4 px-6 rounded-xl border-2 border-slate-600 focus:border-blue-500 focus:outline-none transition-colors placeholder-slate-500"
          />
        </div>
      </div>
    </GameLayout>
  );
}
