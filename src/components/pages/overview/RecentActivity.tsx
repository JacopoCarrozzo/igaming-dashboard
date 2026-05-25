const ACTIVITY = [
  { color: 'bg-emerald-400', text: 'Betsson activated', highlight: 'Ocean King Pro',    time: '3m ago' },
  { color: 'bg-indigo-400',  text: 'Light & Wonder synced', highlight: '12 new titles',     time: '18m ago' },
  { color: 'bg-amber-400',   text: 'Blaze BR updated', highlight: 'GiftCode campaign', time: '42m ago' },
  { color: 'bg-cyan-400',    text: 'Relax Gaming API', highlight: 'cert renewed', time: '1h ago' },
  { color: 'bg-violet-400',  text: 'BetConstruct enabled', highlight: 'WIN CARD feature', time: '2h ago' },
  { color: 'bg-rose-400',    text: 'Softswiss flagged', highlight: 'RTP deviation', time: '3h ago' },
]

export default function RecentActivity() {
  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-4">
        Recent Partner Activity
      </p>
      <ul className="flex flex-col gap-3">
        {ACTIVITY.map(({ color, text, highlight, time }, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px] ${color}`} />
            <span className="text-[13px] font-semibold text-slate-500 flex-1">
              {text}{' '}
              {highlight && (
                <strong className="text-slate-200 font-semibold">{highlight}</strong>
              )}
            </span>
            <span className="text-[13px] font-mono text-slate-500 shrink-0">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}