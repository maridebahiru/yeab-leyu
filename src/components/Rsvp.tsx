import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, User, Users, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeritageDivider } from './HeritageDivider';

export const Rsvp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guestCount: 1,
    attending: 'yes' as 'yes' | 'no',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // Log to console as requested
    console.log('RSVP Submission received:', {
      ...formData,
      timestamp: new Date().toISOString()
    });

    // Also persist to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }

    setSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C86D51', '#C5A059', '#8A9A86', '#FAF7F2']
    });
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 bg-transparent text-[#2B2421]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C86D51] font-semibold">
            Celebrate With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2421] mt-2">
            Kindly RSVP
          </h2>
          <HeritageDivider className="my-5" />
          <p className="text-xs sm:text-sm text-[#5A4E48] font-light max-w-md mx-auto">
            Please let us know if you can join us on our special day.
          </p>
        </motion.div>

        {/* Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-[#C5A059]/30"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#8A9A86]/20 text-[#5C715E] mx-auto flex items-center justify-center border border-[#8A9A86]/40">
                  <CheckCircle2 className="w-7 h-7 text-[#5C715E]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#2B2421]">
                  Thank You! ❤️
                </h3>

                <p className="text-sm text-[#5A4E48] max-w-md mx-auto">
                  Your response has been received. We can't wait to celebrate with you!
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', guestCount: 1, attending: 'yes', message: '' });
                    }}
                    className="px-6 py-2 rounded-full bg-[#FAF7F2] text-[#C86D51] text-xs font-semibold uppercase tracking-widest border border-[#C86D51]/30 hover:bg-[#C86D51]/10 transition-colors"
                  >
                    Submit Another Response
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center">
                    {error}
                  </div>
                )}

                {/* Attending Toggle Buttons */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E48] font-semibold mb-2.5">
                    Will you attend? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'yes' })}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center space-x-2 border ${
                        formData.attending === 'yes'
                          ? 'bg-[#C86D51] text-[#FAF7F2] border-[#C86D51] shadow-md ring-2 ring-[#C86D51]/30'
                          : 'bg-[#FAF7F2] text-[#5A4E48] border-gray-200 hover:border-[#C86D51]/50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${formData.attending === 'yes' ? 'fill-current' : ''}`} />
                      <span>Joyfully Accept</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'no' })}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center space-x-2 border ${
                        formData.attending === 'no'
                          ? 'bg-[#5A4E48] text-[#FAF7F2] border-[#5A4E48] shadow-md'
                          : 'bg-[#FAF7F2] text-[#5A4E48] border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E48] font-semibold mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John & Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E48] font-semibold mb-1.5">
                    Number of Guests (Including Yourself)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none transition-all"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E48] font-semibold mb-1.5">
                    Warm Wishes or Message to the Couple
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C5A059]" />
                    <textarea
                      rows={3}
                      placeholder="Write your note or dietary preferences here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#C86D51] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest hover:bg-[#A44A3F] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send RSVP</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
