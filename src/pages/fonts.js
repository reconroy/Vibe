import React from 'react';
import { motion } from 'framer-motion';

const FontShowcase = () => {
  const fonts = [
    {
      name: 'Winky Rough',
      className: 'font-winky',
      description: 'Google\'s rough, distressed style font',
      weights: ['400']
    },
    {
      name: 'Kalam',
      className: 'font-kalam',
      description: 'Handwritten style, casual and friendly',
      weights: ['300', '400', '700']
    },
    {
      name: 'Caveat',
      className: 'font-caveat',
      description: 'Elegant handwriting, perfect for signatures',
      weights: ['400', '500', '600', '700']
    },
    {
      name: 'Architects Daughter',
      className: 'font-architects',
      description: 'Architectural sketching style',
      weights: ['400']
    },
    {
      name: 'Indie Flower',
      className: 'font-indie',
      description: 'Quirky and fun handwriting',
      weights: ['400']
    },
    {
      name: 'Permanent Marker',
      className: 'font-marker',
      description: 'Bold marker pen style',
      weights: ['400']
    },
    {
      name: 'Fredoka',
      className: 'font-fredoka',
      description: 'Modern, rounded, and friendly',
      weights: ['300', '400', '500', '600', '700']
    },
    {
      name: 'Comfortaa',
      className: 'font-comfortaa',
      description: 'Geometric and comfortable',
      weights: ['300', '400', '500', '600', '700']
    },
    {
      name: 'Nunito',
      className: 'font-nunito',
      description: 'Well-balanced and highly readable',
      weights: ['200', '300', '400', '500', '600', '700', '800', '900']
    },
    {
      name: 'Creepster',
      className: 'font-creepster',
      description: 'Horror/spooky style font',
      weights: ['400']
    },
    {
      name: 'Griffy',
      className: 'font-griffy',
      description: 'Rough, western-style font',
      weights: ['400']
    },
    {
      name: 'Nosifer',
      className: 'font-nosifer',
      description: 'Distressed, vintage style',
      weights: ['400']
    },
    {
      name: 'Butcherman',
      className: 'font-butcherman',
      description: 'Bold, rough display font',
      weights: ['400']
    },
    {
      name: 'Eater',
      className: 'font-eater',
      description: 'Corroded, eaten-away style',
      weights: ['400']
    }
  ];

  const sampleText = "Vibe - Video Conferencing Made Simple";
  const sampleParagraph = "Join meetings with crystal clear video and audio. Experience seamless collaboration with our modern video conferencing platform.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Font Showcase</h1>
          <p className="text-xl text-white/80">Choose the perfect font for your Vibe experience</p>
        </motion.div>

        <div className="grid gap-8">
          {fonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{font.name}</h2>
                <p className="text-white/70 mb-2">{font.description}</p>
                <p className="text-sm text-white/50">
                  Available weights: {font.weights.join(', ')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Large Title */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Large Title (48px)</p>
                  <h3 className={`${font.className} text-5xl text-white font-bold`}>
                    {sampleText}
                  </h3>
                </div>

                {/* Medium Heading */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Medium Heading (32px)</p>
                  <h4 className={`${font.className} text-3xl text-white font-semibold`}>
                    {sampleText}
                  </h4>
                </div>

                {/* Body Text */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Body Text (18px)</p>
                  <p className={`${font.className} text-lg text-white/90`}>
                    {sampleParagraph}
                  </p>
                </div>

                {/* Small Text */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Small Text (14px)</p>
                  <p className={`${font.className} text-sm text-white/80`}>
                    {sampleParagraph}
                  </p>
                </div>

                {/* Weight Variations (for fonts with multiple weights) */}
                {font.weights.length > 1 && (
                  <div>
                    <p className="text-sm text-white/60 mb-2">Weight Variations</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {font.weights.map(weight => (
                        <div key={weight} className="text-center">
                          <p className="text-xs text-white/50 mb-1">Weight {weight}</p>
                          <p 
                            className={`${font.className} text-white`}
                            style={{ fontWeight: weight }}
                          >
                            Sample Text
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How to Use These Fonts</h2>
            <div className="text-left space-y-4 text-white/80">
              <p><strong>In Tailwind CSS:</strong> Use classes like <code className="bg-white/20 px-2 py-1 rounded">font-kalam</code>, <code className="bg-white/20 px-2 py-1 rounded">font-caveat</code>, etc.</p>
              <p><strong>Example:</strong> <code className="bg-white/20 px-2 py-1 rounded">&lt;h1 className="font-fredoka text-4xl"&gt;Your Text&lt;/h1&gt;</code></p>
              <p><strong>With weights:</strong> <code className="bg-white/20 px-2 py-1 rounded">&lt;p className="font-nunito font-bold"&gt;Bold Text&lt;/p&gt;</code></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FontShowcase;
