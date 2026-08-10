import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

/**
 * Main Landing Page Component (page.js)
 * Purpose: Composes all sections of the BookNest landing page.
 * Keeps the structure simple, declarative, and easy to read.
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-zinc-900 antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
