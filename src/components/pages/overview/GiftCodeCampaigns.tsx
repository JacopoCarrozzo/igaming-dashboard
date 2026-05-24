const CAMPAIGNS = [
  { name: 'Brazil Launch',    partner: 'Blaze',        claims: 48_203 },
  { name: 'Welcome Spins',    partner: 'BetConstruct', claims: 31_847 },
  { name: 'WIN CARD Promo',   partner: 'Softswiss',    claims: 19_102 },
  { name: 'VIP Reload',       partner: '1xBet',        claims: 8_441  },
  { name: 'LatAm Free Spins', partner: 'Betsson',      claims: 3_209  },
  { name: 'Reactivation',     partner: 'Relax Gaming', claims: 441    },
]

export default function GiftCodeCampaigns() {
  return (
    <div className="bg-[#0d1424] border border-[#1e2d45] rounded-xl p-5">
      <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500 mb-4">
        GiftCode Campaigns
      </p>
      <ul className="flex flex-col gap-3">
        {CAMPAIGNS.map(({ name, partner, claims }) => (
          <li key={name} className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-slate-200 flex-1">{name}</span>
            <span className="text-[11px] font-semibold text-slate-500 shrink-0">{partner}</span>
            <span className={`text-[12px] font-bold font-mono shrink-0 text-emerald-400`}>
              {claims.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}