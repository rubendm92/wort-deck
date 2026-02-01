import { useCallback, useEffect, useState } from 'react';
import { DieVieleIcon } from '../games/DieViele/components/DieVieleIcon.tsx';
import { GameLayout } from '../components/GameLayout.tsx';
import { getWords, type Word } from '../games/DerDieDas/domain/words.ts';
import { Loader } from '../components/Loader.tsx';

const WORDS_TO_PLAY = 10;

export function DieViele() {
  const [words, setWords] = useState<Word[] | null>(null);
  const [currentIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const loadWords = useCallback(() => {
    getWords(WORDS_TO_PLAY).then((w) => setWords(w));
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const currentWord = words?.[currentIndex];

  if (!words || !currentWord) {
    return (
      <GameLayout icon={<DieVieleIcon />} name="Die Viele">
        <Loader />
      </GameLayout>
    );
  }

  return (
    <GameLayout icon={<DieVieleIcon />} name="Die Viele">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <div className="w-full relative bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
          <span className="absolute top-3 right-4 sm:top-4 sm:right-5 text-slate-400 text-sm sm:text-base font-medium">
            {currentIndex + 1} / {words.length}
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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="die ..."
            className="w-full max-w-xs sm:max-w-sm bg-slate-700 text-white text-xl sm:text-2xl text-center py-4 px-6 rounded-xl border-2 border-slate-600 focus:border-blue-500 focus:outline-none transition-colors placeholder-slate-500"
          />
        </div>
      </div>
    </GameLayout>
  );
}
