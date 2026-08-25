import React from 'react';
import { motion } from 'framer-motion';

interface OpeningMonogramProps {
  monogram: string;
  isOpening: boolean;
  reducedMotion?: boolean;
}

export const OpeningMonogram: React.FC<OpeningMonogramProps> = ({
  monogram,
  isOpening,
  reducedMotion = false,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={
        isOpening
          ? reducedMotion
            ? { opacity: 0, transition: { duration: 0.5 } }
            : { scale: 1.4, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.7 } }
          : { scale: 1, opacity: 1, transition: { duration: 1.0 } }
      }
      className="relative flex items-center justify-center cursor-pointer group"
    >
      {/* 1. Outer Terracotta Wax Seal Body */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#E07A5F] via-[#C86D51] to-[#8C3420] shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex items-center justify-center border-2 border-[#E6D5AC]/60 group-hover:scale-105 transition-transform duration-300">
        
        {/* 2. Tactile Wax Bevel Ring & Rim Texture */}
        <div className="absolute inset-1.5 rounded-full border border-dashed border-[#FAF7F2]/40 opacity-80" />
        <div className="absolute inset-3.5 rounded-full bg-gradient-to-tl from-[#8C3420]/60 via-transparent to-[#E07A5F]/40 border border-[#FAF7F2]/25" />

        {/* 3. Concentric Inner Stamp Frame */}
        <div className="absolute inset-5 rounded-full border border-[#C5A059]/40 opacity-60" />

        {/* 4. Embossed Monogram Initials */}
        <div className="relative z-10 text-center px-2">
          <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FAF7F2] font-bold italic tracking-widest block drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] selection:bg-transparent">
            {monogram}
          </span>
        </div>

        {/* 5. Golden Shimmer Highlight */}
        <div className="absolute top-2 left-4 w-6 h-3 rounded-full bg-white/20 blur-[2px] transform -rotate-45" />
      </div>
    </motion.div>
  );
};
