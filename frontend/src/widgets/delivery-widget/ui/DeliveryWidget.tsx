// src/widgets/delivery-widget/ui/DeliveryWidget.tsx

'use client';

import dynamic from 'next/dynamic';
import type { ClientMapProps } from './ClientMap';
import { useDelivery } from '../model/useDelivery';

// Динамический импорт карты
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

export const DeliveryWidget = () => {
  const {
    selectedAddress,
    recentAddresses,
    previewAddress,
    isPreviewAddress,
    searchQuery,
    searchResults,
    isSearching,
    deliveryTime,
    mapCenter,
    setSearchQuery,
    searchAddress,
    handlePreviewAddress,
    handlePreviewRecentAddress,
    handleConfirmAddress,
    handleCancelPreview,
    handleClearRecentAddresses,
    handleRemoveRecentAddress,
    showDetailsModal,
    deliveryDetails,
    setShowDetailsModal,
    setDeliveryDetails,
    handleFinalConfirm,
  } = useDelivery();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Выберите адрес доставки</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Map */}
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96">
              <ClientMap 
                center={mapCenter} 
                selectedAddress={previewAddress || selectedAddress} 
              />
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

            {/* Preview address display */}
            {isPreviewAddress && previewAddress && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-yellow-800">Подтвердите адрес:</h3>
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

            {/* Cancel button */}
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
      {showDetailsModal && previewAddress && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
        <div className="bg-white rounded-xl p-6 w-[400px] max-w-[90%]">
          <h3 className="text-xl font-bold mb-2">Детали доставки</h3>
          <p className="text-sm text-gray-600 mb-4">{previewAddress.address}</p>
          
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Квартира / офис *" 
              className="w-full p-2 border rounded-lg"
              value={deliveryDetails.apartment}
              onChange={(e) => setDeliveryDetails({...deliveryDetails, apartment: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Подъезд" 
              className="w-full p-2 border rounded-lg"
              value={deliveryDetails.entrance}
              onChange={(e) => setDeliveryDetails({...deliveryDetails, entrance: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Этаж" 
              className="w-full p-2 border rounded-lg"
              value={deliveryDetails.floor}
              onChange={(e) => setDeliveryDetails({...deliveryDetails, floor: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Домофон" 
              className="w-full p-2 border rounded-lg"
              value={deliveryDetails.intercom}
              onChange={(e) => setDeliveryDetails({...deliveryDetails, intercom: e.target.value})}
            />
            <textarea 
              placeholder="Комментарий курьеру" 
              className="w-full p-2 border rounded-lg"
              rows={2}
              value={deliveryDetails.comment}
              onChange={(e) => setDeliveryDetails({...deliveryDetails, comment: e.target.value})}
            />
          </div>
          
          <div className="flex gap-2 mt-5">
            <button 
              onClick={() => handleFinalConfirm(deliveryDetails)}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              disabled={!deliveryDetails.apartment}
            >
              Подтвердить
            </button>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300"
            >
              Назад
            </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};