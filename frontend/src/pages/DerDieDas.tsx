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
import { GameLayout } from '../components/GameLayout.tsx';
import { Loader } from '../components/Loader.tsx';

const WORDS_TO_PLAY = 10;

export function DerDieDas() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    getWords(WORDS_TO_PLAY).then((words) =>
      setGameState(createInitialState(words))
    );
  }, []);

  useEffect(startGame, [startGame]);

  const handleAnswer = (article: Article) =>
    setGameState(submitAnswer(article));

  const handleNext = () => setGameState(nextWord);

  const handleFinish = () => setGameState(finishGame);

  const currentWord = getCurrentWord(gameState);

  if (!gameState) {
    return (
      <GameLayout icon={<DerDieDasIcon />} name="Der Die Das">
        <Loader />
      </GameLayout>
    );
  }

  if (gameState.isFinished) {
    const score = getScore(gameState);
    return (
      <GameLayout icon={<DerDieDasIcon />} name="Der Die Das">
        <GameResult
          correct={score.correct}
          total={score.total}
          onPlayAgain={startGame}
          onGoHome={() => navigate('/')}
        />
      </GameLayout>
    );
  }

  if (!currentWord) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );
  }

  const answered = hasAnswered(gameState);
  const lastWord = isLastWord(gameState);

  return (
    <GameLayout icon={<DerDieDasIcon />} name="Der Die Das">
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
    </GameLayout>
  );
}
