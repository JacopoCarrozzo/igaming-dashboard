// components/ui/overview/MarketBars.tsx
const MARKETS = [
  { label: 'Brazil',  pct: 82, accent: 'from-emerald-400 to-cyan-400' },
  { label: 'UK',      pct: 61, accent: 'from-indigo-400 to-violet-400' },
  { label: 'Germany', pct: 47, accent: 'from-amber-400 to-orange-400' },
  { label: 'Sweden',  pct: 38, accent: 'from-rose-400 to-pink-400' },
  { label: 'Greece',  pct: 22, accent: 'from-slate-500 to-slate-600' },
]

export default function MarketBars() {
  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-600 mb-4">
        Rounds by Market
      </p>
      <div className="flex flex-col gap-3">
        {MARKETS.map(({ label, pct, accent }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400 w-16 shrink-0">
              {label}
            </span>
            <div className="flex-1 h-1.5 bg-[#1e2d45] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${accent}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-600 w-8 text-right shrink-0">
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}