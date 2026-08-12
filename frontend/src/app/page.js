import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-zinc-900 antialiased">
      {/* header */}
      <Navbar />

      {/* Body */}
      <main>
        <Hero />
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;