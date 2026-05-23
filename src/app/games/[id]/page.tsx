// src/app/games/[id]/page.tsx
import { getGameById } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' // SSR — dati freschi ad ogni richiesta

const statusStyles: Record<string, { pill: string; dot: string; label: string }> = {
  live:        { pill: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', dot: 'bg-emerald-400 shadow-[0_0_6px_#4ade80]', label: 'Live' },
  beta:        { pill: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',       dot: 'bg-amber-400',                              label: 'Beta' },
  maintenance: { pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/20',       dot: 'bg-slate-500',                              label: 'Maintenance' },
}

export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id)

  if (!game) notFound()

  const style = statusStyles[game.status] ?? statusStyles.maintenance

  return (
    <div>

      {/* Back */}
      <Link
        href="/games"
        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-emerald-400 transition-colors mb-6"
      >
        <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
        Back to Games
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full shrink-0 ${style.dot}`} />
          <div>
            <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
              {game.title}
            </h1>
            <p className="text-[12px] text-slate-600 font-mono mt-1">
              ID: {game.id} · {game.category ?? 'Uncategorized'}
            </p>
          </div>
        </div>
        <span className={`inline-flex px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${style.pill}`}>
          {style.label}
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Rounds Played',  value: game.roundsPlayed.toLocaleString(), accent: 'from-emerald-400 to-cyan-400' },
          { label: 'RTP',            value: `${game.rtp ?? 96.2}%`,             accent: 'from-indigo-400 to-violet-400' },
          { label: 'Active Markets', value: game.markets ?? '—',                accent: 'from-amber-400 to-orange-400' },
        ].map(({ label, value, accent }) => (
          <div key={label} className="relative bg-[#0d1424] border border-[#1e2d45] rounded-xl p-4 overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent}`} />
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-2">{label}</p>
            <p className="text-[24px] font-extrabold text-slate-100 tracking-tight font-mono">{value}</p>
          </div>
        ))}
      </div>

      {/* Details card */}
      <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e2d45]">
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-600">
            Game Details
          </span>
        </div>
        <div className="divide-y divide-[#0f172a]">
          {[
            { label: 'Title',       value: game.title },
            { label: 'Category',    value: game.category ?? '—' },
            { label: 'Status',      value: style.label },
            { label: 'RTP',         value: `${game.rtp ?? 96.2}%` },
            { label: 'Rounds',      value: game.roundsPlayed.toLocaleString() },
            { label: 'Markets',     value: game.markets ?? '—' },
            { label: 'Launch Date', value: game.launchDate ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[12px] font-bold text-slate-500 tracking-wide">{label}</span>
              <span className="text-[13px] font-mono text-slate-200">{value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}