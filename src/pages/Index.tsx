import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BuildRecommendation from "@/components/BuildRecommendation";
import MatchTracker from "@/components/MatchTracker";
import ChampionAnalysis from "@/components/ChampionAnalysis";
import AISettings from "@/components/AISettings";
import logoImage from "@/assets/lol-ai-logo.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("builds");

  // Dados simulados para as builds
  const buildData = {
    perfect: {
      items: [
        { id: "1", name: "Galeforce", cost: 3400, stats: ["+55 AD", "+20% Crit", "+7% MS"] },
        { id: "2", name: "The Collector", cost: 3000, stats: ["+55 AD", "+20% Crit", "+12 Lethality"] },
        { id: "3", name: "Infinity Edge", cost: 3400, stats: ["+70 AD", "+20% Crit", "35% Crit DMG"] }
      ],
      winRate: 87,
      confidence: 94
    },
    better: {
      items: [
        { id: "4", name: "Kraken Slayer", cost: 3400, stats: ["+65 AD", "+25% AS", "+20% Crit"] },
        { id: "5", name: "Phantom Dancer", cost: 2600, stats: ["+25% AS", "+20% Crit", "+7% MS"] },
        { id: "6", name: "Lord Dominik", cost: 3000, stats: ["+35 AD", "+20% Crit", "+35% Armor Pen"] }
      ],
      winRate: 78,
      confidence: 87
    },
    good: {
      items: [
        { id: "7", name: "Immortal Shieldbow", cost: 3400, stats: ["+50 AD", "+20% AS", "+20% Crit"] },
        { id: "8", name: "Berserker's Greaves", cost: 1100, stats: ["+35% AS", "+45 MS"] },
        { id: "9", name: "Runaan's Hurricane", cost: 2600, stats: ["+40% AS", "+20% Crit", "Bolts"] }
      ],
      winRate: 65,
      confidence: 72
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="LoL AI Coach Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  LoL AI Coach
                </h1>
                <p className="text-sm text-muted-foreground">
                  Recomendações IA Adaptáveis para League of Legends
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">Invocador: <span className="text-accent">SeuNome#BR1</span></div>
                <div className="text-xs text-muted-foreground">Platina II - 67 LP</div>
              </div>
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card">
            <TabsTrigger value="builds" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Builds IA
            </TabsTrigger>
            <TabsTrigger value="tracker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Match Tracker
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Análise Campeão
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Builds Tab */}
          <TabsContent value="builds" className="space-y-6">
            <Card className="bg-gradient-secondary border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded flex items-center justify-center text-xs font-bold text-background">
                    IA
                  </div>
                  Recomendações Adaptáveis de Build
                </CardTitle>
                <p className="text-muted-foreground">
                  A IA analisa seu jogo em tempo real e sugere as melhores builds baseadas na composição inimiga
                </p>
              </CardHeader>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-3">
              <BuildRecommendation 
                type="perfect" 
                items={buildData.perfect.items}
                winRate={buildData.perfect.winRate}
                confidence={buildData.perfect.confidence}
              />
              <BuildRecommendation 
                type="better" 
                items={buildData.better.items}
                winRate={buildData.better.winRate}
                confidence={buildData.better.confidence}
              />
              <BuildRecommendation 
                type="good" 
                items={buildData.good.items}
                winRate={buildData.good.winRate}
                confidence={buildData.good.confidence}
              />
            </div>
          </TabsContent>

          {/* Match Tracker Tab */}
          <TabsContent value="tracker">
            <MatchTracker />
          </TabsContent>

          {/* Champion Analysis Tab */}
          <TabsContent value="analysis">
            <ChampionAnalysis />
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">73%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Vitória Geral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">156</div>
                    <div className="text-sm text-muted-foreground">Partidas Analisadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">+342</div>
                    <div className="text-sm text-muted-foreground">LP Ganho</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning">89%</div>
                    <div className="text-sm text-muted-foreground">Precisão IA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campeões Mais Jogados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Jinx", "Caitlyn", "Kai'Sa", "Vayne", "Ashe"].map((champ, index) => (
                    <div key={champ} className="flex items-center justify-between p-2 rounded bg-secondary">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                          {champ.slice(0, 2)}
                        </div>
                        <span className="font-medium">{champ}</span>
                      </div>
                      <div className="text-sm font-medium text-success">
                        {(85 - index * 5)}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Builds Mais Efetivas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Galeforce + Collector", "Kraken + PD", "Shieldbow + IE", "Eclipse Build", "Lethality Build"].map((build, index) => (
                    <div key={build} className="flex items-center justify-between p-2 rounded bg-secondary">
                      <span className="font-medium">{build}</span>
                      <div className="text-sm font-medium text-accent">
                        {(92 - index * 3)}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <AISettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;