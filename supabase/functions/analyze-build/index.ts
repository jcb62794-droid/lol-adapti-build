import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { champion, lane, enemyTeam, allyTeam } = await req.json();

    console.log('Analyzing build for:', { champion, lane, enemyTeam, allyTeam });

    // Get champion data from database
    const { data: championData, error: championError } = await supabase
      .from('champions')
      .select('*')
      .eq('name', champion)
      .single();

    if (championError) {
      throw new Error(`Champion not found: ${champion}`);
    }

    // Get all items from database
    const { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('*');

    if (itemsError) {
      throw new Error('Failed to fetch items data');
    }

    // Create AI prompt for build analysis
    const prompt = `
Você é um especialista em League of Legends com conhecimento profundo sobre meta, builds e matchups.

DADOS DO CAMPEÃO:
Nome: ${championData.name}
Role: ${championData.role}
Lane: ${lane}
Tags: ${championData.tags.join(', ')}
Tier atual: ${championData.tier}
Win Rate: ${championData.win_rate}%
Difficulty: ${championData.difficulty}/10

TIME INIMIGO: ${enemyTeam.map(e => `${e.champion} (${e.lane})`).join(', ')}
TIME ALIADO: ${allyTeam ? allyTeam.map(a => `${a.champion} (${a.lane})`).join(', ') : 'Não informado'}

ITENS DISPONÍVEIS:
${itemsData.map(item => `${item.name} - ${item.cost}g - ${item.damage_type} - Categorias: ${item.categories.join(', ')}`).join('\n')}

ANÁLISE SOLICITADA:
1. Analise o matchup contra o time inimigo
2. Identifique os principais counters no time inimigo
3. Recomende 3 builds diferentes:
   - BUILD PERFEITA: Máximo potencial contra este time específico
   - BUILD EQUILIBRADA: Boa contra a maioria das situações
   - BUILD SITUACIONAL: Para situações específicas (atrás no jogo, etc.)

4. Para cada build, liste exatamente 6 itens na ordem de compra
5. Explique brevemente o raciocínio de cada build
6. Identifique os maiores counters do time inimigo para o campeão escolhido

FORMATO DE RESPOSTA (JSON):
{
  "analysis": {
    "matchup_overview": "análise geral do matchup",
    "main_threats": ["inimigo1", "inimigo2"],
    "synergies": ["aliado1", "aliado2"]
  },
  "builds": [
    {
      "type": "perfect",
      "name": "Build Perfeita",
      "items": ["item1", "item2", "item3", "item4", "item5", "item6"],
      "reasoning": "explicação da build",
      "win_rate_estimated": 65,
      "confidence": 0.92
    },
    {
      "type": "balanced",
      "name": "Build Equilibrada", 
      "items": ["item1", "item2", "item3", "item4", "item5", "item6"],
      "reasoning": "explicação da build",
      "win_rate_estimated": 58,
      "confidence": 0.85
    },
    {
      "type": "situational",
      "name": "Build Situacional",
      "items": ["item1", "item2", "item3", "item4", "item5", "item6"], 
      "reasoning": "explicação da build",
      "win_rate_estimated": 52,
      "confidence": 0.78
    }
  ],
  "counters": {
    "hardest_counter": "champion_name",
    "counter_tips": ["dica1", "dica2", "dica3"]
  }
}

Seja preciso e use apenas nomes de itens que existem na lista fornecida.
`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Você é um especialista em League of Legends. Responda sempre em JSON válido conforme solicitado.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    const aiData = await response.json();
    const aiAnalysis = JSON.parse(aiData.choices[0].message.content);

    console.log('AI Analysis:', aiAnalysis);

    // Store analysis in database
    const { data: analysisData, error: analysisError } = await supabase
      .from('match_analysis')
      .insert({
        champion_name: champion,
        user_lane: lane,
        enemy_team: enemyTeam,
        ally_team: allyTeam,
        recommended_build: aiAnalysis.builds,
        counter_picks: [aiAnalysis.counters.hardest_counter],
        analysis_data: aiAnalysis,
        confidence_score: aiAnalysis.builds[0].confidence
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Error storing analysis:', analysisError);
    }

    return new Response(JSON.stringify(aiAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-build function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});