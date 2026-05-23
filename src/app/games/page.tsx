// app/games/page.tsx — Server Component (niente 'use client')
import { getGames } from '@/lib/api'
import GamesTable from '@/components/ui/GamesTable'

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
          <p className="text-[12px] text-slate-600 font-mono mt-1">
            {games.length} titles in portfolio
          </p>
        </div>
        <span className="bg-[#0d1424] border border-[#1e2d45] text-slate-400 text-[11px] font-bold font-mono px-3 py-1.5 rounded-full">
          {games.filter(g => g.status === 'live').length} LIVE
        </span>
      </div>

      {/* GamesTable è Client Component — gestisce ricerca e filtri */}
      <GamesTable games={games} />
    </div>
  )
}