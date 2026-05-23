// src/types/index.ts
export type GameStatus = 'live' | 'beta' | 'maintenance'
export type PartnerStatus = 'active' | 'pending' | 'inactive'

export interface Game {
  id: string
  title: string
  status: GameStatus
  category?: string
  rtp?: number
  roundsPlayed: number
  markets?: number | string
  launchDate?: string
}

export interface Partner {
  id: string
  name: string
  country?: string
  status: PartnerStatus
  gamesCount?: number
  monthlyRounds?: number
}

export interface KpiStats {
  activeGames: number
  totalRounds: number
  connectedPartners: number
}