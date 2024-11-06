import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-16 h-16"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
        
        {/* Spinning ring */}
        <div 
          className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"
          aria-label="Loading"
        />
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 filter blur-sm animate-pulse" />
        
        {/* Center dot */}
        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-emerald-500" />
      </motion.div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}