import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Languages, Code } from 'lucide-react';
import { DatabaseView } from './DatabaseView';
import { champions } from '@/data/champions';
import { items } from '@/data/items';

export const DevMode: React.FC = () => {
  const { t, language, setLanguage, devMode, setDevMode } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <h2 className="text-2xl font-bold">{t('dev_mode')}</h2>
          <Badge variant="secondary">v0.1</Badge>
        </div>
        <Switch checked={devMode} onCheckedChange={setDevMode} />
      </div>

      {devMode && (
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Language Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Configurações de Idioma
                  </CardTitle>
                  <CardDescription>
                    Altere o idioma da interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={language} onValueChange={(value: 'pt_BR' | 'en') => setLanguage(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt_BR">Português (BR)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Idioma atual: {language === 'pt_BR' ? 'Português (Brasil)' : 'English'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configurações IA
                  </CardTitle>
                  <CardDescription>
                    Ajuste o comportamento da IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Precisão da IA</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alta</span>
                      <Badge variant="secondary">94.2%</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Velocidade de Análise</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tempo médio</span>
                      <Badge variant="secondary">0.8s</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <DatabaseView />
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Database Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Estatísticas do Banco
                  </CardTitle>
                  <CardDescription>
                    Informações sobre campeões e itens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{champions.length}</div>
                      <div className="text-sm text-muted-foreground">Campeões</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{items.length}</div>
                      <div className="text-sm text-muted-foreground">Itens</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline">Meta Atualizada</Badge>
                    <Badge variant="outline" className="ml-2">Dano Calculado</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* System Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Sistema</CardTitle>
                  <CardDescription>
                    Detalhes técnicos da aplicação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Versão:</span>
                    <span className="text-sm font-mono">0.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Build:</span>
                    <span className="text-sm font-mono">a104091</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">React:</span>
                    <span className="text-sm font-mono">18.3.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tailwind:</span>
                    <span className="text-sm font-mono">3.4.0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};