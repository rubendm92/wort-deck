interface GameResultProps {
  correct: number;
  total: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function GameResult({
  correct,
  total,
  onPlayAgain,
  onGoHome,
}: GameResultProps) {
  return (
    <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-8">
      <div className="w-full bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Fertig!
        </p>
        <p className="text-lg sm:text-xl text-slate-300">
          {correct} von {total} Wörtern richtig beantwortet
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={onPlayAgain}
          className="cursor-pointer flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Nochmal spielen
        </button>
        <button
          onClick={onGoHome}
          className="cursor-pointer flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Zur Startseite
        </button>
      </div>
    </div>
  );
}
