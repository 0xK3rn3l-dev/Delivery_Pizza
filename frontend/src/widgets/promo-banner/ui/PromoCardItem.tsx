'use client';

import { PromoCard } from '../model/cards';
import { Button } from '@/shared/ui';
import Link from 'next/link';

interface PromoCardItemProps {
  card: PromoCard;
}

export const PromoCardItem = ({ card }: PromoCardItemProps) => (
  <div className="group/card shrink-0 w-52 md:w-48 flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
    {/* Верхняя часть */}
    <div
      className={`relative h-44 bg-linear-to-br ${card.bgColor} flex items-center justify-center overflow-hidden`}
    >
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-orange-600 shadow-md">
        {card.discount}
      </div>
      <span className="text-8xl transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
        {card.emoji}
      </span>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
    </div>

    {/* Нижняя часть */}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-bold text-xl mb-1 text-gray-900">{card.title}</h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{card.subtitle}</p>
      <Link href="/menu" className="mt-auto">
        <Button
          variant="primary"
          size="md"
          className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {card.buttonText} →
        </Button>
      </Link>
    </div>
  </div>
);