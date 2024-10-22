import React from 'react';
import { Car, Truck, Zap } from 'lucide-react';

interface CabSelectionProps {
  onSelectCab: (cabType: string) => void;
  estimatedFare: number | null;
}

const cabTypes = [
  { type: 'Economy', icon: Car, priceMultiplier: 1, color: 'text-green-500' },
  { type: 'Premium', icon: Truck, priceMultiplier: 1.5, color: 'text-blue-500' },
  { type: 'Luxury', icon: Zap, priceMultiplier: 2, color: 'text-purple-500' },
];

const CabSelection: React.FC<CabSelectionProps> = ({ onSelectCab, estimatedFare }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Select a cab</h2>
      <div className="space-y-4">
        {cabTypes.map((cab) => (
          <button
            key={cab.type}
            onClick={() => onSelectCab(cab.type)}
            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center">
              <cab.icon className={`mr-3 ${cab.color}`} size={24} />
              <span className="font-medium">{cab.type}</span>
            </div>
            <span className="text-gray-600 font-semibold">
              {estimatedFare
                ? `₹${Math.round(estimatedFare * cab.priceMultiplier)}`
                : 'Select route for estimate'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CabSelection;