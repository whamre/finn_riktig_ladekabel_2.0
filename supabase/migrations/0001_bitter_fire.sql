/*
  # Car Database Schema

  1. New Tables
    - `brands` - Car manufacturers
      - `id` (uuid, primary key)
      - `name` (text, unique) - Brand name
      - `created_at` (timestamp)
    
    - `models` - Car models for each brand
      - `id` (uuid, primary key)
      - `brand_id` (uuid, foreign key)
      - `name` (text) - Model name
      - `lade_kontakt` (text) - Charging connector type
      - `batteri_kapasitet` (text) - Battery capacity
      - `ombordlader` (text) - Onboard charger
      - `created_at` (timestamp)

    - `cables` - Cable compatibility information
      - `id` (uuid, primary key)
      - `model_id` (uuid, foreign key)
      - `length_range` (text) - Cable length range (4m-5m or 7m-7.5m)
      - `part_number` (text) - Cable part number
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to brands"
  ON brands
  FOR SELECT
  TO public
  USING (true);

-- Create models table
CREATE TABLE IF NOT EXISTS models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) NOT NULL,
  name text NOT NULL,
  lade_kontakt text,
  batteri_kapasitet text,
  ombordlader text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(brand_id, name)
);

ALTER TABLE models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to models"
  ON models
  FOR SELECT
  TO public
  USING (true);

-- Create cables table
CREATE TABLE IF NOT EXISTS cables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES models(id) NOT NULL,
  length_range text NOT NULL,
  part_number text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to cables"
  ON cables
  FOR SELECT
  TO public
  USING (true);