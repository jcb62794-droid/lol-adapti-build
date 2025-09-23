import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AIConfig {
  autoRecommendations: boolean;
  aggressiveness: number[];
  preferredStyle: string;
  adaptationSpeed: number[];
  enablePredictions: boolean;
  riskTolerance: number[];
}

const AISettings = () => {
  const [config, setConfig] = useState<AIConfig>({
    autoRecommendations: true,
    aggressiveness: [75],
    preferredStyle: "balanced",
    adaptationSpeed: [85],
    enablePredictions: true,
    riskTolerance: [60]
  });

  const updateConfig = (key: keyof AIConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const getAggressivenessLabel = (value: number) => {
    if (value < 30) return "Conservadora";
    if (value < 70) return "Equilibrada"; 
    return "Agressiva";
  };

  const getRiskLabel = (value: number) => {
    if (value < 30) return "Baixo Risco";
    if (value < 70) return "Médio Risco";
    return "Alto Risco";
  };

  return (
    <div className="space-y-6">
      {/* AI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center text-xs font-bold text-background">
              IA
            </div>
            Configurações da IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto Recommendations */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Recomendações Automáticas</h4>
              <p className="text-sm text-muted-foreground">Receber sugestões em tempo real durante a partida</p>
            </div>
            <Switch 
              checked={config.autoRecommendations}
              onCheckedChange={(value) => updateConfig('autoRecommendations', value)}
            />
          </div>

          {/* Aggressiveness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Estilo de Jogo</h4>
              <Badge variant="outline" className="text-accent border-accent">
                {getAggressivenessLabel(config.aggressiveness[0])}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Define o quão agressivas serão as recomendações</p>
            <Slider
              value={config.aggressiveness}
              onValueChange={(value) => updateConfig('aggressiveness', value)}
              max={100}
              step={5}
              className="flex-1"
            />
          </div>

          {/* Preferred Style */}
          <div className="space-y-3">
            <h4 className="font-medium">Estilo de Build Preferido</h4>
            <p className="text-sm text-muted-foreground">Tipo de build que você prefere jogar</p>
            <Select value={config.preferredStyle} onValueChange={(value) => updateConfig('preferredStyle', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="damage">Foco em Dano</SelectItem>
                <SelectItem value="tank">Foco em Resistência</SelectItem>
                <SelectItem value="balanced">Equilibrado</SelectItem>
                <SelectItem value="utility">Foco em Utilidade</SelectItem>
                <SelectItem value="mobility">Foco em Mobilidade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Adaptation Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Velocidade de Adaptação</h4>
              <Badge variant="outline" className="text-primary border-primary">
                {config.adaptationSpeed[0]}%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Quão rapidamente a IA se adapta às mudanças na partida</p>
            <Slider
              value={config.adaptationSpeed}
              onValueChange={(value) => updateConfig('adaptationSpeed', value)}
              max={100}
              step={5}
              className="flex-1"
            />
          </div>

          {/* Risk Tolerance */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Tolerância a Risco</h4>
              <Badge variant="outline" className="text-warning border-warning">
                {getRiskLabel(config.riskTolerance[0])}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Define builds mais seguras ou arriscadas</p>
            <Slider
              value={config.riskTolerance}
              onValueChange={(value) => updateConfig('riskTolerance', value)}
              max={100}
              step={5}
              className="flex-1"
            />
          </div>

          {/* Predictions */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Previsões Avançadas</h4>
              <p className="text-sm text-muted-foreground">Ativar previsões de picks e bans inimigos</p>
            </div>
            <Switch 
              checked={config.enablePredictions}
              onCheckedChange={(value) => updateConfig('enablePredictions', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance da IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">94%</div>
              <div className="text-sm text-muted-foreground">Precisão de Build</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">87%</div>
              <div className="text-sm text-muted-foreground">Previsão de Picks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">76%</div>
              <div className="text-sm text-muted-foreground">Timing Objetivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">91%</div>
              <div className="text-sm text-muted-foreground">Matchup Analysis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex gap-3">
        <Button variant="perfect" className="flex-1">
          Salvar Configurações
        </Button>
        <Button variant="outline" className="flex-1">
          Resetar Padrões
        </Button>
      </div>
    </div>
  );
};

export default AISettings;