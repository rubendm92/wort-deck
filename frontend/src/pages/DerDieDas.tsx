import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../games/DerDieDas/components/DerDieDasIcon.tsx';
import { AnswerButton } from '../games/DerDieDas/components/AnswerButton.tsx';
import { WordPanel } from '../games/DerDieDas/components/WordPanel.tsx';
import { GameResult } from '../games/DerDieDas/components/GameResult.tsx';
import { GameSetup } from '../components/GameSetup.tsx';
import {
  getWords,
  getTags,
  type Article,
} from '../games/DerDieDas/domain/words.ts';
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

const DEFAULT_WORD_COUNT = 10;

const GAME_NAME = 'Der Die Das';

export function DerDieDas() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
  const [selectedTags, setSelectedTags] = useState<string[]>(() => getTags());
  const navigate = useNavigate();

  const availableTags = useMemo(() => getTags(), []);

  const startGame = useCallback(() => {
    getWords({ count: wordCount, tags: selectedTags }).then((words) =>
      setGameState(createInitialState(words))
    );
  }, [wordCount, selectedTags]);

  const handleAnswer = (article: Article) =>
    setGameState(submitAnswer(article));

  const handleNext = () => setGameState(nextWord);

  const handleFinish = () => setGameState(finishGame);

  const currentWord = getCurrentWord(gameState);

  if (!gameState) {
    return (
      <GameLayout icon={<DerDieDasIcon />} name={GAME_NAME}>
        <GameSetup
          wordCount={wordCount}
          onWordCountChange={setWordCount}
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagToggle={(tag) =>
            setSelectedTags((prev) =>
              prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
      <GameLayout icon={<DerDieDasIcon />} name={GAME_NAME}>
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

  const answered = hasAnswered(gameState);
  const lastWord = isLastWord(gameState);

  return (
    <GameLayout icon={<DerDieDasIcon />} name={GAME_NAME}>
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
