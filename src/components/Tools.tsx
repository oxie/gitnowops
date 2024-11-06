import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Cloud, 
  Database, 
  Shield, 
  MessageSquare,
  Activity,
  Container,
  Lock
} from 'lucide-react';

export default function Tools() {
  const tools = [
    {
      icon: <Cloud className="h-10 w-10" />,
      name: "Cloud Platforms",
      description: "Multi-cloud infrastructure management with enterprise-grade scalability",
      techs: ["AWS", "Azure", "GCP", "Hybrid"]
    },
    {
      icon: <Container className="h-10 w-10" />,
      name: "Container Orchestration",
      description: "Enterprise container management with automated scaling and deployment",
      techs: ["Kubernetes", "Docker", "OpenShift", "Helm"]
    },
    {
      icon: <GitBranch className="h-10 w-10" />,
      name: "GitOps & CI/CD",
      description: "Automated deployment pipelines with version-controlled infrastructure",
      techs: ["FluxCD", "ArgoCD", "Jenkins", "GitHub Actions"]
    },
    {
      icon: <Database className="h-10 w-10" />,
      name: "Data & Storage",
      description: "Enterprise data management with high availability and redundancy",
      techs: ["PostgreSQL", "MongoDB", "Redis", "S3"]
    },
    {
      icon: <Shield className="h-10 w-10" />,
      name: "Security",
      description: "Zero-trust security framework with automated compliance monitoring",
      techs: ["Vault", "Trivy", "OPA", "Falco"]
    },
    {
      icon: <Activity className="h-10 w-10" />,
      name: "Observability",
      description: "Full-stack monitoring with real-time alerts and detailed analytics",
      techs: ["Prometheus", "Grafana", "ELK", "Datadog"]
    }
  ];

  return (
    <section id="technology" className="min-h-screen flex items-center py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
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
            Enterprise Technology Stack
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built on industry-leading technologies for reliability, scalability, and security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative z-10"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative h-full p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-all duration-300 flex flex-col">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-gold-400">{tool.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{tool.name}</h3>
                <p className="text-slate-300 mb-6 flex-grow">{tool.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tool.techs.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm bg-gold-500/10 text-gold-400 border border-gold-500/20 group-hover:border-gold-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}