"use client";

import Navbar from "./Navbar";
import Hero from "./Sections/Hero";
import Features from "./Sections/Features";
import CTA from "./Sections/CTA";
import Testimonials from "./Sections/Testimonials";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors">
      <Navbar />

      <Hero />

      <Features />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
}
