import { supabase } from './supabase.js';
import { carData } from '../data/carData.js';

export async function importCarData() {
  try {
    console.log('Starting data import...');
    
    // Clear existing data first
    console.log('Clearing existing data...');
    await supabase.from('cables').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('models').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Process each brand
    for (const [brandName, models] of Object.entries(carData)) {
      console.log(`Processing brand: ${brandName}`);
      
      // Insert brand
      const { data: brand, error: brandError } = await supabase
        .from('brands')
        .insert({ name: brandName })
        .select()
        .single();

      if (brandError) {
        console.error(`Failed to insert brand ${brandName}:`, brandError);
        continue;
      }

      // Process each model
      for (const [modelName, modelData] of Object.entries(models)) {
        console.log(`Processing model: ${modelName}`);
        
        // Insert model
        const { data: model, error: modelError } = await supabase
          .from('models')
          .insert({
            brand_id: brand.id,
            name: modelName,
            lade_kontakt: modelData.ladekontakt,
            batteri_kapasitet: Array.isArray(modelData.batterikapasitet) 
              ? modelData.batterikapasitet.join(', ')
              : modelData.batterikapasitet,
            ombordlader: modelData.ombordlader
          })
          .select()
          .single();

        if (modelError) {
          console.error(`Failed to insert model ${modelName}:`, modelError);
          continue;
        }

        // Prepare cables data
        const cables = [];
        
        if (modelData['4m-5m']) {
          cables.push(...modelData['4m-5m'].map(partNumber => ({
            model_id: model.id,
            length_range: '4m-5m',
            part_number: partNumber.replace(/\s+/g, '-')
          })));
        }
        
        if (modelData['7m-7.5m']) {
          cables.push(...modelData['7m-7.5m'].map(partNumber => ({
            model_id: model.id,
            length_range: '7m-7.5m',
            part_number: partNumber.replace(/\s+/g, '-')
          })));
        }

        // Insert cables if any exist
        if (cables.length > 0) {
          console.log(`Importing ${cables.length} cables for ${modelName}`);
          
          const { error: cablesError } = await supabase
            .from('cables')
            .insert(cables);

          if (cablesError) {
            console.error(`Failed to insert cables for ${modelName}:`, cablesError);
          }
        }
      }
    }

    console.log('Data import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
}