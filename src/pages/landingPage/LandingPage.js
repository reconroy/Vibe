import React, { useState } from "react";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  const [meetingLink, setMeetingLink] = useState("");

  const handleJoin = () => {
    if (meetingLink.trim() !== "") {
      router.push(`/meet/${meetingLink.trim()}`);
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-[#0D1117] text-white overflow-hidden relative font-sans">
        {/* Background Gradient + Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-[#0D1117] to-blue-950 opacity-80" />
          <div className="absolute -top-10 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-10 right-1/3 w-[480px] h-[480px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse delay-500" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-white/10 sticky top-0 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              <span className="text-purple-400">Vibe</span>!
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 text-sm font-medium shadow-md">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative z-10 py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-purple-600 bg-clip-text text-transparent mb-6">
              Meet Instantly. Vibe Seamlessly.
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Connect with your team, friends, and family through secure, high-quality video meetings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base font-medium shadow-purple-500/30 shadow-md">
                Create New Meeting
              </button>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Enter meeting link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="text-white hover:text-purple-400" onClick={handleJoin}>
                  <span className="material-symbols-outlined">login</span>
                </button>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20">
              Schedule Meeting
            </button>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose Vibe?</h2>
          <p className="text-lg text-gray-300 mb-12">Everything you need for seamless video meetings</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {["security", "event", "google", "hd"].map((icon, i) => {
              const features = [
                ["Secure & Fast", "End-to-end encrypted meetings with lightning-fast connections"],
                ["Schedule with Ease", "Integrated calendar with smart scheduling and reminders"],
                ["Google Auth Only", "Simple one-click authentication with your Google account"],
                ["HD Audio/Video", "Crystal clear video calls with screen sharing capabilities"],
              ];
              return (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center backdrop-blur-sm hover:bg-white/10 transition shadow-md hover:shadow-xl"
                >
                  <div className="w-14 h-14 mx-auto flex items-center justify-center bg-purple-500/30 text-purple-200 rounded-xl mb-4">
                    {icon === "google" ? (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google Icon"
                        className="w-6 h-6"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-2xl">{icon}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{features[i][0]}</h3>
                  <p className="text-sm text-gray-300">{features[i][1]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-300 mb-10">Have questions? We'd love to hear from you</p>
            <form className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Tell us what's on your mind..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 shadow-md hover:shadow-purple-500/30"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0D1117]/90 border-t border-white/10 py-10 px-6 text-gray-400 text-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-white text-xl font-bold mb-2">
                <span className="text-purple-400">Vibe</span>!
              </div>
              <p>Meet instantly, vibe seamlessly with secure video meetings.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                {["Home", "Features", "Contact"].map((text, idx) => (
                  <li key={idx}><a href="#" className="hover:text-white">{text}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Support</h4>
              <ul className="space-y-1">
                {["Help Center", "Privacy Policy", "Terms of Service"].map((text, idx) => (
                  <li key={idx}><a href="#" className="hover:text-white">{text}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 border-t border-white/10 pt-6">
            &copy; 2024 Vibe! All rights reserved.
          </div>
        </footer>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6 z-20">
          <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;
