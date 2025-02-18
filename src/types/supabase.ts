export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      models: {
        Row: {
          id: string
          brand_id: string
          name: string
          lade_kontakt: string | null
          batteri_kapasitet: string | null
          ombordlader: string | null
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          name: string
          lade_kontakt?: string | null
          batteri_kapasitet?: string | null
          ombordlader?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          name?: string
          lade_kontakt?: string | null
          batteri_kapasitet?: string | null
          ombordlader?: string | null
          created_at?: string
        }
      }
      cables: {
        Row: {
          id: string
          model_id: string
          length_range: string
          part_number: string
          created_at: string
        }
        Insert: {
          id?: string
          model_id: string
          length_range: string
          part_number: string
          created_at?: string
        }
        Update: {
          id?: string
          model_id?: string
          length_range?: string
          part_number?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}