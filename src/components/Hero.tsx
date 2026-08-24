import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('countdown');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-12 overflow-hidden text-[#FAF7F2]">
      {/* Full-Screen Looping Video / Photo Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {weddingConfig.media.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={weddingConfig.media.heroImageFallback}
            className="w-full h-full object-cover object-center filter brightness-65 contrast-105 scale-105"
          >
            <source src={weddingConfig.media.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={weddingConfig.media.heroImageFallback}
            alt="Hero Background"
            className="w-full h-full object-cover object-center filter brightness-65 contrast-105 scale-105"
          />
        )}
        
        {/* Warm Cinematic Overlay with Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#2B2421]/50 to-[#2B2421]/90" />
      </div>

      {/* Decorative Ornate Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#C5A059]/40 pointer-events-none rounded-2xl z-10 hidden sm:block" />

      {/* Top Header Monogram / Pre-title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 pt-6 flex flex-col items-center text-center"
      >
        <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#E6D5AC] font-light">
          The Wedding Celebration of
        </span>
        <div className="mt-2 flex items-center space-x-2">
          <div className="h-px w-8 bg-[#C5A059]/60" />
          <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
          <div className="h-px w-8 bg-[#C5A059]/60" />
        </div>
      </motion.div>

      {/* Center Couple Names & Wedding Date */}
      <div className="relative z-10 my-auto text-center max-w-3xl px-4 flex flex-col items-center">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#C5A059] flex items-center justify-center mb-6 bg-black/20 backdrop-blur-sm"
        >
          <span className="font-serif text-lg sm:text-xl text-[#E6D5AC] italic tracking-wider">
            {weddingConfig.couple.monogram}
          </span>
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-wide font-normal gold-foil leading-tight"
        >
          {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
        </motion.h1>

        {/* Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-6 inline-flex flex-col sm:flex-row items-center sm:space-x-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40"
        >
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#FAF7F2]">
            {weddingConfig.event.displayDate}
          </span>
          <span className="hidden sm:inline text-[#C5A059]">•</span>
          <span className="text-xs sm:text-sm text-[#E6D5AC] font-light">
            {weddingConfig.event.venueCity}
          </span>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        onClick={scrollToNext}
        className="relative z-10 pb-6 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#E6D5AC] font-medium mb-2 group-hover:text-[#FAF7F2] transition-colors">
          Scroll Down
        </span>
        <div className="w-8 h-8 rounded-full border border-[#C5A059]/50 flex items-center justify-center group-hover:border-[#C5A059] transition-all animate-bounce">
          <ChevronDown className="w-4 h-4 text-[#C5A059]" />
        </div>
      </motion.div>
    </section>
  );
};
