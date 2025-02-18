import { createClient } from '@supabase/supabase-js';
import { carData } from './data/carData.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_SERVICE_KEY) {
  console.error('Required environment variables are missing. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
);

async function importCarData() {
  try {
    console.log('Starting data import...');
    
    // Clear existing data first
    console.log('Clearing existing data...');
    const { error: deleteError } = await supabase.from('cables').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) throw deleteError;

    const { error: deleteModelsError } = await supabase.from('models').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteModelsError) throw deleteModelsError;

    const { error: deleteBrandsError } = await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteBrandsError) throw deleteBrandsError;
    
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
            batteri_kapasitet: modelData.batterikapasitet,
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
            part_number: partNumber
          })));
        }
        
        if (modelData['7m-7.5m']) {
          cables.push(...modelData['7m-7.5m'].map(partNumber => ({
            model_id: model.id,
            length_range: '7m-7.5m',
            part_number: partNumber
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
    process.exit(1);
  }
}

// Run the import
importCarData().catch(error => {
  console.error('Import failed:', error);
  process.exit(1);
});