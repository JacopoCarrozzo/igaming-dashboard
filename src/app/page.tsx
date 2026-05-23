// app/page.tsx
import { getGames } from '@/lib/api'
import KpiCard from '@/components/ui/KpiCard'

export default async function DashboardOverview() {
  const games = await getGames()

  const activeGamesCount = games.length
  const totalRounds = games.reduce((acc, game) => acc + game.roundsPlayed, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
            Overview
          </h1>
          <p className="text-[12px] text-slate-600 font-mono mt-1">
            Last updated: {new Date().toUTCString().slice(0, 22)} UTC
          </p>
        </div>
        <span className="bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-[11px] font-bold font-mono px-3 py-1.5 rounded-full">
          ● LIVE
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        <KpiCard
          title="Active Games"
          value={activeGamesCount}
          change="+4 this month"
          trend="up"
          accent="from-emerald-400 to-cyan-400"
        />
        <KpiCard
          title="Total Rounds"
          value={"117,456 M"}
          change="+12.3% vs last week"
          trend="up"
          accent="from-indigo-400 to-violet-400"
        />
        <KpiCard
          title="Connected Partners"
          value="312"
          change="+17 integrations"
          trend="up"
          accent="from-amber-400 to-orange-400"
        />
        <KpiCard
          title="Avg RTP"
          value="96.2 %"
          change="-0.1% adjusted"
          trend="down"
          accent="from-rose-400 to-pink-400"
        />
      </div>
    </div>
  )
}