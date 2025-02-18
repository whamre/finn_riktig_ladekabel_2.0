import { useState } from 'react';
import { CarSelector } from './components/CarSelector';
import { ModelSelector } from './components/ModelSelector';
import { VehicleDetails } from './components/VehicleDetails';
import { ThemeToggle } from './components/ThemeToggle';
import { Zap } from 'lucide-react';

function App() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [selectedModelId, setSelectedModelId] = useState<string>('');

  const handleBack = () => {
    if (selectedModelId) {
      setSelectedModelId('');
    } else if (selectedBrandId) {
      setSelectedBrandId('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <ThemeToggle />
      <main className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Ladekabelfinner
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Finn riktig ladekabel til din elbil
            </p>
          </div>
          
          <div className="max-w-[1280px] mx-auto space-y-8">
            {selectedBrandId && selectedModelId ? (
              <VehicleDetails modelId={selectedModelId} onBack={handleBack} />
            ) : selectedBrandId ? (
              <ModelSelector 
                brandId={selectedBrandId} 
                onModelSelect={setSelectedModelId}
                onBack={handleBack}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                <CarSelector onBrandSelect={setSelectedBrandId} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            <p>© {new Date().getFullYear()} https://github.com/whamre</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;