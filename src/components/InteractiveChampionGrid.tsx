import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { champions } from '@/data/champions';

interface Champion {
  id: string;
  name: string;
  title: string;
  image: string;
  role: string;
  tier: string;
  winRate: number;
  pickRate: number;
  tags: string[];
}

export const InteractiveChampionGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedTier, setSelectedTier] = useState('ALL');

  const roles = ['ALL', 'TOP', 'JNG', 'MID', 'ADC', 'SUP'];
  const tiers = ['ALL', 'S', 'A', 'B', 'C'];

  const filteredChampions = champions.filter(champion => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         champion.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || champion.role.includes(selectedRole);
    const matchesTier = selectedTier === 'ALL' || champion.tier === selectedTier;
    
    return matchesSearch && matchesRole && matchesTier;
  });

  const getRoleColor = (role: string) => {
    const colors = {
      'TOP': 'bg-red-500/10 text-red-400 border-red-500/20',
      'JNG': 'bg-green-500/10 text-green-400 border-green-500/20',
      'MID': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'ADC': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'SUP': 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getTierColor = (tier: string) => {
    const colors = {
      'S': 'text-yellow-400',
      'A': 'text-green-400',
      'B': 'text-blue-400',
      'C': 'text-gray-400'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar campeão..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                {roles.map(role => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRole(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-1">
                {tiers.map(tier => (
                  <Button
                    key={tier}
                    variant={selectedTier === tier ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTier(tier)}
                  >
                    {tier}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Champions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredChampions.map((champion) => (
          <Card key={champion.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={champion.image} 
                    alt={champion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/champions/placeholder.png';
                    }}
                  />
                </div>
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="text-white text-xs mb-1">{champion.title}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-400">{champion.winRate}%</span>
                      <span className="text-blue-400">{champion.pickRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Tier badge */}
                <div className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-xs font-bold ${getTierColor(champion.tier)}`}>
                  {champion.tier}
                </div>
              </div>
              
              <div className="p-2">
                <div className="font-semibold text-sm truncate">{champion.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <Badge className={`text-xs px-1 py-0 ${getRoleColor(Array.isArray(champion.role) ? champion.role[0] : champion.role)}`}>
                    {Array.isArray(champion.role) ? champion.role[0] : champion.role}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {champion.tags[0]}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChampions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">Nenhum campeão encontrado</div>
          <div className="text-sm text-muted-foreground mt-2">
            Tente ajustar os filtros ou termo de busca
          </div>
        </div>
      )}
    </div>
  );
};