// components/pages/overview/TopGames.tsx
import { Game } from '@/types'

interface Props {
  games: Game[]
}

const statusStyles = {
  live:        { pill: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', dot: 'bg-emerald-400 shadow-[0_0_6px_#4ade80]' },
  beta:        { pill: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',       dot: 'bg-amber-400' },
  maintenance: { pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/20',       dot: 'bg-slate-500' },
}

export default function TopGames({ games }: Props) {
  const topGames = [...games]
    .sort((a, b) => b.roundsPlayed - a.roundsPlayed)
    .slice(0, 4)

  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-4">
        Top Games by Rounds
      </p>

      <ul className="flex flex-col gap-3">
        {topGames.map((game) => {
          const style = statusStyles[game.status] ?? statusStyles.maintenance
          return (
            <li key={game.id} className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
              <span className="text-[13px] font-semibold text-slate-200 flex-1 truncate">
                {game.title}
              </span>
              <span className="text-[12px] font-mono text-emerald-400 shrink-0">
                {game.roundsPlayed.toLocaleString()}
              </span>
              <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shrink-0 ${style.pill}`}>
                {game.status}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}