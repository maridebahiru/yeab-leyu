import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { OpeningMonogram } from './OpeningMonogram';
import { envelopeFlapVariants, cardRiseVariants } from './openingVariants';

interface OpeningCardProps {
  brideName: string;
  groomName: string;
  displayDate: string;
  monogram: string;
  subtitleText: string;
  buttonText: string;
  state: 'loading' | 'intro' | 'ready' | 'opening' | 'revealing' | 'complete';
  onOpenTrigger: () => void;
  reducedMotion?: boolean;
}

export const OpeningCard: React.FC<OpeningCardProps> = ({
  brideName,
  groomName,
  displayDate,
  monogram,
  subtitleText,
  buttonText,
  state,
  onOpenTrigger,
  reducedMotion = false,
}) => {
  const isOpeningOrBeyond = state === 'opening' || state === 'revealing' || state === 'complete';
  const isReadyOrBeyond = state !== 'loading' && state !== 'intro';

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-[1/1.32] sm:aspect-[1.32/1] flex flex-col items-center justify-center [perspective:1400px]">
      {/* 1. Envelope Outer Body */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2A3B2D] via-[#213023] to-[#18241A] border border-[#C5A059]/45 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Inner Gold Foil & Lining Trims */}
        <div className="absolute inset-3 rounded-xl border border-[#C5A059]/25 bg-[#FAF7F2]/5" />
        <div className="absolute inset-5 rounded-lg border border-dashed border-[#C5A059]/15" />
      </div>

      {/* 2. Side & Bottom Triangular Pocket Flaps */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 520 390"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,0 260,190 0,390" fill="#253427" opacity="0.95" />
          <polygon points="520,0 260,190 520,390" fill="#1D2A1F" opacity="0.95" />
          <polygon points="0,390 260,185 520,390" fill="#29392C" />
          <path
            d="M0 390 L260 185 L520 390"
            stroke="#C5A059"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
        </svg>
      </div>

      {/* 3. Top Unfolding 3D Flap */}
      <motion.div
        variants={reducedMotion ? {} : envelopeFlapVariants}
        initial="closed"
        animate={isOpeningOrBeyond ? 'opened' : 'closed'}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 left-0 right-0 h-[50%] z-30 pointer-events-none"
      >
        <svg
          viewBox="0 0 520 195"
          className="w-full h-full drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,0 520,0 260,195" fill="#2E4031" />
          <path
            d="M0 0 L260 195 L520 0"
            stroke="#C5A059"
            strokeWidth="1.8"
            strokeOpacity="0.6"
          />
        </svg>
      </motion.div>

      {/* 4. Revealable Invitation Card Inside Envelope */}
      <motion.div
        variants={reducedMotion ? {} : cardRiseVariants}
        initial="hidden"
        animate={isOpeningOrBeyond ? 'revealed' : 'hidden'}
        className="absolute inset-[12%] z-15 rounded-xl border-2 border-[#C5A059]/60 p-6 flex flex-col items-center justify-center text-center shadow-2xl pointer-events-none overflow-hidden"
        style={{
          backgroundColor: '#FAF7F2',
          backgroundImage: "linear-gradient(rgba(250, 247, 242, 0.55), rgba(250, 247, 242, 0.55)), url('/assets/damask-pattern.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
        }}
      >
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
          <Heart className="w-3.5 h-3.5 fill-[#C5A059]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
            Wedding Invitation
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#C5A059]" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2421] font-bold tracking-tight mt-1">
          {brideName} & {groomName}
        </h3>

        <p className="text-xs sm:text-sm text-[#5A4E48] mt-2 font-serif italic max-w-[280px]">
          {subtitleText}
        </p>

        <div className="mt-3 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-serif font-medium">
          {displayDate}
        </div>
      </motion.div>

      {/* 5. Centered Monogram Terracotta Wax Seal & Invitation Header Info */}
      <div className="relative z-40 flex flex-col items-center justify-center text-center px-4">
        <OpeningMonogram
          monogram={monogram}
          isOpening={isOpeningOrBeyond}
          reducedMotion={reducedMotion}
        />

        {/* Text Header Details before click */}
        {!isOpeningOrBeyond && isReadyOrBeyond && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-5 sm:mt-6 flex flex-col items-center max-w-[320px]"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-bold tracking-wide drop-shadow-md">
              {brideName} & {groomName}
            </h2>

            <p className="text-xs sm:text-sm text-[#E6D5AC] font-serif italic mt-1.5 opacity-90 drop-shadow">
              {subtitleText}
            </p>

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2">
              {displayDate}
            </span>

            {/* Main "Open Our Invitation" CTA Button */}
            <button
              type="button"
              onClick={onOpenTrigger}
              className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C86D51] via-[#B85538] to-[#9E3E26] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-widest uppercase border border-[#E6D5AC]/60 shadow-[0_10px_25px_rgba(200,109,81,0.5)] flex items-center space-x-2.5 hover:scale-105 hover:shadow-[0_15px_35px_rgba(200,109,81,0.7)] transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              aria-label={buttonText}
            >
              <Sparkles className="w-4 h-4 text-[#E6D5AC]" />
              <span>{buttonText}</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
