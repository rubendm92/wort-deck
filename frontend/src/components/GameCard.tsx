import type { ReactNode } from 'react'

interface GameCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  actionText?: string
  onClick?: () => void
}

export function GameCard({
  icon,
  title,
  subtitle,
  actionText = "Los geht's",
  onClick,
}: GameCardProps) {
  return (
    <button onClick={onClick} className="w-full group cursor-pointer">
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-1 rounded-2xl sm:rounded-3xl shadow-2xl shadow-amber-500/20 transition-all duration-300 group-hover:shadow-amber-500/40 group-hover:scale-[1.02]">
        <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {icon}
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-amber-500 group-hover:translate-x-1 transition-transform">
              <span className="text-sm sm:text-base font-medium">
                {actionText}
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
