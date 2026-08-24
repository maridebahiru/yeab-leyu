import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.event.date).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="relative py-20 px-4 bg-[#FAF7F2] text-[#2B2421]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            Counting Down To The Big Day
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            The Countdown
          </h2>

          <HeritageDivider className="my-5" />
        </motion.div>

        {timeLeft.isPassed ? (
          <div className="heritage-card p-8 rounded-2xl max-w-lg mx-auto">
            <h3 className="text-2xl font-serif text-[#C86D51]">Our Forever Has Begun! ❤️</h3>
            <p className="text-sm text-[#5A4E48] mt-2">Thank you for celebrating with us.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-6">
            {blocks.map((block, idx) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="heritage-card p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center transition-transform hover:-translate-y-1"
              >
                <span className="text-3xl sm:text-5xl font-serif text-[#C86D51] font-bold">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-[#5A4E48] font-medium mt-2">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm text-[#5A4E48] mt-8 flex items-center justify-center space-x-2"
        >
          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{weddingConfig.event.displayDate} at {weddingConfig.event.displayTime}</span>
        </motion.p>
      </div>
    </section>
  );
};
