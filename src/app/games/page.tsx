// app/games/page.tsx
'use client' // Obbligatorio per gestire lo stato della ricerca lato client

import { getGames } from '@/lib/api'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import GameSearch from '@/components/ui/GameSearch' // Importiamo il tuo nuovo componente

// Interfaccia TypeScript per definire la struttura di un gioco
interface Game {
  id: string
  title: string
  status: 'live' | 'beta' | 'maintenance'
  category?: string
  roundsPlayed: number
}

const statusStyles: Record<string, { pill: string; dot: string }> = {
  live:        { pill: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', dot: 'bg-emerald-400 shadow-[0_0_6px_#4ade80]' },
  beta:        { pill: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',       dot: 'bg-amber-400' },
  maintenance: { pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/20',       dot: 'bg-slate-500' },
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // Carica i dati dal server al mount del componente
  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getGames()
        setGames(data)
      } catch (error) {
        console.error("Error loading games:", error)
      } finally {
        setLoading(false)
      }
    }
    loadGames()
  }, [])

  // Filtra la lista dei giochi in tempo reale in base a cosa scrivi nell'input
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="text-[12px] text-slate-600 font-mono p-4">Loading titles...</div>
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
            Games
          </h1>
          <p className="text-[12px] text-slate-600 font-mono mt-1">
            {filteredGames.length} titles in portfolio
          </p>
        </div>
        <span className="bg-[#0d1424] border border-[#1e2d45] text-slate-400 text-[11px] font-bold font-mono px-3 py-1.5 rounded-full">
          {games.filter(g => g.status === 'live').length} LIVE
        </span>
      </div>

      {/* Il tuo nuovo componente: aggiorna lo stato 'search' ad ogni lettera digitata */}
      <GameSearch onSearchChange={(value) => setSearch(value)} />

      {/* Table */}
      <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl overflow-hidden mt-4">

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-[#1e2d45]">
          {['Game', 'Category', 'Rounds Played', 'Status', ''].map((h) => (
            <span key={h} className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-600">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
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
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <span className="text-[13px] font-semibold text-slate-200">
                      {game.title}
                    </span>
                  </div>

                  {/* Category */}
                  <span className="text-[12px] text-slate-500 font-medium">
                    {game.category ?? '—'}
                  </span>

                  {/* Rounds */}
                  <span className="text-[12px] font-mono text-emerald-400">
                    {game.roundsPlayed.toLocaleString()}
                  </span>

                  {/* Status pill */}
                  <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${style.pill}`}>
                    {game.status}
                  </span>

                  {/* CTA */}
                  <Link
                    href={`/games/${game.id}`}
                    className="text-[11px] font-bold text-slate-500 hover:text-emerald-400 transition-colors duration-150 flex items-center gap-1 justify-end"
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
    </div>
  )
}