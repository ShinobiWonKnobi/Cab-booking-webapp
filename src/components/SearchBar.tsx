import React, { useState, useEffect } from 'react';
import { Search, Car } from 'lucide-react';

interface SearchBarProps {
  onSearch: (from: string, to: string) => void;
  userLocation: [number, number] | null;
}

interface Suggestion {
  id: string;
  place: string;
  coordinates: [number, number];
}

const mockSuggestions: Suggestion[] = [
  { id: '1', place: 'SRM KTR, Potheri', coordinates: [12.8231, 80.0442] },
  { id: '2', place: 'Chennai Central', coordinates: [13.0827, 80.2707] },
  { id: '3', place: 'Marina Beach', coordinates: [13.0500, 80.2824] },
  { id: '4', place: 'Mahabalipuram', coordinates: [12.6269, 80.1928] },
  { id: '5', place: 'Kanchipuram', coordinates: [12.8342, 79.7036] },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, userLocation }) => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    if (userLocation) {
      const nearestPlace = mockSuggestions.reduce((nearest, current) => {
        const [lat, lng] = current.coordinates;
        const distance = Math.sqrt(
          Math.pow(lat - userLocation[0], 2) + Math.pow(lng - userLocation[1], 2)
        );
        return distance < nearest.distance ? { place: current.place, distance } : nearest;
      }, { place: '', distance: Infinity });

      setFrom(nearestPlace.place);
    }
  }, [userLocation]);

  const handleInputChange = (input: 'from' | 'to', value: string) => {
    if (input === 'from') {
      setFrom(value);
    } else {
      setTo(value);
    }
    setActiveInput(input);

    // Filter suggestions based on input
    const filteredSuggestions = mockSuggestions.filter((suggestion) =>
      suggestion.place.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (activeInput === 'from') {
      setFrom(suggestion.place);
    } else {
      setTo(suggestion.place);
    }
    setSuggestions([]);
    setActiveInput(null);
  };

  const handleSearch = () => {
    onSearch(from, to);
    setSuggestions([]);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-4">
        <Car className="mr-2 text-purple-600" size={20} />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => handleInputChange('from', e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>
      <div className="flex items-center mb-4">
        <Car className="mr-2 text-purple-600" size={20} />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => handleInputChange('to', e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded-lg mt-1 shadow-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-3 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
            >
              {suggestion.place}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg mt-4 hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
      >
        <Search className="mr-2" size={20} />
        Search
      </button>
    </div>
  );
};

export default SearchBar;