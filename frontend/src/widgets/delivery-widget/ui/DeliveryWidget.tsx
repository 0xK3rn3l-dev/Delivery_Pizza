'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when address changes
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

interface Address {
  id: string;
  address: string;
  lat: number;
  lng: number;
  timestamp: number;
}

interface DeliveryTime {
  duration: number; // in minutes
  distance: number; // in km
  nearestPizzeria: string;
}

export const DeliveryWidget = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [recentAddresses, setRecentAddresses] = useState<Address[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Address[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.751244, 37.618423]); // Moscow center

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedDeliveryAddress');
    const savedRecent = localStorage.getItem('recentDeliveryAddresses');
    
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    }
    
    if (savedRecent) {
      setRecentAddresses(JSON.parse(savedRecent));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedDeliveryAddress', JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (recentAddresses.length > 0) {
      localStorage.setItem('recentDeliveryAddresses', JSON.stringify(recentAddresses));
    } else {
      // If recent addresses are empty, remove from localStorage
      localStorage.removeItem('recentDeliveryAddresses');
    }
  }, [recentAddresses]);

  // Geocoding function (using Nominatim - free, but rate limited)
  const searchAddress = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      const results: Address[] = data.map((item: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        address: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        timestamp: Date.now(),
      }));
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching address:', error);
      // Fallback mock data for demo
      setSearchResults([
        {
          id: '1',
          address: query,
          lat: 55.751244,
          lng: 37.618423,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  // Calculate delivery time and nearest pizzeria
  const calculateDeliveryTime = (lat: number, lng: number) => {
    // Mock pizzerias in Moscow
    const pizzerias = [
      { name: 'Pizza House Central', lat: 55.7558, lng: 37.6176 },
      { name: 'Pizza Express Arbat', lat: 55.7522, lng: 37.6006 },
      { name: 'Pizza Roma Tverskaya', lat: 55.7646, lng: 37.6056 },
    ];

    // Calculate distances and find nearest pizzeria
    let nearest = pizzerias[0];
    let minDistance = calculateDistance(lat, lng, nearest.lat, nearest.lng);

    pizzerias.forEach(pizzeria => {
      const distance = calculateDistance(lat, lng, pizzeria.lat, pizzeria.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = pizzeria;
      }
    });

    // Calculate delivery time (1 minute per 200m + 15 minutes preparation)
    const duration = Math.round(minDistance * 1000 / 200) + 15;
    
    setDeliveryTime({
      duration: duration,
      distance: Math.round(minDistance * 10) / 10,
      nearestPizzeria: nearest.name,
    });
  };

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Clear all recent addresses
  const handleClearRecentAddresses = () => {
    if (confirm('Вы уверены, что хотите очистить историю недавних адресов?')) {
      setRecentAddresses([]);
    }
  };

  // Remove single address from recent list
  const handleRemoveRecentAddress = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the address when clicking remove
    setRecentAddresses(recentAddresses.filter(addr => addr.id !== addressId));
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setMapCenter([address.lat, address.lng]);
    calculateDeliveryTime(address.lat, address.lng);
    
    // Update recent addresses
    const existingIndex = recentAddresses.findIndex(a => a.address === address.address);
    let updatedRecent;
    
    if (existingIndex !== -1) {
      // Move existing address to front
      updatedRecent = [
        address,
        ...recentAddresses.filter((_, i) => i !== existingIndex)
      ];
    } else {
      // Add new address to front, keep only last 4
      updatedRecent = [address, ...recentAddresses].slice(0, 4);
    }
    
    setRecentAddresses(updatedRecent);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleConfirmAddress = () => {
    if (selectedAddress) {
      alert(`Адрес доставки сохранен: ${selectedAddress.address}\nВремя доставки: ${deliveryTime?.duration} минут`);
    } else {
      alert('Пожалуйста, выберите адрес доставки');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Выберите адрес доставки</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Map */}
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96">
              <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedAddress && (
                  <Marker position={[selectedAddress.lat, selectedAddress.lng]} />
                )}
                <MapUpdater center={mapCenter} />
              </MapContainer>
            </div>
            
            {/* Delivery time info */}
            {deliveryTime && selectedAddress && (
              <div className="p-4 bg-gray-50 border-t">
                <h3 className="font-semibold text-lg mb-2">Информация о доставке</h3>
                <div className="space-y-1 text-sm">
                  <p>🚚 Ближайшая пиццерия: <span className="font-medium">{deliveryTime.nearestPizzeria}</span></p>
                  <p>📏 Расстояние: <span className="font-medium">{deliveryTime.distance} км</span></p>
                  <p>⏱️ Время доставки: <span className="font-medium text-green-600">{deliveryTime.duration} минут</span></p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Address search */}
        <div className="order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* Search input */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchAddress(searchQuery)}
                placeholder="Введите адрес доставки..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => searchAddress(searchQuery)}
                disabled={isSearching}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
              >
                {isSearching ? 'Поиск...' : 'Найти адрес'}
              </button>
            </div>

            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Результаты поиска:</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectAddress(result)}
                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <p className="text-sm">{result.address}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent addresses */}
            {recentAddresses.length > 0 && !searchResults.length && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Недавние адреса:</h3>
                  <button
                    onClick={handleClearRecentAddresses}
                    className="text-sm text-red-500 hover:text-red-700 transition"
                  >
                    Очистить все
                  </button>
                </div>
                <div className="space-y-2">
                  {recentAddresses.map((address) => (
                    <div key={address.id} className="relative group">
                      <button
                        onClick={() => handleSelectAddress(address)}
                        className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition pr-10"
                      >
                        <p className="text-sm">{address.address}</p>
                      </button>
                      <button
                        onClick={(e) => handleRemoveRecentAddress(address.id, e)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                        title="Удалить адрес"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected address display */}
            {selectedAddress && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-1">Выбранный адрес:</h3>
                <p className="text-sm text-gray-700">{selectedAddress.address}</p>
              </div>
            )}

            {/* Confirm button */}
            <button
              onClick={handleConfirmAddress}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Подтвердить адрес доставки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};