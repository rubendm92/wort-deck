import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PageLayout } from '../components/PageLayout';
import { type Word, type Article } from '../games/domain/words';
import { loadAllWords } from '../games/infrastructure/loadAllWords.ts';

export function Words() {
  const navigate = useNavigate();
  const [wordsList, setWordsList] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllWords()
      .then(setWordsList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const updateWord = (index: number, updates: Partial<Word>) => {
    setWordsList((prev) =>
      prev.map((word, i) => (i === index ? { ...word, ...updates } : word))
    );
  };

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
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Wörter
        </h1>
      </header>

      <main className="w-full max-w-4xl mt-16">
        {loading ? (
          <div className="text-slate-400 text-center py-8">
            Loading words...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">Error: {error}</div>
        ) : (
          <>
            <div className="text-slate-400 text-sm mb-4">
              {wordsList.length} Wörter
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-700">
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-slate-300 text-sm">
                  <tr>
                    <th className="px-4 py-3 font-medium">Wort</th>
                    <th className="px-4 py-3 font-medium">Artikel</th>
                    <th className="px-4 py-3 font-medium">Plural</th>
                    <th className="px-4 py-3 font-medium">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {wordsList.map((word, index) => (
                    <tr
                      key={index}
                      className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={word.word}
                          onChange={(e) =>
                            updateWord(index, { word: e.target.value })
                          }
                          className="w-full bg-transparent text-white font-medium px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={word.article}
                          onChange={(e) =>
                            updateWord(index, {
                              article: e.target.value as Article,
                            })
                          }
                          className="bg-slate-700 text-slate-300 px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none cursor-pointer"
                        >
                          <option value="der">der</option>
                          <option value="die">die</option>
                          <option value="das">das</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={word.plural}
                          onChange={(e) =>
                            updateWord(index, { plural: e.target.value })
                          }
                          className="w-full bg-transparent text-slate-300 px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={word.tags.join(', ')}
                          onChange={(e) =>
                            updateWord(index, {
                              tags: e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter((t) => t.length > 0),
                            })
                          }
                          className="w-full bg-transparent text-slate-300 px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none"
                          placeholder="tag1, tag2, ..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </PageLayout>
  );
}
