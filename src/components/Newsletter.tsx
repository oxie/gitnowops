import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-600/20"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Mail className="h-12 w-12 mx-auto mb-6 text-gold-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Get the latest insights on DevOps, cloud architecture, and digital transformation.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg bg-white text-slate-900 hover:bg-gold-400 hover:text-white transition-all group"
                >
                  Subscribe
                  <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 text-gold-400"
                >
                  Thank you for subscribing!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 text-red-400"
                >
                  There was an error. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}