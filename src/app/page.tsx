import { getGames } from '@/lib/api';
import KpiCard from '@/components/ui/KpiCard';

export default async function DashboardOverview() {
  const games = await getGames();
  
  const activeGamesCount = games.length;
  const totalRounds = games.reduce((acc, game) => acc + game.roundsPlayed, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard 
          title="Active Games" 
          value={activeGamesCount} 
          description="Games currently in production" 
        />
        <KpiCard 
          title="Total Rounds" 
          value={totalRounds} 
          description="Total rounds played across all games" 
        />
        <KpiCard 
          title="Connected Partners" 
          value="12" 
          description="Third-party casino operators" 
        />
      </div>
    </div>
  );
}