import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../games/DerDieDas/components/DerDieDasIcon.tsx';
import { AnswerButton } from '../games/DerDieDas/components/AnswerButton.tsx';
import { WordPanel } from '../games/DerDieDas/components/WordPanel.tsx';
import { GameResult } from '../games/DerDieDas/components/GameResult.tsx';
import { PageLayout } from '../components/PageLayout';
import { getWords, type Article } from '../games/DerDieDas/domain/words.ts';
import {
  type GameState,
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
} from '../games/DerDieDas/domain/state.ts';

export function DerDieDas() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    getWords(10).then((words) => setGameState(createInitialState(words)));
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleAnswer = (article: Article) =>
    setGameState(submitAnswer(article));

  const handleNext = () => setGameState(nextWord);

  const handleFinish = () => setGameState(finishGame);

  const currentWord = getCurrentWord(gameState);

  if (!gameState) {
    return (
      <PageLayout>
        <p className="text-white">Loading...</p>
      </PageLayout>
    );
  }

  if (gameState.isFinished) {
    const score = getScore(gameState);
    return (
      <PageLayout>
        <GameResult
          correct={score.correct}
          total={score.total}
          onPlayAgain={startGame}
          onGoHome={() => navigate('/')}
        />
      </PageLayout>
    );
  }

  if (!currentWord) {
    return (
      <PageLayout>
        <p className="text-white">Loading...</p>
      </PageLayout>
    );
  }

  const answered = hasAnswered(gameState);
  const lastWord = isLastWord(gameState);

  return (
    <PageLayout>
      <header className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer text-slate-400 hover:text-white transition-colors p-1"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <DerDieDasIcon />
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Der Die Das
        </h1>
      </header>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <WordPanel
          word={currentWord.word}
          currentIndex={gameState.currentIndex}
          totalWords={gameState.words.length}
        />

        <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
          {(['der', 'die', 'das'] as const).map((article) => (
            <AnswerButton
              key={article}
              article={article}
              buttonState={getButtonState(gameState, article)}
              isCorrect={isAnswerCorrect(gameState, article)}
              isIncorrect={isAnswerIncorrect(gameState, article)}
              disabled={answered}
              onClick={() => handleAnswer(article)}
            />
          ))}
        </div>

        {answered && (
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
        )}
      </div>
    </PageLayout>
  );
}
