import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { PageLayout } from '../components/PageLayout';
import { type Noun, type Article, type NounChange } from '../games/domain/nouns.ts';
import { loadNouns } from '../games/infrastructure/loadNouns.ts';
import { saveChanges } from '../games/infrastructure/saveNouns.ts';
import { useDebounce } from '../hooks/useDebounce.ts';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function Nouns() {
  const navigate = useNavigate();
  const [nounsList, setNounsList] = useState<Noun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [dirtyIndices, setDirtyIndices] = useState<Set<number>>(new Set());
  const originalNouns = useRef<Noun[]>([]);

  useEffect(() => {
    loadNouns()
      .then((nouns) => {
        setNounsList(nouns);
        originalNouns.current = nouns;
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async (changes: NounChange[], snapshot: Noun[]) => {
    setSaveStatus('saving');
    try {
      await saveChanges(changes);
      originalNouns.current = snapshot;
      setDirtyIndices(new Set());
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      setSaveStatus('error');
      console.error('Failed to save nouns:', e);
    }
  }, []);

  const debouncedSave = useDebounce(handleSave, 3000);

  useEffect(() => {
    if (loading || dirtyIndices.size === 0) return;

    const changes = [...dirtyIndices].map((index) => ({
      original: originalNouns.current[index].singular,
      noun: nounsList[index],
    }));

    debouncedSave(changes, nounsList);
  }, [nounsList, dirtyIndices, loading, debouncedSave]);

  const updateNoun = (index: number, updates: Partial<Noun>) => {
    setNounsList((prev) =>
      prev.map((noun, i) => (i === index ? { ...noun, ...updates } : noun))
    );
    setDirtyIndices((prev) => new Set([...prev, index]));
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
            Loading nouns...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">Error: {error}</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-400 text-sm">
                {nounsList.length} Wörter
              </div>
              <div className="text-sm">
                {saveStatus === 'saving' && (
                  <span className="text-blue-400">Speichern...</span>
                )}
                {saveStatus === 'saved' && (
                  <span className="text-emerald-400">✓ Gespeichert</span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-400">Fehler beim Speichern</span>
                )}
              </div>
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
                  {nounsList.map((noun, index) => (
                    <tr
                      key={index}
                      className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={noun.singular}
                          onChange={(e) =>
                            updateNoun(index, { singular: e.target.value })
                          }
                          className="w-full bg-transparent text-white font-medium px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={noun.article}
                          onChange={(e) =>
                            updateNoun(index, {
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
                          value={noun.plural}
                          onChange={(e) =>
                            updateNoun(index, { plural: e.target.value })
                          }
                          className="w-full bg-transparent text-slate-300 px-2 py-1 rounded border border-transparent hover:border-slate-600 focus:border-slate-500 focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={noun.tags.join(', ')}
                          onChange={(e) =>
                            updateNoun(index, {
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
