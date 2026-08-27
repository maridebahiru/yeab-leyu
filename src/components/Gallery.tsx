import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import type { GalleryMediaItem } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';


export const Gallery: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<GalleryMediaItem | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const activeIndex = activeMedia
    ? weddingConfig.gallery.findIndex((m) => m.id === activeMedia.id)
    : -1;

  const handleNext = () => {
    if (activeIndex >= 0 && activeIndex < weddingConfig.gallery.length - 1) {
      setActiveMedia(weddingConfig.gallery[activeIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveMedia(weddingConfig.gallery[activeIndex - 1]);
    }
  };

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto horizontal scrolling effect with seamless looping
  useEffect(() => {
    if (!isAutoScrolling || activeMedia) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        // If near the end, loop back smooth to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isAutoScrolling, activeMedia]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeMedia) return;
      if (e.key === 'Escape') setActiveMedia(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMedia, activeIndex]);

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-[#2B2421]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            Cherished Memories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            Moments & Memories
          </h2>
          <HeritageDivider className="my-5" />
        </motion.div>

        {/* Horizontal Gallery Carousel */}
        <div
          className="relative group/gallery max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          onTouchStart={() => setIsAutoScrolling(false)}
          onTouchEnd={() => setIsAutoScrolling(true)}
        >
          {/* Horizontal Navigation Buttons */}
          <button
            onClick={() => scrollHorizontal('left')}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#2B2421] border border-[#C5A059]/40 shadow-xl flex items-center justify-center hover:bg-[#C86D51] hover:text-white transition-all duration-300 opacity-90 hover:opacity-100 group-hover/gallery:scale-105 cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scrollHorizontal('right')}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#2B2421] border border-[#C5A059]/40 shadow-xl flex items-center justify-center hover:bg-[#C86D51] hover:text-white transition-all duration-300 opacity-90 hover:opacity-100 group-hover/gallery:scale-105 cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 py-4 px-2 sm:px-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {weddingConfig.gallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActiveMedia(item)}
                className="group relative flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-black border border-[#C5A059]/30 snap-center transition-all duration-300 hover:shadow-2xl hover:border-[#C86D51]/50"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Video Play Badge */}
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#C86D51]/95 backdrop-blur-md text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                )}

                {/* Hover / Overlay Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6D5AC] font-semibold">
                    {item.type === 'video' ? 'Video Moment' : 'Photograph'}
                  </span>
                  <h4 className="text-base font-serif font-medium mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/85 italic line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                  <div className="mt-3 flex items-center text-[11px] uppercase tracking-wider text-[#C5A059] group-hover:text-[#E6D5AC] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
                    <span>View Fullscreen</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls & Scroll Hint */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 px-2 text-xs text-[#C86D51] font-medium tracking-widest uppercase opacity-90">
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 shadow-sm text-[11px] text-[#2B2421] hover:border-[#C86D51] transition-all cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isAutoScrolling ? 'Auto-Scroll Active' : 'Auto-Scroll Paused'}</span>
            </button>

            <span className="text-[11px] text-[#A44A3F] font-light">
              ← Scroll, swipe, or hover to pause →
            </span>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMedia(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#C86D51] transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              {activeIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#C86D51] transition-colors"
                  aria-label="Previous Media"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {activeIndex < weddingConfig.gallery.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#C86D51] transition-colors"
                  aria-label="Next Media"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Lightbox Content */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              >
                {activeMedia.type === 'video' ? (
                  <video
                    src={activeMedia.src}
                    controls
                    autoPlay
                    className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl border border-[#C5A059]/40"
                  />
                ) : (
                  <img
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-[#C5A059]/40"
                  />
                )}

                <div className="mt-4 text-center text-white">
                  <h3 className="text-lg font-serif text-[#E6D5AC]">
                    {activeMedia.title}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 italic mt-0.5">
                    {activeMedia.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
