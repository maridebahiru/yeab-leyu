import React, { useState } from 'react';
import { Globe, Volume2, VolumeX } from 'lucide-react';

interface OpeningControlsProps {
  onToggleAudio?: (muted: boolean) => void;
}

export const OpeningControls: React.FC<OpeningControlsProps> = ({ onToggleAudio }) => {
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const [isMuted, setIsMuted] = useState(false);

  const handleLanguageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguage((prev) => (prev === 'EN' ? 'FR' : 'EN'));
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (onToggleAudio) {
      onToggleAudio(nextMuted);
    } else {
      if (nextMuted) {
        window.dispatchEvent(new CustomEvent('wedding:pause-audio'));
      } else {
        window.dispatchEvent(new CustomEvent('wedding:play-audio', { detail: { fadeIn: false } }));
      }
    }
  };

  return (
    <>
      {/* Top-Right: Language Selector */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={handleLanguageClick}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#152016]/75 backdrop-blur-md border border-[#C5A059]/35 text-[#FAF7F2] text-xs font-semibold tracking-wider hover:bg-[#C5A059]/25 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
          aria-label={`Switch Language (Current: ${language})`}
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{language}</span>
        </button>
      </div>

      {/* Bottom-Right: Audio Mute/Unmute Switch */}
      <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={handleAudioClick}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#152016]/75 backdrop-blur-md border border-[#C5A059]/35 text-[#FAF7F2] hover:bg-[#C5A059]/25 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#C86D51]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
};
