import { Game, Partner } from '@/types'

const BASE_URL = process.env.API_BASE_URL
if (!BASE_URL) throw new Error('API_BASE_URL is not defined in .env.local')
  
type RawPost = {
  id: number
  title: string
  body: string
  userId: number
}

const STATUSES = ['live', 'live', 'live', 'beta', 'maintenance'] as const
const CATEGORIES = ['Slot', 'Fishing', 'Crash', 'Bingo', 'Table'] as const
const COUNTRIES = ['Malta', 'UK', 'Germany', 'Sweden', 'Brazil'] as const
const PARTNER_STATUSES = ['active', 'active', 'active', 'pending', 'inactive'] as const

function seededValue(id: number, multiplier: number) {
  return Math.floor(((id * 9301 + 49297) % 233280) / 233280 * multiplier)
}

export async function getGames(): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/posts?_limit=10`, {
    next: { revalidate: 60 },
  })
  const data: RawPost[] = await res.json()

  return data.map((item) => ({
    id: String(item.id),
    title: item.title.slice(0, 24).replace(/^\w/, (c) => c.toUpperCase()),
    status: STATUSES[item.id % STATUSES.length],
    category: CATEGORIES[item.id % CATEGORIES.length],
    rtp: 94 + (item.id % 4) * 0.5,
    roundsPlayed: seededValue(item.id, 1_500_000),
    markets: 3 + (item.id % 5),
    launchDate: `202${3 + (item.id % 2)}-0${(item.id % 9) + 1}-15`,
  }))
}

export async function getGameById(id: string): Promise<Game | null> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    cache: 'no-store', 
  })
  if (!res.ok) return null

  const item: RawPost = await res.json()

  return {
    id: String(item.id),
    title: item.title.slice(0, 24).replace(/^\w/, (c) => c.toUpperCase()),
    status: STATUSES[item.id % STATUSES.length],
    category: CATEGORIES[item.id % CATEGORIES.length],
    rtp: 94 + (item.id % 4) * 0.5,
    roundsPlayed: seededValue(item.id, 1_500_000),
    markets: 3 + (item.id % 5),
    launchDate: `202${3 + (item.id % 2)}-0${(item.id % 9) + 1}-15`,
  }
}

export async function getPartners(): Promise<Partner[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    next: { revalidate: 60 },
  })
  const data = await res.json()

  return data.map((item: { id: number; name: string; company: { name: string } }) => ({
    id: String(item.id),
    name: item.company.name,
    country: COUNTRIES[item.id % COUNTRIES.length],
    status: PARTNER_STATUSES[item.id % PARTNER_STATUSES.length],
    gamesCount: 10 + seededValue(item.id, 90),
    monthlyRounds: seededValue(item.id, 500_000),
  }))
}