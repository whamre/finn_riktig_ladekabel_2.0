import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Model } from '../types/database';
import { ArrowLeft, Car } from 'lucide-react';

interface ModelSelectorProps {
  brandId: string;
  onModelSelect: (modelId: string) => void;
  onBack: () => void;
}

export function ModelSelector({ brandId, onModelSelect, onBack }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    fetchBrandAndModels();
  }, [brandId]);

  async function fetchBrandAndModels() {
    try {
      setLoading(true);
      
      const { data: brandData } = await supabase
        .from('brands')
        .select('name')
        .eq('id', brandId)
        .single();
      
      if (brandData) {
        setBrandName(brandData.name);
      }

      const { data: modelsData, error } = await supabase
        .from('models')
        .select('*')
        .eq('brand_id', brandId)
        .order('name');
      
      if (error) throw error;
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {brandName} Modeller
        </h3>
      </div>

      <div className="grid gap-4">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelSelect(model.id)}
            className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">{model.name}</h4>
              {model.batteri_kapasitet && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Battery: {model.batteri_kapasitet}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}