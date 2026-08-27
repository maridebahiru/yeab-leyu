import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-[#2B2421] overflow-hidden">
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8A9A86]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            {weddingConfig.story.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            {weddingConfig.story.title}
          </h2>
          <HeritageDivider className="my-5" />
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Couple Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group p-3 bg-white rounded-3xl shadow-xl border border-[#C5A059]/30 max-w-sm">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={weddingConfig.story.photo}
                  alt={`${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  loading="lazy"
                />
              </div>
              
              {/* Botanical Badge */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center shadow-lg border-2 border-white">
                <span className="font-serif text-sm italic font-bold">♥</span>
              </div>
            </div>
          </motion.div>

          {/* Story Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="md:col-span-7 bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl heritage-card"
          >
            <div className="space-y-4 text-sm sm:text-base text-[#5A4E48] leading-relaxed font-light">
              {weddingConfig.story.paragraphs.map((para, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-serif first-letter:text-[#C86D51]">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#C5A059]/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A9A86] font-semibold block">
                  Forever Begins
                </span>
                <span className="font-serif text-lg text-[#C86D51]">
                  {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
                </span>
              </div>
              <span className="text-xs font-medium text-[#C5A059] tracking-widest uppercase">
                {weddingConfig.couple.hashtag}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
