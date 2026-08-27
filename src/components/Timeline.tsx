import React from 'react';
import { motion } from 'framer-motion';
import { Church, Camera, GlassWater, Utensils, Sparkles, Music, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import type { ScheduleItem } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';


const getScheduleIcon = (iconType: ScheduleItem['icon']) => {
  switch (iconType) {
    case 'church':
      return Church;
    case 'camera':
      return Camera;
    case 'cocktail':
      return GlassWater;
    case 'dinner':
      return Utensils;
    case 'cake':
    case 'dance':
      return Music;
    case 'sparkler':
    default:
      return Sparkles;
  }
};

export const Timeline: React.FC = () => {
  return (
    <section id="schedule" className="relative py-24 px-4 sm:px-6 bg-transparent text-[#2B2421] overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            Wedding Day Program
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            The Schedule
          </h2>
          <HeritageDivider className="my-5" />
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#C5A059]/40 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
          {weddingConfig.schedule.map((item, index) => {
            const IconComponent = getScheduleIcon(item.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Time Badge (positioned on left on desktop) */}
                <div className="sm:absolute sm:-left-44 sm:top-1 text-xs font-bold uppercase tracking-wider text-[#C86D51] bg-[#FAF7F2] px-3.5 py-1 rounded-full border border-[#C5A059]/40 inline-block mb-2 sm:mb-0 shadow-sm">
                  {item.time}
                </div>

                {/* Timeline Node Icon */}
                <div className="absolute -left-9 sm:-left-13 top-0 w-8 h-8 rounded-full bg-[#C86D51] text-[#FAF7F2] border-2 border-white flex items-center justify-center shadow-md group-hover:scale-115 transition-transform duration-300">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all hover:shadow-md">
                  <h3 className="text-lg sm:text-xl font-serif text-[#2B2421] font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A4E48] font-light mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Floral Ending */}
        <div className="mt-14 text-center">
          <Heart className="w-4 h-4 text-[#C86D51] fill-[#C86D51]/30 inline-block" />
        </div>
      </div>
    </section>
  );
};
