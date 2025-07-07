"use client";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Navbar */}
      <nav className="fixed w-full px-6 py-4 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
              <span className="text-white text-2xl font-bold">V</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Vibe</h1>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-slate-300 hover:text-white transition-all duration-300 text-lg font-medium hover:scale-105">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-all duration-300 text-lg font-medium hover:scale-105">Pricing</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-all duration-300 text-lg font-medium hover:scale-105">About</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-all duration-300 text-lg font-medium hover:scale-105">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Sign In</button>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 font-semibold text-white">Start Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Create <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Amazing Videos</span> with AI
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Transform your ideas into stunning videos using our AI-powered platform. Fast, easy, and professional results every time.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 font-semibold text-white text-lg w-full md:w-auto">
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-slate-700 hover:border-slate-600 rounded-xl text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold text-lg w-full md:w-auto">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Feature {item}</h3>
                <p className="text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900/80 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">V</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Vibe</h3>
            </div>
            <p className="text-slate-300">Create amazing videos with the power of AI</p>
          </div>
          {["Product", "Company", "Support"].map((section) => (
            <div key={section}>
              <h4 className="text-lg font-semibold text-white mb-6">{section}</h4>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-300 hover:text-white transition-all duration-300">
                      {section} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
