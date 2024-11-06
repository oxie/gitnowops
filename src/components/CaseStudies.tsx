import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, GitBranch, Shield, Clock } from 'lucide-react';

export default function CaseStudies() {
  const cases = [
    {
      client: "Global Financial Tech",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      title: "GitOps Transformation",
      metrics: [
        { icon: <GitBranch className="h-4 w-4" />, value: "50%", label: "Faster Deployments" },
        { icon: <Shield className="h-4 w-4" />, value: "100%", label: "Security Compliance" },
        { icon: <Clock className="h-4 w-4" />, value: "30%", label: "Cost Reduction" }
      ],
      quote: "GitOpsNow transformed our entire deployment pipeline, significantly improving our delivery speed while maintaining enterprise security standards.",
      author: "Sarah Chen",
      role: "Chief Technology Officer"
    },
    {
      client: "Enterprise Solutions Inc",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      title: "Cloud Native Migration",
      metrics: [
        { icon: <GitBranch className="h-4 w-4" />, value: "99.99%", label: "Uptime" },
        { icon: <Shield className="h-4 w-4" />, value: "Zero", label: "Security Breaches" },
        { icon: <Clock className="h-4 w-4" />, value: "40%", label: "Faster Time-to-Market" }
      ],
      quote: "The migration to cloud-native infrastructure was seamless. GitOpsNow's expertise in GitOps practices made our transformation journey successful.",
      author: "Michael Roberts",
      role: "VP of Engineering"
    }
  ];

  return (
    <section id="case-studies" className="min-h-screen flex items-center py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how leading enterprises transformed their operations with our GitOps solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((case_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-all duration-300 overflow-hidden">
                {/* Image with loading state */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <motion.img
                    src={case_.image}
                    alt={case_.client}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/20 pointer-events-none" />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-5 w-5 text-gold-400" />
                    <span className="text-gold-400 font-semibold">{case_.client}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-6">{case_.title}</h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {case_.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gold-500/10 mb-2">
                          {metric.icon}
                        </div>
                        <div className="text-xl font-bold text-gold-400">{metric.value}</div>
                        <div className="text-sm text-slate-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-gold-500 pl-4 mb-4">
                    <p className="text-slate-300 italic">{case_.quote}</p>
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{case_.author}</p>
                      <p className="text-sm text-slate-400">{case_.role}</p>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="group inline-flex items-center space-x-2 text-gold-400"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}