import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';

const faqs = [
  {
    question: "How does GitOps improve deployment reliability?",
    answer: "GitOps uses Git as the single source of truth for declarative infrastructure and applications. This ensures consistent, repeatable deployments with automated drift detection and reconciliation, resulting in 99.99% deployment reliability."
  },
  {
    question: "What security measures are implemented?",
    answer: "We implement a comprehensive security framework including zero-trust architecture, automated RBAC, encrypted GitOps workflows, and continuous security scanning. All changes are version-controlled and audit-logged."
  },
  {
    question: "How long does implementation typically take?",
    answer: "Implementation timeline varies based on your infrastructure complexity. Typically, initial setup takes 2-4 weeks, with full enterprise transformation completed within 2-3 months, ensuring minimal disruption to operations."
  },
  {
    question: "What cloud platforms do you support?",
    answer: "We support all major cloud providers (AWS, Azure, GCP) and can implement hybrid or multi-cloud solutions. Our platform-agnostic approach ensures consistent operations across any infrastructure."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get answers to common questions about our GitOps solutions and implementation process.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="glass-card rounded-lg overflow-hidden relative z-10"
              initial={false}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:text-gold-400 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Terminal className="h-5 w-5 text-gold-400" />
                  <span className="font-semibold text-lg">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gold-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-4">
                      <div className="h-px w-full bg-slate-700/50 mb-4" />
                      <div className="text-slate-300 leading-relaxed pl-9">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}