import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface EnvelopeIntroProps {
  onOpenComplete?: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if already opened in this session
    const hasOpened = sessionStorage.getItem('wedding_envelope_opened');
    if (hasOpened === 'true') {
      setIsDismissed(true);
      document.body.style.overflow = 'unset';
      if (onOpenComplete) onOpenComplete();
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [onOpenComplete]);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Trigger sequence
    setIsOpen(true);

    // Save flag in sessionStorage
    try {
      sessionStorage.setItem('wedding_envelope_opened', 'true');
    } catch (e) {
      console.warn('Session storage not available:', e);
    }

    // Sequence timing
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      setIsDismissed(true);
      if (onOpenComplete) onOpenComplete();
    }, 2200);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2421]/95 backdrop-blur-md p-4 overflow-hidden select-none cursor-pointer"
          onClick={handleOpen}
        >
          {/* Subtle Background Particle Sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C86D51]/15 rounded-full blur-3xl" />
          </div>

          {/* Envelope Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[4/3] flex items-center justify-center [perspective:1200px]">
            
            {/* 1. Envelope Body (Backplate) */}
            <div className="absolute inset-0 rounded-2xl bg-[#FAF7F2] shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden">
              {/* Inner Lining with delicate floral pattern */}
              <div className="absolute inset-0 bg-[#F3ECE2] opacity-80" />
              <div className="absolute inset-2 border border-dashed border-[#C5A059]/30 rounded-xl" />
            </div>

            {/* 2. Invitation Card (Slides Up on Open) */}
            <motion.div
              initial={{ y: 0, scale: 0.96, opacity: 0.95 }}
              animate={
                isOpen
                  ? { y: -160, scale: 1.04, opacity: 1 }
                  : { y: 0, scale: 0.96, opacity: 0.95 }
              }
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-3 sm:inset-4 rounded-xl bg-white shadow-xl border border-[#C5A059]/60 p-6 flex flex-col items-center justify-center text-center z-10"
            >
              <div className="w-8 h-8 rounded-full border border-[#C5A059]/60 flex items-center justify-center mb-2">
                <span className="font-serif text-xs text-[#C5A059] italic">
                  {weddingConfig.couple.monogram}
                </span>
              </div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8A9A86] font-semibold">
                Together with their families
              </span>

              <h2 className="text-xl sm:text-2xl font-serif text-[#C86D51] font-normal my-1">
                {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
              </h2>

              <p className="text-[10px] uppercase tracking-widest text-[#5A4E48] font-medium mt-1">
                Are Getting Married
              </p>
              <p className="text-xs font-serif text-[#C5A059] italic mt-0.5">
                {weddingConfig.event.displayDate}
              </p>
            </motion.div>

            {/* 3. Envelope Pocket (Front Bottom Triangular Flap) */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden">
              <svg
                viewBox="0 0 440 330"
                className="w-full h-full drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Flap */}
                <polygon points="0,0 220,165 0,330" fill="#F4EFE6" opacity="0.98" />
                {/* Right Flap */}
                <polygon points="440,0 220,165 440,330" fill="#EFE8DD" opacity="0.98" />
                {/* Bottom Flap */}
                <polygon points="0,330 220,160 440,330" fill="#FAF7F2" />
                <path
                  d="M0 330 L220 160 L440 330"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>

            {/* 4. Top Flap (Flips Open Upward on Click) */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 right-0 h-[50%] z-30"
            >
              <svg
                viewBox="0 0 440 165"
                className="w-full h-full drop-shadow-lg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="0,0 440,0 220,165" fill="#FAF7F2" />
                <path
                  d="M0 0 L220 165 L440 0"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              </svg>
            </motion.div>

            {/* 5. Terracotta / Gold Wax Seal */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={isOpen ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center cursor-pointer group"
            >
              {/* Wax Seal Body */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#C86D51] via-[#A44A3F] to-[#78281D] shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center border-2 border-[#C5A059] group-hover:scale-105 transition-transform">
                
                {/* Wax Irregular Edge Effect */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#FAF7F2]/40 opacity-70" />
                
                {/* Monogram inside seal */}
                <div className="text-center">
                  <span className="font-serif text-sm sm:text-base text-[#FAF7F2] font-bold italic tracking-wider block drop-shadow">
                    {weddingConfig.couple.monogram}
                  </span>
                  <Heart className="w-2.5 h-2.5 text-[#E6D5AC] fill-[#E6D5AC] mx-auto mt-0.5" />
                </div>
              </div>

              {/* Pulsing "Tap to Open" Prompt */}
              <motion.div
                animate={{ y: [0, 4, 0], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-4 px-4 py-1.5 rounded-full bg-[#FAF7F2] text-[#C86D51] text-[11px] font-semibold tracking-widest uppercase border border-[#C5A059]/60 shadow-lg flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Tap to Open</span>
              </motion.div>
            </motion.div>

          </div>

          {/* Bottom subtle hint */}
          <div className="absolute bottom-6 text-center text-xs text-[#FAF7F2]/60 uppercase tracking-[0.25em]">
            Digital Wedding Invitation
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
