import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface BuildItem {
  id: string;
  name: string;
  cost: number;
  stats: string[];
  image?: string;
}

interface BuildRecommendationProps {
  type: 'perfect' | 'better' | 'good';
  items: BuildItem[];
  winRate: number;
  confidence: number;
}

const BuildRecommendation = ({ type, items, winRate, confidence }: BuildRecommendationProps) => {
  const getVariant = () => {
    switch (type) {
      case 'perfect': return 'perfect';
      case 'better': return 'better';
      default: return 'good';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'perfect': return 'Build Perfeita';
      case 'better': return 'Melhor Build';
      default: return 'Boa Build';
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case 'perfect': return 'bg-gradient-perfect';
      case 'better': return 'bg-gradient-better';
      default: return 'bg-gradient-good';
    }
  };

  return (
    <Card className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-glow ${
      type === 'perfect' ? 'border-accent' : 
      type === 'better' ? 'border-success' : 
      'border-primary'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{getTitle()}</CardTitle>
          <Badge className={`${getBadgeColor()} text-background font-bold`}>
            {winRate}% WR
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Confiança:</span>
          <Progress value={confidence} className="flex-1" />
          <span className="text-sm font-medium">{confidence}%</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="group relative bg-secondary rounded-lg p-3 border border-border hover:border-primary transition-colors"
            >
              <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center text-xs font-medium">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                ) : (
                  item.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <h4 className="text-xs font-medium truncate">{item.name}</h4>
              <p className="text-xs text-accent font-bold">{item.cost}g</p>
              
              {/* Tooltip com stats */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded-lg p-2 min-w-[150px] z-10">
                <h5 className="font-medium text-sm mb-1">{item.name}</h5>
                <ul className="text-xs space-y-0.5">
                  {item.stats.map((stat, i) => (
                    <li key={i} className="text-muted-foreground">{stat}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant={getVariant()} className="w-full">
          Aplicar Build
        </Button>
      </CardContent>
    </Card>
  );
};

export default BuildRecommendation;