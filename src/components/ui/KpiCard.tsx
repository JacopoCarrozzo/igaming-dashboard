// components/ui/KpiCard.tsx
interface KpiCardProps {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down'
  accent: string
}

export default function KpiCard({ title, value, change, trend, accent }: KpiCardProps) {
  return (
    <div className="relative bg-[#0d1424] border border-[#1e2d45] rounded-xl p-4 overflow-hidden">
      
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent}`} />

      <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-2">
        {title}
      </p>

      <p className="text-[26px] font-extrabold text-slate-100 tracking-tight font-mono leading-none [word-spacing:2px]">
        {value}
      </p>

      <p className={`text-[13px] font-mono mt-2 ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </p>

    </div>
  )
}