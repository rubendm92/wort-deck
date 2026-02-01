interface WordPanelProps {
  word: string;
  currentIndex: number;
  totalWords: number;
}

export function WordPanel({ word, currentIndex, totalWords }: WordPanelProps) {
  return (
    <div className="w-full relative bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
      <span className="absolute top-3 right-4 sm:top-4 sm:right-5 text-slate-400 text-sm sm:text-base font-medium">
        {currentIndex + 1} / {totalWords}
      </span>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
        {word}
      </p>
    </div>
  );
}
