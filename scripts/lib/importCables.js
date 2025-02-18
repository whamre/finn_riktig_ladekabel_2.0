import { supabase } from './supabase.js';

export async function importCables(modelId, modelName, modelData) {
  const cables = [];
  
  if (modelData['4m-5m']) {
    cables.push(...modelData['4m-5m'].map(partNumber => ({
      model_id: modelId,
      length_range: '4m-5m',
      part_number: partNumber
    })));
  }
  
  if (modelData['7m-7.5m']) {
    cables.push(...modelData['7m-7.5m'].map(partNumber => ({
      model_id: modelId,
      length_range: '7m-7.5m',
      part_number: partNumber
    })));
  }

  if (cables.length > 0) {
    console.log(`Importing ${cables.length} cables for ${modelName}`);
    
    const { error: cablesError } = await supabase
      .from('cables')
      .insert(cables);

    if (cablesError) {
      console.error(`Error inserting cables for ${modelName}:`, cablesError);
      return false;
    }
  }

  return true;
}