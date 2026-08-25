import type { Variants } from 'framer-motion';

/**
 * Easing curves and timing constants
 */
export const CINEMATIC_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
export const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * Overlay backdrop variants
 */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: CINEMATIC_EASE },
  },
  exit: {
    opacity: 0,
    scale: 1.06,
    filter: 'blur(12px)',
    transition: { duration: 1.6, ease: LUXURY_EASE },
  },
};

/**
 * Staggered content container
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

/**
 * Monogram & Seal variants
 */
export const monogramVariants: Variants = {
  hidden: { scale: 0.82, opacity: 0, y: 15 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
  opening: {
    scale: 1.35,
    opacity: 0,
    filter: 'blur(10px)',
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

/**
 * 3D Envelope Flap variants
 */
export const envelopeFlapVariants: Variants = {
  closed: { rotateX: 0 },
  opened: {
    rotateX: 180,
    zIndex: 10,
    transition: { duration: 1.4, ease: CINEMATIC_EASE },
  },
};

/**
 * Invitation Card rise variants
 */
export const cardRiseVariants: Variants = {
  hidden: { y: 30, opacity: 0.7 },
  revealed: {
    y: -75,
    opacity: 1,
    transition: { duration: 1.5, ease: CINEMATIC_EASE, delay: 0.2 },
  },
};

/**
 * General text fade & rise variants
 */
export const textFadeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: CINEMATIC_EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.5 },
  },
};

/**
 * Reduced Motion Fallback Variants
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
