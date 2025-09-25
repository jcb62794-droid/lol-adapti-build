import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChampionAnalysis } from '@/components/ChampionAnalysis';
import { BuildRecommendation } from '@/components/BuildRecommendation';
import { RealTimeBuildAnalyzer } from '@/components/RealTimeBuildAnalyzer';
import { MatchTracker } from '@/components/MatchTracker';
import { InteractiveChampionGrid } from '@/components/InteractiveChampionGrid';
import { default as AISettings } from '@/components/AISettings';
import { DatabaseView } from '@/components/DatabaseView';
import { DevMode } from '@/components/DevMode';
import { AppProvider } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { populateDatabase } from '@/utils/populateDatabase';
import { champions } from '@/data/champions';

const Index = () => {
  const [devMode, setDevMode] = useState(false);
  const [isPopulating, setIsPopulating] = useState(false);
  const { toast } = useToast();

  const handlePopulateDatabase = async () => {
    setIsPopulating(true);
    try {
      const success = await populateDatabase();
      if (success) {
        toast({
          title: "Banco atualizado!",
          description: "Todos os campeões e itens foram atualizados no banco de dados"
        });
      } else {
        throw new Error("Falha na população");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao popular o banco de dados",
        variant: "destructive"
      });
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img 
                  src="/src/assets/lol-ai-logo.jpg" 
                  alt="LoL AI Logo" 
                  className="w-16 h-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    LoL AI Assistant
                  </h1>
                  <p className="text-xl text-muted-foreground mt-2">Análise inteligente em tempo real para League of Legends</p>
                </div>
              </div>
              
              {/* Live Stats Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-6">
                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-500">168</div>
                  <div className="text-sm text-muted-foreground">Campeões</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-500">200+</div>
                  <div className="text-sm text-muted-foreground">Itens</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-500">4</div>
                  <div className="text-sm text-muted-foreground">Modos de Jogo</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-500">IA</div>
                  <div className="text-sm text-muted-foreground">Análises</div>
                </div>
              </div>

              {/* Champion Showcase */}
              <div className="flex justify-center items-center gap-2 mb-6 overflow-x-auto">
                {champions.slice(0, 8).map((champion, index) => (
                  <div key={champion.id} className="flex-shrink-0 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
                      <img 
                        src={champion.image} 
                        alt={champion.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/src/assets/champions/placeholder.png';
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-sm text-muted-foreground ml-2">+160 mais</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handlePopulateDatabase}
                disabled={isPopulating}
                className="bg-card/50 backdrop-blur-sm"
              >
                {isPopulating ? 'Atualizando...' : 'Atualizar BD'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setDevMode(!devMode)}
                className="bg-card/50 backdrop-blur-sm"
              >
                {devMode ? 'Modo Normal' : 'Dev Mode'}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

          {devMode && <DevMode />}

          <Tabs defaultValue="realtime-analyzer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="realtime-analyzer">IA Tempo Real</TabsTrigger>
              <TabsTrigger value="champions-grid">Campeões</TabsTrigger>
              <TabsTrigger value="champion-analysis">Análise</TabsTrigger>
              <TabsTrigger value="build-recommendation">Builds</TabsTrigger>
              <TabsTrigger value="match-tracker">Partida</TabsTrigger>
              <TabsTrigger value="ai-settings">IA Config</TabsTrigger>
              <TabsTrigger value="database">BD</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime-analyzer">
              <RealTimeBuildAnalyzer />
            </TabsContent>

            <TabsContent value="champions-grid">
              <InteractiveChampionGrid />
            </TabsContent>

            <TabsContent value="champion-analysis">
              <ChampionAnalysis />
            </TabsContent>

            <TabsContent value="build-recommendation">
              <BuildRecommendation />
            </TabsContent>

            <TabsContent value="match-tracker">
              <MatchTracker />
            </TabsContent>

            <TabsContent value="ai-settings">
              <AISettings />
            </TabsContent>

            <TabsContent value="database">
              <DatabaseView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppProvider>
  );
};

export default Index;