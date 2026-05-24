// components/ui/GamesTable.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Game } from '@/types'
import GameSearch from '@/components/pages/games/GameSearch'

const statusStyles: Record<string, { pill: string; dot: string }> = {
  live:        { pill: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', dot: 'bg-emerald-400 shadow-[0_0_6px_#4ade80]' },
  beta:        { pill: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',       dot: 'bg-amber-400' },
  maintenance: { pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/20',       dot: 'bg-slate-500' },
}

export default function GamesTable({ games }: { games: Game[] }) {
  const [search, setSearch] = useState('')

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <GameSearch onSearchChange={setSearch} />

      {/* ─── MOBILE: card list ─── */}
      <ul className="flex flex-col gap-2 mt-4 sm:hidden">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            const style = statusStyles[game.status] ?? statusStyles.maintenance
            return (
              <li
                key={game.id}
                className="bg-[#0d1424] border border-[#1e2d45] rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-200 truncate">
                    {game.title}
                  </p>
                  <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                    {game.category ?? '—'} · {game.roundsPlayed.toLocaleString()} rounds
                  </p>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shrink-0 ${style.pill}`}>
                  {game.status}
                </span>
                <Link
                  href={`/games/${game.id}`}
                  className="text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
                  aria-label="View details"
                >
                  <i className="ti ti-arrow-right text-base" aria-hidden="true" />
                </Link>
              </li>
            )
          })
        ) : (
          <li className="px-5 py-8 text-center text-[12px] text-slate-600 font-mono">
            No titles found matching your search.
          </li>
        )}
      </ul>

      {/* ─── DESKTOP: tabella ─── */}
      <div className="hidden sm:block bg-[#0d1424] border border-[#1e2d45] rounded-xl overflow-hidden mt-4">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-[#1e2d45]">
          {['Game', 'Category', 'Rounds Played', 'Status', ''].map((h) => (
            <span key={h} className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-600">
              {h}
            </span>
          ))}
        </div>

        <ul>
          {filteredGames.length > 0 ? (
            filteredGames.map((game, i) => {
              const style = statusStyles[game.status] ?? statusStyles.maintenance
              return (
                <li
                  key={game.id}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-5 py-4 items-center
                    ${i !== filteredGames.length - 1 ? 'border-b border-[#0f172a]' : ''}
                    hover:bg-white/[0.02] transition-colors duration-100`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <span className="text-[13px] font-semibold text-slate-200">{game.title}</span>
                  </div>
                  <span className="text-[13px] text-slate-500 font-medium">{game.category ?? '—'}</span>
                  <span className="text-[13px] font-mono text-emerald-400">{game.roundsPlayed.toLocaleString()}</span>
                  <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${style.pill}`}>
                    {game.status}
                  </span>
                  <Link
                    href={`/games/${game.id}`}
                    className="text-[13px] font-bold text-slate-500 hover:text-emerald-400 transition-colors duration-150 flex items-center gap-1 justify-end"
                  >
                    Details
                    <i className="ti ti-arrow-right text-sm" aria-hidden="true" />
                  </Link>
                </li>
              )
            })
          ) : (
            <li className="px-5 py-8 text-center text-[12px] text-slate-600 font-mono">
              No titles found matching your search.
            </li>
          )}
        </ul>
      </div>
    </>
  )
}