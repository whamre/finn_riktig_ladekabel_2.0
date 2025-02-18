import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Brand } from '../types/database';
import { AlertCircle } from 'lucide-react';

interface CarSelectorProps {
  onBrandSelect: (brandId: string) => void;
}

const brandLogos: Record<string, string> = {
  'Aiways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Aiways_Logo_01.2021.svg/200px-Aiways_Logo_01.2021.svg.png',
  'Aston Martin': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Aston_Martin_Lagonda_brand_logo.png/220px-Aston_Martin_Lagonda_brand_logo.png',
  'Audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/512px-Audi-Logo_2016.svg.png',
  'BMW': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/512px-BMW.svg.png',
  'BYD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/BYD_Auto_2022_logo.svg/200px-BYD_Auto_2022_logo.svg.png',
  'Citroen': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Citroen_2022.svg',
  'Fiat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/512px-Fiat_Automobiles_logo.svg.png',
  'Ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/512px-Ford_logo_flat.svg.png',
  'Hyundai': 'https://i.namu.wiki/i/Iu9zZQJ6VDhoEC3goMITaHnBNOAbxz5buSqhkMwnNcjBIvbURav08bsIPoY9pn7EBu-Hqlp-x94o6rD8J3vJ2g.svg',
  'Kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/512px-KIA_logo2.svg.png',
  'Maxus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Logo_Maxus_Motor_%28Thailand%29_.co.%2Cltd.png/220px-Logo_Maxus_Motor_%28Thailand%29_.co.%2Cltd.png',
  'Mercedes-Benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/512px-Mercedes-Logo.svg.png',
  'Mitsubishi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/512px-Mitsubishi_logo.svg.png',
  'Nissan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_2020_logo.svg/143px-Nissan_2020_logo.svg.png',
  'Opel': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Opel_logo_2023.svg/250px-Opel_logo_2023.svg.png',
  'Peugeot': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Peugeot_2021_Logo.svg/200px-Peugeot_2021_Logo.svg.png',
  'Polestar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Polestar_Logo.svg/220px-Polestar_Logo.svg.png',
  'Porsche': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Porsche_logo.svg/200px-Porsche_logo.svg.png',
  'Skoda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/%C5%A0koda_nieuw.png/220px-%C5%A0koda_nieuw.png',
  'Tesla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png',
  'Toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/512px-Toyota_carlogo.svg.png',
  'Volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/512px-Volkswagen_logo_2019.svg.png',
  'Volvo': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Volvo_Iron_Logo.png/220px-Volvo_Iron_Logo.png',
  'XPeng': 'https://1000logos.net/wp-content/uploads/2023/12/XPeng-Logo.jpg'
};

export function CarSelector({ onBrandSelect }: CarSelectorProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchBrands();
  }, []);

  async function fetchBrands() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }

      if (data) {
        setBrands(data);
      }
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError('Unable to load brands. The service might be temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const handleImageError = (brandName: string) => {
    setFailedLogos(prev => new Set([...prev, brandName]));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Service Unavailable</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => fetchBrands()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Velg bilmerke</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onBrandSelect(brand.id)}
            className="group flex flex-col items-center p-4 rounded-xl transition-all duration-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg"
          >
            <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center p-2">
              {brandLogos[brand.name] && !failedLogos.has(brand.name) ? (
                <img
                  src={brandLogos[brand.name]}
                  alt={`${brand.name} logo`}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                  onError={() => handleImageError(brand.name)}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full">
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-300">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}