import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { items, getMetaItemsForChampion } from '@/data/items';

export const BuildRecommendation = () => {
  const { t } = useApp();

  // Mock data - substituir por dados reais da IA
  const builds = [
    {
      type: 'perfect',
      title: t('perfect_build'),
      items: getMetaItemsForChampion('ADC', 'AD').slice(0, 3),
      winRate: 87,
      confidence: 94
    },
    {
      type: 'better', 
      title: t('better_build'),
      items: getMetaItemsForChampion('ADC', 'AD').slice(1, 4),
      winRate: 78,
      confidence: 87
    },
    {
      type: 'good',
      title: t('good_build'),
      items: getMetaItemsForChampion('ADC', 'AD').slice(2, 5),
      winRate: 65,
      confidence: 72
    }
  ];

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'perfect': return 'border-yellow-500';
      case 'better': return 'border-green-500';
      default: return 'border-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs font-bold text-white">
              IA
            </div>
            Recomendações de Build Adaptáveis
          </CardTitle>
          <CardDescription>
            A IA analisa seu jogo em tempo real e sugere as melhores builds
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {builds.map((build, index) => (
          <Card key={index} className={`border-2 ${getBorderColor(build.type)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{build.title}</CardTitle>
                <Badge variant="secondary">{build.winRate}% WR</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {t('confidence')}: {build.confidence}%
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {build.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.cost}g</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.stats[0] || '+40 AD'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full" variant={build.type === 'perfect' ? 'default' : 'outline'}>
                {t('apply_build')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};