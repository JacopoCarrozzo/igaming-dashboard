export interface Game {
  id: number;
  title: string;
  status: 'Active' | 'Maintenance';
  rtp: number;  // Return to Player
  roundsPlayed: number;
}

export interface Partner {
  id: number;
  name: string;
  email: string;
  integrationStatus: 'Connected' | 'Pending' | 'Failed';
}

export interface KpiStats {
  activeGames: number;
  totalRounds: number;
  connectedPartners: number;
}