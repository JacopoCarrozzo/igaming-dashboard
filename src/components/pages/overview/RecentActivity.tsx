// components/ui/overview/RecentActivity.tsx
const ACTIVITY = [
  { color: 'bg-emerald-400', text: 'BetClic integrated',          highlight: 'Dragon Fortune', time: '2m ago' },
  { color: 'bg-indigo-400',  text: 'Blaze updated RTP config',    highlight: null,              time: '14m ago' },
  { color: 'bg-amber-400',   text: 'iGP activated',               highlight: '5 new titles',   time: '1h ago' },
  { color: 'bg-cyan-400',    text: 'Starcasino.be API cert renewed', highlight: null,           time: '3h ago' },
]

export default function RecentActivity() {
  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-600 mb-4">
        Recent Partner Activity
      </p>
      <ul className="flex flex-col gap-3">
        {ACTIVITY.map(({ color, text, highlight, time }, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
            <span className="text-[12px] text-slate-500 flex-1">
              {text}{' '}
              {highlight && (
                <strong className="text-slate-200 font-semibold">{highlight}</strong>
              )}
            </span>
            <span className="text-[11px] font-mono text-slate-700 shrink-0">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}