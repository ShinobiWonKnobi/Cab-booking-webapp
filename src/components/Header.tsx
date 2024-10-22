import React from 'react';
import { Car } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="text-white" size={28} />
          <h1 className="text-2xl font-bold tracking-tight">Cab Booking</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;