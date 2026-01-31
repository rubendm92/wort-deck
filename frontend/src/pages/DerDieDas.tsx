import { useEffect, useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import { getWords, type Word } from '../services/wordService'

export function DerDieDas() {
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    getWords().then(setWords)
  }, [])

  return (
    <PageLayout>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <div className="text-slate-400 text-sm sm:text-base font-medium">
          1 / {words.length}
        </div>

        <div className="w-full bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
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
  )
}
