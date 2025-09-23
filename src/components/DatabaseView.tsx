import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { champions, getChampionsByRole, getTopTierChampions } from '@/data/champions';
import { items, getItemsByCategory } from '@/data/items';
import { Search, Filter } from 'lucide-react';

export const DatabaseView = () => {
  const [champFilter, setChampFilter] = useState('all');
  const [itemFilter, setItemFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = champions.filter(champ => {
    const matchesSearch = champ.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = champFilter === 'all' || champ.role.includes(champFilter);
    return matchesSearch && matchesRole;
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = itemFilter === 'all' || item.categories.includes(itemFilter);
    return matchesSearch && matchesCategory;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S+': return 'bg-yellow-500';
      case 'S': return 'bg-orange-500';
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Database Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Campeões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{champions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tier S/S+</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {getTopTierChampions().length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Itens Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {items.filter(item => item.winRate > 53).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Busca</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar campeão ou item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={champFilter} onValueChange={setChampFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Roles</SelectItem>
                <SelectItem value="ADC">ADC</SelectItem>
                <SelectItem value="MID">MID</SelectItem>
                <SelectItem value="TOP">TOP</SelectItem>
                <SelectItem value="JNG">JNG</SelectItem>
                <SelectItem value="SUP">SUP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={itemFilter} onValueChange={setItemFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="Mythic">Mythic</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
                <SelectItem value="AD">AD</SelectItem>
                <SelectItem value="AP">AP</SelectItem>
                <SelectItem value="Tank">Tank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Champions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campeões ({filteredChampions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredChampions.map((champion) => (
                <div key={champion.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {champion.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{champion.name}</div>
                      <div className="text-xs text-muted-foreground">{champion.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTierColor(champion.tier)} text-white text-xs`}>
                      {champion.tier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {champion.role.join('/')}
                    </Badge>
                    <div className="text-xs text-right">
                      <div className="text-green-600 font-medium">{champion.winRate}%</div>
                      <div className="text-muted-foreground">{champion.pickRate}% pick</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Itens ({filteredItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-xs font-bold">
                      {item.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.cost}g</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.tier === 'Mythic' ? 'default' : 'secondary'} className="text-xs">
                      {item.tier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.damageType}
                    </Badge>
                    <div className="text-xs text-right">
                      <div className="text-green-600 font-medium">{item.winRate}%</div>
                      <div className="text-muted-foreground">{item.buildRate}% build</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};