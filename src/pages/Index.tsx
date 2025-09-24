import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChampionAnalysis } from '@/components/ChampionAnalysis';
import { BuildRecommendation } from '@/components/BuildRecommendation';
import { RealTimeBuildAnalyzer } from '@/components/RealTimeBuildAnalyzer';
import { MatchTracker } from '@/components/MatchTracker';
import AISettings from '@/components/AISettings';
import { DatabaseView } from '@/components/DatabaseView';
import { DevMode } from '@/components/DevMode';
import { AppProvider } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { populateDatabase } from '@/utils/populateDatabase';

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
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LoL AI Assistant
              </h1>
              <p className="text-muted-foreground mt-2">Assistente inteligente para League of Legends</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePopulateDatabase}
                disabled={isPopulating}
              >
                {isPopulating ? 'Atualizando...' : 'Atualizar BD'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setDevMode(!devMode)}
              >
                {devMode ? 'Modo Normal' : 'Dev Mode'}
              </Button>
            </div>
          </div>

          {devMode && <DevMode />}

          <Tabs defaultValue="realtime-analyzer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="realtime-analyzer">IA Tempo Real</TabsTrigger>
              <TabsTrigger value="champion-analysis">Análise de Campeão</TabsTrigger>
              <TabsTrigger value="build-recommendation">Recomendação de Build</TabsTrigger>
              <TabsTrigger value="match-tracker">Acompanhar Partida</TabsTrigger>
              <TabsTrigger value="ai-settings">Configurações IA</TabsTrigger>
              <TabsTrigger value="database">Visualizar BD</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime-analyzer">
              <RealTimeBuildAnalyzer />
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