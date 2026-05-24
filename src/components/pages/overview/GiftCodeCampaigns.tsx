// components/ui/overview/GiftCodeCampaigns.tsx
const CAMPAIGNS = [
  { name: 'Welcome Spins', partner: 'BetClic', claims: 14820, color: 'text-emerald-400' },
  { name: 'LatAm Promo',   partner: 'Blaze',   claims: 9103,  color: 'text-emerald-400' },
  { name: 'VIP Bonus',     partner: '1xBet',   claims: 3441,  color: 'text-amber-400' },
  { name: 'Reload Offer',  partner: 'iGP',     claims: 812,   color: 'text-slate-500' },
]

export default function GiftCodeCampaigns() {
  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-4">
        GiftCode Campaigns
      </p>
      <ul className="flex flex-col gap-3">
        {CAMPAIGNS.map(({ name, partner, claims, color }) => (
          <li key={name} className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-slate-200 flex-1">{name}</span>
            <span className="text-[11px] text-slate-600 shrink-0">{partner}</span>
            <span className={`text-[12px] font-bold font-mono shrink-0 ${color}`}>
              {claims.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}