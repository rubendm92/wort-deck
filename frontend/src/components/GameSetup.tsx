interface GameSetupProps {
  wordCount: number;
  onWordCountChange: (count: number) => void;
  selectedTags: string[];
  availableTags: string[];
  onTagToggle: (tag: string) => void;
  onSelectAllTags: () => void;
  onDeselectAllTags: () => void;
  onStartGame: () => void;
}

export function GameSetup({
  wordCount,
  onWordCountChange,
  selectedTags,
  availableTags,
  onTagToggle,
  onSelectAllTags,
  onDeselectAllTags,
  onStartGame,
}: GameSetupProps) {
  const canStart = availableTags.length === 0 || selectedTags.length > 0;

  return (
    <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-8">
      <div className="w-full bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Spieleinstellungen
        </h2>

        <div className="mb-6">
          <label
            htmlFor="word-count"
            className="block text-slate-300 text-sm sm:text-base mb-2"
          >
            Anzahl der Wörter
          </label>
          <input
            id="word-count"
            type="number"
            min={1}
            max={50}
            value={wordCount}
            onChange={(e) =>
              onWordCountChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-full bg-slate-700 text-white text-lg py-3 px-4 rounded-xl border-2 border-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {availableTags.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm sm:text-base">Themen</span>
              <div className="flex gap-2">
                <button
                  onClick={onSelectAllTags}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Alle
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={onDeselectAllTags}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Keine
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onStartGame}
        disabled={!canStart}
        className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        Spiel starten
      </button>
    </div>
  );
}
