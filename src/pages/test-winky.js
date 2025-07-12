import React from 'react';

const TestWinky = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Winky Rough Font Test</h1>
        
        {/* Winky Rough Test */}
        <div className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-2xl mb-4">Winky Rough Font</h2>
          <div className="space-y-4">
            <h1 className="font-winky text-6xl">Vibe - Video Conferencing</h1>
            <h2 className="font-winky text-4xl">Welcome to the Meeting</h2>
            <p className="font-winky text-2xl">This is Winky Rough font in action!</p>
            <p className="font-winky text-lg">Smaller text with Winky Rough</p>
          </div>
        </div>

        {/* Comparison with other fonts */}
        <div className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-2xl mb-4">Font Comparison</h2>
          <div className="space-y-4">
            <p className="font-winky text-3xl">Winky Rough: The quick brown fox</p>
            <p className="font-kalam text-3xl">Kalam: The quick brown fox</p>
            <p className="font-marker text-3xl">Permanent Marker: The quick brown fox</p>
            <p className="font-creepster text-3xl">Creepster: The quick brown fox</p>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-2xl mb-4">How to Use Winky Rough</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Tailwind Class:</strong> <code className="bg-white/20 px-2 py-1 rounded">font-winky</code></p>
            <p><strong>Example:</strong> <code className="bg-white/20 px-2 py-1 rounded">&lt;h1 className="font-winky text-4xl"&gt;Your Text&lt;/h1&gt;</code></p>
            <p><strong>Available Weight:</strong> 400 (normal)</p>
          </div>
        </div>

        {/* All Rough Fonts */}
        <div className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-2xl mb-4">All Rough/Distressed Fonts</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/60">Winky Rough (font-winky)</p>
              <p className="font-winky text-3xl">Rough and Ready Text</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Creepster (font-creepster)</p>
              <p className="font-creepster text-3xl">Spooky Horror Text</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Griffy (font-griffy)</p>
              <p className="font-griffy text-3xl">Western Style Text</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Nosifer (font-nosifer)</p>
              <p className="font-nosifer text-3xl">Vintage Distressed</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Butcherman (font-butcherman)</p>
              <p className="font-butcherman text-3xl">Bold Rough Display</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Eater (font-eater)</p>
              <p className="font-eater text-3xl">Corroded Style</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestWinky;
