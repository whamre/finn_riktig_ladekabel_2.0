import { Model } from '../types/database';
import { ChevronDown } from 'lucide-react';

interface ModelSelectProps {
  models: Model[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelect({ models, selectedModel, onModelChange }: ModelSelectProps) {
  return (
    <div className="relative">
      <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
        Velg model
      </label>
      <select
        id="model"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Velg en model</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}