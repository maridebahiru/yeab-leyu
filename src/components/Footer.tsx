import React from 'react';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 px-4 bg-[#2B2421] text-[#FAF7F2] text-center overflow-hidden">
      {/* Decorative Warm Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      <div className="max-w-xl mx-auto space-y-6">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-[#C5A059]/60 flex items-center justify-center mx-auto bg-black/20">
          <span className="font-serif text-sm text-[#E6D5AC] italic">
            {weddingConfig.couple.monogram}
          </span>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#E6D5AC] font-light block mb-1">
            Thank You For Being Part Of Our Story
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF7F2] mt-2 gold-foil">
            {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
          </h2>
        </div>

        <HeritageDivider color="#E6D5AC" className="my-4" />

        <p className="text-xs sm:text-sm text-[#FAF7F2]/75 font-light max-w-md mx-auto italic font-serif">
          "We can't wait to celebrate the beginning of our forever with the people who mean the world to us."
        </p>

        <div className="pt-6 border-t border-white/10 text-[11px] text-[#FAF7F2]/50 tracking-wider">
          <p className="flex items-center justify-center space-x-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#C86D51] fill-[#C86D51]" />
            <span>for {weddingConfig.couple.hashtag}</span>
          </p>
          <p className="mt-1 text-[10px]">
            {weddingConfig.event.displayDate} • {weddingConfig.event.venueCity}
          </p>
        </div>
      </div>
    </footer>
  );
};
