import React, { useState, useEffect } from 'react';
import { Maximize, Minimize, Mic2 } from 'lucide-react';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<string>("Loading lyrics...");

  // Fullscreen toggle logic
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Keep state updated if user exits via ESC key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* --- TOP RIGHT: Fullscreen Toggle Button --- */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 z-50 p-3 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-full transition-all border border-white/10"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      {/* --- TOP LEFT: Lyrics Toggle Button --- */}
      <button
        onClick={() => setShowLyrics(!showLyrics)}
        className={`fixed top-4 left-4 z-50 p-3 rounded-full transition-all border border-white/10 ${
          showLyrics ? 'bg-white text-black' : 'bg-black/60 text-white/80 hover:bg-black hover:text-white'
        }`}
        title="Toggle Lyrics"
      >
        <Mic2 size={20} />
      </button>

      {/* --- MAIN CONTENT (Vinyl / Player) --- */}
      <div className={`flex flex-col items-center justify-center transition-all duration-500 ${showLyrics ? 'md:-translate-x-32' : 'translate-x-0'}`}>
        <div className="text-white text-center">
          <p className="text-2xl font-bold tracking-wider">Now Playing</p>
          <p className="text-white/60 text-sm mt-2">Vinyl Player Component</p>
        </div>
      </div>

      {/* --- SLIDING LYRICS PANEL --- */}
      {showLyrics && (
        <div className="absolute right-8 w-full md:w-1/3 h-[80vh] bg-black/90 border border-white/10 rounded-2xl p-6 flex flex-col text-white overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold tracking-wide">Lyrics</h2>
            <button 
              onClick={() => setShowLyrics(false)}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-xs text-white"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto text-white/80 text-base space-y-4 text-center">
            <p className="whitespace-pre-wrap font-sans leading-relaxed">{lyrics}</p>
          </div>
        </div>
      )}

    </div>
  );
}