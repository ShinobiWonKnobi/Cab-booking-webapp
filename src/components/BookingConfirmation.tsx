import React from 'react';
import { X, Star } from 'lucide-react';

interface BookingConfirmationProps {
  from: string;
  to: string;
  cabType: string;
  driver: {
    name: string;
    rating: number;
    carModel: string;
    licensePlate: string;
  };
  estimatedFare: number | null;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  from,
  to,
  cabType,
  driver,
  estimatedFare,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">Booking Confirmed!</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p><strong className="text-gray-700">From:</strong> {from}</p>
          <p><strong className="text-gray-700">To:</strong> {to}</p>
          <p><strong className="text-gray-700">Cab Type:</strong> {cabType}</p>
          <p><strong className="text-gray-700">Estimated Fare:</strong> ₹{estimatedFare}</p>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2 text-purple-600">Driver Information</h3>
            <p><strong className="text-gray-700">Name:</strong> {driver.name}</p>
            <p className="flex items-center">
              <strong className="text-gray-700 mr-2">Rating:</strong>
              {driver.rating} <Star size={16} className="inline text-yellow-400 ml-1" />
            </p>
            <p><strong className="text-gray-700">Car:</strong> {driver.carModel}</p>
            <p><strong className="text-gray-700">License Plate:</strong> {driver.licensePlate}</p>
          </div>
          <p className="text-green-600 font-semibold text-center mt-4">Your cab is on the way!</p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;