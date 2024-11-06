import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: "99.99%", label: "Deployment Success", trend: "+45% YoY" },
  { value: "8.5x", label: "Faster Releases", trend: "Industry Leading" },
  { value: "100%", label: "Security Compliance", trend: "SOC2 & ISO27001" }
] as const;

export default function Hero() {
  const scrollToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-40 pb-20"
      aria-label="Hero Section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.15) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Animated Gradient Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold-500/20 via-gold-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform Your
              </motion.span>
              <motion.span 
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Infrastructure
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute inset-x-0 bottom-2 h-3 bg-gold-500/20 -rotate-2 origin-left"
                />
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
            >
              Deploy faster, scale smarter, and maintain iron-clad security with our 
              enterprise-grade GitOps platform.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center gap-4 mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="group px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg font-semibold text-slate-900 hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
              >
                Schedule Demo
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.value}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-3xl font-bold text-gold-400 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-300 mb-1">{stat.label}</div>
                  <div className="text-xs text-gold-500">{stat.trend}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}