import React, { useState } from 'react';
import { Send, CheckCircle, XCircle, Loader } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setStatus('loading');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buttonContent = {
    idle: { icon: <Send className="h-5 w-5" />, text: 'Send Message' },
    loading: { icon: <Loader className="h-5 w-5 animate-spin" />, text: 'Sending...' },
    success: { icon: <CheckCircle className="h-5 w-5" />, text: 'Message Sent!' },
    error: { icon: <XCircle className="h-5 w-5" />, text: 'Error Sending' }
  };

  return (
    <section id="contact" className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-800/50" style={{ zIndex: -1 }}></div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="gradient-text text-4xl font-bold text-center mb-6">
            Get Started
          </h2>
          <p className="text-slate-300 text-center mb-12">
            Ready to transform your business? Let's discuss how we can help.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-lg flex items-center justify-center space-x-2 
                       bg-gold-500 hover:bg-gold-600 disabled:bg-slate-700 
                       disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
            >
              <span>{buttonContent[status].text}</span>
              {buttonContent[status].icon}
            </button>
          </form>

          {(status === 'success' || status === 'error') && (
            <div className={`mt-4 text-center rounded-lg p-4 ${
              status === 'success' 
                ? 'text-gold-400 bg-gold-500/10' 
                : 'text-red-400 bg-red-500/10'
            }`}>
              {status === 'success' 
                ? "Thank you for your message! We'll get back to you soon."
                : 'There was an error sending your message. Please try again later.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}