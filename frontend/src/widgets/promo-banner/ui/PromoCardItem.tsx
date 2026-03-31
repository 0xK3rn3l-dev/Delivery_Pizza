'use client';

import Image from 'next/image';
import { PromoCard } from '../model/types';

interface PromoCardItemProps {
  card: PromoCard;
  onClick: () => void;
}

export const PromoCardItem = ({ card, onClick }: PromoCardItemProps) => (
  <div 
    onClick={onClick}
    className="group/card shrink-0 w-64 md:w-56 flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
  >
    <div className="relative h-72 overflow-hidden">
      {card.image ? (
        <div className="absolute inset-0">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/20"></div>
        </div>
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${card.bgColor}`}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {!card.image && card.emoji && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-8xl transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
            {card.emoji}
          </span>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-bold text-xl text-white drop-shadow-lg mb-2">
          {card.title}
        </h3>
        <p className="text-white/90 text-sm mb-4 leading-relaxed drop-shadow">
          {card.subtitle}
        </p>
      </div>
    </div>
  </div>
);