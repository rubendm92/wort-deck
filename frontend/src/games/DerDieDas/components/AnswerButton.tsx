import type { Article } from '../../domain/words.ts';
import type { ButtonState } from '../domain/state.ts';

interface AnswerButtonProps {
  article: Article;
  buttonState: ButtonState;
  isCorrect: boolean;
  isIncorrect: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function AnswerButton({
  article,
  buttonState,
  isCorrect,
  isIncorrect,
  disabled,
  onClick,
}: AnswerButtonProps) {
  const label = article.charAt(0).toUpperCase() + article.slice(1);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonClass(buttonState, article)}
    >
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
        {label}
      </p>
      {isCorrect && (
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
      {isIncorrect && (
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
    </button>
  );
}

function getButtonClass(buttonState: ButtonState, article: Article) {
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
}
