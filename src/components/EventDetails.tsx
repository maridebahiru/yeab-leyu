import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, ExternalLink, Check } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { HeritageDivider } from './HeritageDivider';

export const EventDetails: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}'s Wedding`);
    const details = encodeURIComponent(`We are overjoyed to celebrate our wedding at ${weddingConfig.event.venueName}!`);
    const location = encodeURIComponent(`${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`);
    // September 6, 2026 17:00 to 23:30 (UTC+3 -> 14:00Z to 20:30Z)
    const dates = '20260906T140000Z/20260906T203000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // iCal / .ics File download generator
  const downloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} Wedding
LOCATION:${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}
DESCRIPTION:Join us for the wedding celebration of ${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}!
DTSTART:20260906T140000Z
DTEND:20260906T203000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${weddingConfig.couple.brideName}_and_${weddingConfig.couple.groomName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="details" className="relative py-24 px-4 sm:px-6 bg-transparent text-[#2B2421]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            When & Where
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            Event Details
          </h2>
          <HeritageDivider className="my-5" />
        </motion.div>

        {/* Venue & Time Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="heritage-card rounded-3xl p-6 sm:p-12 overflow-hidden relative"
        >
          {/* Subtle Decorative Arch */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C5A059] via-[#C86D51] to-[#8A9A86]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Date & Time */}
            <div className="space-y-6 md:border-r border-[#C5A059]/20 md:pr-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center shrink-0 mt-1">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8A9A86] font-semibold block">
                    Date
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#2B2421] font-medium">
                    {weddingConfig.event.displayDate}
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#8A9A86]/15 text-[#5C715E] flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8A9A86] font-semibold block">
                    Time
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#2B2421] font-medium">
                    Ceremony: {weddingConfig.event.displayTime}
                  </h3>
                  <p className="text-xs text-[#5A4E48] mt-0.5">
                    Reception: {weddingConfig.event.receptionTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Venue & Address */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#967431] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8A9A86] font-semibold block">
                    Venue
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#2B2421] font-medium">
                    {weddingConfig.event.venueName}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A4E48] mt-1">
                    {weddingConfig.event.venueAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Calendar & Get Directions */}
          <div className="mt-10 pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C86D51] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#A44A3F] transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={downloadIcs}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#5A4E48] border border-[#C5A059]/50 text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF7F2] transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C5A059]" />
                  <span>Download iCal</span>
                </>
              )}
            </button>

            <a
              href={weddingConfig.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8A9A86] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#5C715E] transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
