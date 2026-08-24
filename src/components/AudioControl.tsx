import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Music } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';


export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = weddingConfig.media.backgroundMusic;
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const handlePlayEvent = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Audio auto-play restricted:', err));
      }
    };

    const handlePauseEvent = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('wedding:play-audio', handlePlayEvent);
    window.addEventListener('wedding:pause-audio', handlePauseEvent);

    return () => {
      window.removeEventListener('wedding:play-audio', handlePlayEvent);
      window.removeEventListener('wedding:pause-audio', handlePauseEvent);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Audio play restricted:', err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleAudio}
        className={`flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 border ${
          isPlaying
            ? 'bg-[#C86D51] text-white border-[#C5A059] shadow-[0_0_15px_rgba(200,109,81,0.4)]'
            : 'bg-[#2B2421]/90 text-[#FAF7F2] border-[#C5A059]/40 hover:bg-[#C86D51]'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        aria-label="Toggle Wedding Music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-[#FAF7F2]" />
        ) : (
          <Music className="w-4 h-4 text-[#C5A059]" />
        )}
      </button>
    </div>
  );
};
