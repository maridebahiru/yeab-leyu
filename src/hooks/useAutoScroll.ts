import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAutoScrollOptions {
  initialEnabled?: boolean;
  speedPxPerFrame?: number; // Speed in pixels per frame
  resumeDelayMs?: number;   // Delay in ms to resume auto-scroll after finger/interaction release
}

export function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const {
    initialEnabled = false,
    speedPxPerFrame = 0.8,
    resumeDelayMs = 1800,
  } = options;

  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [speedLevel, setSpeedLevel] = useState<'slow' | 'normal' | 'fast'>('normal');

  const animFrameIdRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  // Speed multiplier based on level
  const getSpeed = useCallback(() => {
    switch (speedLevel) {
      case 'slow':
        return speedPxPerFrame * 0.6;
      case 'fast':
        return speedPxPerFrame * 1.6;
      case 'normal':
      default:
        return speedPxPerFrame;
    }
  }, [speedLevel, speedPxPerFrame]);

  // Main scroll loop
  useEffect(() => {
    if (!isEnabled || isPausedByUser) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    let lastTime = performance.now();

    const scrollStep = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Only scroll if not currently being touched or interacted with by user
      if (!isInteractingRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (maxScroll > 0) {
          // If reached bottom, pause at the end
          if (window.scrollY >= maxScroll - 5) {
            setIsEnabled(false);
            return;
          }

          // Calculate distance based on time delta (normalized to 60fps ~ 16.6ms)
          const pxToScroll = getSpeed() * (delta / 16.6);
          window.scrollBy({ top: pxToScroll, behavior: 'instant' });
        }
      }

      animFrameIdRef.current = requestAnimationFrame(scrollStep);
    };

    animFrameIdRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [isEnabled, isPausedByUser, getSpeed]);

  // Interaction handlers (Touch, Pointer, Mouse, Wheel, Keydown)
  useEffect(() => {
    const handleTouchOrPointerStart = () => {
      isInteractingRef.current = true;
      setIsInteracting(true);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };

    const handleTouchOrPointerEnd = () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }

      // Set timeout to resume auto scrolling after finger is lifted
      resumeTimerRef.current = window.setTimeout(() => {
        isInteractingRef.current = false;
        setIsInteracting(false);
      }, resumeDelayMs);
    };

    const handleWheelOrScroll = () => {
      handleTouchOrPointerStart();
      handleTouchOrPointerEnd();
    };

    window.addEventListener('touchstart', handleTouchOrPointerStart, { passive: true });
    window.addEventListener('touchend', handleTouchOrPointerEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchOrPointerEnd, { passive: true });

    window.addEventListener('pointerdown', handleTouchOrPointerStart, { passive: true });
    window.addEventListener('pointerup', handleTouchOrPointerEnd, { passive: true });
    window.addEventListener('pointercancel', handleTouchOrPointerEnd, { passive: true });

    window.addEventListener('mousedown', handleTouchOrPointerStart, { passive: true });
    window.addEventListener('mouseup', handleTouchOrPointerEnd, { passive: true });

    window.addEventListener('wheel', handleWheelOrScroll, { passive: true });
    window.addEventListener('keydown', handleWheelOrScroll, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchOrPointerStart);
      window.removeEventListener('touchend', handleTouchOrPointerEnd);
      window.removeEventListener('touchcancel', handleTouchOrPointerEnd);

      window.removeEventListener('pointerdown', handleTouchOrPointerStart);
      window.removeEventListener('pointerup', handleTouchOrPointerEnd);
      window.removeEventListener('pointercancel', handleTouchOrPointerEnd);

      window.removeEventListener('mousedown', handleTouchOrPointerStart);
      window.removeEventListener('mouseup', handleTouchOrPointerEnd);

      window.removeEventListener('wheel', handleWheelOrScroll);
      window.removeEventListener('keydown', handleWheelOrScroll);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [resumeDelayMs]);

  const startAutoScroll = useCallback(() => {
    setIsEnabled(true);
    setIsPausedByUser(false);
  }, []);

  const pauseAutoScroll = useCallback(() => {
    setIsPausedByUser(true);
  }, []);

  const toggleAutoScroll = useCallback(() => {
    if (isEnabled && !isPausedByUser) {
      setIsPausedByUser(true);
    } else {
      setIsEnabled(true);
      setIsPausedByUser(false);
    }
  }, [isEnabled, isPausedByUser]);

  const cycleSpeed = useCallback(() => {
    setSpeedLevel((prev) => {
      if (prev === 'slow') return 'normal';
      if (prev === 'normal') return 'fast';
      return 'slow';
    });
  }, []);

  const isCurrentlyMoving = isEnabled && !isPausedByUser && !isInteracting;

  return {
    isEnabled,
    isPausedByUser,
    isInteracting,
    isCurrentlyMoving,
    speedLevel,
    startAutoScroll,
    pauseAutoScroll,
    toggleAutoScroll,
    cycleSpeed,
  };
}
