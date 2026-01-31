import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../components/DerDieDasIcon';
import { PageLayout } from '../components/PageLayout';
import { getWords, type Word } from '../services/wordService';

export function DerDieDas() {
  const [words, setWords] = useState<Word[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWords().then(setWords);
  }, []);

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
            1 / {words.length}
          </span>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            Apfel
          </p>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
          <button className="cursor-pointer bg-blue-500 hover:bg-blue-400 transition-colors rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-blue-400/25">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
              Der
            </p>
          </button>
          <button className="cursor-pointer bg-red-500 hover:bg-red-400 transition-colors rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-red-400/25">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
              Die
            </p>
          </button>
          <button className="cursor-pointer bg-green-500 hover:bg-green-400 transition-colors rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-green-400/25">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
              Das
            </p>
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
