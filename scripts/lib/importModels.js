import { supabase } from './supabase.js';

export async function importModel(brandId, modelName, modelData) {
  console.log(`Importing model: ${modelName}`);
  
  const { data: model, error: modelError } = await supabase
    .from('models')
    .insert({
      brand_id: brandId,
      name: modelName,
      lade_kontakt: modelData.ladekontakt,
      batteri_kapasitet: modelData.batterikapasitet,
      ombordlader: modelData.ombordlader
    })
    .select()
    .single();

  if (modelError) {
    console.error(`Error inserting model ${modelName}:`, modelError);
    return null;
  }

  return model;
}