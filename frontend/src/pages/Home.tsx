import { useNavigate } from 'react-router';
import { DerDieDasIcon } from '../games/DerDieDas/components/DerDieDasIcon.tsx';
import { GameCard } from '../components/GameCard';
import { PageLayout } from '../components/PageLayout';

export function Home() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <header className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
          Willkommen bei WortDeck
        </h1>
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
