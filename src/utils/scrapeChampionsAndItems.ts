// Edge function data scraper
import { supabase } from '@/integrations/supabase/client';

interface ScrapedChampion {
  name: string;
  imageUrl: string;
}

interface ScrapedItem {
  name: string;
  imageUrl: string;
  cost?: number;
  stats?: string[];
}

export const scrapeChampions = async (): Promise<ScrapedChampion[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-champions', {
      body: {}
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar campeões:', error);
    return [];
  }
};

export const scrapeItems = async (): Promise<ScrapedItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-items', {
      body: {}
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return [];
  }
};