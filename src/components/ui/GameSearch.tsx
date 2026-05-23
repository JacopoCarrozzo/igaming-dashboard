// components/ui/GameSearch.tsx
'use client'

import { useState } from 'react'

interface GameSearchProps {
  onSearchChange: (value: string) => void
}

export default function GameSearch({ onSearchChange }: GameSearchProps) {
  const [term, setTerm] = useState('') // ECCO LO USESTATE RICHIESTO!

  const handleChange = (value: string) => {
    setTerm(value)
    onSearchChange(value)
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Filter games instantly..."
        value={term}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full max-w-sm bg-[#0d1424] border border-[#1e2d45] rounded-xl px-4 py-2.5 text-[13px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-400/50 transition-colors font-medium font-mono"
      />
    </div>
  )
}