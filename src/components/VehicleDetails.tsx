import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Model, Cable } from '../types/database';
import { Car, Battery, Plug2, Cable as CableIcon, ArrowLeft } from 'lucide-react';

interface VehicleDetailsProps {
  modelId: string;
  onBack: () => void;
}

export function VehicleDetails({ modelId, onBack }: VehicleDetailsProps) {
  const [model, setModel] = useState<Model | null>(null);
  const [cables, setCables] = useState<Cable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modelId) {
      fetchModelDetails();
    }
  }, [modelId]);

  async function fetchModelDetails() {
    try {
      setLoading(true);
      
      const { data: modelData, error: modelError } = await supabase
        .from('models')
        .select(`
          *,
          brand:brands(name)
        `)
        .eq('id', modelId)
        .single();
      
      if (modelError) throw modelError;
      setModel(modelData);

      const { data: cablesData, error: cablesError } = await supabase
        .from('cables')
        .select('*')
        .eq('model_id', modelId);
      
      if (cablesError) throw cablesError;
      setCables(cablesData || []);
    } catch (error) {
      console.error('Error fetching model details:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !model) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const cablesByLength = cables.reduce((acc, cable) => {
    if (!acc[cable.length_range]) {
      acc[cable.length_range] = [];
    }
    acc[cable.length_range].push(cable);
    return acc;
  }, {} as Record<string, Cable[]>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="px-8 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {model.brand?.name} {model.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kjøretøyspesifikasjoner</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
            <Plug2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Ladekontakt</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{model.lade_kontakt || 'Ikke tilgjengelig'}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
            <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Batterikapasitet</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{model.batteri_kapasitet || 'Ikke tilgjengelig'}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg">
            <Car className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Ombordlader</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{model.ombordlader || 'Ikke tilgjengelig'}</div>
            </div>
          </div>
        </div>

        {Object.keys(cablesByLength).length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kompatible ladekabler</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(cablesByLength).map(([lengthRange, cables]) => (
                <div
                  key={lengthRange}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CableIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                      {lengthRange} Kabelalternativer
                    </h5>
                  </div>
                  <div className="space-y-2">
                    {cables.map((cable) => (
                      <div 
                        key={cable.id}
                        className="text-sm text-gray-600 dark:text-gray-300 pl-8 py-1 border-l-2 border-blue-100 dark:border-blue-800"
                      >
                        Delenummer: {cable.part_number}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}