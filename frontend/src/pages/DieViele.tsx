import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DieVieleIcon } from '../games/DieViele/components/DieVieleIcon.tsx';
import { GameLayout } from '../components/GameLayout.tsx';
import { GameSetup } from '../components/GameSetup.tsx';
import { loadAllTags } from '../games/infrastructure/loadAllTags.ts';
import { GameResult } from '../games/DerDieDas/components/GameResult.tsx';
import {
  createInitialState,
  finishGame,
  type GameState,
  getCurrentWord,
  getScore,
  hasSubmitted,
  isAnswerCorrect,
  isLastWord,
  nextWord,
  submitAnswer,
  updateAnswer,
} from '../games/DieViele/domain/state.ts';
import { loadNouns } from '../games/infrastructure/loadNouns.ts';

const DEFAULT_WORD_COUNT = 10;

const GAME_NAME = 'Die Viele';

export function DieViele() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllTags().then((tags) => {
      setAvailableTags(tags);
      setSelectedTags(tags);
    });
  }, []);

  const startGame = useCallback(() => {
    loadNouns({ count: wordCount, tags: selectedTags, shuffle: true }).then(
      (words) => setGameState(createInitialState(words))
    );
  }, [wordCount, selectedTags]);

  const currentWord = getCurrentWord(gameState);

  if (!gameState) {
    return (
      <GameLayout icon={<DieVieleIcon />} name={GAME_NAME}>
        <GameSetup
          wordCount={wordCount}
          onWordCountChange={setWordCount}
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagToggle={(tag) =>
            setSelectedTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
            )
          }
          onSelectAllTags={() => setSelectedTags(availableTags)}
          onDeselectAllTags={() => setSelectedTags([])}
          onStartGame={startGame}
        />
      </GameLayout>
    );
  }

  if (gameState.isFinished) {
    const score = getScore(gameState);
    return (
      <GameLayout icon={<DieVieleIcon />} name={GAME_NAME}>
        <GameResult
          correct={score.correct}
          total={score.total}
          onPlayAgain={() => setGameState(null)}
          onGoHome={() => navigate('/')}
        />
      </GameLayout>
    );
  }

  if (!currentWord) {
    return null;
  }

  const handleAnswerChange = (value: string) =>
    setGameState(updateAnswer(value));

  const handleSubmit = () => setGameState(submitAnswer);

  const handleNext = () => setGameState(nextWord);

  const handleFinish = () => setGameState(finishGame);

  const submitted = hasSubmitted(gameState);
  const correct = isAnswerCorrect(gameState);
  const lastWord = isLastWord(gameState);

  return (
    <GameLayout icon={<DieVieleIcon />} name={GAME_NAME}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <div className="w-full relative bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
          <span className="absolute top-3 right-4 sm:top-4 sm:right-5 text-slate-400 text-sm sm:text-base font-medium">
            {gameState.currentIndex + 1} / {gameState.words.length}
          </span>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            {currentWord.article} {currentWord.singular}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <label
            htmlFor="plural-input"
            className="text-slate-300 text-lg sm:text-xl"
          >
            Wie ist der Plural?
          </label>
          <div
            className={`flex items-center w-full max-w-xs sm:max-w-sm rounded-xl border-2 transition-colors ${
              submitted
                ? correct
                  ? 'bg-emerald-900/50 border-emerald-500'
                  : 'bg-red-900/50 border-red-500'
                : 'bg-slate-700 border-slate-600 focus-within:border-blue-500'
            }`}
          >
            <span className="text-slate-400 text-xl sm:text-2xl pl-5 select-none">
              die
            </span>
            <input
              id="plural-input"
              type="text"
              value={gameState.answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !submitted) handleSubmit();
              }}
              disabled={submitted}
              className="flex-1 bg-transparent text-white text-xl sm:text-2xl py-4 px-3 focus:outline-none"
            />
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!gameState.answer.trim()}
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Prüfen
            </button>
          )}

          {submitted && (
            <div className="flex flex-col items-center gap-4">
              {correct ? (
                <p className="text-emerald-400 text-lg sm:text-xl font-medium">
                  Richtig!
                </p>
              ) : (
                <p className="text-red-400 text-lg sm:text-xl font-medium">
                  Falsch! Die richtige Antwort ist:{' '}
                  <span className="text-white font-bold">
                    die {currentWord.plural}
                  </span>
                </p>
              )}

              <button
                onClick={lastWord ? handleFinish : handleNext}
                className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2"
              >
                <span className="text-base sm:text-lg">
                  {lastWord ? 'Fertig' : 'Weiter'}
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  );
}
