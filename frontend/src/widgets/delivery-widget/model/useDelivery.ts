// src/widgets/delivery-widget/model/useDelivery.ts

import { useState, useEffect } from 'react';
import { Address, DeliveryTime, Pizzeria, DeliveryDetails } from './interfaces';
import { useCity } from '@/features/city-selector/model/useCity';
import { getPizzeriasByCity } from '@/shared/config/interfaces/pizzerias'; 


export const useDelivery = () => {
  const { city } = useCity();
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [recentAddresses, setRecentAddresses] = useState<Address[]>([]);
  const [previewAddress, setPreviewAddress] = useState<Address | null>(null);
  const [isPreviewAddress, setIsPreviewAddress] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Address[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(city.center);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    apartment: '',
    entrance: '',
    floor: '',
    intercom: '',
    comment: ''
  });

  // 👈 При смене города обновляем центр карты и очищаем адреса
  useEffect(() => {
    setMapCenter(city.center);
    setSelectedAddress(null);
    setPreviewAddress(null);
    setIsPreviewAddress(false);
    setSearchResults([]);
    setSearchQuery('');
    
    // Загружаем сохраненные адреса для этого города
    const savedRecent = localStorage.getItem(`recentDeliveryAddresses_${city.id}`);
    if (savedRecent) {
      setRecentAddresses(JSON.parse(savedRecent));
    } else {
      setRecentAddresses([]);
    }
  }, [city]);

  // Загрузка из localStorage (без city, только при монтировании)
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedDeliveryAddress');
    if (savedAddress) {
      const parsed = JSON.parse(savedAddress);
      // Проверяем, что сохраненный адрес соответствует текущему городу
      if (parsed.cityId === city.id) {
        setSelectedAddress(parsed);
        setMapCenter([parsed.lat, parsed.lng]);
      }
    }
  }, []);

  // Сохранение в localStorage с привязкой к городу
  useEffect(() => {
    if (selectedAddress) {
      const addressWithCity = {
        ...selectedAddress,
        cityId: city.id
      };
      localStorage.setItem('selectedDeliveryAddress', JSON.stringify(addressWithCity));
    }
  }, [selectedAddress, city]);

  // Сохранение недавних адресов с привязкой к городу
  useEffect(() => {
    if (recentAddresses.length > 0) {
      localStorage.setItem(`recentDeliveryAddresses_${city.id}`, JSON.stringify(recentAddresses));
    } else {
      localStorage.removeItem(`recentDeliveryAddresses_${city.id}`);
    }
  }, [recentAddresses, city]);

  // Геокодинг (поиск адреса)
  const searchAddress = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      // Добавляем город в поиск для лучших результатов
      const searchQueryWithCity = `${query}, ${city.name}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQueryWithCity)}&limit=5&addressdetails=1`
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
          lat: city.center[0],
          lng: city.center[1],
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  // Расчет расстояния (Haversine formula)
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

  // Расчет времени доставки (с учетом города)  // МБ БЕЗ УЧЕТА ГОРОДА ПРОСТО СПИСОК С ИИ ВСЕХ
  const calculateDeliveryTime = (lat: number, lng: number) => {
    const pizzerias = getPizzeriasByCity(city.id); // 👈 Получаем пиццерии для города
    
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

  // Предпросмотр адреса (из поиска)
  const handlePreviewAddress = (address: Address) => {
    setPreviewAddress(address);
    setIsPreviewAddress(true);
    setMapCenter([address.lat, address.lng]);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Предпросмотр адреса (из недавних)
  const handlePreviewRecentAddress = (address: Address) => {
    setPreviewAddress(address);
    setIsPreviewAddress(true);
    setMapCenter([address.lat, address.lng]);
  };

  // Подтверждение адреса
  const handleConfirmAddress = () => {
    if (previewAddress && isPreviewAddress) {
      setShowDetailsModal(true);
      return false;
    }
    
    if (selectedAddress) {
      alert(`Адрес уже выбран: ${selectedAddress.address}`);
      return false;
    }
    
    alert('Пожалуйста, выберите адрес из поиска или недавних');
    return false;
  };

  // Отмена предпросмотра
  const handleCancelPreview = () => {
    setPreviewAddress(null);
    setIsPreviewAddress(false);
    if (selectedAddress) {
      setMapCenter([selectedAddress.lat, selectedAddress.lng]);
    } else {
      setMapCenter(city.center);
    }
  };

  // Финальное подтверждение с деталями
  const handleFinalConfirm = (details: DeliveryDetails) => {
    if (previewAddress) {
      const fullAddress = {
        ...previewAddress,
        details: details,
        cityId: city.id,
        address: `${previewAddress.address}, кв. ${details.apartment}`
      };
      
      setSelectedAddress(fullAddress);
      calculateDeliveryTime(previewAddress.lat, previewAddress.lng);
      
      // Обновляем недавние адреса
      const updatedRecent = [fullAddress, ...recentAddresses].slice(0, 4);
      setRecentAddresses(updatedRecent);
      setIsPreviewAddress(false);
      setShowDetailsModal(false);
      
      // Сбрасываем детали
      setDeliveryDetails({
        apartment: '',
        entrance: '',
        floor: '',
        intercom: '',
        comment: ''
      });
       
      alert(`Адрес сохранен: ${fullAddress.address}\nВремя доставки: ${deliveryTime?.duration} минут`);
      return true;
    }
    return false;
  };

  // Очистка всех недавних адресов
  const handleClearRecentAddresses = () => {
    if (confirm('Вы уверены, что хотите очистить историю недавних адресов?')) {
      setRecentAddresses([]);
    }
  };

  // Удаление одного адреса из недавних
  const handleRemoveRecentAddress = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentAddresses(recentAddresses.filter(addr => addr.id !== addressId));
  };

  return {
    // Состояния
    selectedAddress,
    recentAddresses,
    previewAddress,
    isPreviewAddress,
    searchQuery,
    searchResults,
    isSearching,
    deliveryTime,
    mapCenter,
    showDetailsModal,
    deliveryDetails,
    currentCity: city, // 👈 Добавляем текущий город
    
    // Сеттеры
    setSearchQuery,
    setShowDetailsModal,
    setDeliveryDetails,
    
    // Методы
    searchAddress,
    handlePreviewAddress,
    handlePreviewRecentAddress,
    handleConfirmAddress,
    handleCancelPreview,
    handleFinalConfirm,
    handleClearRecentAddresses,
    handleRemoveRecentAddress,
  };
};