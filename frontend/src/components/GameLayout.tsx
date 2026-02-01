import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { PageLayout } from './PageLayout.tsx';

interface GameLayoutProps {
  children: ReactNode;
  icon: ReactNode;
  name: string;
}

export function GameLayout({ children, icon, name }: GameLayoutProps) {
  const navigate = useNavigate();
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
        {icon}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          {name}
        </h1>
      </header>
      {children}
    </PageLayout>
  );
}
