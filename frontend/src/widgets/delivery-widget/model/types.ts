export interface Address {
  id: string;
  address: string; // "ул. Тверская, 15"
  lat: number;
  lng: number;
  timestamp: number;
}

export interface DeliveryDetails {
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
  comment: string;
}

export interface FullDeliveryAddress extends Address {
  details: DeliveryDetails;
}

export interface DeliveryTime {
  duration: number; // in minutes
  distance: number; // in km
  nearestPizzeria: string;
}

export interface Pizzeria {
  name: string;
  lat: number;
  lng: number;
}