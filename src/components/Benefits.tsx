import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, GitBranch, Cloud, Lock, Workflow, BarChart, Terminal } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "GitOps-First Approach",
      description: "Single source of truth with Git-based operations",
      stats: ["100% Audit Trail", "Zero Drift", "Instant Rollbacks"]
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Military-grade security with automated compliance",
      stats: ["SOC2 Compliant", "Zero-Trust", "RBAC Enabled"]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Native",
      description: "Built for modern cloud infrastructure",
      stats: ["Multi-Cloud", "Auto-Scaling", "High Availability"]
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Automated Operations",
      description: "End-to-end automation with self-healing systems",
      stats: ["99.99% Uptime", "24/7 Operations", "Auto Recovery"]
    }
  ];

  return (
    <section className="py-32 relative">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
      
      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Why Choose GitOpsNow
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of infrastructure management with our enterprise-ready platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative z-10"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative h-full p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-gold-400">{benefit.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-300 mb-6">{benefit.description}</p>

                {/* Stats */}
                <div className="space-y-3">
                  {benefit.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-slate-400"
                    >
                      <Terminal className="h-4 w-4 mr-2 text-gold-400" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 pointer-events-none">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gold-500/30 rounded-full" />
                  <div className="absolute top-0 right-4 w-2 h-2 bg-gold-500/20 rounded-full" />
                  <div className="absolute top-4 right-0 w-2 h-2 bg-gold-500/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}