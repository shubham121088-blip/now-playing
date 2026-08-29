import React, { useState, useEffect } from 'react';
import { Maximize, Minimize, Mic2, Disc, Play, Pause } from 'lucide-react';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lyrics] = useState<string>("🎶 Instrumental Introduction 🎶\n\nStrumming through the mountain roads,\nCarrying the weight and loads,\nHimalayan breeze is calling out my name,\nNothing ever feels the same.\n\n(Enjoy the vibe...)");

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const track = {
    title: "Himalayan Breeze",
    artist: "Aether & The Nomads",
    coverUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <div className="relative w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden font-sans text-white">
      
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-50 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full transition-all border border-neutral-800 shadow-lg"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      {/* Lyrics Toggle Button */}
      <button
        onClick={() => setShowLyrics(!showLyrics)}
        className={`fixed top-6 left-6 z-50 p-3 rounded-full transition-all border border-neutral-800 shadow-lg ${
          showLyrics ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-neutral-900/80 text-white hover:bg-neutral-800'
        }`}
        title="Toggle Lyrics"
      >
        <Mic2 size={20} />
      </button>

      {/* Main Content Area */}
      <div className={`flex flex-col items-center justify-center transition-all duration-500 ${showLyrics ? 'md:-translate-x-32' : 'translate-x-0'}`}>
        
        {/* Turntable Container */}
        <div className="relative flex items-center justify-center mb-8 w-80 h-80">
          
          {/* Spinning Vinyl Record (Pokes out to the right when playing) */}
          <div 
            className={`absolute right-0 w-72 h-72 md:w-80 md:h-80 bg-neutral-900 rounded-full border-4 border-neutral-800 flex items-center justify-center shadow-2xl transition-transform duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s', willChange: 'transform' }}
          >
            <div className="absolute w-60 h-60 rounded-full border border-neutral-800/60"></div>
            <div className="absolute w-44 h-44 rounded-full border border-neutral-800/60"></div>
            <div className="absolute w-28 h-28 rounded-full border border-neutral-800/60"></div>
            <div className="absolute w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-inner">
              <Disc className="w-8 h-8 text-neutral-950" />
            </div>
          </div>

          {/* Album Cover Art (Positioned cleanly on the left overlapping the vinyl) */}
          <div className="absolute left-0 z-10 w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
            <img 
              src={track.coverUrl} 
              alt={track.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center z-10 space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{track.title}</h1>
          <p className="text-neutral-400 text-sm">{track.artist}</p>
        </div>

        {/* Play/Pause Control */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="mt-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
        </button>
      </div>

      {/* Sliding Lyrics Panel */}
      {showLyrics && (
        <div className="absolute right-8 w-full md:w-1/3 h-[75vh] bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 flex flex-col text-white overflow-hidden shadow-2xl z-40 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3">
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-emerald-400" /> Lyrics
            </h2>
            <button 
              onClick={() => setShowLyrics(false)}
              className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all text-xs text-white"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto text-neutral-300 text-base space-y-4 text-center">
            <pre className="whitespace-pre-wrap font-sans leading-relaxed">{lyrics}</pre>
          </div>
        </div>
      )}

    </div>
  );
}