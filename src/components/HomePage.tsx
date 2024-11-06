import React, { lazy, Suspense } from 'react';
import Hero from './Hero';
import LoadingSpinner from './LoadingSpinner';

// Lazy load less critical sections
const Services = lazy(() => import('./Services'));
const Tools = lazy(() => import('./Tools'));
const Benefits = lazy(() => import('./Benefits'));
const CaseStudies = lazy(() => import('./CaseStudies'));
const FAQ = lazy(() => import('./FAQ'));
const ContactForm = lazy(() => import('./ContactForm'));
const Footer = lazy(() => import('./Footer'));

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
        <Tools />
        <Benefits />
        <CaseStudies />
        <FAQ />
        <ContactForm />
        <Footer />
      </Suspense>
    </main>
  );
}