import React from 'react';

export default function Stats() {
  const stats = [
    { number: "98%", label: "Client Satisfaction" },
    { number: "250+", label: "Projects Delivered" },
    { number: "40%", label: "Cost Reduction" },
    { number: "24/7", label: "Support Coverage" }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}