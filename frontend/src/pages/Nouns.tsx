import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { PageLayout } from '../components/PageLayout';
import { type Noun, type Article } from '../games/domain/nouns.ts';
import { loadNouns } from '../games/infrastructure/loadNouns.ts';
import { upsertNouns } from '../games/infrastructure/saveNouns.ts';
import { useDebounce } from '../hooks/useDebounce.ts';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type AddStatus = 'idle' | 'saving' | 'error';

const EMPTY_NOUN: Noun = { singular: '', article: 'der', plural: '', tags: [] };

export function Nouns() {
  const navigate = useNavigate();
  const [nounsList, setNounsList] = useState<Noun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [dirtyIndices, setDirtyIndices] = useState<Set<number>>(new Set());
  const savedSnapshot = useRef<Noun[]>([]);

  const [newNoun, setNewNoun] = useState<Noun>(EMPTY_NOUN);
  const [newTags, setNewTags] = useState('');
  const [addStatus, setAddStatus] = useState<AddStatus>('idle');
  const singularRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadNouns()
      .then((nouns) => {
        setNounsList(nouns);
        savedSnapshot.current = nouns;
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async (dirtyNouns: Noun[], snapshot: Noun[]) => {
    setSaveStatus('saving');
    try {
      await upsertNouns(dirtyNouns);
      savedSnapshot.current = snapshot;
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

    const dirtyNouns = [...dirtyIndices].map((index) => nounsList[index]);
    debouncedSave(dirtyNouns, nounsList);
  }, [nounsList, dirtyIndices, loading, debouncedSave]);

  const updateNoun = (index: number, updates: Partial<Noun>) => {
    setNounsList((prev) =>
      prev.map((noun, i) => (i === index ? { ...noun, ...updates } : noun))
    );
    setDirtyIndices((prev) => new Set([...prev, index]));
  };

  const handleAddNoun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoun.singular.trim() || !newNoun.plural.trim()) return;

    const noun: Noun = {
      ...newNoun,
      singular: newNoun.singular.trim(),
      plural: newNoun.plural.trim(),
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    setAddStatus('saving');
    try {
      await upsertNouns([noun]);
      setNounsList((prev) => [noun, ...prev]);
      setNewNoun(EMPTY_NOUN);
      setNewTags('');
      setAddStatus('idle');
      singularRef.current?.focus();
    } catch {
      setAddStatus('error');
    }
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

      <main className="w-full max-w-4xl mt-16 flex flex-col gap-6">
        {/* Add noun form */}
        <form
          onSubmit={handleAddNoun}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-4 flex flex-col sm:flex-row gap-3 items-end"
        >
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <label className="text-slate-400 text-xs font-medium">Wort</label>
            <input
              ref={singularRef}
              type="text"
              value={newNoun.singular}
              onChange={(e) => setNewNoun((n) => ({ ...n, singular: e.target.value }))}
              placeholder="Hund"
              required
              className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            <label className="text-slate-400 text-xs font-medium">Artikel</label>
            <select
              value={newNoun.article}
              onChange={(e) => setNewNoun((n) => ({ ...n, article: e.target.value as Article }))}
              className="bg-slate-700 text-slate-300 px-3 py-2 rounded border border-slate-600 focus:border-slate-400 focus:outline-none cursor-pointer"
            >
              <option value="der">der</option>
              <option value="die">die</option>
              <option value="das">das</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <label className="text-slate-400 text-xs font-medium">Plural</label>
            <input
              type="text"
              value={newNoun.plural}
              onChange={(e) => setNewNoun((n) => ({ ...n, plural: e.target.value }))}
              placeholder="Hunde"
              required
              className="bg-slate-700 text-slate-300 px-3 py-2 rounded border border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <label className="text-slate-400 text-xs font-medium">Tags</label>
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="tag1, tag2"
              className="bg-slate-700 text-slate-300 px-3 py-2 rounded border border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            {addStatus === 'error' && (
              <span className="text-red-400 text-xs text-right">Fehler</span>
            )}
            <button
              type="submit"
              disabled={addStatus === 'saving'}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded transition-colors cursor-pointer"
            >
              {addStatus === 'saving' ? '...' : '+ Hinzufügen'}
            </button>
          </div>
        </form>

        {/* Noun list */}
        {loading ? (
          <div className="text-slate-400 text-center py-8">
            Loading nouns...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">Error: {error}</div>
        ) : (
          <>
            <div className="flex items-center justify-between">
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
