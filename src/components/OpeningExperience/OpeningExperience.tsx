import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../config/weddingConfig';
import { OpeningBackground } from './OpeningBackground';
import { OpeningCard } from './OpeningCard';
import { OpeningControls } from './OpeningControls';
import { overlayVariants, reducedMotionVariants } from './openingVariants';

type OpeningState = 'loading' | 'intro' | 'ready' | 'opening' | 'revealing' | 'complete';

interface OpeningExperienceProps {
  onOpenComplete?: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onOpenComplete }) => {
  const [state, setState] = useState<OpeningState>('loading');
  const [reducedMotion, setReducedMotion] = useState(false);

  const config = weddingConfig.openingExperience;
  const storageKey = 'wedding_envelope_opened';

  // Helper to check storage
  const hasOpenedInStorage = useCallback(() => {
    try {
      const storage = config.storageDuration === 'persistent' ? localStorage : sessionStorage;
      return storage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  }, [config.storageDuration]);

  // Helper to save storage
  const saveOpenedInStorage = useCallback(() => {
    try {
      const storage = config.storageDuration === 'persistent' ? localStorage : sessionStorage;
      storage.setItem(storageKey, 'true');
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }, [config.storageDuration]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize opening state machine
  useEffect(() => {
    if (!config.enabled) {
      setState('complete');
      document.body.style.overflow = 'unset';
      if (onOpenComplete) onOpenComplete();
      return;
    }

    if (config.rememberOpenedState && !config.showOnEveryVisit && hasOpenedInStorage()) {
      setState('complete');
      document.body.style.overflow = 'unset';
      if (onOpenComplete) onOpenComplete();
      return;
    }

    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';
    setState('intro');

    const timer = setTimeout(() => {
      setState('ready');
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [config.enabled, config.rememberOpenedState, config.showOnEveryVisit, hasOpenedInStorage, onOpenComplete]);

  // User click trigger
  const handleOpenTrigger = () => {
    if (state !== 'ready') return;

    setState('opening');

    // Start background music with optional gradual fade-in
    if (config.autoPlayMusicAfterOpen) {
      window.dispatchEvent(
        new CustomEvent('wedding:play-audio', {
          detail: { fadeIn: true, duration: config.musicFadeDuration },
        })
      );
    }

    // Save flag
    if (config.rememberOpenedState) {
      saveOpenedInStorage();
    }

    // Phase 1: Card & Flap animation (1.4s)
    setTimeout(() => {
      setState('revealing');
    }, 1400);

    // Phase 2: Fade out & complete (2.6s total)
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      setState('complete');
      window.dispatchEvent(new CustomEvent('wedding:start-autoscroll'));
      if (onOpenComplete) onOpenComplete();
    }, 2600);
  };

  if (state === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        variants={reducedMotion ? reducedMotionVariants : overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none p-4 sm:p-6"
          style={{ height: '100dvh' }}
        >
          {/* Ambient Lighting & Embossed Background */}
          <OpeningBackground
            isOpening={state === 'opening' || state === 'revealing'}
            reducedMotion={reducedMotion}
          />

          {/* Controls (Language & Mute) */}
          <OpeningControls />

          {/* 3D Envelope & Invitation Card */}
          <OpeningCard
            brideName={weddingConfig.couple.brideName}
            groomName={weddingConfig.couple.groomName}
            displayDate={weddingConfig.event.displayDate}
            monogram={weddingConfig.couple.monogram}
            subtitleText={config.subtitleText}
            buttonText={config.buttonText}
            state={state}
            onOpenTrigger={handleOpenTrigger}
            reducedMotion={reducedMotion}
          />

          {/* Bottom Luxury Footer Note */}
          <div className="absolute bottom-5 sm:bottom-7 text-center text-xs text-[#FAF7F2]/65 uppercase tracking-[0.25em] font-serif pointer-events-none">
            {weddingConfig.couple.groomName} & {weddingConfig.couple.brideName} — Matrimonial Celebration
          </div>
        </motion.div>
    </AnimatePresence>
  );
};

export default OpeningExperience;
