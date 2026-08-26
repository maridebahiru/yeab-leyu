import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('countdown');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasVideo = Boolean(weddingConfig.media.heroVideo);
  const secondaryMedia = weddingConfig.media.heroSecondaryMedia || weddingConfig.story.photo;
  const isSecondaryVideo = secondaryMedia.endsWith('.mp4') || secondaryMedia.endsWith('.webm');

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#2B2421]">
      {/* ========================================================================= */}
      {/* 1. TOP FULL-SCREEN CINEMATIC HERO VIEWPORT                                */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[100dvh] min-h-[650px] flex flex-col justify-between items-center px-4 sm:px-6 py-6 sm:py-10 text-[#FAF7F2] overflow-hidden bg-[#14100E]">
        {/* Full-Screen Video Background System */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {hasVideo ? (
            <>
              {/* Layer 1: Widescreen Ambient Blur Canvas */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={weddingConfig.media.heroImageFallback}
                className="absolute inset-0 w-full h-full object-cover object-center filter blur-2xl scale-110 opacity-70 brightness-[0.85] hidden md:block pointer-events-none"
              >
                <source src={weddingConfig.media.heroVideo} type="video/mp4" />
              </video>

              {/* Layer 2: Main Foreground Video with Desktop Soft Mask */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={weddingConfig.media.heroImageFallback}
                  className="w-full h-full object-cover object-[center_35%] md:object-contain md:object-center filter brightness-[0.96] contrast-[1.02] transition-all duration-700 [mask-image:none] md:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:none] md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                  <source src={weddingConfig.media.heroVideo} type="video/mp4" />
                </video>
              </div>
            </>
          ) : (
            <>
              <img
                src={weddingConfig.media.heroImageFallback}
                alt="Hero Background Ambient"
                className="absolute inset-0 w-full h-full object-cover object-center filter blur-2xl scale-110 opacity-70 brightness-[0.85] hidden md:block pointer-events-none"
              />
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                <img
                  src={weddingConfig.media.heroImageFallback}
                  alt="Hero Background"
                  className="w-full h-full object-cover object-[center_35%] md:object-contain md:object-center filter brightness-[0.96] contrast-[1.02] [mask-image:none] md:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:none] md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
                />
              </div>
            </>
          )}

          {/* Cinematic Vignette Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(15, 12, 11, 0.55) 0%,
                rgba(15, 12, 11, 0.15) 25%,
                rgba(15, 12, 11, 0.05) 50%,
                rgba(15, 12, 11, 0.4) 75%,
                rgba(15, 12, 11, 0.85) 100%
              )`
            }}
          />
        </div>

        {/* Top Header — Amharic Script & Subtle Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 pt-4 sm:pt-6 flex flex-col items-center text-center drop-shadow-md"
        >
          {weddingConfig.couple.amharicTitle && (
            <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#E6D5AC] opacity-90 mb-1">
              {weddingConfig.couple.amharicTitle}
            </span>
          )}
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#FAF7F2]/80 font-light">
            The Wedding Celebration of
          </span>
        </motion.div>

        {/* Lower Editorial Focus — Couple Names & Date */}
        <div className="relative z-10 mt-auto mb-10 sm:mb-14 md:mb-16 text-center max-w-4xl px-4 flex flex-col items-center drop-shadow-lg">
          {/* Primary Focus — Couple Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight font-normal gold-foil leading-[1.1] mb-3 sm:mb-4 drop-shadow-2xl"
          >
            {weddingConfig.couple.groomName} & {weddingConfig.couple.brideName}
          </motion.h1>

          {/* Wedding Date & Location */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm text-[#FAF7F2]"
          >
            <span className="font-medium tracking-[0.25em] uppercase text-[#FAF7F2]">
              {weddingConfig.event.displayDate}
            </span>
            <span className="hidden sm:inline text-[#C5A059] opacity-70">•</span>
            <span className="tracking-[0.15em] text-[#E6D5AC] font-light">
              {weddingConfig.event.venueCity}
            </span>
          </motion.div>
        </div>

        {/* Subtle Indicator hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 pb-4 text-center"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#E6D5AC] font-light">
            Discover Our Story
          </span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RISING WARM IVORY CURVED PANEL WITH ARCHED VISUAL WINDOW              */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 -mt-16 sm:-mt-24 md:-mt-32 w-full bg-[#FAF7F2] rounded-t-[3rem] sm:rounded-t-[4.5rem] md:rounded-t-[6rem] shadow-[0_-25px_60px_rgba(0,0,0,0.25)] border-t border-[#C5A059]/20 pt-8 sm:pt-12 pb-16 px-4 sm:px-8 flex flex-col items-center"
      >
        {/* Subtle Center Decorative Detail */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#C5A059]/40 bg-[#FAF7F2] shadow-sm flex items-center justify-center mb-3">
            <span className="font-serif text-xs sm:text-sm text-[#B88E3E] italic tracking-widest font-medium">
              {weddingConfig.couple.monogram}
            </span>
          </div>
          <div className="h-6 w-px bg-gradient-to-b from-[#C5A059]/60 to-transparent" />
        </div>

        {/* Arched Cutout Visual Window Revealing Secondary Wedding Moment */}
        <div className="w-full max-w-xl md:max-w-2xl px-2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] rounded-t-[7rem] sm:rounded-t-[10rem] md:rounded-t-[14rem] rounded-b-[2rem] overflow-hidden border border-[#C5A059]/30 bg-[#EFE8DE] shadow-2xl group"
          >
            {isSecondaryVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] group-hover:scale-105 transition-transform duration-1000"
              >
                <source src={secondaryMedia} type="video/mp4" />
              </video>
            ) : (
              <img
                src={secondaryMedia}
                alt="Wedding Reveal Moment"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] group-hover:scale-105 transition-transform duration-1000"
              />
            )}

            {/* Subtle Inner Window Vignette & Lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* In-window Subtle Caption Accent */}
            <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E6D5AC] font-light drop-shadow-md">
                Together in Love
              </span>
            </div>
          </motion.div>
        </div>

        {/* Minimal Scroll Down Button */}
        <div 
          onClick={scrollToNext}
          className="mt-10 sm:mt-14 flex flex-col items-center cursor-pointer group opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#A44A3F] font-medium mb-2 group-hover:text-[#B88E3E] transition-colors">
            Scroll to Explore
          </span>
          <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
            <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
