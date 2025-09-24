import { supabase } from '@/integrations/supabase/client';
import { champions } from '@/data/champions';
import { items } from '@/data/items';

export const populateChampions = async () => {
  try {
    // Clear existing data
    await supabase.from('champions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert new data
    const championsData = champions.map(champion => ({
      name: champion.name,
      title: champion.title || '',
      role: Array.isArray(champion.role) ? champion.role[0] : champion.role,
      tier: champion.tier,
      win_rate: champion.winRate,
      pick_rate: champion.pickRate,
      ban_rate: champion.banRate,
      difficulty: champion.difficulty,
      tags: champion.tags,
      recommended_items: champion.recommendedItems,
      image: champion.image,
      counters: [], // Will be populated later
      strong_against: [], // Will be populated later
      abilities: {}, // Will be populated later
      stats: {} // Will be populated later
    }));

    const { error } = await supabase.from('champions').insert(championsData);
    if (error) throw error;
    
    console.log('Champions populated successfully');
    return true;
  } catch (error) {
    console.error('Error populating champions:', error);
    return false;
  }
};

export const populateItems = async () => {
  try {
    // Clear existing data
    await supabase.from('items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert new data
    const itemsData = items.map(item => ({
      name: item.name,
      description: item.description,
      cost: item.cost,
      stats: item.stats || {},
      categories: item.categories,
      tier: item.tier,
      win_rate: item.winRate,
      build_rate: item.buildRate,
      damage_type: item.damageType,
      tags: item.tags,
      image: item.image,
      passive: '', // Will be populated later
      active: '', // Will be populated later
      builds_into: [], // Will be populated later
      builds_from: [] // Will be populated later
    }));

    const { error } = await supabase.from('items').insert(itemsData);
    if (error) throw error;
    
    console.log('Items populated successfully');
    return true;
  } catch (error) {
    console.error('Error populating items:', error);
    return false;
  }
};

export const populateDatabase = async () => {
  console.log('Starting database population...');
  
  const championsSuccess = await populateChampions();
  const itemsSuccess = await populateItems();
  
  if (championsSuccess && itemsSuccess) {
    console.log('Database populated successfully!');
    return true;
  } else {
    console.log('Some errors occurred during population');
    return false;
  }
};