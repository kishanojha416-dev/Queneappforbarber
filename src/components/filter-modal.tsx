import { X, MapPin, Star, Clock, DollarSign, Scissors } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export function FilterModal({ onClose, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState({
    distance: 5,
    rating: 0,
    priceRange: [0, 1000],
    services: [] as string[],
    availability: 'all',
  });

  const services = [
    'Haircut',
    'Beard Trim',
    'Hair Color',
    'Facial',
    'Massage',
    'Hair Spa',
  ];

  const handleServiceToggle = (service: string) => {
    if (filters.services.includes(service)) {
      setFilters({
        ...filters,
        services: filters.services.filter(s => s !== service),
      });
    } else {
      setFilters({
        ...filters,
        services: [...filters.services, service],
      });
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      distance: 5,
      rating: 0,
      priceRange: [0, 1000],
      services: [],
      availability: 'all',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Filter Barber Shops</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Distance */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <MapPin className="w-5 h-5 text-violet-500" />
              Distance: {filters.distance} km
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: Number(e.target.value) })}
              className="w-full h-2 bg-violet-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>1 km</span>
              <span>20 km</span>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <Star className="w-5 h-5 text-amber-400" />
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filters.rating === rating
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <Scissors className="w-5 h-5 text-violet-500" />
              Services
            </label>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => handleServiceToggle(service)}
                  className={`px-4 py-3 rounded-lg font-medium transition ${
                    filters.services.includes(service)
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <Clock className="w-5 h-5 text-blue-500" />
              Availability
            </label>
            <div className="flex gap-3">
              {[
                { value: 'all', label: 'All' },
                { value: 'open', label: 'Open Now' },
                { value: 'low-wait', label: 'Low Wait Time' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters({ ...filters, availability: option.value })}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                    filters.availability === option.value
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-semibold transition"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl font-semibold transition shadow-lg shadow-violet-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
