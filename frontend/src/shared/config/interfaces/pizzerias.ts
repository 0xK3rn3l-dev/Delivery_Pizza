export interface Pizzeria {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  phone?: string;
  workingHours?: string;
}

// Пиццерии по городам
export const PIZZERIAS_BY_CITY: Record<string, Pizzeria[]> = {
  moscow: [
    { 
      name: 'Pizza House Central', 
      lat: 55.7558, 
      lng: 37.6176,
      address: 'ул. Тверская, 15',
      phone: '+7 (495) 123-45-67',
      workingHours: '10:00 - 23:00'
    },
    { 
      name: 'Pizza Express Arbat', 
      lat: 55.7522, 
      lng: 37.6006,
      address: 'ул. Арбат, 10',
      phone: '+7 (495) 234-56-78',
      workingHours: '11:00 - 00:00'
    },
    { 
      name: 'Pizza Roma Tverskaya', 
      lat: 55.7646, 
      lng: 37.6056,
      address: 'Тверской бульвар, 5',
      phone: '+7 (495) 345-67-89',
      workingHours: '10:00 - 22:00'
    },
  ],
  spb: [
    { 
      name: 'Pizza House Nevsky', 
      lat: 59.9343, 
      lng: 30.3351,
      address: 'Невский пр., 50',
      phone: '+7 (812) 123-45-67',
      workingHours: '10:00 - 23:00'
    },
    { 
      name: 'Pizza Express Palace', 
      lat: 59.9398, 
      lng: 30.3146,
      address: 'Дворцовая пл., 1',
      phone: '+7 (812) 234-56-78',
      workingHours: '11:00 - 00:00'
    },
    { 
      name: 'Pizza Roma Fontanka', 
      lat: 59.9285, 
      lng: 30.3162,
      address: 'наб. Фонтанки, 20',
      phone: '+7 (812) 345-67-89',
      workingHours: '10:00 - 22:00'
    },
  ],
  kazan: [
    { 
      name: 'Pizza House Kremlin', 
      lat: 55.796127, 
      lng: 49.106405,
      address: 'ул. Баумана, 15',
      phone: '+7 (843) 123-45-67',
      workingHours: '10:00 - 23:00'
    },
    { 
      name: 'Pizza Express Bauman', 
      lat: 55.7958, 
      lng: 49.1085,
      address: 'ул. Баумана, 30',
      phone: '+7 (843) 234-56-78',
      workingHours: '11:00 - 00:00'
    },
    { 
      name: 'Pizza Roma Millennium', 
      lat: 55.8003, 
      lng: 49.1054,
      address: 'пр. Ямашева, 45',
      phone: '+7 (843) 345-67-89',
      workingHours: '10:00 - 22:00'
    },
  ],
};

// Функция для получения пиццерий по городу
export const getPizzeriasByCity = (cityId: string): Pizzeria[] => {
  return PIZZERIAS_BY_CITY[cityId] || PIZZERIAS_BY_CITY.moscow;
};