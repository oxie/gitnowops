import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GitBranch } from 'lucide-react';

const menuItems = [
  { label: 'Solutions', sectionId: 'solutions' },
  { label: 'Technology', sectionId: 'technology' },
  { label: 'Case Studies', sectionId: 'case-studies' },
  { label: 'FAQ', sectionId: 'faq' }
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Close mobile menu first
      setIsMobileMenuOpen(false);

      // Wait for mobile menu animation to complete
      setTimeout(() => {
        const headerHeight = 80; // Height of fixed header
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300); // Match the mobile menu animation duration
    }
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-slate-900/90 backdrop-blur-md' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between relative z-50">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-2 group"
            aria-label="GitOpsNow Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/20 blur-lg rounded-full group-hover:bg-gold-500/30 transition-colors" />
              <GitBranch className="h-8 w-8 text-gold-400 relative z-10" />
            </div>
            <span className="text-xl font-bold">GitOpsNow</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.sectionId}`}
                onClick={(e) => scrollToSection(e, item.sectionId)}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 transition-all hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-slate-800/95 backdrop-blur-md rounded-lg overflow-hidden"
            >
              <div className="py-2 space-y-1">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={`#${item.sectionId}`}
                    onClick={(e) => scrollToSection(e, item.sectionId)}
                    className="block w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="block mx-4 my-2 px-4 py-3 text-center rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}