import React, { useEffect, useState } from 'react';
import { Play, Pause, ChevronsDown, Gauge } from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';

export const AutoScrollControl: React.FC = () => {
  const {
    isEnabled,
    isPausedByUser,
    isInteracting,
    isCurrentlyMoving,
    speedLevel,
    startAutoScroll,
    toggleAutoScroll,
    cycleSpeed,
  } = useAutoScroll({
    initialEnabled: false,
    speedPxPerFrame: 0.85,
    resumeDelayMs: 1800,
  });

  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  // Listen for envelope open event or user start event
  useEffect(() => {
    const handleStartEvent = () => {
      startAutoScroll();
      setHasStartedOnce(true);
    };

    window.addEventListener('wedding:play-audio', handleStartEvent);
    window.addEventListener('wedding:start-autoscroll', handleStartEvent);

    return () => {
      window.removeEventListener('wedding:play-audio', handleStartEvent);
      window.removeEventListener('wedding:start-autoscroll', handleStartEvent);
    };
  }, [startAutoScroll]);

  const getStatusText = () => {
    if (isInteracting && isEnabled && !isPausedByUser) {
      return 'Paused (Touch Active)';
    }
    if (isCurrentlyMoving) {
      return `Auto-Scrolling (${speedLevel})`;
    }
    if (isPausedByUser) {
      return 'Auto-Scroll Paused';
    }
    return 'Start Auto-Scroll';
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 select-none">
      {/* Primary Auto-Scroll Play/Pause Button */}
      <button
        type="button"
        onClick={() => {
          if (!hasStartedOnce) setHasStartedOnce(true);
          toggleAutoScroll();
        }}
        className={`group relative p-3 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
          isCurrentlyMoving
            ? 'bg-[#C86D51] text-[#FAF7F2] border-[#E6D5AC]/60 shadow-[0_10px_25px_rgba(200,109,81,0.5)] scale-105'
            : isInteracting
            ? 'bg-[#C5A059]/90 text-[#FAF7F2] border-[#FAF7F2]/60 shadow-lg'
            : 'bg-white/80 text-[#2B2421] border-[#C5A059]/40 hover:bg-white hover:border-[#C5A059]'
        }`}
        title={getStatusText()}
        aria-label="Toggle Auto Scroll"
      >
        {/* Pulsing Outer Aura when active */}
        {isCurrentlyMoving && (
          <span className="absolute inset-0 rounded-full bg-[#C86D51]/30 animate-ping pointer-events-none" />
        )}

        {isCurrentlyMoving ? (
          <ChevronsDown className="w-5 h-5 animate-bounce" />
        ) : isPausedByUser ? (
          <Play className="w-5 h-5 ml-0.5" />
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>

      {/* Speed Selector Button */}
      {isEnabled && !isPausedByUser && (
        <button
          type="button"
          onClick={cycleSpeed}
          className="px-2.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#C5A059]/30 text-[11px] font-medium text-[#5A4E48] hover:text-[#C86D51] hover:border-[#C86D51]/50 shadow-md transition-all flex items-center space-x-1 cursor-pointer"
          title="Change Auto-Scroll Speed"
          aria-label="Change Auto-Scroll Speed"
        >
          <Gauge className="w-3 h-3 text-[#C5A059]" />
          <span className="capitalize">{speedLevel}</span>
        </button>
      )}

      {/* Status Tooltip Label (appears on hover or when touched) */}
      <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-[#2B2421]/80 backdrop-blur-md text-[#FAF7F2] text-[11px] font-light shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span>{getStatusText()}</span>
      </div>
    </div>
  );
};

export default AutoScrollControl;
