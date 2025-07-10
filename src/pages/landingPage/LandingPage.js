import React from "react";

// Component imports (all assumed to live in ./components)
// import ThreeBackground from "@/components/Threebackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* <ThreeBackground /> */}
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
