import { DerDieDasIcon } from './components/DerDieDasIcon'
import { GameCard } from './components/GameCard'
import { useGreeting } from './hooks/useGreeting'

function App() {
  const greeting = useGreeting()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
          {greeting}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg">
          Willkommen bei WortDeck
        </p>
      </header>

      <main className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <GameCard
          icon={<DerDieDasIcon />}
          title="Der Die Das"
          subtitle="Kannst du den Artikel erraten?"
        />
      </main>

      <footer className="mt-8 sm:mt-12 md:mt-16 text-slate-500 text-xs sm:text-sm">
        Lerne Deutsch mit Spaß
      </footer>
    </div>
  )
}

export default App
