import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config/weddingConfig';

interface EnvelopeScreenProps {
  onStart?: () => void;
  monogram?: string;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({
  onStart,
  monogram = weddingConfig.couple.monogram,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleOpenClick = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Immediately trigger background audio
    if (onStart) {
      onStart();
    } else {
      window.dispatchEvent(
        new CustomEvent('wedding:play-audio', {
          detail: { fadeIn: true, duration: 3000 },
        })
      );
    }

    // Save session flag
    try {
      sessionStorage.setItem('wedding_envelope_opened', 'true');
    } catch (e) {
      console.warn('Session storage error:', e);
    }

    // Transition to main invite scene after 2.5s
    setTimeout(() => {
      setShowInvite(true);
    }, 2500);
  };

  if (showInvite) return null;

  return (
    <AnimatePresence mode="wait">
      {!showInvite && (
        <motion.div
          key="envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
          className="envelope-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none p-4 sm:p-6"
          style={{
            background: 'radial-gradient(circle at center, #2A1810 0%, #150C08 50%, #0D0A08 100%)',
            perspective: '1500px',
            height: '100dvh',
          }}
        >
          {/* Ambient Lighting & Sheen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A876]/10 rounded-full blur-[140px]" />
          </div>

          {/* Envelope Wrapper (Interactive Fullscreen Card) */}
          <motion.div
            className="envelope-wrapper relative w-full max-w-[92vw] sm:max-w-[82vw] md:max-w-[680px] h-[82vh] sm:h-[86vh] max-h-[800px] cursor-pointer group flex items-center justify-center"
            onClick={handleOpenClick}
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={
              isOpen
                ? {
                    scale: 2.5,
                    y: -200,
                    opacity: 0,
                    transition: { duration: 2.2, ease: [0.4, 0, 0.2, 1] },
                  }
                : { scale: 1, y: 0, opacity: 1 }
            }
            whileHover={isOpen ? {} : { scale: 1.015, rotateX: 1.5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 1. .envelope-back (Textured paper background layer) */}
            <div
              className="envelope-back absolute inset-0 rounded-3xl border border-[#C9A876]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #4A2F1F 0%, #3B2417 100%)',
              }}
            >
              {/* Embossed Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A876_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-5 rounded-2xl border border-[#C9A876]/20" />
            </div>

            {/* 2. .envelope-light (Subtle soft light sheen overlay) */}
            <div
              className="envelope-light absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(201,168,118,0.25) 0%, transparent 70%)',
                mixBlendMode: 'overlay',
              }}
            />

            {/* 3. .envelope-pocket (Front triangular pocket V-shape) */}
            <div
              className="envelope-pocket absolute inset-0 rounded-3xl pointer-events-none z-20 shadow-md"
              style={{
                background: 'linear-gradient(180deg, #3D2619 0%, #2E1B10 100%)',
                clipPath: 'polygon(0% 0%, 50% 55%, 100% 0%, 100% 100%, 0% 100%)',
                borderTop: '1px solid rgba(201,168,118,0.3)',
              }}
            />

            {/* 4. .envelope-flap & .wax-seal-wrapper (Top hinge flap & Wax Seal) */}
            <motion.div
              className="envelope-flap absolute top-0 left-0 right-0 h-[50%] z-30 pointer-events-none"
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180, zIndex: 10 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Flap SVG Polygon Shape */}
              <div
                className="w-full h-full drop-shadow-2xl"
                style={{
                  background: 'linear-gradient(180deg, #4A2F1F 0%, #3B2417 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  borderBottom: '1.5px solid rgba(201,168,118,0.5)',
                }}
              />

              {/* Centered Wax Seal on the Flap Tip */}
              <div className="wax-seal-wrapper absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 pointer-events-none">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#E0A96D] via-[#C9A876] to-[#8C5D2A] shadow-[0_15px_35px_rgba(0,0,0,0.75)] flex items-center justify-center border-2 border-[#F5EDE0]/70">
                  {/* Wax Texture Bevel Rings */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-[#F5EDE0]/40 opacity-75" />
                  <div className="absolute inset-3.5 rounded-full bg-gradient-to-tl from-[#73471A]/60 via-transparent to-[#F2C894]/40 border border-[#F5EDE0]/20" />

                  {/* Monogram Text */}
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5EDE0] font-bold italic tracking-widest block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {monogram}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeScreen;
