import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Video, Calendar, Users } from "lucide-react";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-black text-white">
      {/* Animated Background Spotlights */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
            rotate: [-5, 5, -3, 7, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-[110vw] h-[300vh] pointer-events-none"
          style={{
            background: `conic-gradient(from 35deg at 10% 100%,
              transparent 0deg,
              rgba(168, 85, 247, 0.4) 15deg,
              rgba(168, 85, 247, 0.6) 25deg,
              rgba(168, 85, 247, 0.4) 35deg,
              transparent 50deg,
              transparent 360deg)`,
            filter: "blur(8px)",
            transformOrigin: "0% 100%",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.3, 0.8, 0.4],
            rotate: [5, -5, 7, -3, 5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[110vw] h-[200vh] pointer-events-none"
          style={{
            background: `conic-gradient(from 270deg at 90% 100%,
              transparent 0deg,
              rgba(192, 132, 252, 0.4) 15deg,
              rgba(192, 132, 252, 0.6) 25deg,
              rgba(192, 132, 252, 0.4) 35deg,
              transparent 50deg,
              transparent 360deg)`,
            filter: "blur(8px)",
            transformOrigin: "100% 100%",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Connect with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Vibe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {isLoggedIn
              ? "Welcome back! Start a meeting, schedule for later, or join an existing conversation."
              : "Experience seamless video conferencing with crystal-clear quality, powerful collaboration tools, and instant connectivity."}
          </motion.p>

          {!isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoggedIn(true)}
                className="group bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
              >
                Start Meeting
                <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 text-white hover:text-purple-400 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center group-hover:border-purple-400 transition-colors">
                  <Video className="w-5 h-5" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {/* Card Buttons */}
                {[
                  {
                    title: "Instant Meeting",
                    desc: "Start a meeting right now with a unique link",
                    icon: <Video className="w-6 h-6 text-white" />,
                    gradient: "from-purple-500 to-fuchsia-500",
                  },
                  {
                    title: "Schedule Meeting",
                    desc: "Plan and schedule a meeting for later",
                    icon: <Calendar className="w-6 h-6 text-white" />,
                    gradient: "from-fuchsia-500 to-purple-400",
                  },
                  {
                    title: "Join Meeting",
                    desc: "Enter a meeting ID or use invite link",
                    icon: <Users className="w-6 h-6 text-white" />,
                    gradient: "from-purple-400 to-purple-600",
                  },
                ].map((card, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-purple-400 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400">{card.desc}</p>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter meeting ID or link"
                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm w-64"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-500 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-purple-600 transition-colors"
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
