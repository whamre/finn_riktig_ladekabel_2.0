import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '../..');

// Load environment variables from .env file
config({ path: join(rootDir, '.env') });

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_SERVICE_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = {
  supabaseUrl: process.env.VITE_SUPABASE_URL,
  supabaseServiceKey: process.env.VITE_SUPABASE_SERVICE_KEY
};