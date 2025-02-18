import { Brand } from '../types/database';
import { ChevronDown } from 'lucide-react';

interface BrandSelectProps {
  brands: Brand[];
  selectedBrand: string;
  onBrandChange: (brandId: string) => void;
}

export function BrandSelect({ brands, selectedBrand, onBrandChange }: BrandSelectProps) {
  return (
    <div className="relative">
      <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
        Select Brand
      </label>
      <select
        id="brand"
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}