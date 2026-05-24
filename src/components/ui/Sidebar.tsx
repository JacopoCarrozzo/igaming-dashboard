// components/ui/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

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
  const [mobileOpen, setMobileOpen] = useState(false)

  // Blocca lo scroll del body quando il menu è aperto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e2d45] flex items-center justify-between">
        <div>
          <div className="text-[14px] font-extrabold tracking-[0.15em] text-emerald-400 uppercase">
            TaDa<span className="text-slate-100"> · B2B</span>
          </div>
          <div className="text-[10px] text-slate-500 tracking-[0.1em] mt-1">
            OPERATOR PORTAL
          </div>
        </div>
        {/* Close button — solo mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Close menu"
        >
          <i className="ti ti-x text-lg" aria-hidden="true" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col mt-4">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}

        <SectionLabel>Analytics</SectionLabel>
        {analyticsItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}

        <SectionLabel>Config</SectionLabel>
        {configItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Status */}
      <div className="mt-auto px-5 py-4 border-t border-[#1e2d45]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
          <span className="text-[11px] text-slate-500">All systems operational</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* ─── MOBILE: topbar con hamburger ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-[#1e2d45]">
        <div className="text-[13px] font-extrabold tracking-[0.15em] text-emerald-400 uppercase">
          TaDa<span className="text-slate-100"> · B2B</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Open menu"
        >
          <i className="ti ti-menu-2 text-xl" aria-hidden="true" />
        </button>
      </div>

      {/* ─── MOBILE: overlay scuro ─── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─── MOBILE: drawer ─── */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-[240px] bg-[#0d1424] border-r border-[#1e2d45] flex flex-col transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {sidebarContent}
      </aside>

      {/* ─── DESKTOP: sidebar fissa ─── */}
      <aside className="hidden md:flex w-[200px] bg-[#0d1424] border-r border-[#1e2d45] flex-col shrink-0">
        {sidebarContent}
      </aside>
    </>
  )
}

function NavItem({ href, label, icon, active, onNavigate }: {
  href: string
  label: string
  icon: string
  active: boolean
  onNavigate: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
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
    <div className="px-5 pt-5 pb-1.5 text-[10px] font-bold tracking-[0.12em] text-slate-700 uppercase">
      {children}
    </div>
  )
}