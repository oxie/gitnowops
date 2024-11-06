import React from 'react';
import { GitBranch, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Solutions',
      links: [
        { label: 'GitOps Implementation', href: '#' },
        { label: 'Cloud Migration', href: '#' },
        { label: 'DevOps Automation', href: '#' },
        { label: 'Security & Compliance', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Case Studies', href: '#' },
        { label: 'Webinars', href: '#' },
        { label: 'White Papers', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 pt-20 pb-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <GitBranch className="h-8 w-8 text-gold-400" />
              <span className="text-2xl font-bold">GitOpsNow</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Transforming enterprises through modern DevOps practices and GitOps methodologies. 
              Automate, secure, and scale your infrastructure with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                <Github className="h-5 w-5 text-slate-400 hover:text-gold-400" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-gold-400" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-gold-400" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                <Mail className="h-5 w-5 text-slate-400 hover:text-gold-400" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} GitOpsNow. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}