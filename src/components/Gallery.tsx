import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import type { GalleryMediaItem } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';


export const Gallery: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<GalleryMediaItem | null>(null);

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
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2B2421]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            Cherished Memories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            Moments & Memories
          </h2>
          <HeritageDivider className="my-5" />
        </motion.div>

        {/* Gallery Grid (6–8 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {weddingConfig.gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActiveMedia(item)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-black border border-[#C5A059]/30"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Video Play Badge */}
              {item.type === 'video' && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#C86D51]/90 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              )}

              {/* Hover Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E6D5AC] font-semibold">
                  {item.type === 'video' ? 'Video Moment' : 'Photograph'}
                </span>
                <h4 className="text-sm font-serif font-medium mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#FAF7F2]/80 italic line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center text-[10px] uppercase tracking-wider text-[#C5A059]">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  <span>View Fullscreen</span>
                </div>
              </div>
            </motion.div>
          ))}
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
