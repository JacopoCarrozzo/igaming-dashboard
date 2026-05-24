// app/layout.tsx
import './globals.css'
import { DM_Mono, Syne } from 'next/font/google'
import Sidebar from '@/components/ui/Sidebar'
import type { Metadata } from 'next'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const mono = DM_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'TaDa B2B Portal',
  description: 'Operator Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${mono.variable}`}>
     
      <body className="flex h-screen bg-[#0a0f1a] text-slate-200 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 pt-20 md:pt-8">
          {children}
        </main>
      </body>
    </html>
  )
}