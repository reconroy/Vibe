  import React from "react"

const LandingPage = () => {
      return (
          <div id="webcrumbs">
              <div className="w-full min-h-screen bg-[#0D1117] text-white overflow-hidden relative">
                  <div className="absolute inset-0 z-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
                      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  </div>

                  <nav className="relative z-10 backdrop-blur-sm bg-[#0D1117]/80 border-b border-gray-800/50 sticky top-0">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="flex justify-between items-center h-16">
                              <div className="flex items-center">
                                  <div className="text-2xl font-bold text-white">
                                      <span className="text-purple-400">Vibe</span>!
                                  </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                  <button className="bg-white text-gray-900 px-6 py-2 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                                      <img
                                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                          className="w-5 h-5"
                                          alt="Google"
                                          keywords="google, logo, signin"
                                      />
                                      <span>Sign in with Google</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </nav>

                  <main className="relative z-10">
                      <section className="py-20 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-7xl mx-auto text-center">
                              <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10">
                                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                                      Meet Instantly. Vibe Seamlessly.
                                  </h1>
                                  <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                                      Connect with your team, friends, and family through secure, high-quality video
                                      meetings
                                  </p>

                                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                                      <button className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-medium hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25">
                                          {/* <span className="material-symbols-outlined">add</span> */}
                                          <span>Create New Meeting</span>
                                      </button>

                                      <div className="flex items-center space-x-2">
                                          <input
                                              type="text"
                                              placeholder="Enter meeting link"
                                              className="bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                          />
                                          <button className="bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                                              <span className="material-symbols-outlined">login</span>
                                          </button>
                                      </div>
                                  </div>

                                  <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
                                      {/* <span className="material-symbols-outlined">schedule</span> */}
                                      <span>Schedule Meeting</span>
                                  </button>
                              </div>
                          </div>
                      </section>

                      <section className="py-20 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-7xl mx-auto">
                              <div className="text-center mb-16">
                                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Vibe?</h2>
                                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                      Everything you need for seamless video meetings
                                  </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                                          <span className="material-symbols-outlined text-purple-400 text-3xl">
                                              security
                                          </span>
                                      </div>
                                      <h3 className="text-xl font-semibold mb-4">Secure & Fast</h3>
                                      <p className="text-gray-300">
                                          End-to-end encrypted meetings with lightning-fast connections
                                      </p>
                                  </div>

                                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                                          <span className="material-symbols-outlined text-purple-400 text-3xl">
                                              event
                                          </span>
                                      </div>
                                      <h3 className="text-xl font-semibold mb-4">Schedule with Ease</h3>
                                      <p className="text-gray-300">
                                          Integrated calendar with smart scheduling and reminders
                                      </p>
                                  </div>

                                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                                          <img
                                              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                              className="w-8 h-8"
                                              alt="Google Auth"
                                              keywords="google, authentication, login"
                                          />
                                      </div>
                                      <h3 className="text-xl font-semibold mb-4">Google Auth Only</h3>
                                      <p className="text-gray-300">
                                          Simple one-click authentication with your Google account
                                      </p>
                                  </div>

                                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                                          <span className="material-symbols-outlined text-purple-400 text-3xl">hd</span>
                                      </div>
                                      <h3 className="text-xl font-semibold mb-4">HD Audio/Video</h3>
                                      <p className="text-gray-300">
                                          Crystal clear video calls with screen sharing capabilities
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </section>

                      <section className="py-20 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-4xl mx-auto">
                              <div className="text-center mb-16">
                                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
                                  <p className="text-xl text-gray-300">Have questions? We'd love to hear from you</p>
                              </div>

                              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10">
                                  <form className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div>
                                              <label className="block text-sm font-medium mb-2">Name</label>
                                              <input
                                                  type="text"
                                                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                  placeholder="Your name"
                                              />
                                          </div>
                                          <div>
                                              <label className="block text-sm font-medium mb-2">Email</label>
                                              <input
                                                  type="email"
                                                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                  placeholder="your@email.com"
                                              />
                                          </div>
                                      </div>

                                      <div>
                                          <label className="block text-sm font-medium mb-2">Message</label>
                                          <textarea
                                              rows="4"
                                              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                              placeholder="Tell us what's on your mind..."
                                          ></textarea>
                                      </div>

                                      <div className="text-center">
                                          <button className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-medium hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
                                              <span>Send Message</span>
                                             </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </section>
                  </main>

                  <footer className="relative z-10 bg-[#0D1117]/80 border-t border-gray-800/50 py-12 px-4 sm:px-6 lg:px-8">
                      <div className="max-w-7xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div>
                                  <div className="text-2xl font-bold text-white mb-4">
                                      <span className="text-purple-400">Vibe</span>!
                                  </div>
                                  <p className="text-gray-300">
                                      Meet instantly, vibe seamlessly with secure video meetings.
                                  </p>
                              </div>

                              <div>
                                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                  <ul className="space-y-2">
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Home
                                          </a>
                                      </li>
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Features
                                          </a>
                                      </li>
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Contact
                                          </a>
                                      </li>
                                  </ul>
                              </div>

                              <div>
                                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                                  <ul className="space-y-2">
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Help Center
                                          </a>
                                      </li>
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Privacy Policy
                                          </a>
                                      </li>
                                      <li>
                                          <a
                                              href="#"
                                              className="text-gray-300 hover:text-white transition-colors duration-300"
                                          >
                                              Terms of Service
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>

                          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center">
                              <p className="text-gray-400">&copy; 2024 Vibe! All rights reserved.</p>
                          </div>
                      </div>
                  </footer>

                  <div className="absolute bottom-8 right-8 z-20">
                      <button className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/25">
                          <span className="material-symbols-outlined">help</span>
                      </button>
                  </div>

                  {/* Next: "Add meeting room UI component with participant grid" */}
                  {/* Next: "Add calendar modal component for scheduling" */}
                  {/* Next: "Add meeting link generation with copy functionality" */}
                  {/* Next: "Add user authentication state management" */}
                  {/* Next: "Add responsive mobile drawer menu" */}
              </div>
          </div>
      )
  };
 export default LandingPage;
