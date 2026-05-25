'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Overview', icon: 'ti-layout-dashboard' },
  { href: '/games', label: 'Games', icon: 'ti-device-gamepad-2' },
  { href: '/partners', label: 'Partners', icon: 'ti-building-store' },
]

const analyticsItems = [
  { href: '/reports', label: 'Reports', icon: 'ti-chart-bar' },
  { href: '/revenue', label: 'Revenue', icon: 'ti-coin' },
  { href: '/markets', label: 'Markets', icon: 'ti-map-pin' },
]

const configItems = [
  { href: '/rtp', label: 'RTP Config', icon: 'ti-adjustments' },
  { href: '/giftcode', label: 'GiftCode', icon: 'ti-gift' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[200px] bg-[#0d1424] border-r border-[#1e2d45] flex flex-col shrink-0">

      <div className="px-5 py-5 border-b border-[#1e2d45]">
        <div className="text-[14px] font-extrabold tracking-[0.15em] text-emerald-400 uppercase">
          TaDa<span className="text-slate-100"> · B2B</span>
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.1em] mt-1">
          OPERATOR PORTAL
        </div>
      </div>

      <nav className="flex flex-col mt-4">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}

        <SectionLabel >Analytics</SectionLabel>
        {analyticsItems.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}

        <SectionLabel>Config</SectionLabel>
        {configItems.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>

      <div className="mt-auto px-5 py-4 border-t border-[#1e2d45]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
          <span className="text-[11px] text-slate-500">All systems operational</span>
        </div>
      </div>

    </aside>
  )
}

function NavItem({ href, label, icon, active }: {
  href: string
  label: string
  icon: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold border-l-2 transition-all duration-150
        ${active
          ? 'text-emerald-400 border-emerald-400 bg-emerald-400/5'
          : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.03]'
        }`}
    >
      <i className={`ti ${icon} text-base`} aria-hidden="true" />
      {label}
    </Link>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pt-6 pb-2 text-[11px] font-bold tracking-[0.05em] text-emerald-500 uppercase">
      {children}
    </div>
  )
}