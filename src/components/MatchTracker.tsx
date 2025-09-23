import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import jinxImage from "@/assets/champions/jinx.jpg";
import caitlynImage from "@/assets/champions/caitlyn.jpg";
import kaisaImage from "@/assets/champions/kaisa.jpg";
import vayneImage from "@/assets/champions/vayne.jpg";
import asheImage from "@/assets/champions/ashe.jpg";

interface Player {
  name: string;
  champion: string;
  role: string;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  items: string[];
}

interface MatchData {
  gameTime: string;
  allyTeam: Player[];
  enemyTeam: Player[];
  nextObjective: string;
  recommendations: {
    action: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }[];
}

const MatchTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [matchData, setMatchData] = useState<MatchData>({
    gameTime: "15:42",
    allyTeam: [
      { name: "Você", champion: "Jinx", role: "ADC", level: 12, kills: 4, deaths: 1, assists: 6, items: ["Galeforce", "Collector"] },
      { name: "JungleKing", champion: "Graves", role: "JNG", level: 11, kills: 2, deaths: 2, assists: 8, items: ["Eclipse", "Youmuu"] },
      { name: "MidLaner", champion: "Yasuo", role: "MID", level: 13, kills: 6, deaths: 3, assists: 4, items: ["Shieldbow", "IE"] },
      { name: "TopPlayer", champion: "Garen", role: "TOP", level: 10, kills: 1, deaths: 2, assists: 7, items: ["Stridebreaker"] },
      { name: "Support", champion: "Thresh", role: "SUP", level: 9, kills: 0, deaths: 4, assists: 12, items: ["Locket"] }
    ],
    enemyTeam: [
      { name: "EnemyADC", champion: "Vayne", role: "ADC", level: 11, kills: 3, deaths: 2, assists: 5, items: ["Kraken", "PD"] },
      { name: "EnemyJNG", champion: "Lee Sin", role: "JNG", level: 12, kills: 5, deaths: 1, assists: 6, items: ["Goredrinker"] },
      { name: "EnemyMID", champion: "Zed", role: "MID", level: 13, kills: 7, deaths: 4, assists: 2, items: ["Eclipse", "Youmuu"] },
      { name: "EnemyTOP", champion: "Darius", role: "TOP", level: 11, kills: 2, deaths: 3, assists: 4, items: ["Stridebreaker"] },
      { name: "EnemySUP", champion: "Leona", role: "SUP", level: 8, kills: 1, deaths: 5, assists: 11, items: ["Locket"] }
    ],
    nextObjective: "Dragon (1:30)",
    recommendations: [
      { action: "Compre Phantom Dancer", priority: 'high', reason: "Contra composição inimiga com muito engage" },
      { action: "Foque no Zed nas teamfights", priority: 'high', reason: "Ele está muito fed e pode te deletar" },
      { action: "Prepare para Dragon", priority: 'medium', reason: "Controle de visão necessário" }
    ]
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        // Simular atualização de dados em tempo real
        setMatchData(prev => ({
          ...prev,
          gameTime: updateGameTime(prev.gameTime)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const updateGameTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds + 1;
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    return `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status de Tracking */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-success animate-pulse' : 'bg-muted'}`} />
              Match Tracker
            </CardTitle>
            <Button 
              onClick={() => setIsTracking(!isTracking)}
              variant={isTracking ? "destructive" : "default"}
            >
              {isTracking ? "Parar Tracking" : "Iniciar Tracking"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tempo de Jogo:</span>
            <span className="font-mono font-bold text-accent text-lg">{matchData.gameTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Próximo Objetivo:</span>
            <Badge variant="outline" className="border-accent text-accent">
              {matchData.nextObjective}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações IA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recomendações IA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {matchData.recommendations.map((rec, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary border border-border"
            >
              <Badge className={`${getPriorityColor(rec.priority)} text-white shrink-0`}>
                {rec.priority.toUpperCase()}
              </Badge>
              <div className="flex-1">
                <h4 className="font-medium">{rec.action}</h4>
                <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Times */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Time Aliado */}
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Time Aliado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchData.allyTeam.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-xs font-bold">
                    {player.champion.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.champion} - {player.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{player.kills}/{player.deaths}/{player.assists}</div>
                  <div className="text-xs text-muted-foreground">Lvl {player.level}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Inimigo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Time Inimigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchData.enemyTeam.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-xs font-bold">
                    {player.champion.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.champion} - {player.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{player.kills}/{player.deaths}/{player.assists}</div>
                  <div className="text-xs text-muted-foreground">Lvl {player.level}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchTracker;