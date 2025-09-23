import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { champions, getChampionByName } from '@/data/champions';
import { items } from '@/data/items';

export const ChampionAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChampion, setSelectedChampion] = useState(null);
  const { t } = useApp();

  const handleAnalyze = () => {
    if (searchTerm.trim()) {
      const champion = getChampionByName(searchTerm);
      if (champion) {
        setSelectedChampion(champion);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('champion_analysis_title')}</CardTitle>
          <CardDescription>Analise estatísticas detalhadas de qualquer campeão</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={t('search_champion')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} className="shrink-0">
              <Search className="w-4 h-4 mr-2" />
              {t('analyze')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedChampion && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                  {selectedChampion.name.slice(0, 2)}
                </div>
                <div>
                  <CardTitle className="text-2xl">{selectedChampion.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedChampion.title}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg">
                Tier {selectedChampion.tier}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{selectedChampion.winRate}%</div>
                <div className="text-sm text-muted-foreground">{t('win_rate')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{selectedChampion.pickRate}%</div>
                <div className="text-sm text-muted-foreground">{t('pick_rate')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{selectedChampion.banRate}%</div>
                <div className="text-sm text-muted-foreground">{t('ban_rate')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{selectedChampion.difficulty}/10</div>
                <div className="text-sm text-muted-foreground">{t('difficulty')}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Itens Recomendados</h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedChampion.recommendedItems.slice(0, 3).map((itemName, index) => (
                  <div key={index} className="p-2 bg-secondary rounded text-center">
                    <div className="text-sm font-medium">{itemName}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedChampion.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};