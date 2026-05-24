import { getGames } from '@/lib/api'
import GamesTable from '@/components/pages/games/GamesTable'

export const revalidate = 60

export default async function GamesPage() {
  const games = await getGames()

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
            Games
          </h1>
        </div>
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-[11px] font-bold text-emerald-400">
          {games.filter(g => g.status === 'live').length} LIVE
        </span>
      </div>

      <GamesTable games={games} />
    </div>
  )
}