export interface City {
  id: string;
  name: string;
  center: [number, number]; // координаты центра города
  zoom: number;
  deliveryPrice: number;
  minOrderAmount: number;
}

export const CITIES: City[] = [
  {
    id: 'moscow',
    name: 'Москва',
    center: [55.751244, 37.618423],
    zoom: 12,
    deliveryPrice: 99,
    minOrderAmount: 500
  },
  {
    id: 'spb',
    name: 'Санкт-Петербург',
    center: [59.9343, 30.3351],
    zoom: 12,
    deliveryPrice: 99,
    minOrderAmount: 500
  },
  {
    id: 'kazan',
    name: 'Казань',
    center: [55.796127, 49.106405],
    zoom: 12,
    deliveryPrice: 99,
    minOrderAmount: 500
  }
];