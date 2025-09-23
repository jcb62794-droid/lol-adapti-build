import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildRecommendation } from '@/components/BuildRecommendation';
import { ChampionAnalysis } from '@/components/ChampionAnalysis';
import { MatchTracker } from '@/components/MatchTracker';
import { DevMode } from '@/components/DevMode';
import { useApp } from '@/contexts/AppContext';
import { Brain, BarChart3, Target, Settings, Code } from 'lucide-react';
import logoImage from '@/assets/lol-ai-logo.jpg';

const Index = () => {
  const [currentBuild, setCurrentBuild] = useState(null);
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="LoL AI Coach" className="w-12 h-12 rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('lol_ai_coach')}</h1>
            <p className="text-muted-foreground">{t('ai_recommendations')}</p>
          </div>
        </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
      <Tabs defaultValue="builds" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="builds" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            {t('builds_ia')}
          </TabsTrigger>
          <TabsTrigger value="tracker" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            {t('match_tracker')}
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            {t('champion_analysis')}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t('settings')}
          </TabsTrigger>
          <TabsTrigger value="dev" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {t('dev_mode')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builds" className="space-y-4">
          <BuildRecommendation />
        </TabsContent>

        <TabsContent value="tracker" className="space-y-4">
          <MatchTracker />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <ChampionAnalysis />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings')}</CardTitle>
              <CardDescription>Ajuste suas preferências</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configurações em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dev" className="space-y-4">
          <DevMode />
        </TabsContent>
      </Tabs>
      </main>
    </div>
  );
};

export default Index;