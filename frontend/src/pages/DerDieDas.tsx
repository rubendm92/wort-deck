import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../games/DerDieDas/components/DerDieDasIcon.tsx';
import { PageLayout } from '../components/PageLayout';
import { getWords, type Article } from '../games/DerDieDas/domain/words.ts';
import {
  type GameState,
  type ButtonState,
  createInitialState,
  getCurrentWord,
  isLastWord,
  hasAnswered,
  submitAnswer,
  nextWord,
  getButtonState,
} from '../games/DerDieDas/domain/state.ts';

export function DerDieDas() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getWords().then((words) => setGameState(createInitialState(words)));
  }, []);

  const handleAnswer = (article: Article) =>
    setGameState(submitAnswer(article));

  const handleNext = () => setGameState(nextWord);

  const getButtonClass = (buttonState: ButtonState, article: Article) => {
    const baseClass =
      'cursor-pointer transition-all rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg relative';
    const colors = {
      der: 'bg-blue-500 hover:bg-blue-400 hover:shadow-blue-400/25',
      die: 'bg-red-500 hover:bg-red-400 hover:shadow-red-400/25',
      das: 'bg-green-500 hover:bg-green-400 hover:shadow-green-400/25',
    };
    const colorsStatic = {
      der: 'bg-blue-500',
      die: 'bg-red-500',
      das: 'bg-green-500',
    };

    switch (buttonState) {
      case 'default':
        return `${baseClass} ${colors[article]}`;
      case 'correct':
        return `${baseClass} ${colorsStatic[article]} ring-4 ring-white scale-105`;
      case 'incorrect':
        return `${baseClass} ${colorsStatic[article]} opacity-50`;
      case 'dimmed':
        return `${baseClass} ${colorsStatic[article]} opacity-30`;
    }
  };

  const renderButtonContent = (buttonState: ButtonState, label: string) => {
    return (
      <>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
          {label}
        </p>
        {buttonState === 'correct' && (
          <span className="absolute -top-2 -right-2 bg-white rounded-full p-1">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        )}
        {buttonState === 'incorrect' && (
          <span className="absolute -top-2 -right-2 bg-white rounded-full p-1">
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        )}
      </>
    );
  };

  const currentWord = getCurrentWord(gameState);

  if (!currentWord || !gameState) {
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
        <div className="w-full relative bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
          <span className="absolute top-3 right-4 sm:top-4 sm:right-5 text-slate-400 text-sm sm:text-base font-medium">
            {gameState.currentIndex + 1} / {gameState.words.length}
          </span>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            {currentWord.word}
          </p>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
          {(['der', 'die', 'das'] as const).map((article) => {
            const buttonState = getButtonState(gameState, article);
            return (
              <button
                key={article}
                onClick={() => handleAnswer(article)}
                disabled={answered}
                className={getButtonClass(buttonState, article)}
              >
                {renderButtonContent(
                  buttonState,
                  article.charAt(0).toUpperCase() + article.slice(1)
                )}
              </button>
            );
          })}
        </div>

        {answered && (
          <button
            onClick={lastWord ? () => navigate('/') : handleNext}
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
