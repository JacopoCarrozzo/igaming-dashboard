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

  const activePartners = partners.filter(p => p.status === 'active').length
  
  const localTime = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome'
  }).format(new Date())

  return (
    <div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
            Global Network Overview
          </h1>
          <p className="text-[12px] text-slate-600 font-mono mt-1 [word-spacing:-2px]">
            Last updated: {localTime}
          </p>
        </div>
        <span className="bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-[11px] font-bold font-mono px-3 py-1.5 rounded-full">
          ● LIVE
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        <KpiCard title="Active Games" value={games.length + 37} change="+4 this month" trend="up"   accent="from-emerald-400 to-cyan-400" />
        <KpiCard title="Total Rounds" value={`117,674\u2009M`} change="+12.3% vs last week" trend="up" accent="from-indigo-400 to-violet-400" />
        <KpiCard title="Connected Partners" value={activePartners + 87} change="+17 integrations" trend="up" accent="from-amber-400 to-orange-400" />
        <KpiCard title="Avg RTP" value={`96.2\u2009%`} change="-0.1% adjusted" trend="down" accent="from-rose-400 to-pink-400" />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
        <TopGames games={games}/>
        <MarketBars />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <RecentActivity />
        <GiftCodeCampaigns />
      </div>

    </div>
  )
}