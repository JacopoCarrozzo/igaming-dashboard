import { Game, Partner } from '@/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getGames(): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/posts?_limit=5`, {
    next: { revalidate: 60 } // ISR configuration
  });
  const data = await res.json();
  
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    status: 'Active',
    rtp: 96.5,
    roundsPlayed: Math.floor(Math.random() * 1000)
  }));
}