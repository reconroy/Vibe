import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Video,
  Shield,
  Users,
  Monitor,
  MessageSquare,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "HD Video Quality",
    description:
      "Crystal-clear 4K video calls with adaptive streaming technology for seamless communication.",
  },
  {
    icon: Shield,
    title: "End-to-End Security",
    description:
      "Bank-level encryption and security protocols to keep your conversations private and secure.",
  },
  {
    icon: Users,
    title: "Large Meetings",
    description:
      "Host meetings with up to 1000 participants with advanced moderation and breakout rooms.",
  },
  {
    icon: Monitor,
    title: "Screen Sharing",
    description:
      "Share your screen, applications, or specific windows with real-time annotation tools.",
  },
  {
    icon: MessageSquare,
    title: "Live Chat & Reactions",
    description:
      "Engage with real-time messaging, emoji reactions, and interactive polling features.",
  },
  {
    icon: Clock,
    title: "Meeting Recording",
    description:
      "Record meetings with automatic transcription and searchable content for future reference.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Professional video conferencing tools designed for seamless
            collaboration, enhanced productivity, and meaningful connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="h-full p-8 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-full filter blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-fuchsia-500/10 to-purple-500/10 rounded-full filter blur-3xl translate-y-1/2 translate-x-1/2" />
    </section>
  );
};

export default Features;
