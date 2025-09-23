export interface Item {
  id: string;
  name: string;
  description: string;
  cost: number;
  stats: string[];
  categories: string[];
  tier: 'Legendary' | 'Mythic' | 'Basic' | 'Epic' | 'Boots';
  winRate: number;
  buildRate: number;
  damageType: 'AD' | 'AP' | 'Tank' | 'Support' | 'Hybrid';
  tags: string[];
}

export const items: Item[] = [
  // Mythic AD Items
  { id: "krakenslayer", name: "Mata-Crakens", description: "Mata criaturas do mar com facilidade", cost: 3400, stats: ["+65 AD", "+25% AS", "Passiva: Kraken"], categories: ["Mythic", "AD", "AS"], tier: "Mythic", winRate: 54.2, buildRate: 18.7, damageType: "AD", tags: ["DPS", "Tank Killer"] },
  { id: "galeforce", name: "Rajada", description: "Mobilidade e burst de dano", cost: 3400, stats: ["+60 AD", "+20% AS", "+20% Crit", "Ativa: Dash"], categories: ["Mythic", "AD", "Mobility"], tier: "Mythic", winRate: 52.8, buildRate: 15.3, damageType: "AD", tags: ["Mobility", "Burst"] },
  { id: "immortalshieldbow", name: "Arco-escudo Imortal", description: "Sustentabilidade e proteção", cost: 3400, stats: ["+55 AD", "+20% AS", "+20% Crit", "Escudo de Vida"], categories: ["Mythic", "AD", "Lifesteal"], tier: "Mythic", winRate: 51.9, buildRate: 12.4, damageType: "AD", tags: ["Sustain", "Defense"] },
  { id: "eclipse", name: "Eclipse", description: "Lethality e sustentabilidade", cost: 3200, stats: ["+60 AD", "+18 Lethality", "Escudo e MS"], categories: ["Mythic", "Lethality", "AD"], tier: "Mythic", winRate: 53.7, buildRate: 8.9, damageType: "AD", tags: ["Assassin", "Sustain"] },

  // Mythic AP Items  
  { id: "ludens", name: "Eco de Luden", description: "Burst mágico e penetração", cost: 3200, stats: ["+80 AP", "+600 Mana", "+6 MPen"], categories: ["Mythic", "AP", "Mana"], tier: "Mythic", winRate: 52.1, buildRate: 22.3, damageType: "AP", tags: ["Burst", "Mana"] },
  { id: "rocketbelt", name: "Cinto-foguete Prototípico", description: "Mobilidade e burst", cost: 3200, stats: ["+90 AP", "+250 HP", "Ativa: Dash"], categories: ["Mythic", "AP", "HP"], tier: "Mythic", winRate: 51.8, buildRate: 14.7, damageType: "AP", tags: ["Mobility", "Burst"] },
  { id: "everfrost", name: "Geada Eterna", description: "Controle de grupo e mana", cost: 3200, stats: ["+80 AP", "+500 Mana", "+200 HP", "Ativa: Root"], categories: ["Mythic", "AP", "CC"], tier: "Mythic", winRate: 50.9, buildRate: 8.1, damageType: "AP", tags: ["CC", "Utility"] },

  // Mythic Tank Items
  { id: "sunfire", name: "Égide Radiante", description: "Dano em área e resistências", cost: 3200, stats: ["+450 HP", "+30 Armor", "+30 MR", "Passiva: Queimadura"], categories: ["Mythic", "Tank", "AOE"], tier: "Mythic", winRate: 51.2, buildRate: 16.8, damageType: "Tank", tags: ["AOE", "Burn"] },
  { id: "frostfire", name: "Manopla do Gelo Eterno", description: "Slow e crescimento de HP", cost: 3200, stats: ["+350 HP", "+25 Armor", "+25 MR", "Slow em AA"], categories: ["Mythic", "Tank", "Slow"], tier: "Mythic", winRate: 50.8, buildRate: 12.3, damageType: "Tank", tags: ["Slow", "Scaling"] },
  { id: "turbo", name: "Propulsor Quimiotécnico", description: "Velocidade de movimento", cost: 3200, stats: ["+400 HP", "+30 Armor", "+30 MR", "Passiva: MS"], categories: ["Mythic", "Tank", "MS"], tier: "Mythic", winRate: 49.9, buildRate: 6.7, damageType: "Tank", tags: ["Speed", "Engage"] },

  // Legendary AD Items
  { id: "infinityedge", name: "Gume do Infinito", description: "Máximo dano crítico", cost: 3400, stats: ["+70 AD", "+20% Crit", "+35% Crit DMG"], categories: ["Legendary", "AD", "Crit"], tier: "Legendary", winRate: 55.3, buildRate: 28.9, damageType: "AD", tags: ["Crit", "DPS"] },
  { id: "collector", name: "O Colecionador", description: "Execução em baixa vida", cost: 3000, stats: ["+55 AD", "+20% Crit", "+12 Lethality", "Executa <5%"], categories: ["Legendary", "AD", "Execute"], tier: "Legendary", winRate: 54.7, buildRate: 24.1, damageType: "AD", tags: ["Execute", "Burst"] },
  { id: "lorddominiksregards", name: "Cumprimentos do Lorde Dominik", description: "Penetração de armadura", cost: 3000, stats: ["+35 AD", "+20% Crit", "+35% Pen Armor"], categories: ["Legendary", "AD", "ArmorPen"], tier: "Legendary", winRate: 53.8, buildRate: 19.2, damageType: "AD", tags: ["Armor Pen", "Tank Killer"] },
  { id: "phantomdancer", name: "Dançarina Fantasma", description: "Velocidade de ataque e movimento", cost: 2600, stats: ["+25% AS", "+20% Crit", "+7% MS", "Intangível"], categories: ["Legendary", "AS", "Crit"], tier: "Legendary", winRate: 52.9, buildRate: 22.4, damageType: "AD", tags: ["AS", "Speed"] },
  { id: "rapidfirecannon", name: "Canhão Fumegante", description: "Alcance aumentado", cost: 2500, stats: ["+25% AS", "+20% Crit", "Alcance Extra"], categories: ["Legendary", "AS", "Range"], tier: "Legendary", winRate: 51.8, buildRate: 15.7, damageType: "AD", tags: ["Range", "Poke"] },
  { id: "bladeoftheruinedking", name: "Espada do Rei Destruído", description: "Sustentabilidade e dano %HP", cost: 3200, stats: ["+40 AD", "+25% AS", "+12% Lifesteal", "8% HP atual"], categories: ["Legendary", "AD", "Lifesteal"], tier: "Legendary", winRate: 54.1, buildRate: 18.3, damageType: "AD", tags: ["Sustain", "%HP"] },
  { id: "bloodthirster", name: "Sedenta por Sangue", description: "Alto lifesteal e escudo", cost: 3400, stats: ["+70 AD", "+20% Lifesteal", "Escudo de Lifesteal"], categories: ["Legendary", "AD", "Lifesteal"], tier: "Legendary", winRate: 52.3, buildRate: 14.8, damageType: "AD", tags: ["Sustain", "Shield"] },
  { id: "guardianangel", name: "Anjo Guardião", description: "Ressurreição após morte", cost: 2800, stats: ["+40 AD", "+40 Armor", "Passiva: Revive"], categories: ["Legendary", "AD", "Defense"], tier: "Legendary", winRate: 53.6, buildRate: 21.7, damageType: "AD", tags: ["Revive", "Defense"] },

  // Legendary AP Items
  { id: "rabadonsdeathcap", name: "Capuz da Morte de Rabadon", description: "Máximo poder mágico", cost: 3600, stats: ["+120 AP", "+35% AP Bonus"], categories: ["Legendary", "AP", "Scaling"], tier: "Legendary", winRate: 56.2, buildRate: 31.4, damageType: "AP", tags: ["Scaling", "Raw AP"] },
  { id: "zhonyashourglass", name: "Ampulheta de Zhonya", description: "Invulnerabilidade e armor", cost: 2600, stats: ["+65 AP", "+45 Armor", "Ativa: Stasis"], categories: ["Legendary", "AP", "Defense"], tier: "Legendary", winRate: 52.7, buildRate: 28.9, damageType: "AP", tags: ["Stasis", "Defense"] },
  { id: "voidstaff", name: "Cajado do Vazio", description: "Penetração mágica", cost: 2800, stats: ["+65 AP", "+40% MPen"], categories: ["Legendary", "AP", "MPen"], tier: "Legendary", winRate: 54.1, buildRate: 25.3, damageType: "AP", tags: ["Magic Pen", "Tank Killer"] },
  { id: "demonichembracer", name: "Abraço Demoníaco", description: "HP e dano em área", cost: 3000, stats: ["+70 AP", "+350 HP", "Passiva: Queimadura"], categories: ["Legendary", "AP", "HP"], tier: "Legendary", winRate: 51.9, buildRate: 18.7, damageType: "AP", tags: ["HP", "AOE"] },
  { id: "lichbane", name: "Perdição de Lich", description: "Proc de spell em AA", cost: 3000, stats: ["+80 AP", "+200 Mana", "+8% MS", "Spellblade"], categories: ["Legendary", "AP", "Proc"], tier: "Legendary", winRate: 53.4, buildRate: 16.2, damageType: "AP", tags: ["Spellblade", "Burst"] },
  { id: "morellonomicon", name: "Morellonomicon", description: "Cura reduzida e penetração", cost: 2500, stats: ["+70 AP", "+250 HP", "Anti-heal", "MPen"], categories: ["Legendary", "AP", "Heal Reduction"], tier: "Legendary", winRate: 52.1, buildRate: 22.8, damageType: "AP", tags: ["Anti-heal", "Magic Pen"] },

  // Boots
  { id: "berserkersgreaves", name: "Grevas do Berserker", description: "Velocidade de ataque", cost: 1100, stats: ["+35% AS", "+45 MS"], categories: ["Boots", "AS"], tier: "Boots", winRate: 52.8, buildRate: 67.3, damageType: "AD", tags: ["AS", "MS"] },
  { id: "sorcerersshoes", name: "Botas do Feiticeiro", description: "Penetração mágica", cost: 1100, stats: ["+18 MPen", "+45 MS"], categories: ["Boots", "MPen"], tier: "Boots", winRate: 52.1, buildRate: 58.9, damageType: "AP", tags: ["Magic Pen", "MS"] },
  { id: "platestealcaps", name: "Botas de Aço", description: "Redução de dano físico", cost: 1100, stats: ["+20 Armor", "+45 MS", "12% Red. Dano AD"], categories: ["Boots", "Defense"], tier: "Boots", winRate: 51.3, buildRate: 34.7, damageType: "Tank", tags: ["Armor", "Damage Reduction"] },
  { id: "mercurystreads", name: "Botas de Mercúrio", description: "Resistência mágica e tenacidade", cost: 1100, stats: ["+25 MR", "+45 MS", "+30% Tenacidade"], categories: ["Boots", "MR"], tier: "Boots", winRate: 50.9, buildRate: 28.3, damageType: "Tank", tags: ["MR", "Tenacity"] },

  // Support Items
  { id: "locketoftheiironsolari", name: "Medalhão dos Solari de Ferro", description: "Escudo para equipe", cost: 2500, stats: ["+200 HP", "+30 Armor", "+30 MR", "Ativa: Escudo AoE"], categories: ["Support", "Tank", "Shield"], tier: "Legendary", winRate: 51.7, buildRate: 45.2, damageType: "Support", tags: ["Shield", "Team Support"] },
  { id: "shurelyas", name: "Ímpeto Cósmico", description: "Velocidade para equipe", cost: 2500, stats: ["+200 HP", "+40 AP", "+20% Heal Power", "Ativa: Speed Boost"], categories: ["Support", "AP", "Speed"], tier: "Legendary", winRate: 52.3, buildRate: 38.7, damageType: "Support", tags: ["Speed", "Team Support"] }
];

export const getItemByName = (name: string): Item | undefined => {
  return items.find(item => 
    item.name.toLowerCase().includes(name.toLowerCase()) || 
    item.id.toLowerCase() === name.toLowerCase()
  );
};

export const getItemsByCategory = (category: string): Item[] => {
  return items.filter(item => item.categories.includes(category));
};

export const getMetaItemsForChampion = (championRole: string, damageType: string): Item[] => {
  return items
    .filter(item => {
      if (championRole === 'ADC') return item.damageType === 'AD' && item.tier !== 'Boots';
      if (championRole === 'MID') return (item.damageType === 'AP' || item.damageType === 'AD') && item.tier !== 'Boots';
      if (championRole === 'TOP') return (item.damageType === 'AD' || item.damageType === 'Tank') && item.tier !== 'Boots';
      if (championRole === 'JNG') return item.damageType === damageType && item.tier !== 'Boots';
      if (championRole === 'SUP') return (item.damageType === 'Support' || item.damageType === 'Tank') && item.tier !== 'Boots';
      return false;
    })
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10);
};