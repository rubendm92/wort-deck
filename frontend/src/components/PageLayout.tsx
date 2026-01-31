import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {children}
      <footer className="mt-8 sm:mt-12 md:mt-16 text-slate-500 text-xs sm:text-sm">
        Lerne Deutsch mit Spaß
      </footer>
    </div>
  )
}
