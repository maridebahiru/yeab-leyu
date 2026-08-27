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
      window.dispatchEvent(new CustomEvent('wedding:start-autoscroll'));
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
            {/* 1. .envelope-back (Textured paper background layer with Damask Wallpaper Lining) */}
            <div
              className="envelope-back absolute inset-0 rounded-3xl border border-[#C9A876]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
              style={{
                backgroundColor: '#FAF7F2',
                backgroundImage: "linear-gradient(rgba(250, 247, 242, 0.55), rgba(250, 247, 242, 0.55)), url('/assets/damask-pattern.jpg')",
                backgroundRepeat: 'repeat',
                backgroundSize: '240px 240px',
              }}
            >
              <div className="absolute inset-5 rounded-2xl border-2 border-[#C9A876]/30" />
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

              {/* Centered Realistic Burgundy Wax Seal on the Flap Tip */}
              <div className="wax-seal-wrapper absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 pointer-events-none">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
                  {/* Realistic Organic Wax Seal SVG */}
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Rich Burgundy Wax Gradients */}
                      <radialGradient id="waxBaseGrad" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#A82832" />
                        <stop offset="35%" stopColor="#7A1821" />
                        <stop offset="75%" stopColor="#4A0C12" />
                        <stop offset="100%" stopColor="#2E060A" />
                      </radialGradient>

                      <radialGradient id="waxInnerGrad" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#96222B" />
                        <stop offset="50%" stopColor="#661118" />
                        <stop offset="100%" stopColor="#3B080D" />
                      </radialGradient>

                      <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5E8C7" stopOpacity="0.65" />
                        <stop offset="50%" stopColor="#C5A059" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8E6A28" stopOpacity="0" />
                      </linearGradient>

                      {/* Debossed / Engraved Stamp Effect Shadow */}
                      <filter id="debossShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feOffset dx="1" dy="1.5" />
                        <feGaussianBlur stdDeviation="0.8" result="offset-blur" />
                        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                        <feFlood floodColor="#1A0204" floodOpacity="0.9" result="color" />
                        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                      </filter>
                    </defs>

                    {/* Irregular Organic Melted Wax Outer Base */}
                    <path
                      d="M 60,6 
                         C 74,5 88,10 98,20 
                         C 107,30 113,44 114,58 
                         C 115,73 109,88 98,99 
                         C 87,110 72,115 58,114 
                         C 43,113 29,107 19,96 
                         C 8,85 4,70 6,56 
                         C 8,41 15,27 26,17 
                         C 36,7 48,7 60,6 Z"
                      fill="url(#waxBaseGrad)"
                      stroke="#590F15"
                      strokeWidth="1.5"
                    />

                    {/* Melted Outer Lip / Wax Ridge Detail */}
                    <path
                      d="M 60,11 
                         C 71,10 83,14 91,22 
                         C 99,30 104,42 105,54 
                         C 106,67 101,80 91,89 
                         C 82,98 69,103 57,102 
                         C 44,101 32,96 23,86 
                         C 14,77 10,64 12,52 
                         C 14,39 20,27 30,19 
                         C 39,11 49,11 60,11 Z"
                      fill="none"
                      stroke="#C03A46"
                      strokeWidth="1"
                      opacity="0.35"
                    />

                    {/* Inner Pressed Impression Circular Ring */}
                    <circle
                      cx="60"
                      cy="60"
                      r="38"
                      fill="url(#waxInnerGrad)"
                      stroke="#330508"
                      strokeWidth="2.5"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="37"
                      fill="none"
                      stroke="#B32E38"
                      strokeWidth="1"
                      opacity="0.4"
                    />

                    {/* Gold Specular Highlight Curve on Top Edge */}
                    <path
                      d="M 32,38 C 40,28 55,24 72,26"
                      fill="none"
                      stroke="url(#goldSheen)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Pressed / Engraved Monogram Initial Text: Y & L */}
                    <g filter="url(#debossShadow)">
                      {/* Subtle Highlight Outline around Engraved Letters */}
                      <text
                        x="60.8"
                        y="66.5"
                        textAnchor="middle"
                        fill="#E89B9E"
                        fontSize="23"
                        fontWeight="bold"
                        fontFamily="Cinzel, Cormorant Garamond, Playfair Display, Georgia, serif"
                        letterSpacing="1.5"
                        opacity="0.75"
                      >
                        {monogram}
                      </text>

                      {/* Engraved Deep Cream Inner Text */}
                      <text
                        x="60"
                        y="65.8"
                        textAnchor="middle"
                        fill="#F5EDE0"
                        fontSize="23"
                        fontWeight="bold"
                        fontFamily="Cinzel, Cormorant Garamond, Playfair Display, Georgia, serif"
                        letterSpacing="1.5"
                      >
                        {monogram}
                      </text>
                    </g>
                  </svg>
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
