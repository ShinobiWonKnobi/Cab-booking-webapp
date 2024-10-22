import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import CabSelection from './components/CabSelection';
import BookingConfirmation from './components/BookingConfirmation';
import TrackingInfo from './components/TrackingInfo';
import { detectUserLocation, estimateFare, assignDriver, trackDriver } from './api/bookingApi';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedCab, setSelectedCab] = useState<string | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);
  const [assignedDriver, setAssignedDriver] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    detectUserLocation().then(setUserLocation);
  }, []);

  const handleSearch = async (from: string, to: string) => {
    setFrom(from);
    setTo(to);
    if (selectedCab) {
      const fare = await estimateFare(from, to, selectedCab);
      setEstimatedFare(fare);
    }
  };

  const handleCabSelection = async (cabType: string) => {
    setSelectedCab(cabType);
    if (from && to) {
      const fare = await estimateFare(from, to, cabType);
      setEstimatedFare(fare);
    }
  };

  const handleBooking = async () => {
    if (selectedCab) {
      const driver = await assignDriver(from, to, selectedCab);
      setAssignedDriver(driver);
      setIsBookingConfirmed(true);
      trackDriver(driver.id, setDriverLocation);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          <SearchBar onSearch={handleSearch} userLocation={userLocation} />
          {from && to && (
            <CabSelection onSelectCab={handleCabSelection} estimatedFare={estimatedFare} />
          )}
          {selectedCab && estimatedFare && (
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg mt-6 hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              onClick={handleBooking}
            >
              Book Now (Estimated Fare: ₹{estimatedFare})
            </button>
          )}
        </div>
        <div className="w-full md:w-2/3 h-64 md:h-auto rounded-lg shadow-md overflow-hidden">
          <Map from={from} to={to} userLocation={userLocation} driverLocation={driverLocation} />
        </div>
      </main>
      {isBookingConfirmed && assignedDriver && (
        <BookingConfirmation
          from={from}
          to={to}
          cabType={selectedCab || ''}
          driver={assignedDriver}
          estimatedFare={estimatedFare}
          onClose={() => setIsBookingConfirmed(false)}
        />
      )}
      {assignedDriver && (
        <TrackingInfo driver={assignedDriver} driverLocation={driverLocation} />
      )}
    </div>
  );
};

export default App;