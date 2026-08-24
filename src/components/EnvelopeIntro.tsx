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
    setIsOpen(true);

    // Trigger background music immediately on user gesture
    window.dispatchEvent(new CustomEvent('wedding:play-audio'));

    // Save flag in sessionStorage
    try {
      sessionStorage.setItem('wedding_envelope_opened', 'true');
    } catch (e) {
      console.warn('Session storage not available:', e);
    }

    // Direct, elegant opening transition into the main page
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      setIsDismissed(true);
      if (onOpenComplete) onOpenComplete();
    }, 1000);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1715]/95 backdrop-blur-lg p-4 sm:p-6 overflow-hidden select-none cursor-pointer"
          onClick={handleOpen}
        >
          {/* Ambient Warm Golden Lighting */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C86D51]/20 rounded-full blur-[100px]" />
          </div>

          {/* Full-Scale Envelope Presentation Container */}
          <div className="relative w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] aspect-[1.38/1] flex items-center justify-center [perspective:1400px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)]">
            
            {/* 1. Envelope Body (Backplate & Interior Lining) */}
            <div className="absolute inset-0 rounded-2xl bg-[#FAF7F2] border-2 border-[#C5A059]/50 overflow-hidden shadow-2xl">
              {/* Inner Luxury Lining Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5EFE6] via-[#EFE5D5] to-[#E5D7C2]" />
              <div className="absolute inset-3 border border-[#C5A059]/30 rounded-xl" />
              <div className="absolute inset-4 border border-dashed border-[#C5A059]/20 rounded-lg" />
            </div>

            {/* 2. Envelope Pocket (Front Triangular Flaps) */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden">
              <svg
                viewBox="0 0 620 450"
                className="w-full h-full drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Flap */}
                <polygon points="0,0 310,225 0,450" fill="#F4EFE6" opacity="0.98" />
                {/* Right Flap */}
                <polygon points="620,0 310,225 620,450" fill="#EFE8DD" opacity="0.98" />
                {/* Bottom Flap */}
                <polygon points="0,450 310,220 620,450" fill="#FAF7F2" />
                <path
                  d="M0 450 L310 220 L620 450"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>

            {/* 3. Top Flap (Flips Open in 3D on Touch) */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180, zIndex: 10 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 right-0 h-[50%] z-30"
            >
              <svg
                viewBox="0 0 620 225"
                className="w-full h-full drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="0,0 620,0 310,225" fill="#FAF7F2" />
                <path
                  d="M0 0 L310 225 L620 0"
                  stroke="#C5A059"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                {/* Subtle Inner Crease Line */}
                <path
                  d="M10 5 L310 215 L610 5"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
              </svg>
            </motion.div>

            {/* 4. Luxury Wax Seal & Tap Prompt */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={isOpen ? { scale: 1.5, opacity: 0, filter: 'blur(6px)' } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center cursor-pointer group"
            >
              {/* Wax Seal */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#C86D51] via-[#9B382A] to-[#6E1C12] shadow-[0_12px_28px_rgba(0,0,0,0.45)] flex items-center justify-center border-2 border-[#C5A059] group-hover:scale-105 transition-transform duration-300">
                {/* Wax Irregular Edge Ring */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#FAF7F2]/40 opacity-75" />
                
                {/* Monogram Seal */}
                <div className="text-center">
                  <span className="font-serif text-base sm:text-lg text-[#FAF7F2] font-bold italic tracking-wider block drop-shadow-md">
                    {weddingConfig.couple.monogram}
                  </span>
                  <Heart className="w-3 h-3 text-[#E6D5AC] fill-[#E6D5AC] mx-auto mt-0.5" />
                </div>
              </div>

              {/* Pulsing "Tap to Open" Badge */}
              <motion.div
                animate={{ y: [0, 4, 0], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-4 px-5 py-2 rounded-full bg-[#FAF7F2]/95 backdrop-blur-sm text-[#C86D51] text-xs sm:text-sm font-semibold tracking-widest uppercase border border-[#C5A059]/70 shadow-xl flex items-center space-x-2 whitespace-nowrap group-hover:bg-white group-hover:border-[#C5A059]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Tap to Open</span>
              </motion.div>
            </motion.div>

          </div>

          {/* Bottom Luxury Title */}
          <div className="absolute bottom-6 sm:bottom-8 text-center text-xs sm:text-sm text-[#FAF7F2]/75 uppercase tracking-[0.3em] font-medium font-serif">
            Yeabsera & Leyu — Wedding Invitation
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

