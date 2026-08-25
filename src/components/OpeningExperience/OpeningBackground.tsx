import React from 'react';
import { motion } from 'framer-motion';

interface OpeningBackgroundProps {
  bgImageSrc?: string;
  isOpening?: boolean;
  reducedMotion?: boolean;
}

export const OpeningBackground: React.FC<OpeningBackgroundProps> = ({
  bgImageSrc = '/assets/envelope-bg.jpg',
  isOpening = false,
  reducedMotion = false,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 1. Base Gradient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#273729] via-[#1F2C21] to-[#152016]" />

      {/* 2. Optional Background Texture Image */}
      {bgImageSrc && (
        <img
          src={bgImageSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          alt=""
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}

      {/* 3. Embossed Leaf & Floral Vector Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <pattern
          id="opening-emboss-pattern"
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M80 15 C88 35 102 50 125 55 C102 60 88 75 80 95 C72 75 58 60 35 55 C58 50 72 35 80 15 Z"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="0.8"
            opacity="0.65"
          />
          <circle cx="80" cy="55" r="4" fill="#C5A059" opacity="0.45" />
          <path
            d="M0 95 C20 100 35 115 40 135 C35 155 20 170 0 175 Z"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="0.6"
            opacity="0.35"
          />
          <path
            d="M160 95 C140 100 125 115 120 135 C125 155 140 170 160 175 Z"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="0.6"
            opacity="0.35"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#opening-emboss-pattern)" />
      </svg>

      {/* 4. Ambient Warm Golden Lighting Glow Spots */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.15 }
            : {
                scale: isOpening ? [1, 1.35, 1.6] : [1, 1.15, 1],
                opacity: isOpening ? [0.2, 0.4, 0.6] : [0.15, 0.25, 0.15],
              }
        }
        transition={{
          duration: isOpening ? 2.5 : 8,
          repeat: isOpening ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C5A059]/20 rounded-full blur-[150px]"
      />

      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-[#C86D51]/15 rounded-full blur-[130px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-[#5C715E]/20 rounded-full blur-[110px]" />

      {/* 5. Subtle Gold Floating Sparkles (Disabled when reduced motion is preferred) */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${12 + i * 11}%`,
                y: `${20 + (i % 4) * 20}%`,
                opacity: 0.2,
                scale: 0.6,
              }}
              animate={{
                y: [`${20 + (i % 4) * 20}%`, `${10 + (i % 4) * 20}%`, `${20 + (i % 4) * 20}%`],
                opacity: [0.2, 0.65, 0.2],
                scale: [0.6, 1.1, 0.6],
              }}
              transition={{
                duration: 4 + (i % 3) * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#E6D5AC] shadow-[0_0_8px_#C5A059]"
            />
          ))}
        </div>
      )}
    </div>
  );
};
