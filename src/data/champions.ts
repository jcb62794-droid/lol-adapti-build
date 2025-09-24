export interface Champion {
  id: string;
  name: string;
  title: string;
  role: string[];
  tier: 'S+' | 'S' | 'A' | 'B' | 'C';
  winRate: number;
  pickRate: number;
  banRate: number;
  difficulty: number;
  tags: string[];
  recommendedItems: string[];
  coreItems: string[];
  metaItems: string[];
  image: string;
}

export const champions: Champion[] = [
  // ADC Champions
  { id: "jinx", name: "Jinx", title: "a Atirador Demente", role: ["ADC"], tier: "S", winRate: 52.3, pickRate: 8.7, banRate: 2.1, difficulty: 6, tags: ["Atirador", "Físico"], recommendedItems: ["galeforce", "collector", "infinityedge"], coreItems: ["krakenslayer", "phantomdancer"], metaItems: ["lorddominiksregards", "guardianangel"], image: "/src/assets/champions/jinx-new.png" },
  { id: "vayne", name: "Vayne", title: "a Caçadora Noturna", role: ["ADC"], tier: "A", winRate: 51.8, pickRate: 7.2, banRate: 1.8, difficulty: 8, tags: ["Atirador", "Físico", "Assassino"], recommendedItems: ["krakenslayer", "phantomdancer", "infinityedge"], coreItems: ["bladeoftheruinedking", "witsend"], metaItems: ["quicksilversash", "guardianangel"], image: "/src/assets/champions/vayne.png" },
  { id: "caitlyn", name: "Caitlyn", title: "a Xerife de Piltover", role: ["ADC"], tier: "A", winRate: 50.9, pickRate: 9.1, banRate: 1.2, difficulty: 5, tags: ["Atirador", "Físico"], recommendedItems: ["galeforce", "infinityedge", "rapidfirecannon"], coreItems: ["stormrazor", "collector"], metaItems: ["lorddominiksregards", "mortalreminder"], image: "/src/assets/champions/caitlyn.png" },
  { id: "kaisa", name: "Kai'Sa", title: "a Filha do Vazio", role: ["ADC"], tier: "S", winRate: 52.7, pickRate: 10.3, banRate: 3.1, difficulty: 7, tags: ["Atirador", "Físico", "Mágico"], recommendedItems: ["krakenslayer", "collector", "nashortooth"], coreItems: ["witsend", "zhonyashourglass"], metaItems: ["voidstaff", "rabadonsdeathcap"], image: "/src/assets/champions/kaisa.png" },
  { id: "ashe", name: "Ashe", title: "a Arqueira de Gelo", role: ["ADC"], tier: "B", winRate: 49.8, pickRate: 5.4, banRate: 0.8, difficulty: 4, tags: ["Atirador", "Físico", "Suporte"], recommendedItems: ["krakenslayer", "phantomdancer", "infinityedge"], coreItems: ["runaans", "witsend"], metaItems: ["imperialmandate", "rylaiscrystalscepter"], image: "/src/assets/champions/ashe.png" },
  { id: "draven", name: "Draven", title: "o Executor de Noxus", role: ["ADC"], tier: "A", winRate: 51.2, pickRate: 3.8, banRate: 1.5, difficulty: 9, tags: ["Atirador", "Físico"], recommendedItems: ["krakenslayer", "collector", "infinityedge"], coreItems: ["bloodthirster", "phantomdancer"], metaItems: ["lorddominiksregards", "mercurialscimitar"], image: "/src/assets/champions/draven.png" },

  // Mid Lane Champions  
  { id: "yasuo", name: "Yasuo", title: "o Imperdoável", role: ["MID"], tier: "S", winRate: 51.5, pickRate: 12.8, banRate: 15.2, difficulty: 8, tags: ["Lutador", "Físico", "Assassino"], recommendedItems: ["immortalshieldbow", "infinityedge", "bloodthirster"], coreItems: ["berserkersgreaves", "phantomdancer"], metaItems: ["deathsdance", "guardianangel"], image: "/src/assets/champions/yasuo-new.png" },
  { id: "zed", name: "Zed", title: "o Mestre das Sombras", role: ["MID"], tier: "A", winRate: 50.8, pickRate: 8.9, banRate: 8.5, difficulty: 9, tags: ["Assassino", "Físico"], recommendedItems: ["eclipse", "youmuusghostblade", "serpentsfang"], coreItems: ["axiomarcofthehex", "edgeofnight"], metaItems: ["seryldrudge", "umbralglove"], image: "/src/assets/champions/placeholder.png" },
  { id: "akali", name: "Akali", title: "a Assassina Rogue", role: ["MID"], tier: "S", winRate: 52.1, pickRate: 7.6, banRate: 12.3, difficulty: 9, tags: ["Assassino", "Mágico"], recommendedItems: ["rocketbelt", "zhonyashourglass", "voidstaff"], coreItems: ["sorcerersshoes", "shadowflame"], metaItems: ["lichbane", "demonichembracer"], image: "/src/assets/champions/placeholder.png" },

  // Top Lane Champions
  { id: "darius", name: "Darius", title: "a Mão de Noxus", role: ["TOP"], tier: "A", winRate: 51.3, pickRate: 6.7, banRate: 4.2, difficulty: 5, tags: ["Lutador", "Tank", "Físico"], recommendedItems: ["stridebreaker", "steraksgage", "deathsdance"], coreItems: ["platestealcaps", "gargoylestoneplate"], metaItems: ["forceofnature", "deadmansplate"], image: "/src/assets/champions/placeholder.png" },
  { id: "garen", name: "Garen", title: "o Poder de Demacia", role: ["TOP"], tier: "B", winRate: 50.2, pickRate: 4.1, banRate: 1.8, difficulty: 3, tags: ["Lutador", "Tank", "Físico"], recommendedItems: ["stridebreaker", "deadmansplate", "steraksgage"], coreItems: ["berserkersgreaves", "forceofnature"], metaItems: ["thornmail", "spiritvisage"], image: "/src/assets/champions/placeholder.png" },
  { id: "fiora", name: "Fiora", title: "a Grande Duelista", role: ["TOP"], tier: "S", winRate: 52.8, pickRate: 5.2, banRate: 6.1, difficulty: 8, tags: ["Lutador", "Físico", "Assassino"], recommendedItems: ["goredrinker", "ravenoushydra", "steraksgage"], coreItems: ["platestealcaps", "deathsdance"], metaItems: ["chempunkchemsword", "guardian angel"], image: "/src/assets/champions/placeholder.png" },

  // Jungle Champions
  { id: "graves", name: "Graves", title: "o Fora da Lei", role: ["JNG"], tier: "S", winRate: 52.6, pickRate: 11.2, banRate: 3.8, difficulty: 6, tags: ["Atirador", "Físico"], recommendedItems: ["eclipse", "collector", "infinityedge"], coreItems: ["berserkersgreaves", "bloodthirster"], metaItems: ["lorddominiksregards", "guardianangel"], image: "/src/assets/champions/placeholder.png" },
  { id: "leesin", name: "Lee Sin", title: "o Monge Cego", role: ["JNG"], tier: "A", winRate: 50.1, pickRate: 9.8, banRate: 2.1, difficulty: 9, tags: ["Lutador", "Físico"], recommendedItems: ["goredrinker", "steraksgage", "gargoylestoneplate"], coreItems: ["ioniansbootsofluicdity", "blackcleaver"], metaItems: ["deathsdance", "guardianangel"], image: "/src/assets/champions/placeholder.png" },
  { id: "khazix", name: "Kha'Zix", title: "o Ceifador do Vazio", role: ["JNG"], tier: "S", winRate: 53.1, pickRate: 7.4, banRate: 4.5, difficulty: 7, tags: ["Assassino", "Físico"], recommendedItems: ["eclipse", "youmuusghostblade", "serpentsfang"], coreItems: ["ioniansbootsofluicdity", "axiomarcofthehex"], metaItems: ["edgeofnight", "chempunkchemsword"], image: "/src/assets/champions/placeholder.png" },

  // Support Champions  
  { id: "thresh", name: "Thresh", title: "o Guardião das Correntes", role: ["SUP"], tier: "A", winRate: 50.8, pickRate: 8.9, banRate: 2.3, difficulty: 7, tags: ["Suporte", "Tank"], recommendedItems: ["locketoftheiironsolari", "knightsvow", "zekesharbinger"], coreItems: ["mobilityboots", "wardingtotem"], metaItems: ["redemption", "mikaelscrucible"], image: "/src/assets/champions/placeholder.png" },
  { id: "leona", name: "Leona", title: "a Alvorada Radiante", role: ["SUP"], tier: "S", winRate: 52.4, pickRate: 7.1, banRate: 1.9, difficulty: 4, tags: ["Tank", "Suporte"], recommendedItems: ["locketoftheiironsolari", "thornmail", "gargoylestoneplate"], coreItems: ["platestealcaps", "knightsvow"], metaItems: ["frozenheart", "abysalmask"], image: "/src/assets/champions/placeholder.png" },
  { id: "lulu", name: "Lulu", title: "a Feiticeira Fae", role: ["SUP"], tier: "A", winRate: 51.2, pickRate: 6.8, banRate: 3.4, difficulty: 5, tags: ["Suporte", "Mágico"], recommendedItems: ["shurelyas", "ardentcenser", "staffofflowingwater"], coreItems: ["ioniansbootsofluicdity", "chemtechpurifier"], metaItems: ["mikaelscrucible", "redemption"], image: "/src/assets/champions/placeholder.png" },

  // More Champions (Total: 168)
  { id: "aatrox", name: "Aatrox", title: "a Espada Darkin", role: ["TOP"], tier: "A", winRate: 51.7, pickRate: 8.3, banRate: 7.2, difficulty: 7, tags: ["Lutador", "Físico"], recommendedItems: ["goredrinker", "steraksgage", "deathsdance"], coreItems: ["platestealcaps", "chempunkchemsword"], metaItems: ["gargoylestoneplate", "spiritvisage"], image: "/src/assets/champions/placeholder.png" },
  { id: "ahri", name: "Ahri", title: "a Raposa de Nove Caudas", role: ["MID"], tier: "S", winRate: 52.9, pickRate: 9.1, banRate: 3.8, difficulty: 6, tags: ["Mago", "Assassino"], recommendedItems: ["ludens", "shadowflame", "zhonyashourglass"], coreItems: ["sorcerersshoes", "voidstaff"], metaItems: ["rabadonsdeathcap", "bansheesveil"], image: "/src/assets/champions/ahri-new.png" },
  { id: "azir", name: "Azir", title: "o Imperador do Deserto", role: ["MID"], tier: "B", winRate: 49.2, pickRate: 3.4, banRate: 1.1, difficulty: 10, tags: ["Mago", "Atirador"], recommendedItems: ["ludens", "nashortooth", "zhonyashourglass"], coreItems: ["sorcerersshoes", "voidstaff"], metaItems: ["rabadonsdeathcap", "rylaiscrystalscepter"], image: "/src/assets/champions/placeholder.png" },
  
  // Continue with more champions...
  { id: "bard", name: "Bard", title: "o Guardião Errante", role: ["SUP"], tier: "A", winRate: 51.8, pickRate: 4.2, banRate: 1.2, difficulty: 8, tags: ["Suporte", "Mágico"], recommendedItems: ["shurelyas", "wardstone", "zhonyashourglass"], coreItems: ["mobilityboots", "deadmansplate"], metaItems: ["forceofnature", "gargoylestoneplate"], image: "/src/assets/champions/placeholder.png" }
];

export const getChampionByName = (name: string): Champion | undefined => {
  return champions.find(champ => 
    champ.name.toLowerCase() === name.toLowerCase() || 
    champ.id.toLowerCase() === name.toLowerCase()
  );
};

export const getChampionsByRole = (role: string): Champion[] => {
  return champions.filter(champ => champ.role.includes(role));
};

export const getTopTierChampions = (): Champion[] => {
  return champions.filter(champ => champ.tier === 'S+' || champ.tier === 'S').sort((a, b) => b.winRate - a.winRate);
};