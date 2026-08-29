import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart, 
  Repeat, 
  Shuffle, 
  Music2, 
  MoreHorizontal, 
  Maximize2 
} from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(45); // Current progress in seconds
  const [volume, setVolume] = useState<number>(80);
  const duration = 214; // Total duration in seconds (3:34)

  const track = {
    title: "Himalayan Breeze",
    artist: "Aether & The Nomads",
    album: "Roads Less Traveled (Deluxe Edition)",
    coverUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  };

  // Simulate progress when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans text-neutral-100">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Top App Bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            <Music2 className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Playing from Playlist</span>
          </div>
          <button className="text-neutral-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Album Artwork Section */}
        <div className="px-6 py-4">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg group">
            <img 
              src={track.coverUrl} 
              alt={track.album}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Live Equalizer Bars Overlay if Playing */}
            {isPlaying && (
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1 h-3 bg-emerald-400 animate-bounce rounded-full"></span>
                <span className="w-1 h-5 bg-emerald-400 animate-bounce delay-100 rounded-full"></span>
                <span className="w-1 h-2 bg-emerald-400 animate-bounce delay-200 rounded-full"></span>
              </div>
            )}
          </div>
        </div>

        {/* Track Info & Like Button */}
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="space-y-1 overflow-hidden pr-2">
            <h2 className="text-xl font-bold truncate text-white tracking-tight">{track.title}</h2>
            <p className="text-sm text-neutral-400 truncate">{track.artist}</p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="text-neutral-400 hover:text-white transition-transform active:scale-90 p-2"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'text-emerald-500 fill-emerald-500' : ''}`} 
            />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 space-y-2">
          <div className="relative group cursor-pointer">
            <input 
              type="range" 
              min={0} 
              max={duration} 
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
            />
          </div>
          <div className="flex justify-between text-xs text-neutral-400 font-medium">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="px-6 py-2 flex items-center justify-between">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>
          
          <button className="text-neutral-200 hover:text-white transition-transform active:scale-90">
            <SkipBack className="w-6 h-6 fill-neutral-200" />
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-black" />
            ) : (
              <Play className="w-7 h-7 fill-black ml-1" />
            )}
          </button>

          <button className="text-neutral-200 hover:text-white transition-transform active:scale-90">
            <SkipForward className="w-6 h-6 fill-neutral-200" />
          </button>

          <button className="text-neutral-400 hover:text-white transition-colors">
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Volume & Extra Tools */}
        <div className="px-6 py-6 flex items-center justify-between border-t border-neutral-800/60 mt-4">
          <div className="flex items-center gap-3 w-1/2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input 
              type="range" 
              min={0} 
              max={100} 
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-300 hover:accent-white transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-neutral-400 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}