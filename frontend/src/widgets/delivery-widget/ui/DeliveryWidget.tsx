'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Импортируйте тип пропсов (экспортируйте его из ClientMap)
import type { ClientMapProps } from './ClientMap';

// Динамический импорт карты с правильными типами
const ClientMap = dynamic<ClientMapProps>(
  () => import('./ClientMap').then((mod) => mod.ClientMap),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Загрузка карты...</div>
      </div>
    )
  }
);

interface Address {
  id: string;
  address: string;
  lat: number;
  lng: number;
  timestamp: number;
}

interface DeliveryTime {
  duration: number;
  distance: number;
  nearestPizzeria: string;
}
























export const DeliveryWidget = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [recentAddresses, setRecentAddresses] = useState<Address[]>([]);
  const [previewAddress, setPreviewAddress] = useState<Address | null>(null);
  
  const [isPreviewAddress, setIsPreviewAddress] = useState(false); 
  const [isSearching, setIsSearching] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Address[]>([]);













  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.751244, 37.618423]);




  

  









  // Load data from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedDeliveryAddress');
    const savedRecent = localStorage.getItem('recentDeliveryAddresses');
    
    if (savedAddress) {
      const parsed = JSON.parse(savedAddress);
      setSelectedAddress(parsed);
      setMapCenter([parsed.lat, parsed.lng]);
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
      localStorage.removeItem('recentDeliveryAddresses');
    }
  }, [recentAddresses]);








  // Geocoding function
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

  // Calculate delivery time
  const calculateDeliveryTime = (lat: number, lng: number) => {
    const pizzerias = [
      { name: 'Pizza House Central', lat: 55.7558, lng: 37.6176 },
      { name: 'Pizza Express Arbat', lat: 55.7522, lng: 37.6006 },
      { name: 'Pizza Roma Tverskaya', lat: 55.7646, lng: 37.6056 },
    ];

    let nearest = pizzerias[0];
    let minDistance = calculateDistance(lat, lng, nearest.lat, nearest.lng);

    pizzerias.forEach(pizzeria => {
      const distance = calculateDistance(lat, lng, pizzeria.lat, pizzeria.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = pizzeria;
      }
    });

    const duration = Math.round(minDistance * 1000 / 200) + 15;
    
    setDeliveryTime({
      duration: duration,
      distance: Math.round(minDistance * 10) / 10,
      nearestPizzeria: nearest.name,
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };



















  const handleClearRecentAddresses = () => {
    if (confirm('Вы уверены, что хотите очистить историю недавних адресов?')) {
      setRecentAddresses([]);
    }
  };

  const handleRemoveRecentAddress = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentAddresses(recentAddresses.filter(addr => addr.id !== addressId));
  };





  const handlePreviewAddress = (address: Address) => {
    setPreviewAddress(address);
    setIsPreviewAddress(true);  // 👈 Включаем режим предпросмотра
    setMapCenter([address.lat, address.lng]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handlePreviewRecentAddress = (address: Address) => {
    setPreviewAddress(address);
    setIsPreviewAddress(true);  // 👈 Включаем режим предпросмотра
    setMapCenter([address.lat, address.lng]);
  };


  const handleConfirmAddress = () => {
    if (previewAddress && isPreviewAddress) {
      setSelectedAddress(previewAddress);
      calculateDeliveryTime(previewAddress.lat, previewAddress.lng);
      
      // Обновляем недавние адреса
      const existingIndex = recentAddresses.findIndex(a => a.address === previewAddress.address);
      let updatedRecent;
      
      if (existingIndex !== -1) {
        updatedRecent = [
          previewAddress,
          ...recentAddresses.filter((_, i) => i !== existingIndex)
        ];
      } else {
        updatedRecent = [previewAddress, ...recentAddresses].slice(0, 4);
      }

      setRecentAddresses(updatedRecent);
      setIsPreviewAddress(false);
      alert(`Адрес доставки сохранен: ${previewAddress.address}\nВремя доставки: ${deliveryTime?.duration} минут`);
    } else if (selectedAddress) {
      alert(`Адрес уже выбран: ${selectedAddress.address}`);
    } else {
      alert('Пожалуйста, выберите адрес из поиска или недавних');
    }
  };


  const handleCancelPreview = () => {
    setPreviewAddress(null);
    setIsPreviewAddress(false);
    if (selectedAddress) {
      setMapCenter([selectedAddress.lat, selectedAddress.lng]);
    } else {
      setMapCenter([55.751244, 37.618423]);
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
              <ClientMap center={mapCenter} selectedAddress={previewAddress || selectedAddress} />
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
                      onClick={() => handlePreviewAddress(result)}
                      className={`w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition ${
                        previewAddress?.id === result.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
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
                        onClick={() => handlePreviewRecentAddress(address)}
                        className={`w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition pr-10 ${
                          previewAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''
                        }`}
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



            {/* Preview address display - только если в режиме предпросмотра */}
            {isPreviewAddress && previewAddress && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-yellow-800">Подтвердить адрес:</h3>
                    <p className="text-sm text-gray-700">{previewAddress.address}</p>
                    <p className="text-xs text-yellow-600 mt-1">⚠️ Нажмите "Подтвердить", чтобы сохранить</p>
                  </div>
                  <button
                    onClick={handleCancelPreview}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}



            {/* Selected address display */}
            {selectedAddress && !isPreviewAddress && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-1 text-green-800">✅ Выбранный адрес:</h3>
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

            {/* Cancel button - показываем только в режиме предпросмотра */}
            {isPreviewAddress && (
              <button
                onClick={handleCancelPreview}
                className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Отмена
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};