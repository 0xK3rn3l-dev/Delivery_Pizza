'use client';
//import { theme } from '@shared/lib';
import Image from 'next/image';
import { CitySelector } from '@/features/city-selector';

export const PromoLogo = () => {
  
  /*
  const handleCityChange = (city: string) => {
        // Здесь можно обновлять контент в зависимости от города
        console.log('Выбран город:', city);
  };
  */
 
    return (
<section className="max-w-5xl mx-auto px-16">
  <div className="flex justify-between items-center">
    <div className="flex flex-col text-left">
      <div className="flex items-center gap-4"> 
        <Image
          src="/images/logo/PromoLogo.svg"
          alt="PromoLogo"
          width={150}
          height={150}
        />
        <div>
          <h1 className="text-3xl font-bold">Delivery Pizza</h1>
          <h2 className="text-gray-500 mt-2">The #1 Pizza delivery</h2>
        </div>
      </div>
    </div>
    
    <CitySelector onCityChange={(city) => {}} />

  </div>
</section>
    )
    
}