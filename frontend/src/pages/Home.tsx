import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../components/DerDieDasIcon';
import { GameCard } from '../components/GameCard';
import { PageLayout } from '../components/PageLayout';
import { useGreeting } from '../hooks/useGreeting';

export function Home() {
  const greeting = useGreeting();
  const navigate = useNavigate();

  return (
    <PageLayout>
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
          onClick={() => navigate('/der-die-das')}
        />
      </main>
    </PageLayout>
  );
}
