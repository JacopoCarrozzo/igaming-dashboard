// app/page.tsx
import { getGames, getPartners } from '@/lib/api'
import KpiCard from '@/components/ui/KpiCard'
import TopGames from '@/components/pages/overview/TopGames'
import MarketBars from '@/components/pages/overview/MarketBars'
import RecentActivity from '@/components/pages/overview/RecentActivity'
import GiftCodeCampaigns from '@/components/pages/overview/GiftCodeCampaigns'

export const revalidate = 60

export default async function DashboardOverview() {
  const [games, partners] = await Promise.all([getGames(), getPartners()])

  const activePartners = partners.filter((p) => p.status === 'active').length

  const localTime = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome',
  }).format(new Date())

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-slate-100">
            Global Network Overview
          </h1>
          <p className="mt-1 font-mono text-[12px] text-slate-600 [word-spacing:-2px]">
            Last updated: {localTime}
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-[11px] font-bold text-emerald-400">
          ● LIVE
        </span>
      </div>


      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            
             <KpiCard
          title="Active Games"
          value={games.length + 37}
          change="+4 this month"
          trend="up"
          accent="from-emerald-400 to-cyan-400"
        />
        <KpiCard
          title="Total Rounds"
          value={`117,674\u2009M`}
          change="+12.3% vs last week"
          trend="up"
          accent="from-indigo-400 to-violet-400"
        />
        <KpiCard
          title="Connected Partners"
          value={activePartners + 87}
          change="+17 integrations"
          trend="up"
          accent="from-amber-400 to-orange-400"
        />
        <KpiCard
          title="Avg RTP"
          value={`96.2\u2009%`}
          change="-0.1% adjusted"
          trend="down"
          accent="from-rose-400 to-pink-400"
        />
      </div>

      {/* Row 1 */}
      <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <TopGames games={games} />
        <MarketBars />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <RecentActivity />
        <GiftCodeCampaigns />
      </div>
    </div>
  )
}
