import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Trophy, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TeamComposition {
  champion: string;
  lane: string;
}

interface BuildAnalysis {
  analysis: {
    matchup_overview: string;
    main_threats: string[];
    synergies: string[];
  };
  builds: Array<{
    type: string;
    name: string;
    items: string[];
    reasoning: string;
    win_rate_estimated: number;
    confidence: number;
  }>;
  counters: {
    hardest_counter: string;
    counter_tips: string[];
  };
}

export const RealTimeBuildAnalyzer = () => {
  const [champion, setChampion] = useState('');
  const [lane, setLane] = useState('');
  const [enemyTeam, setEnemyTeam] = useState<TeamComposition[]>([
    { champion: '', lane: 'TOP' },
    { champion: '', lane: 'JUNGLE' },
    { champion: '', lane: 'MID' },
    { champion: '', lane: 'ADC' },
    { champion: '', lane: 'SUPPORT' }
  ]);
  const [allyTeam, setAllyTeam] = useState<TeamComposition[]>([
    { champion: '', lane: 'TOP' },
    { champion: '', lane: 'JUNGLE' },
    { champion: '', lane: 'MID' },
    { champion: '', lane: 'ADC' },
    { champion: '', lane: 'SUPPORT' }
  ]);
  const [analysis, setAnalysis] = useState<BuildAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const lanes = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

  const updateEnemyTeam = (index: number, field: keyof TeamComposition, value: string) => {
    const newTeam = [...enemyTeam];
    newTeam[index][field] = value;
    setEnemyTeam(newTeam);
  };

  const updateAllyTeam = (index: number, field: keyof TeamComposition, value: string) => {
    const newTeam = [...allyTeam];
    newTeam[index][field] = value;
    setAllyTeam(newTeam);
  };

  const analyzeTeamComposition = async () => {
    if (!champion || !lane) {
      toast({
        title: "Informações incompletas",
        description: "Preencha seu campeão e lane",
        variant: "destructive"
      });
      return;
    }

    const filledEnemies = enemyTeam.filter(enemy => enemy.champion.trim() !== '');
    if (filledEnemies.length === 0) {
      toast({
        title: "Time inimigo vazio",
        description: "Adicione pelo menos um campeão inimigo",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-build', {
        body: {
          champion,
          lane,
          enemyTeam: filledEnemies,
          allyTeam: allyTeam.filter(ally => ally.champion.trim() !== '')
        }
      });

      if (error) throw error;

      setAnalysis(data);
      toast({
        title: "Análise concluída!",
        description: "Builds otimizadas geradas com IA"
      });
    } catch (error) {
      console.error('Error analyzing build:', error);
      toast({
        title: "Erro na análise",
        description: "Tente novamente em alguns segundos",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBuildIcon = (type: string) => {
    switch (type) {
      case 'perfect': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'balanced': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'situational': return <Zap className="w-5 h-5 text-purple-500" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getBuildColor = (type: string) => {
    switch (type) {
      case 'perfect': return 'border-yellow-500';
      case 'balanced': return 'border-blue-500';
      case 'situational': return 'border-purple-500';
      default: return 'border-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Analisador de Builds IA - Tempo Real
          </CardTitle>
          <CardDescription>
            Configure a composição dos times e receba builds otimizadas por IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seu Campeão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Seu Campeão</label>
              <Input
                placeholder="Ex: Jinx, Yasuo, Ahri..."
                value={champion}
                onChange={(e) => setChampion(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sua Lane</label>
              <Select value={lane} onValueChange={setLane}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua lane" />
                </SelectTrigger>
                <SelectContent>
                  {lanes.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Inimigo */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-500">Time Inimigo</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {enemyTeam.map((enemy, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium block">{lanes[index]}</label>
                  <Input
                    placeholder={`Campeão ${lanes[index]}`}
                    value={enemy.champion}
                    onChange={(e) => updateEnemyTeam(index, 'champion', e.target.value)}
                    className="border-red-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Time Aliado */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-500">Time Aliado (Opcional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {allyTeam.map((ally, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium block">{lanes[index]}</label>
                  <Input
                    placeholder={`Campeão ${lanes[index]}`}
                    value={ally.champion}
                    onChange={(e) => updateAllyTeam(index, 'champion', e.target.value)}
                    className="border-blue-200"
                    disabled={lanes[index] === lane} // Desabilita a própria lane
                  />
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={analyzeTeamComposition} 
            disabled={isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analisando com IA...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analisar Builds
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resultados da Análise */}
      {analysis && (
        <div className="space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Análise do Matchup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{analysis.analysis.matchup_overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-500 mb-2">Principais Ameaças:</h4>
                  <div className="space-y-1">
                    {analysis.analysis.main_threats.map((threat, index) => (
                      <Badge key={index} variant="destructive">{threat}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-500 mb-2">Sinergias:</h4>
                  <div className="space-y-1">
                    {analysis.analysis.synergies.map((synergy, index) => (
                      <Badge key={index} variant="secondary">{synergy}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Builds Recomendadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.builds.map((build, index) => (
              <Card key={index} className={`${getBuildColor(build.type)} border-2`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getBuildIcon(build.type)}
                    {build.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {build.win_rate_estimated}% WR
                    </Badge>
                    <Badge variant="outline">
                      {Math.round(build.confidence * 100)}% Confiança
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{build.reasoning}</p>
                    
                    <div>
                      <h5 className="font-semibold mb-2">Ordem dos Itens:</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {build.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-xs p-2 bg-secondary rounded">
                            {itemIndex + 1}. {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Counter Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Informações de Counter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Maior Counter: </span>
                  <Badge variant="destructive">{analysis.counters.hardest_counter}</Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Dicas contra Counters:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {analysis.counters.counter_tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};