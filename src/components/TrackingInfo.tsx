import React from 'react';
import { Car, Phone } from 'lucide-react';

interface TrackingInfoProps {
  driver: {
    name: string;
    carModel: string;
    licensePlate: string;
  };
  driverLocation: [number, number] | null;
}

const TrackingInfo: React.FC<TrackingInfoProps> = ({ driver, driverLocation }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-white p-6 rounded-lg shadow-xl z-[9998] max-w-sm">
      <h3 className="font-semibold text-lg mb-3 text-purple-600">Driver is on the way</h3>
      <p className="mb-2"><strong className="text-gray-700">Name:</strong> {driver.name}</p>
      <p className="mb-2"><strong className="text-gray-700">Car:</strong> {driver.carModel}</p>
      <p className="mb-2"><strong className="text-gray-700">License Plate:</strong> {driver.licensePlate}</p>
      {driverLocation && (
        <p className="flex items-center mt-3">
          <Car size={16} className="mr-2 text-purple-600" />
          <span className="text-sm text-gray-600">
            {driverLocation[0].toFixed(4)}, {driverLocation[1].toFixed(4)}
          </span>
        </p>
      )}
      <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out flex items-center justify-center">
        <Phone size={16} className="mr-2" />
        Contact Driver
      </button>
    </div>
  );
};

export default TrackingInfo;