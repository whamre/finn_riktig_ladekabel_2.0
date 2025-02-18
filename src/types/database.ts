export interface Brand {
  id: string;
  name: string;
  created_at: string;
}

export interface Model {
  id: string;
  brand_id: string;
  name: string;
  lade_kontakt: string | null;
  batteri_kapasitet: string | null;
  ombordlader: string | null;
  created_at: string;
}

export interface Cable {
  id: string;
  model_id: string;
  length_range: string;
  part_number: string;
  created_at: string;
}