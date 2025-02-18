import { supabase } from './supabase.js';

export async function importBrand(brandName) {
  console.log(`Importing brand: ${brandName}`);
  
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .insert({ name: brandName })
    .select()
    .single();

  if (brandError) {
    console.error(`Error inserting brand ${brandName}:`, brandError);
    return null;
  }

  return brand;
}