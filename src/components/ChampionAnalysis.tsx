import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChampionStat {
  name: string;
  value: number;
  rank: 'S+' | 'S' | 'A' | 'B' | 'C';
  trend: 'up' | 'down' | 'stable';
}

interface ChampionData {
  name: string;
  role: string;
  tier: string;
  winRate: number;
  pickRate: number;
  banRate: number;
  difficulty: number;
  stats: ChampionStat[];
  matchups: {
    name: string;
    winRate: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

const ChampionAnalysis = () => {
  const [searchChampion, setSearchChampion] = useState("");
  const [selectedChampion, setSelectedChampion] = useState<ChampionData>({
    name: "Jinx",
    role: "ADC",
    tier: "S",
    winRate: 52.3,
    pickRate: 8.7,
    banRate: 2.1,
    difficulty: 6,
    stats: [
      { name: "Early Game", value: 85, rank: 'A', trend: 'up' },
      { name: "Mid Game", value: 92, rank: 'S', trend: 'up' },
      { name: "Late Game", value: 95, rank: 'S+', trend: 'stable' },
      { name: "Team Fight", value: 88, rank: 'A', trend: 'up' },
      { name: "Objective Control", value: 78, rank: 'B', trend: 'down' }
    ],
    matchups: [
      { name: "Vayne", winRate: 45, difficulty: 'hard' },
      { name: "Caitlyn", winRate: 52, difficulty: 'medium' },
      { name: "Ashe", winRate: 58, difficulty: 'easy' },
      { name: "Kai'Sa", winRate: 49, difficulty: 'medium' },
      { name: "Draven", winRate: 43, difficulty: 'hard' }
    ]
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S+': return 'bg-gradient-perfect';
      case 'S': return 'bg-gradient-accent';
      case 'A': return 'bg-gradient-better';
      case 'B': return 'bg-gradient-good';
      default: return 'bg-muted';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'S+': return 'text-accent';
      case 'S': return 'text-warning';
      case 'A': return 'text-success';
      case 'B': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getMatchupColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'border-success bg-success/10';
      case 'medium': return 'border-warning bg-warning/10';
      case 'hard': return 'border-destructive bg-destructive/10';
      default: return 'border-border';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Champion */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Campeão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Digite o nome do campeão..."
              value={searchChampion}
              onChange={(e) => setSearchChampion(e.target.value)}
              className="flex-1"
            />
            <Button>Analisar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Champion Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-2xl font-bold">
                {selectedChampion.name.slice(0, 2)}
              </div>
              <div>
                <CardTitle className="text-2xl">{selectedChampion.name}</CardTitle>
                <p className="text-muted-foreground">{selectedChampion.role}</p>
              </div>
            </div>
            <Badge className={`${getTierColor(selectedChampion.tier)} text-background font-bold text-lg px-3 py-1`}>
              Tier {selectedChampion.tier}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{selectedChampion.winRate}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Vitória</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{selectedChampion.pickRate}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Pick</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{selectedChampion.banRate}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Ban</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{selectedChampion.difficulty}/10</div>
              <div className="text-sm text-muted-foreground">Dificuldade</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Fase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedChampion.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stat.name}</span>
                  <span className={`text-sm font-bold ${getRankColor(stat.rank)}`}>
                    {stat.rank}
                  </span>
                  <span className="text-sm">{getTrendIcon(stat.trend)}</span>
                </div>
                <span className="text-sm font-medium">{stat.value}/100</span>
              </div>
              <Progress value={stat.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Matchups */}
      <Card>
        <CardHeader>
          <CardTitle>Matchups Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {selectedChampion.matchups.map((matchup, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg border-2 ${getMatchupColor(matchup.difficulty)}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-sm">
                    {matchup.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium">{matchup.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">{matchup.difficulty}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${matchup.winRate >= 50 ? 'text-success' : 'text-destructive'}`}>
                    {matchup.winRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChampionAnalysis;