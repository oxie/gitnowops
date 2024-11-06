import React from 'react';
import { motion } from 'framer-motion';

export default function InfrastructureDiagram() {
  const components = [
    { id: 'users', label: 'Users', x: 50, y: 50 },
    { id: 'loadBalancer', label: 'Load Balancer', x: 200, y: 50 },
    { id: 'k8s', label: 'Kubernetes Cluster', x: 350, y: 50 },
    { id: 'db', label: 'Database', x: 500, y: 50 },
    { id: 'monitoring', label: 'Monitoring', x: 350, y: 150 },
    { id: 'cicd', label: 'CI/CD Pipeline', x: 200, y: 150 },
  ];

  const connections = [
    { from: 'users', to: 'loadBalancer' },
    { from: 'loadBalancer', to: 'k8s' },
    { from: 'k8s', to: 'db' },
    { from: 'k8s', to: 'monitoring' },
    { from: 'cicd', to: 'k8s' },
  ];

  return (
    <div className="relative w-full h-[300px] bg-slate-900/50 rounded-lg overflow-hidden">
      <svg className="w-full h-full">
        {connections.map((conn, i) => {
          const from = components.find(c => c.id === conn.from);
          const to = components.find(c => c.id === conn.to);
          if (!from || !to) return null;

          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.5 }}
            />
          );
        })}

        {components.map((comp) => (
          <motion.g
            key={comp.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle
              cx={comp.x}
              cy={comp.y}
              r="20"
              fill="rgb(16, 185, 129)"
              className="opacity-20"
            />
            <text
              x={comp.x}
              y={comp.y + 40}
              textAnchor="middle"
              fill="white"
              className="text-xs"
            >
              {comp.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}