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

    console.log('Iniciando scraping dos campeões...');

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.leagueoflegends.com/pt-br/champions/',
        formats: ['markdown'],
        waitFor: 3000,
        timeout: 15000,
        onlyMainContent: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.markdown || '';

    console.log('Conteúdo recebido:', content.substring(0, 500));

    // Parse champions from the scraped content
    const champions = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for champion names - they typically appear as headings or in specific patterns
      if (line.includes('![') && line.includes('](')) {
        const nameMatch = line.match(/!\[([^\]]+)\]/);
        const imageMatch = line.match(/\]\(([^)]+)\)/);
        
        if (nameMatch && imageMatch) {
          const name = nameMatch[1].trim();
          const imageUrl = imageMatch[1];
          
          // Skip generic or non-champion entries
          if (name && !name.toLowerCase().includes('champion') && 
              !name.toLowerCase().includes('placeholder') &&
              name.length > 2 && name.length < 20) {
            champions.push({
              name,
              imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://www.leagueoflegends.com${imageUrl}`
            });
          }
        }
      }
    }

    // Additional parsing for different content structures
    const championPattern = /([A-Z][a-zA-Z']+(?:\s+[A-Z][a-zA-Z']+)*)/g;
    const textContent = content.replace(/[^\w\s]/g, ' ');
    const possibleChampions = [...new Set(textContent.match(championPattern) || [])];
    
    // Known champions list for validation
    const knownChampions = [
      'Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Azir',
      'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'Gath',
      'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko', 'Elise', 'Evelynn', 'Ezreal',
      'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas',
      'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna',
      'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'K\'Sante', 'Kai\'Sa', 'Kalista',
      'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix',
      'Kindred', 'Kled', 'Kog\'Maw', 'LeBlanc', 'Lee Sin', 'Leona', 'Lillia', 'Lissandra',
      'Lucian', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune',
      'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nocturne',
      'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana', 'Quinn',
      'Rakan', 'Rammus', 'Rek\'Sai', 'Rell', 'Renata', 'Renekton', 'Rengar', 'Riven',
      'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco',
      'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka',
      'Swain', 'Sylas', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo',
      'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr',
      'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'Koz', 'Vex', 'Vi', 'Viego', 'Viktor',
      'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao',
      'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean',
      'Zoe', 'Zyra'
    ];

    // Add known champions that might have been missed
    for (const knownChamp of knownChampions) {
      if (!champions.some(c => c.name === knownChamp)) {
        champions.push({
          name: knownChamp,
          imageUrl: `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${knownChamp.replace(/[^a-zA-Z]/g, '')}.png`
        });
      }
    }

    console.log(`Encontrados ${champions.length} campeões`);

    return new Response(JSON.stringify(champions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro no scraping:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      champions: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});