import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Shield, 
  Workflow, 
  Cloud, 
  Lock, 
  GitMerge,
  Terminal,
  BarChart
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "GitOps Automation",
      description: "Automated deployments and infrastructure management through Git workflows",
      features: ["Version Control", "Automated Rollbacks", "Config Management"]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Native",
      description: "Modern cloud infrastructure with scalability and reliability built-in",
      features: ["Multi-Cloud", "Auto-Scaling", "High Availability"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First",
      description: "Enterprise-grade security with automated compliance and monitoring",
      features: ["Zero Trust", "Compliance Automation", "Threat Detection"]
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Infrastructure as Code",
      description: "Declarative infrastructure definitions with built-in validation",
      features: ["Version Control", "Drift Detection", "Automated Testing"]
    }
  ];

  return (
    <section id="solutions" className="min-h-screen flex items-center py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            GitOpsNOW Solutions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive DevOps and GitOps solutions designed for enterprise scalability and security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative z-10 h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-colors flex flex-col">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10">
                    <div className="text-gold-400">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-slate-300 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}