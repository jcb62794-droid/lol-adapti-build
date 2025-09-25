import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY não configurada');
    }

    console.log('Iniciando scraping dos itens...');

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://lolshop.gg/',
        formats: ['markdown'],
        waitFor: 5000,
        timeout: 20000,
        onlyMainContent: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.markdown || '';

    console.log('Conteúdo dos itens recebido:', content.substring(0, 500));

    // Parse items from the scraped content
    const items = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for item entries
      if (line.includes('![') && line.includes('](')) {
        const nameMatch = line.match(/!\[([^\]]+)\]/);
        const imageMatch = line.match(/\]\(([^)]+)\)/);
        
        if (nameMatch && imageMatch) {
          const name = nameMatch[1].trim();
          const imageUrl = imageMatch[1];
          
          // Skip generic entries
          if (name && !name.toLowerCase().includes('logo') && 
              !name.toLowerCase().includes('icon') &&
              name.length > 2 && name.length < 50) {
            items.push({
              name,
              imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://lolshop.gg${imageUrl}`,
              cost: 0,
              stats: []
            });
          }
        }
      }
    }

    // Add known items if not found
    const knownItems = [
      { name: 'Infinity Edge', cost: 3400, stats: ['+70 AD', '+20% Crit', '+35% Crit DMG'] },
      { name: 'Kraken Slayer', cost: 3400, stats: ['+65 AD', '+25% AS', 'Kraken Passive'] },
      { name: 'Galeforce', cost: 3400, stats: ['+60 AD', '+20% AS', '+20% Crit', 'Dash Active'] },
      { name: 'Immortal Shieldbow', cost: 3400, stats: ['+55 AD', '+20% AS', '+20% Crit', 'Shield'] },
      { name: 'The Collector', cost: 3000, stats: ['+55 AD', '+20% Crit', '+12 Lethality', 'Execute'] },
      { name: 'Lord Dominik\'s Regards', cost: 3000, stats: ['+35 AD', '+20% Crit', '+35% ArPen'] },
      { name: 'Phantom Dancer', cost: 2600, stats: ['+25% AS', '+20% Crit', '+7% MS', 'Intangible'] },
      { name: 'Rapid Firecannon', cost: 2500, stats: ['+25% AS', '+20% Crit', 'Extra Range'] },
      { name: 'Blade of the Ruined King', cost: 3200, stats: ['+40 AD', '+25% AS', '+12% Lifesteal'] },
      { name: 'Bloodthirster', cost: 3400, stats: ['+70 AD', '+20% Lifesteal', 'Shield'] },
      { name: 'Guardian Angel', cost: 2800, stats: ['+40 AD', '+40 Armor', 'Revive Passive'] },
      { name: 'Rabadon\'s Deathcap', cost: 3600, stats: ['+120 AP', '+35% AP Bonus'] },
      { name: 'Zhonya\'s Hourglass', cost: 2600, stats: ['+65 AP', '+45 Armor', 'Stasis Active'] },
      { name: 'Void Staff', cost: 2800, stats: ['+65 AP', '+40% Magic Pen'] },
      { name: 'Luden\'s Tempest', cost: 3200, stats: ['+80 AP', '+600 Mana', '+6 Magic Pen'] },
      { name: 'Riftmaker', cost: 3200, stats: ['+90 AP', '+250 HP', 'Omnivamp'] },
      { name: 'Everfrost', cost: 3200, stats: ['+80 AP', '+500 Mana', '+200 HP', 'Root Active'] },
      { name: 'Berserker\'s Greaves', cost: 1100, stats: ['+35% AS', '+45 MS'] },
      { name: 'Sorcerer\'s Shoes', cost: 1100, stats: ['+18 Magic Pen', '+45 MS'] },
      { name: 'Plated Steelcaps', cost: 1100, stats: ['+20 Armor', '+45 MS', '12% DMG Reduction'] },
      { name: 'Mercury\'s Treads', cost: 1100, stats: ['+25 MR', '+45 MS', '+30% Tenacity'] },
      { name: 'Sunfire Aegis', cost: 3200, stats: ['+450 HP', '+30 Armor', '+30 MR', 'Burn'] },
      { name: 'Frostfire Gauntlet', cost: 3200, stats: ['+350 HP', '+25 Armor', '+25 MR', 'Slow'] },
      { name: 'Turbo Chemtank', cost: 3200, stats: ['+400 HP', '+30 Armor', '+30 MR', 'Speed'] }
    ];

    for (const knownItem of knownItems) {
      if (!items.some(i => i.name === knownItem.name)) {
        items.push({
          name: knownItem.name,
          imageUrl: `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${Math.floor(Math.random() * 9999) + 1000}.png`,
          cost: knownItem.cost,
          stats: knownItem.stats
        });
      }
    }

    console.log(`Encontrados ${items.length} itens`);

    return new Response(JSON.stringify(items), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro no scraping dos itens:', error);
    const message = (error as Error)?.message || 'Erro desconhecido';
    return new Response(JSON.stringify({ 
      error: message,
      items: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});