// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400 font-mono">
        Coming Soon
      </div>
      <h2 className="text-[28px] font-extrabold text-slate-100 tracking-tight">
        Under Construction
      </h2>
      <p className="text-[13px] text-slate-500 font-mono">
        This section is not available yet.
      </p>
    </div>
  )
}