// src/app/partners/page.tsx
import { getPartners } from '@/lib/api'

export const revalidate = 60 // ISR — si aggiorna ogni 60 secondi

const statusStyles: Record<string, { pill: string; dot: string }> = {
  active:   { pill: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', dot: 'bg-emerald-400 shadow-[0_0_6px_#4ade80]' },
  pending:  { pill: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',       dot: 'bg-amber-400' },
  inactive: { pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/20',       dot: 'bg-slate-500' },
}

export default async function PartnersPage() {
  const partners = await getPartners()

  return (
    <div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-100 tracking-tight">
            Partners
          </h1>
          <p className="text-[12px] text-slate-600 font-mono mt-1">
            {partners.length} operators · refreshes every 60s
          </p>
        </div>
        <span className="bg-[#0d1424] border border-[#1e2d45] text-slate-400 text-[11px] font-bold font-mono px-3 py-1.5 rounded-full">
          {partners.filter(p => p.status === 'active').length} ACTIVE
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {partners.map((partner) => {
          const style = statusStyles[partner.status] ?? statusStyles.inactive
          return (
            <div
              key={partner.id}
              className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5 hover:border-slate-600 transition-colors duration-150"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-[#1e2d45] flex items-center justify-center">
                    <span className="text-[13px] font-extrabold text-slate-300">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-200">{partner.name}</p>
                    <p className="text-[11px] text-slate-600 font-mono">{partner.country ?? '—'}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${style.pill}`}>
                  {partner.status}
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#0f172a]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600 mb-1">
                    Games
                  </p>
                  <p className="text-[16px] font-extrabold font-mono text-slate-100">
                    {partner.gamesCount ?? '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600 mb-1">
                    Monthly Rounds
                  </p>
                  <p className="text-[16px] font-extrabold font-mono text-emerald-400">
                    {partner.monthlyRounds ? `${(partner.monthlyRounds / 1000).toFixed(0)}K` : '—'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}